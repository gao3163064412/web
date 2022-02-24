<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      class="searchFormBox"
    >
      <el-form-item label="系统模块" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入系统模块"
          clearable
          style="width: 240px"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作人员" prop="operName">
        <el-input
          v-model="queryParams.operName"
          placeholder="请输入操作人员"
          clearable
          style="width: 240px"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="businessType">
        <el-select
          v-model="queryParams.businessType"
          placeholder="操作类型"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="操作状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['monitor:operlog:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          class="deleteBtn iconfont icon-xiangpica"
          size="mini"
          @click="handleClean"
          v-hasPermi="['monitor:operlog:remove']"
          >清空</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          class="exportBtn iconfont icon-daochushuju"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['monitor:operlog:export']"
          >导出</el-button
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
      :data="list"
      @selection-change="handleSelectionChange"
      stripe
      border
      :default-sort="{ prop: 'createTime', order: 'ascending' }"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="日志编号"
        min-width="100"
        align="center"
        prop="operId"
        sortable
        show-overflow-tooltip
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="系统模块"
        v-if="columns[0].visible"
        min-width="100"
        align="center"
        prop="title"
        sortable
        show-overflow-tooltip
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="操作类型"
        v-if="columns[1].visible"
        min-width="100"
        align="center"
        prop="businessType"
        :formatter="typeFormat"
        sortable
        show-overflow-tooltip
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="请求方式"
        v-if="columns[2].visible"
        min-width="100"
        align="center"
        prop="requestMethod"
        sortable
        show-overflow-tooltip
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="操作人员"
        v-if="columns[3].visible"
        min-width="100"
        align="center"
        prop="operName"
        sortable
        show-overflow-tooltip
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="主机"
        v-if="columns[4].visible"
        align="center"
        prop="operIp"
        min-width="130"
        :show-overflow-tooltip="true"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="操作地点"
        v-if="columns[5].visible"
        min-width="100"
        align="center"
        prop="operLocation"
        :show-overflow-tooltip="true"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="操作状态"
        v-if="columns[6].visible"
        min-width="100"
        align="center"
        prop="status"
        :formatter="statusFormat"
      />
      <el-table-column
        label="操作日期"
        v-if="columns[7].visible"
        align="center"
        prop="operTime"
        min-width="160"
        sortable
        :sort-orders="['ascending', 'descending']"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.operTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        min-width="80"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            class="iconfont icon-chakan"
            style="color: #5487ff"
            @click="handleView(scope.row, scope.index)"
            v-hasPermi="['monitor:operlog:query']"
            >详细</el-button
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

    <!-- 操作日志详细 -->
    <el-drawer title="操作日志详细" :visible.sync="open" size="55%" class="lookPage">
      <div class="paddingBox">
        <el-form ref="form" :model="form" label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作模块：">
                <el-input :disabled="true" v-model="operModule" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="登录信息：">
                <el-input :disabled="true" v-model="loginInfo" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作状态：">
                <el-input :disabled="true" v-model="formStatus" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作时间：">
                <el-input :disabled="true" v-model="operTime" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="请求地址：">
                <el-input :disabled="true" v-model="form.operUrl" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="请求方式：">
                <el-input :disabled="true" v-model="form.requestMethod" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="操作方法：">
                <el-input
                  :disabled="true"
                  type="textarea"
                  v-model="form.method"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="请求参数：">
                <!-- <el-input
                  :disabled="true"
                  type="textarea"
                  v-model="form.operParam"
                /> -->
                 <div class="test-json-viewer">
    <json-viewer
      :value="form.operParam"
      :expand-depth="5"
      copyable
      boxed
      sort
    ></json-viewer>
  </div>


              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="返回参数：">
                <!-- <el-input
                  :disabled="true"
                  type="textarea"
                  v-model="form.jsonResult"
                /> -->
                  <div class="test-json-viewer">
    <json-viewer
      :value="form.jsonResult"
      :expand-depth="5"
      copyable
      boxed
      sort
    ></json-viewer>
  </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="异常信息：" v-if="form.status === 1">
                <el-input :disabled="true" v-model="form.errorMsg" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div style="text-align: center;">
        <el-button @click="open = false">关 闭</el-button>
      </div> -->
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  list,
  delOperlog,
  cleanOperlog,
  exportOperlog,
} from "@/api/monitor/operlog";

export default {
  name: "Operlog",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      typeOptions: [],
      // 类型数据字典
      statusOptions: [],
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      title: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        operName: undefined,
        businessType: undefined,
        status: undefined,
      },
      columns:[
        { key: 0 , label: "系统模块", visible: true },
        { key: 1 , label: "操作类型", visible: true },
        { key: 2 , label: "请求方式", visible: true },
        { key: 3 , label: "操作人员", visible: true },
        { key: 4 , label: "主机", visible: true },
        { key: 5 , label: "操作地点", visible: true },
        { key: 6 , label: "操作状态", visible: true },
        { key: 7 , label: "操作日期", visible: true },
      ]
    };
  },
  computed: {
    operModule() {
      return ` ${this.form.title}/${this.typeFormat(this.form)}`;
    },
    loginInfo() {
      return `${this.form.operName}/${this.form.operIp}/${this.form.operLocation}`;
    },
    operTime() {
      return this.parseTime(this.form.operTime);
    },
    formStatus() {
      if (this.form.status === 0) {
        return "正常";
      } else if (this.form.status === 1) {
        return "失败";
      }
    },
  },
  created() {
    this.getList();
    this.getDicts("sys_oper_type").then((response) => {
      this.typeOptions = response.data;
    });
    this.getDicts("sys_common_status").then((response) => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询登录日志 */
    getList() {
      this.loading = true;
      list(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.list = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 操作日志状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 操作日志类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.businessType);
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.operId);
      this.multiple = !selection.length;
    },
    /** 详细按钮操作 */
    handleView(row) {
      this.open = true;
      this.form = row;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const operIds = row.operId || this.ids;
      this.$confirm(
        '是否确认删除日志编号为"' + operIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delOperlog(operIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$confirm("是否确认清空所有操作日志数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return cleanOperlog();
        })
        .then(() => {
          this.getList();
          this.msgSuccess("清空成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有操作日志数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportOperlog(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-drawer__body {
  padding: 0 20px;
}
.el-drawer__body .el-form-item--medium .el-form-item__content {
  width: 100%;
}
.el-drawer__body .el-textarea__inner {
  color: #606266 !important;
  font-weight: 400;
}
</style>
