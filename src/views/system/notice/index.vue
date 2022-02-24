<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="3">
        <el-menu @select="selIdx" :default-active="selItem">
          <el-menu-item
            v-for="(item, index) in menuList"
            :key="index"
            :index="item.id"
          >
            <div slot="title">
              <span>{{ item.title }}（</span>
              <span class="c_red">{{ item.noRead }}</span>
              <span>/{{ item.all }})</span>
            </div>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-form
          :model="queryParams"
          ref="queryForm"
          :inline="true"
          v-show="showSearch"
          class=""
        >
          <el-form-item label="标题" prop="noticeTitle">
            <el-input
              v-model="queryParams.noticeTitle"
              placeholder="请输入标题"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="daterangeCreateTime"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="操作人员" prop="createName">
            <el-input
              v-model="queryParams.createName"
              placeholder="请输入操作人员"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
              style="width: 140px"
            />
          </el-form-item>
          <el-form-item label="类型" prop="noticeType">
            <el-select
              v-model="queryParams.noticeType"
              placeholder="公告类型"
              clearable
              size="small"
              style="width: 140px"
            >
              <el-option
                v-for="dict in typeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item> -->
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
              @click="handleAdd"
              v-hasPermi="['system:notice:add']"
              >新增</el-button
            >
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              class="deleteBtn"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['system:notice:remove']"
              >删除</el-button
            >
          </el-col> -->
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              size="mini"
              class="exportBtn iconfont icon-daochushuju"
              @click="handleExport"
              v-hasPermi="['testManage:testManage:export']"
              >导出</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              :disabled="multiple"
              @click="batchView"
              v-hasPermi="['system:notice:batchView']"
              >批量查看</el-button
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
          :data="noticeList"
          @selection-change="handleSelectionChange"
          stripe
          border
        >
          <el-table-column type="selection" width="55" align="center" />
          <!-- <el-table-column
            label="序号"
            v-if="columns[0].visible"
            align="center"
            prop="noticeId"
            min-width="100"
            sortable
            show-overflow-tooltip
            :sort-orders="['ascending', 'descending']"
          /> -->
          <el-table-column
            label="标题"
            align="center"
            prop="noticeTitle"
            :show-overflow-tooltip="true"
            sortable
            show-overflow-tooltip
            :sort-orders="['ascending', 'descending']"
          />
          <!-- <el-table-column
            label="公告类型"
            v-if="columns[1].visible"
            align="center"
            prop="noticeType"
            :formatter="typeFormat"
            min-width="100"
            sortable
            show-overflow-tooltip
            :sort-orders="['ascending', 'descending']"
          /> -->
          <el-table-column
            label="发布者"
            v-if="columns[2].visible"
            align="center"
            prop="createName"
            min-width="120"
            sortable
            show-overflow-tooltip
            :sort-orders="['ascending', 'descending']"
          />
          <el-table-column
            label="发布状态"
            v-if="columns[3].visible"
            align="center"
            prop="releaseStatus"
            min-width="80"
            sortable
            :sort-orders="['ascending', 'descending']"
          />
          <el-table-column
            label="读取状态"
            align="center"
            prop="readStatus"
            min-width="80"
            sortable
            :sort-orders="['ascending', 'descending']"
          />
          <el-table-column
            label="创建时间"
            v-if="columns[4].visible"
            align="center"
            prop="createTime"
            min-width="160"
            sortable
            :sort-orders="['ascending', 'descending']"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="120"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.linkPath"
                size="mini"
                type="text"
                class="iconfont icon-tubiaolunkuo-"
                style="color: #39e399"
                @click="linkTo(scope.row.linkPath)"
                >去审批</el-button
              >
              <el-button
                size="mini"
                type="text"
                class="iconfont icon-chakan"
                style="color: #5487ff"
                @click="handleUpdate(scope.row, 'read')"
                v-hasPermi="['system:notice:query']"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="text"
                class="iconfont icon-029xiugai-3"
                style="color: #ffc72e"
                @click="handleUpdate(scope.row, 'edit')"
                v-hasPermi="['system:notice:edit']"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                style="color: #ff6d8a"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:notice:remove']"
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
      </el-col>
    </el-row>
    <!-- 添加或修改公告对话框 -->
    <el-drawer :title="title" :visible.sync="open" v-if="open" size="55%">
      <div class="paddingBox">
        <el-form
          :disabled="handleType == 'read'"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="auto"
        >
          <el-form-item label="标题" prop="noticeTitle">
            <el-input v-model="form.noticeTitle" placeholder="请输入标题" />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色" prop="roleIds">
                <el-select v-model="form.roleIds" placeholder="请选择" multiple>
                  <el-option
                    v-for="dict in roleList"
                    :key="dict.roleId"
                    :label="dict.roleName"
                    :value="dict.roleId + ''"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="人员">
                <el-select
                  v-model="form.userIds"
                  placeholder="从人员管理里面选择人员，自定义发送消息"
                  multiple
                  filterable
                  default-first-option
                >
                  <el-option
                    v-for="dict in userList"
                    :key="dict.userId"
                    :label="dict.nickName"
                    :value="dict.userId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                  <el-radio
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictValue"
                    >{{ dict.dictLabel }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="内容">
                <editor
                  :readOnly="handleType == 'read'"
                  v-model="form.noticeContent"
                  :height="380"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="handleType != 'read'" class="form_handle_area">
        <el-button type="primary" @click="publishNotice">发布</el-button>
        <el-button @click="submitForm">保 存</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  listNotice,
  getNotice,
  delNotice,
  addNotice,
  updateNotice,
  selectNoticeTree, // 获取通知公告树
  getRoleList, //获取下拉角色列表
  getUserList,
  publishNotice,
  exportNotice,
  batch_view,
} from "@/api/system/notice";
import Editor from "@/components/Editor";
import { mapActions } from "vuex";
export default {
  name: "Notice",
  components: {
    Editor,
  },
  data() {
    return {
      handleType: "",
      //角色列表
      roleList: [],
      //人员列表
      userList: [],
      // 左侧分类数据
      menuList: [],
      //当前选中的菜单项id
      selItem: "0",
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
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createUserId: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
      columns: [
        { key: 0, label: "序号", visible: true },
        { key: 1, label: "公告类型", visible: true },
        { key: 2, label: "创建者", visible: true },
        { key: 3, label: "状态", visible: true },
        { key: 4, label: "创建时间", visible: true },
      ],
      // 创建时间时间范围
      daterangeCreateTime: [],
    };
  },
  created() {
    this.getList();
    this.getTreeData();
    this.getDicts("sys_notice_status").then((response) => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_notice_type").then((response) => {
      this.typeOptions = response.data;
    });
    getRoleList().then((res) => {
      this.roleList = res.data;
    });
    getUserList().then((res) => {
      this.userList = res.rows;
    });
  },
  methods: {
    ...mapActions(["setMessageNum"]),
    async getTreeData() {
      this.loading = true;
      let res = await selectNoticeTree();
      this.menuList = res.data;
      this.loading = false;
    },
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      this.queryParams.noticeType = this.selItem;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && "" != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] =
          this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      listNotice(this.queryParams).then((response) => {
        this.noticeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 公告状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 公告状态字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.noticeType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        noticeId: undefined,
        noticeTitle: undefined,
        noticeType: undefined,
        noticeContent: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.ids = null;
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.noticeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.handleType = "add";
      this.reset();
      this.open = true;
      this.title = "添加公告";
    },
    /** 修改按钮操作 */
    handleUpdate(row, handleType) {
      this.handleType = handleType;
      this.reset();
      const noticeId = row.noticeId || this.ids;
      getNotice(noticeId).then((response) => {
        this.form = response.data;
        this.form.roleIds = this.form.roleIds
          ? this.form.roleIds.split(",")
          : "";
        this.form.userIds = this.form.userIds
          ? this.form.userIds.split(",")
          : "";
        this.open = true;
        this.title = "修改公告";
        if (handleType == "read") {
          this.getTreeData();
          this.setMessageNum();
        }
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        let form = JSON.parse(JSON.stringify(this.form));
        if (form.userIds !== "") {
          form.userIds = form.userIds.join(",");
        }
        if (form.roleIds !== "") {
          form.roleIds = form.roleIds.join(",");
        }
        if (valid) {
          if (this.form.noticeId != undefined) {
            updateNotice(form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNotice(form).then((response) => {
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
      const noticeIds = row.noticeId || this.ids;
      this.$confirm("是否确认删除数据项？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delNotice(noticeIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    selIdx(item) {
      this.selItem = item;
      this.getList();
    },
    /*发布公告*/
    publishNotice() {
      this.$refs["form"].validate((valid) => {
        let form = JSON.parse(JSON.stringify(this.form));
        if (form.userIds !== "") {
          form.userIds = form.userIds.join(",");
        }
        if (form.roleIds !== "") {
          form.roleIds = form.roleIds.join(",");
        }
        if (valid) {
          form.noticeId != undefined && form.noticeId;
          publishNotice(form).then((response) => {
            this.msgSuccess("发布成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    linkTo(url) {
      this.$router.push(url);
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      queryParams.ids = this.ids.join(","); //传入所选项id
      this.$confirm("是否确认导出数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportNotice(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
    /** 批量查看 */
    batchView(row) {
      const noticeIds = this.ids;
      batch_view(noticeIds).then((res) => {
        this.getList();
        this.getTreeData();
        this.setMessageNum();
        this.msgSuccess(res.msg);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// slb修改过  这里之前没有添加  scoped  影响到其他模块了
.el-drawer__body {
  padding: 0 20px;
}
.el-drawer__body .el-form-item--medium .el-form-item__content {
  width: 100%;
}
.el-drawer__body .el-select.el-select--medium {
  width: 100%;
}
</style>
