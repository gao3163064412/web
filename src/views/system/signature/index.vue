<template>
  <div class="app-container">
    <el-form
      class="top searchFormBox"
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="签章名称" prop="signatureName">
        <el-input
          v-model="queryParams.signatureName"
          placeholder="请输入签章名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="签章类型" prop="isSignatureType">
        <el-select
          v-model="queryParams.isSignatureType"
          placeholder="请选择签章类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in isSignatureTypeOptions"
            :key="dict.dictCode"
            :label="dict.dictLabel"
            :value="dict.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          class="addBtn"
          @click="handleAdd"
          v-hasPermi="['system:signature:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          style="color: #ff6d8a"
          class="deleteBtn"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:signature:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="signatureList"
      @selection-change="handleSelectionChange"
      stripe
      border
      :default-sort="{ prop: 'createTime', order: 'ascending' }"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="签章名称"
        min-width="120"
        align="center"
        prop="signatureName"
        sortable
        show-overflow-tooltip
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="签章类型"
        min-width="120"
        align="center"
        prop="signatureTypeName"
        sortable
        show-overflow-tooltip
        :sort-orders="['ascending', 'descending']"
      />
      <!--      <el-table-column label="图片路径" align="center" prop="picturePath" />-->
      <el-table-column
        label="操作"
        width="120"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            class="iconfont icon-029xiugai-3"
            style="color: #ffc72e"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:signature:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            style="color: #ff6d8a"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:signature:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改签章管理对话框 -->
    <el-drawer :title="title" :visible.sync="open" size="35%" append-to-body>
      <div class="paddingBox">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <!--        <el-form-item label="主键id" prop="id">-->
          <!--          <el-input v-model="form.id" placeholder="请输入主键id" />-->
          <!--        </el-form-item>-->
          <el-form-item label="签章名称" prop="signatureName">
            <el-input
              v-model="form.signatureName"
              placeholder="请输入签章名称"
            />
          </el-form-item>
          <el-form-item label="签章类型" prop="isSignatureType">
            <el-select
              v-model="form.isSignatureType"
              placeholder="请选择签章类型"
            >
              <el-option
                v-for="dict in isSignatureTypeOptions"
                :key="dict.dictCode"
                :label="dict.dictLabel"
                :value="dict.dictCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="签章">
            <imageUpload v-model="form.picturePath" />
          </el-form-item>
        </el-form>
      </div>
      <div class="form_handle_area">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  listSignature,
  getSignature,
  delSignature,
  addSignature,
  updateSignature,
  exportSignature,
} from "@/api/system/signature";
import ImageUpload from "@/components/ImageUpload";

export default {
  name: "Signature",
  components: {
    ImageUpload,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 签章管理表格数据
      signatureList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 签章类型字典
      isSignatureTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        signatureName: null,
        isSignatureType: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [{ required: true, message: "主键id不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
    this.getDicts("signature_type").then((response) => {
      this.isSignatureTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询签章管理列表 */
    getList() {
      this.loading = true;
      listSignature(this.queryParams).then((response) => {
        this.signatureList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 签章类型字典翻译
    isSignatureTypeFormat(row, column) {
      return this.selectDictLabel(
        this.isSignatureTypeOptions,
        row.isSignatureType
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        signatureName: null,
        isSignatureType: null,
        picturePath: null,
        createUserId: null,
        createName: null,
        createTime: null,
        updateUserId: null,
        updateName: null,
        updateTime: null,
        delFlag: null,
        version: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加签章";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getSignature(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改签章";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateSignature(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSignature(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm("是否确认删除数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delSignature(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有签章管理数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportSignature(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.paddingBox {
  ::v-deep .el-select {
    width: 100%;
  }
}
</style>
