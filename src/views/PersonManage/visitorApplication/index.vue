<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      class="form_label_auto searchFormBox"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="company">
        <el-input
          v-model="queryParams.company"
          placeholder="请输入单位名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          type="warning"
          plain
          class="exportBtn iconfont icon-daochushuju"
          size="mini"
          @click="handleExport"
          v-hasPermi="['visitor:apply:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          class="printBtn"
          v-print="printObj"
          icon="el-icon-printer"
          size="mini"
          v-hasPermi="['visitor:apply:print']"
          >打印</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
        :columns="columns"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      id="tableTmpletes"
      border
      stripe
      :data="manageList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="姓名"
        min-width="110"
        v-if="columns[0].visible"
        align="center"
        prop="name"
        :show-overflow-tooltip="true"
        sortable
      />
      <el-table-column
        label="手机号"
        min-width="110"
        v-if="columns[1].visible"
        align="center"
        prop="phone"
        :show-overflow-tooltip="true"
        sortable
      />
      <el-table-column
        label="人员类型"
        min-width="110"
        v-if="columns[2].visible"
        align="center"
        prop="personType"
        :show-overflow-tooltip="true"
        sortable
      />
      <!-- 0学生；1非学生 -->
      <el-table-column
        label="单位"
        min-width="110"
        v-if="columns[3].visible"
        align="center"
        prop="company"
        :show-overflow-tooltip="true"
        sortable
      />
      <el-table-column
        label="申请期限"
        v-if="columns[4].visible"
        align="center"
        prop="applyTime"
        width="160"
        :show-overflow-tooltip="true"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="地址"
        min-width="110"
        v-if="columns[5].visible"
        align="center"
        prop="postalAddres"
        :show-overflow-tooltip="true"
        sortable
      />
      <el-table-column
        label="申请日期"
        v-if="columns[6].visible"
        align="center"
        prop="foundTime"
        width="160"
        :show-overflow-tooltip="true"
        sortable
      />
      <el-table-column
        label="状态"
        v-if="columns[7].visible"
        align="center"
        prop="isStatus"
        :show-overflow-tooltip="true"
        sortable
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            class="iconfont icon-tubiaolunkuo-"
            style="color: #39e399"
            @click="handleUpdate(scope.row, 1)"
            v-show="scope.row.isStatus == '待审核' || scope.row.isStatus == '0'"
            v-hasPermi="['visitor:apply:edit']"
            >审核</el-button
          >
          <el-button
            size="mini"
            type="text"
            class="iconfont icon-chakan"
            style="color: #5487ff"
            @click="handleUpdate(scope.row, 2)"
            v-hasPermi="['visitor:apply:check']"
            >查看</el-button
          >
          <!-- v-hasPermi="['visitor:manage:remove']" -->
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

    <!-- 添加或修改访客管理对话框 -->
    <el-drawer
      :title="title"
      :visible.sync="open"
      size="55%"
      append-to-body
      class="drawer lookPage"
    >
      <div class="descWrapper">
        <div class="descHeader">访客申请信息</div>
        <div class="descContent">
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="150px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input
                    v-model="formData.name"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" prop="sex">
                  <el-input
                    v-model="formData.sex"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="人员类型" prop="personType">
                  <el-input
                    v-model="formData.personType"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号" prop="phone">
                  <el-input
                    v-model="formData.phone"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所在地址" prop="postalAddres">
                  <el-input
                    v-model="formData.postalAddres"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱" prop="email">
                  <el-input
                    v-model="formData.email"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位名称" prop="company">
                  <el-input
                    v-model="formData.company"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门名称" prop="deptName">
                  <el-input
                    v-model="formData.deptName"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="研究方向" prop="research">
                  <el-input
                    v-model="formData.research"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请期限" prop="applyTimeList">
                  <el-input
                    v-model="formData.applyTime"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="课题组负责人(导师)" prop="teacher">
                  <el-input
                    v-model="formData.teacher"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="teaPhone">
                  <el-input
                    v-model="formData.teaPhone"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="工作单位" prop="teaCompany">
                  <el-input
                    v-model="formData.teaCompany"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职称" prop="teaTitle">
                  <el-input
                    v-model="formData.teaTitle"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册理由" prop="registerReason">
                  <el-input
                    v-model="formData.registerReason"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上传照片" prop="photoUrl">
                  <el-image
                    :src="formData.photoUrl"
                    :style="`width:120px;height:140px;`"
                    fit="fill"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="descHeader">访客申请审核</div>
        <div class="descContent" v-if="title == '审核'">
          <el-form size="medium" label-width="120px">
            <el-row :gutter="12">
              <el-form-item label="审核状态">
                <el-radio-group v-model="formData.isStatus">
                  <el-radio label="1">通过</el-radio>
                  <el-radio label="2">驳回</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <!-- <el-row :gutter="12" v-if="formData.isStatus=='驳回'">
              <el-form-item label="" label-width="160px">
                <el-input type="textarea" v-model="formData.remark"></el-input>
              </el-form-item>
            </el-row> -->
          </el-form>
        </div>
        <div class="descContent" v-if="title  == '查看'">
          <el-form size="medium" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="审核状态">
                  <!-- <el-radio-group v-model="formData.isStatus"> -->
                  <!-- 待审核0 1通过 2驳回 -->

                  <el-input disabled v-model="isStatus"></el-input>
                  <!-- <el-input :v-model="formData.isStatus==1?'通过':(formData.isStatus==2?'驳回':'待审核')"></el-input> -->
                  <!-- <el-input :v-model="formData.isStatus==1?'通过':(formData.isStatus==2?'驳回':'待审核')" disabled></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-row> -->
          </el-form>
        </div>
      </div>
      <div class="form_handle_area" v-if="title == '审核'">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  listManage,
  getManage,
  applyAudit,
  addManage,
  exportManage,
} from "@/api/personManage/personManage";

