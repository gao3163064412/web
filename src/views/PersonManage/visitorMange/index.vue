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
          v-hasPermi="['visitor:manage:export']"
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
          v-hasPermi="['visitor:manage:print']"
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
      :data="manageList"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="姓名"
        min-width="110"
        v-if="columns[0].visible"
        :show-overflow-tooltip="true"
        sortable
        align="center"
        prop="name"
      />
      <el-table-column
        label="手机号"
        min-width="110"
        v-if="columns[1].visible"
        :show-overflow-tooltip="true"
        sortable
        align="center"
        prop="phone"
      />
      <el-table-column
        label="人员类型"
        min-width="110"
        v-if="columns[2].visible"
        :show-overflow-tooltip="true"
        sortable
        align="center"
        prop="personType"
      >
      </el-table-column>
      <!-- 0学生；1非学生 -->
      <el-table-column
        label="单位"
        min-width="110"
        v-if="columns[3].visible"
        :show-overflow-tooltip="true"
        sortable
        align="center"
        prop="company"
      />
      <el-table-column
        label="地址"
        min-width="110"
        v-if="columns[5].visible"
        :show-overflow-tooltip="true"
        sortable
        align="center"
        prop="postalAddres"
      />
      <el-table-column
        label="状态"
        min-width="100"
        v-if="columns[6].visible"
        :show-overflow-tooltip="true"
        sortable
        align="center"
        prop="isStatus"
      >
        <!-- 0启用1禁用 -->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isStatus"
            active-value="0"
            inactive-value="1"
            @change="changeSwitch(scope.row)"
          ></el-switch>
          <!-- active-text="启动"
          inactive-text="禁用" -->
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="220"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            class="iconfont icon-chakan"
            style="color: #5487ff"
            @click="handleView(scope.row)"
            v-hasPermi="['visitor:manage:view']"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            class="iconfont icon-fenpeijiaose"
            style="color: #fe8463"
            @click="asssignRoles(scope.row)"
            v-hasPermi="['system:role:query']"
            >分配角色</el-button
          >
          <el-button
            size="mini"
            type="text"
            class="iconfont icon-cangpeitubiao-zhongzhimima"
            style="color: #cad93f"
            @click="handleResetPWS(scope.row)"
            v-hasPermi="['visitor:manage:resetPws']"
            >重置密码</el-button
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
    <!-- 重置密码 -->
    <el-drawer
      title="重置密码"
      :visible.sync="resetPwsPage"
      size="35%"
      append-to-body
      class="resetPWSDrawer"
    >
      <div class="paddingBox">
        <el-form
          :model="formDataPws"
          :rules="rulesPws"
          size="medium"
          ref="pwsFrom"
          label-width="100px"
          class="form_item_wid90"
        >
          <el-row :gutter="12">
            <el-form-item label="新密码" prop="password">
              <el-input
                v-model="formDataPws.password"
                :maxlength="30"
                placeholder="请输入新密码"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="12">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                v-model="formDataPws.confirmPassword"
                :maxlength="30"
                placeholder="请再次输入密码"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>

      <div class="form_handle_area">
        <el-button type="primary" @click="submitPwsForm">确 定</el-button>
        <el-button @click="resetPwsPage = false">取 消</el-button>
      </div>
    </el-drawer>
    <!-- 分配角色 -->
    <el-drawer
      title="分配角色"
      :visible.sync="assignRolesPage"
      size="35%"
      append-to-body
      class="rolesDrawer"
    >
      <div class="paddingBox">
        <el-form ref="formForRow" label-width="100px">
          <el-checkbox-group
            class="ckeckBoxRows"
            v-model="checkedRowId"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(value, index) in rolesData"
              :label="value.roleId"
              :value="value.roleName"
              :key="index + 's'"
              >{{ value.roleName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form>
      </div>
      <!-- <div class="descWrapper">
        <div class="descContent">
          <el-row :gutter="12">
            <el-tree
              :data="rolesData"
              show-checkbox
              node-key="id"
              ref="menu"
              current-node-key="curentRoles"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="selectedRoles"
              :props="defaultProps"
            >
            </el-tree>
          </el-row>
        </div>
      </div> -->
      <div class="form_handle_area">
        <el-button type="primary" @click="submitRolesForm">确 定</el-button>
        <el-button @click="cancelRolePage">取 消</el-button>
      </div>
    </el-drawer>
    <!-- 查看 -->
    <el-drawer
      :title="title"
      :visible.sync="open"
      size="55%"
      append-to-body
      class="drawer lookPage"
    >
      <div class="paddingBox">
        <div class="descContent">
          <el-row :gutter="12">
            <el-form
              ref="elForm"
              :model="formData"
              size="medium"
              label-width="150px"
            >
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
                    v-model="formDataSex"
                    :maxlength="30"
                    disabled
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人员类型" prop="personType">
                  <el-input
                    v-model="viewPersonType"
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

              <el-col :span="12">
                <el-form-item label="课题组负责人
                (导师)" prop="teacher">
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
                  >
                    <div slot="error">暂无图片</div>
                  </el-image>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>

      <!-- <div class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-drawer>
  </div>
</template>

<script>
import {
  getManageById,
  resetPsd,
  updateRoles,
  getHasRolesById,
  getRolesById,
  getlistManage,
  applyAudit,
  addManage,
  exportManageExp,
  updateStatus,
} from "@/api/personManage/personManage";

export default {
  name: "Manage",
  components: {},
  data() {
    var confirm = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.formDataPws.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 角色选项
      roleOptions: [],
      checkedRowId: [],
      resetPwsPage: false,
      formDataPws: {
        password: null,
        confirmPassword: null,
      },
      curentRoles: "",
      rowId: null,
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectedRoles: [],
      rolesData: [],
      assignRolesPage: false,
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
      resetPwsId: null,
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
      rulesPws: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}$/,
            message: "密码必须包含字母、数字、特殊字符，长度8到16位",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { validator: confirm, required: true, trigger: "blur" },
        ],
      },
      columns: [
        { key: 0, label: `姓名`, visible: true },
        { key: 1, label: `手机号`, visible: true },
        { key: 2, label: `人员类型`, visible: true },
        { key: 3, label: `单位`, visible: true },
        { key: 4, label: `申请期限`, visible: true },
        { key: 5, label: `地址`, visible: true },
        { key: 6, label: `申请日期`, visible: true },
      ],
      printObj: {
        id: "tableTmpletes",
        popTitle: "访客管理",
        extraHead:
          '<meta http-equiv="Content-Language"content="zh-cn"/>,<style>  #tableTmplete { width: 100%;  } <style>',
      },
    };
  },
  created() {
    this.getList();
  },
  computed: {
    viewPersonType() {
      return this.formData.personType == "1" ? "学生" : "非学生";
    },
    formDataSex() {
      return this.formData.sex == "0" ? "男" : "女";
    },
  },
  methods: {
    /** 查询访客管理列表 */
    getList() {
      this.loading = true;
      getlistManage(this.queryParams).then((response) => {
        let data = response.rows;
        data.forEach((item) => {
          if (item.isStatus == null) {
            item.isStatus = "1";
          }
        });
        this.manageList = data;
        console.log(this.manageList);
        this.total = response.total;
        this.loading = false;
      });
    },
    handleCheckedCitiesChange(val) {
      this.checkedRowId = val;
    },
    changeSwitch(data) {
      console.log(data);
      let obj = {};
      obj.userId = data.id;
      obj.status = data.isStatus;

      updateStatus(obj).then((res) => {
        console.log(res);
        this.getList();
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
    handleResetPWS(row) {
      this.resetPwsId = row.id;
      this.resetPwsPage = true;
    },
    submitPwsForm() {
      let obj = {};
      obj.id = this.resetPwsId;
      obj.password = this.formDataPws.confirmPassword;
      this.$refs["pwsFrom"].validate((valid) => {
        if (valid) {
          resetPsd(obj).then((res) => {
            this.resetPwsPage = false;
            console.log(res);
          });
        } else {
          return false;
        }
      });
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
    asssignRoles(row) {
      this.rowId = row.id;
      this.rolesData = [];
      getRolesById(row.id).then((res) => {
        this.assignRolesPage = true;
        this.rolesData = res.data;
        // data.forEach((item) => {
        //   let obj = {};
        //   obj.id = item.roleId;
        //   obj.label = item.roleName;
        //   obj.children = [];
        //   this.rolesData.push(obj);
        // });
      });
      getHasRolesById(row.id).then((res) => {
        this.checkedRowId = [];
        this.checkedRowId = res.data;
        // setTimeout(() => {
        //   this.$refs.menu.setCheckedKeys(this.selectedRoles);
        // }, 100);
      });
    },

    cancelRolePage() {
      this.assignRolesPage = false;
    },
    submitRolesForm() {
      let params = {};
      params.id = this.rowId;
      params.roleIds = this.checkedRowId;
      updateRoles(params).then((res) => {
        this.assignRolesPage = false;
        this.getList();
      });
    },
    handleView(row) {
      getManageById(row.id).then((res) => {
        this.formData = res.data[0];
        this.title = "查看";
        this.open = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row, val) {
      this.btnId = val;
      this.reset();
      const id = row.id || this.ids;
      getlistManage(id).then((response) => {
        this.formData = response.data;
        // this.formData.isStatus="驳回"
        this.open = true;
        this.title = this.btnId == 1 ? "审核" : "查看";
      });
    },
    /** 提交按钮 */
    submitForm() {
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
          return exportManageExp(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.ckeckBoxRows {
  display: flex;
  flex-wrap: wrap;
  /*padding: 20px;*/
  /*padding-bottom: 50px;*/
  ::v-deep {
    .el-checkbox {
      height: 50px;
      line-height: 50px;
      min-width: 150px;
      /*width: 28%;*/
    }
  }
}

.resetPWSDrawer {
  .descWrapper {
    padding-top: 20px;
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
    // ::v-deep {      slb  测试提了bug，统一要求有灰色框
    // .el-input--medium .el-input__inner {
    //   height: 2rem;
    // }
    // .el-input__inner {
    //   border: none;
    // }
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
