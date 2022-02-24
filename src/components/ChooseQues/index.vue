<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--题型树-->
      <el-col :span="4" class="pt10" :xs="24">
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node }" class="custom-tree-node">
              <!-- <el-tooltip
                class="item"
                effect="dark"
                :content="node.label"
                placement="top-start"
              >
              </el-tooltip> -->
              <span> {{ node.label | ellipsis(10) }} </span>
              <div></div>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <el-form
          :model="queryParams"
          ref="queryForm"
          inline
          v-show="showSearch"
          label-width="auto"
          class="form_content_right"
        >
          <el-form-item label="试题标题" prop="queTitle">
            <el-input
              v-model="queryParams.queTitle"
              placeholder="请输入试题标题"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="试题难易" prop="isQueLevel">
            <el-select
              v-model="queryParams.isQueLevel"
              placeholder="请选择"
              value-key="_type"
            >
              <el-option
                v-for="dict in queLevelOptions"
                :key="dict._type"
                :label="dict.label"
                :value="dict._type"
              ></el-option>
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
        <el-table
          ref="multip"
          v-loading="loading"
          :data="questionManageInfoList"
          border
          stripe
          max-height="600"
          class="slb"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="编号"
            width="120"
            align="center"
            prop="queCode"
          />
          <el-table-column label="试题标题" align="center" prop="queTitle" />
          <el-table-column
            label="试题分类"
            align="center"
            prop="isQueClassify"
            width="120"
            :formatter="isQueClassifyFormat"
          >
            <template slot-scope="scope">
              <div>
                <div
                  v-if="
                    scope.row.isQueClassify == 1 && scope.row.isQueType == 1
                  "
                >
                  单选题
                </div>
                <div
                  v-else-if="
                    scope.row.isQueClassify == 1 && scope.row.isQueType == 2
                  "
                >
                  多选题
                </div>
                <div v-else>{{ scope.row.isClassFlyName }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="试题难易"
            width="120"
            align="center"
            prop="isQueLevel"
          >
            <template slot-scope="scope">
              {{
                scope.row.isQueLevel == 1
                  ? "简单"
                  : scope.row.isQueLevel == 2
                  ? "中等"
                  : scope.row.isQueLevel == 3
                  ? "困难"
                  : ""
              }}
            </template>
          </el-table-column>

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
                width="200"
                class="iconfont icon-chakan"
                style="color: #5487ff"
                @click="handleUpdate(scope.row, 'read')"
                v-hasPermi="['questionManage:questionManageInfo:edit']"
                >查看</el-button
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
    <div class="form_handle_area">
      <el-button type="primary" @click="handleBtn(1)">确 定</el-button>
      <el-button @click="handleBtn(0)">取 消</el-button>
    </div>
    <!-- 添加或修改题库管理对话框 -->
    <el-drawer :title="title" :visible.sync="open" size="35%" append-to-body>
      <div class="paddingBox">
        <el-form
          :disabled="form.disable"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="auto"
        >
          <el-form-item label="试题分类" prop="isQueClassify">
            <el-select
              :disabled="form.edit"
              class="wid100"
              @change="chgQueClassify"
              v-model="form.isQueClassify"
              placeholder="请选择"
            >
              <el-option
                v-for="dict in isQueClassifyOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="试题标题" prop="queTitle">
            <el-input
              :type="form.isQueClassify > 2 ? 'textarea' : 'text'"
              :autosize="{ minRows: 3 }"
              v-model="form.queTitle"
              placeholder="请输入试题标题"
              show-word-limit
              :maxlength="100"
              @blur="setInsertIdx"
            />
          </el-form-item>
          <el-form-item label="试题难易" prop="isQueLevel">
            <el-radio-group v-model="form.isQueLevel">
              <el-radio label="1">简单</el-radio>
              <el-radio label="2">中等</el-radio>
              <el-radio label="3">困难</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="试题状态" prop="queStatus">
            <el-switch
              v-model="form.queStatus"
              active-value="1"
              active-text="开"
              inactive-value="0"
              inactive-text="关"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
            v-if="form.isQueClassify == 1"
            label="试题题型"
            prop="isQueType"
          >
            <el-radio-group @change="chgQueType" v-model="form.isQueType">
              <el-radio label="1">单选</el-radio>
              <el-radio label="2">多选</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="form.isQueClassify == 1">
            <el-form-item label="试题选项" prop="selItems">
              <el-button type="primary" @click="addItem">添 加</el-button>
            </el-form-item>
            <div class="pb20">
              <el-table
                v-loading="loading"
                :data="dnQuestionInfoList"
                border
                stripe
              >
                <el-table-column
                  show-overflow-tooltip
                  label="选项"
                  width="55px"
                  align="center"
                  prop="queSign"
                />
                <el-table-column
                  show-overflow-tooltip
                  label="选项内容"
                  align="center"
                  prop="queContent"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.queContent"
                      placeholder="请输入选项内容"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="60px"
                  align="center"
                  class-name="small-padding fixed-width"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      style="color: #ff6d8a"
                      @click="delItem(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <el-form-item
            v-if="
              (form.isQueClassify == 1 && dnQuestionInfoList.length > 0) ||
              form.isQueClassify == 2
            "
            label="正确答案"
            prop="queAnswer"
          >
            <!-- 多选答案 -->
            <el-select
              v-if="form.isQueClassify == 1 && form.isQueType == 2"
              :visible.sync="form.queAnswer"
              :multiple="true"
              v-model="form.queAnswer"
              placeholder="请选择正确答案"
              class="wid100"
            >
              <el-option
                v-for="dict in dnQuestionInfoList"
                :key="dict.queSign"
                :label="dict.queSign"
                :value="dict.queSign"
              ></el-option>
            </el-select>
            <!-- 单选答案 -->
            <el-select
              v-else-if="form.isQueClassify == 1 && form.isQueType == 1"
              v-model="form.queAnswer"
              :visible.sync="form.queAnswer"
              placeholder="请选择正确答案"
              class="wid100"
            >
              <el-option
                v-for="dict in dnQuestionInfoList"
                :key="dict.queSign"
                :label="dict.queSign"
                :value="dict.queSign"
              ></el-option>
            </el-select>
            <!-- 判断答案 -->
            <el-select
              v-else-if="form.isQueClassify == 2"
              :visible.sync="form.queAnswer"
              v-model="form.queAnswer"
              placeholder="请选择正确答案"
              class="wid100"
            >
              <!-- <el-select
            v-else-if="form.isQueClassify == 2"
            value="对"
            placeholder="请选择正确答案"
          > -->
              <el-option
                v-for="dict in ['对', '错']"
                :key="dict"
                :label="dict"
                :value="dict"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.isQueClassify == 3" label="  ">
            <el-button type="primary" @click="dealTitle"
              >插入填空区域</el-button
            >
          </el-form-item>
          <el-form-item v-if="form.isQueClassify == 3" label="  ">
            <!-- <div
            style="
              border: 1px solid #1890ff;
              min-height: 80px;
              line-height: 20px;
              border-radius: 4px;
              padding: 5px 15px;
            "
          >
            {{ queTitle2 }}
          </div> -->
            <el-input
              type="textarea"
              readonly
              :disabled="form.disable"
              :autosize="{ minRows: 3 }"
              :value="queTitle2"
              placeholder="请输入试题标题"
            />
          </el-form-item>
        </el-form>
      </div>
      <div v-if="!form.disable" class="form_handle_area">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  allListQuestionManageInfo,
  listQuestionManageInfo,
  getQuestionManageInfo,
  delQuestionManageInfo,
  addQuestionManageInfo,
  updateQuestionManageInfo,
  exportQuestionManageInfo,
  updateStatus,
} from "@/api/questionManage/questionManageInfo";
import FileUpload from "@/components/FileUpload";
export default {
  name: "QuestionManageInfo",
  components: { FileUpload },
  props: {
    // 传入项
    Items: { type: Array, default: () => [] },
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      //所有选中项
      allSelItems: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 题库管理表格数据
      questionManageInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //是否弹出导入窗口
      openView: false,
      // 试题分类1选择题；2判断题；3填空题；4简答题字典
      isQueClassifyOptions: [],
      queLevelOptions: [
        {
          label: "简单",
          _type: 1,
        },
        {
          label: "中等",
          _type: 2,
        },
        {
          label: "困难",
          _type: 3,
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 试题分类 树状图数据
      deptOptions: [
        {
          label: "全部试题",
          children: [
            {
              label: "选择题",
              _type: 1,
            },
            {
              label: "判断题",
              _type: 2,
            },
            {
              label: "填空题",
              _type: 3,
            },
            {
              label: "简答题",
              _type: 4,
            },
          ],
        },
      ],
      // 选择题选项list   queContent 选项内容  queSign 选项标记  例如：A  B  C
      dnQuestionInfoList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        isQueClassify: null,
        queTitle: null,
        queStatus: 1, //默认只拉取状态为开启的试题
      },
      // 表单参数
      form: {},
      insertIdx: 0,
      // 表单校验
      rules: {
        isQueClassify: [
          {
            required: true,
            message: "请选择试题分类",
            trigger: "blur",
          },
        ],
        queAnswer: [
          {
            required: true,
            message: "请输入正确答案",
            trigger: "change",
          },
        ],
        queTitle: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        isQueLevel: [
          {
            required: true,
            message: "请选择难易程度",
            trigger: "change",
          },
        ],
        isQueType: [
          {
            required: true,
            message: "请选择试题类型",
            trigger: "change",
          },
        ],
        queStatus: [
          {
            required: true,
            message: "请选择试题状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  watch: {},
  created() {
    this.getList();
    this.getDicts("is_que_classify").then((response) => {
      this.isQueClassifyOptions = response.data;
    });
    this.allSelItems = this.Items;
  },
  methods: {
    /** 查询题库管理列表 */
    getList() {
      this.loading = true;
      // allListQuestionManageInfo(this.queryParams).then((response) => {  不分页
      listQuestionManageInfo(this.queryParams).then((response) => {
        this.questionManageInfoList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.$nextTick((a) => {
          response.rows.forEach((item) => {
            if (this.Items.find((i) => i.queId == item.queId)) {
              this.$refs.multip.toggleRowSelection(item, true);
            } else {
              this.$refs.multip.toggleRowSelection(item, false);
            }
          });
        });
      });
    },
    // 试题分类1选择题；2判断题；3填空题；4简答题字典翻译
    isQueClassifyFormat(row, column) {
      return this.selectDictLabel(this.isQueClassifyOptions, row.isQueClassify);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        queId: null,
        isQueClassify: null,
        isQueLevel: "1", //默认简单
        isQueType: "1", //默认单选
        queAnswer: null,
        delFlag: null,
        createUserId: null,
        createName: null,
        createTime: null,
        updateUserId: null,
        updateName: null,
        updateTime: null,
        version: null,
        queCode: null,
        remarks: null,
        queTitle: null,
        queStatus: "1", //默认启用状态
      };
      this.dnQuestionInfoList = [];
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
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
      this.ids = selection.map((item) => item.queId);
      this.allSelItems = selection;
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row, type) {
      this.reset();
      const queId = row.queId || this.ids;
      getQuestionManageInfo(queId).then((response) => {
        if (type == "read") {
          response.dnQuestionManage.disable = true;
        } else if (type == "edit") {
          response.dnQuestionManage.edit = true;
        }
        // 处理多选时 ， 为后台传入字符串
        if (response.dnQuestionManage.isQueType == 2) {
          response.dnQuestionManage.queAnswer =
            response.dnQuestionManage.queAnswer.split("");
        }
        this.dnQuestionInfoList = response.dnQuestionManage.dnQuestionInfoList;
        this.form = response.dnQuestionManage;
        this.open = true;
        this.title = "查看详情";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (
            this.dnQuestionInfoList.findIndex((item) => item.queContent == "") >
            -1
          ) {
            this.$message.error("选项内容不能为空");
            return;
          }
          // 处理多选时 ， 为后台传入字符串
          if (this.form.isQueType == 2) {
            this.form.queAnswer = this.form.queAnswer.join("");
          }
          this.form.dnQuestionInfoList = this.dnQuestionInfoList;
          if (this.form.queId != null) {
            updateQuestionManageInfo(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addQuestionManageInfo(this.form).then((response) => {
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
      const queIds = row.queId || this.ids;
      this.$confirm(
        '是否确认删除题库管理编号为"' + queIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delQuestionManageInfo(queIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有题库管理数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportQuestionManageInfo(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
    chgval(key, val) {
      this[key] = val;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.my_downLoad(`/common/template/download?fileName=试题模板.xls`);
    },
    /** 修改switch按钮操作 */
    handleUpdateStatus(row) {
      updateStatus(row).then((response) => {
        // this.getList();
      });
    },
    // 添加选项功能
    addItem() {
      let list = this.dnQuestionInfoList;
      if (list.length + 1 > 6) {
        this.$message.warning("选项最多为6项");
        return;
      }
      list.push({
        queContent: "",
      });
      this.dealSing(list);
    },
    //删除选项卡
    delItem(row) {
      let list = this.dnQuestionInfoList;
      let nlist = list.filter((item) => item.queSign != row.queSign);
      this.dealSing(nlist);
    },
    dealSing(list) {
      let str = "A";
      list.forEach((item, idx) => {
        item.queSign = String.fromCharCode(str.charCodeAt() + idx);
      });
      this.dnQuestionInfoList = list;
    },
    //设置要插入的位置
    setInsertIdx(e) {
      this.insertIdx = e.target.selectionStart;
    },
    // 在对应插入位置插入  ()
    dealTitle() {
      let queTitleArr = this.form.queTitle.split("");
      queTitleArr.splice(this.insertIdx, 0, "（）");
      this.form.queTitle = queTitleArr.join("");
    },
    // 上传成功
    upOver(e) {
      this.openView = false;
      this.getList();
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.isQueClassify = data._type;
      this.getList();
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 修改 单选  多选
    chgQueType(val) {
      if (val == 1) {
        this.form.queAnswer = "";
      } else {
        this.form.queAnswer = [];
      }
    },
    //修改 题型
    chgQueClassify(val) {
      if (val == 1 && this.form.isQueType == 2) {
        this.form.queAnswer = [];
      } else {
        this.form.queAnswer = "";
      }
    },
    /** 点击 确定或取消按钮 */
    handleBtn(confirm) {
      const allSelItems = this.allSelItems;
      if (confirm && allSelItems.length > 0) {
        this.$emit("confirm", allSelItems);
      } else {
        this.$emit("cancel");
      }
    },
  },
};
</script>
<style  lang="scss" scoped>
::v-deep {
  .slb {
    .el-form-item__content,
    .el-form-item--medium .el-form-item__content {
      width: auto !important;
    }
  }
  .el-form--inline .el-form-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
  }
}
.form_content_right {
  display: flex;
  padding-bottom: 20px;
  .el-form-item {
    padding-right: 14px;
  }
}
</style>