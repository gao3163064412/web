<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" class="searchFormBox">
      <el-form-item label="登录地址" prop="ipaddr">
        <el-input
          v-model="queryParams.ipaddr"
          placeholder="请输入登录地址"
          clearable
          style="width: 240px;"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          style="width: 240px;"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="登录状态"
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
      <el-form-item label="登录时间">
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          class="deleteBtn"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['monitor:logininfor:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          class="deleteBtn iconfont icon-xiangpica"
          size="mini"
          @click="handleClean"
          v-hasPermi="['monitor:logininfor:remove']"
        >清空</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          size="mini"
          class="exportBtn iconfont icon-daochushuju"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['monitor:logininfor:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange"
      stripe
      border
      :default-sort="{prop: 'createTime', order: 'ascending'}"
    >
      <el-table-column type="selection" width="55" align="center" sortable :sort-orders="['ascending', 'descending']" />
      <el-table-column label="访问编号" min-width="100" align="center" prop="infoId" sortable show-overflow-tooltip :sort-orders="['ascending', 'descending']" />
      <el-table-column label="用户名称" v-if="columns[0].visible" min-width="100" align="center" prop="userName" sortable show-overflow-tooltip :sort-orders="['ascending', 'descending']" />
      <el-table-column label="登录地址" v-if="columns[1].visible" min-width="100" align="center" prop="ipaddr" :show-overflow-tooltip="true" sortable :sort-orders="['ascending', 'descending']" />
      <el-table-column label="登录地点" v-if="columns[2].visible" min-width="100" align="center" prop="loginLocation" :show-overflow-tooltip="true" sortable :sort-orders="['ascending', 'descending']" />
      <el-table-column label="浏览器" v-if="columns[3].visible" min-width="100" align="center" prop="browser" sortable show-overflow-tooltip :sort-orders="['ascending', 'descending']" />
      <el-table-column label="操作系统" v-if="columns[4].visible" min-width="100" align="center" prop="os" sortable show-overflow-tooltip :sort-orders="['ascending', 'descending']" />
      <el-table-column label="操作信息" v-if="columns[5].visible" min-width="100" align="center" prop="msg" sortable show-overflow-tooltip :sort-orders="['ascending', 'descending']" />
      <el-table-column label="登录状态" v-if="columns[6].visible" min-width="100" align="center" prop="status" :formatter="statusFormat" sortable show-overflow-tooltip :sort-orders="['ascending', 'descending']" />
      <el-table-column label="登录日期" v-if="columns[7].visible" min-width="160" align="center" prop="loginTime" sortable show-overflow-tooltip :sort-orders="['ascending', 'descending']">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { list, delLogininfor, cleanLogininfor, exportLogininfor } from "@/api/monitor/logininfor";

export default {
  name: "Logininfor",
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
      // 状态数据字典
      statusOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        ipaddr: undefined,
        userName: undefined,
        status: undefined
      },
      columns:[
        { key: 0 , label: "用户名称", visible: true },
        { key: 1 , label: "登录地址", visible: true },
        { key: 2 , label: "登录地点", visible: true },
        { key: 3 , label: "浏览器", visible: true },
        { key: 4 , label: "操作系统", visible: true },
        { key: 5 , label: "操作信息", visible: true },
        { key: 6 , label: "登录状态", visible: true },
        { key: 7 , label: "登录日期", visible: true },
      ]
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_common_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询登录日志列表 */
    getList() {
      this.loading = true;
      list(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.list = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 登录状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
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
      this.ids = selection.map(item => item.infoId)
      this.multiple = !selection.length
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const infoIds = row.infoId || this.ids;
      this.$confirm('是否确认删除访问编号为"' + infoIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLogininfor(infoIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 清空按钮操作 */
    handleClean() {
        this.$confirm('是否确认清空所有登录日志数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return cleanLogininfor();
        }).then(() => {
          this.getList();
          this.msgSuccess("清空成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有操作日志数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportLogininfor(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        })
    }
  }
};
</script>
<style>
.el-button.iconfont span {
  margin-left: 5px!important;
}
</style>