export default {
  name: "Manage",
  components: {},
  data() {
    return {
      // isStatus:null,
      btnId: null,
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
      // 访客管理表格数据
      manageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        phone: null,
        company: null,
        name: null,
      },
      // 表单参数
      formData: {},
      // 表单校验
      rules: {},
      columns: [
        { key: 0, label: `姓名`, visible: true },
        { key: 1, label: `手机号`, visible: true },
        { key: 2, label: `人员类型`, visible: true },
        { key: 3, label: `单位`, visible: true },
        { key: 4, label: `申请期限`, visible: true },
        { key: 5, label: `地址`, visible: true },
        { key: 6, label: `申请日期`, visible: true },
        { key: 7, label: `状态`, visible: true },
      ],
      printObj: {
        id: "tableTmpletes",
        popTitle: "访客申请",
        extraHead:
          '<meta http-equiv="Content-Language"content="zh-cn"/>,<style>  #tableTmplete { width: 100%;  } <style>',
      },
    };
  },
  created() {
    this.getList();
  },
  computed: {
    isStatus() {
      return this.formData.isStatus == 1
        ? "通过"
        : this.formData.isStatus == 2
        ? "驳回"
        : "待审核";
    },
  },
  methods: {
    /** 查询访客管理列表 */
    getList() {
      this.loading = true;
      listManage(this.queryParams).then((response) => {
        this.manageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.formData = {
        id: null,
        sex: "0",
        personType: null,
        phone: null,
        postalAddres: null,
        email: null,
        company: null,
        deptName: null,
        research: null,
        applyTime: null,
        registerReason: null,
        teacher: null,
        teaPhone: null,
        teaCompany: null,
        teaTitle: null,
        delFlag: null,
        createUserId: null,
        createName: null,
        createTime: null,
        updateUserId: null,
        updateName: null,
        updateTime: null,
        version: null,
        name: null,
        isStatus: "0",
        flag: null,
        password: null,
      };
      this.resetForm("formData");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.ids=null
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
      this.queryParams.ids = this.ids.join();
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加访客管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row, val) {
      this.btnId = val;
      this.reset();
      const id = row.id || this.ids;
      getManage(id).then((response) => {
        this.formData = response.data;
        this.open = true;
        this.title = this.btnId == 1 ? "审核" : "查看";
      });
      // if(this.btnId==1){
      //           applyAudit(id).then(response => {
      //     this.formData = response.data;
      //     // this.formData.isStatus="驳回"
      //     this.open = true;
      //     this.title = "审核访客管理";
      //   });
      // }else{

      // }
    },
    /** 提交按钮 */
    submitForm() {
      if (this.btnId == 1 && this.formData.isStatus == "0") {
        // if(this.formData.remark==null||this.formData.remark==" "||this.formData.remark==""){
        // }
        this.$message.error("请审批");
        return;
      }
      let params = { id: this.formData.id, status: this.formData.isStatus };
      if (this.formData.id != null) {
        applyAudit(params).then((response) => {
          this.msgSuccess("审核成功");
          this.open = false;
          this.getList();
        });
      } else {
        addManage(this.formData).then((response) => {
          this.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      }
    },

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportManage(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.drawer {
  ::v-deep {
    .el-drawer__body {
      background: #ffffff;
    }
  }
}

.descWrapper {
  background: #ffffff;
  padding: 0px 20px;
  .descHeader {
    position: relative;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    padding-left: 8px;
    border-bottom: 1px solid #dcdfe6;
  }
  .descHeader::after {
    position: absolute;
    content: " ";
    width: 4px;
    height: 52%;
    background: #1890ff;
    left: 0;
    top: 25%;
  }
  .descContent {
    /*padding: 0px 20px;*/
    // ::v-deep {  slb  测试提了bug，统一要求有灰色框
    margin-top: 20px;
    //   .el-input__inner {
    //     border: none;
    //   }
    // .el-input.is-disabled .el-input__inner {
    //   background: #ffffff;
    // }
    // }
    .registerReason {
      ::v-deep {
        .el-form-item__content {
          width: 100%;
        }
      }
    }
  }
}
.dialog-footer {
  background: #ffffff;
  text-align: center;
}
</style>
