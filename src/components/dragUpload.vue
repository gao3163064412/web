<template>
  <!--    拖拽手动上传-->
  <div>
    <el-upload
      style="text-align: center"
      ref="upload"
      :limit="1"
      accept=".xlsx, .xls"
      :headers="upload.headers"
      :action="basicUrl + url"
      :disabled="upload.isUploading"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :on-progress="handleFileUploadProgress"
      :on-success="handleFileSuccess"
      :auto-upload="false" 
      :file-list="fileList"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        1.下载导入模板《<el-link
          type="info"
          style="font-size: 12px; color: #1890ff"
          @click="importTemplate"
          >{{ templateName }}</el-link
        >》
      </div>
      <div class="el-upload__tip" slot="tip">
        2.仅允许导入“xls”或“xlsx”格式文件！
      </div>
      <div
        v-show="errorTemplt"
        class="el-upload__tip"
        style="color: red"
        slot="tip"
      >
        {{ uploadMsg }}
      </div>
    </el-upload>
    <div class="form_handle_area">
      <el-button type="primary" @click="submitFileForm">确 定</el-button>
      <el-button @click="closeUpload">取 消</el-button>
    </div>
    <!--    错误提示弹框-->
    <el-drawer
      title="提示"
      :visible.sync="uploadWarn"
      size="55%"
      class="drawerStyle"
      append-to-body
    >
      <div class="uploadError" v-if="importErrorData.length > 0">
        <div class="uploadErrorTitle" style="margin: 10px 10px 10px 0px">
          {{ uploadMsg }}
        </div>
        <!--        标准库导入错误提示表格-->
        <el-table
          :data="importErrorData"
          :cell-style="cellStyleReson"
          border
          stripe
          v-if="page == 'dangerStandard'"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            label="EXCEL行"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="errorLine"
          />
          <el-table-column
            label="品名"
            align="center"
            width="80"
            :show-overflow-tooltip="true"
            sortable
            prop="staName"
          />
          <el-table-column
            label="CAS编号"
            align="center"
            :show-overflow-tooltip="true"
            sortable
            prop="casCode"
          />
          <el-table-column
            label="类别"
            align="center"
            width="80"
            :show-overflow-tooltip="true"
            sortable
            prop="categoryName"
          />
          <el-table-column
            label="规格数量"
            align="center"
            :show-overflow-tooltip="true"
            sortable
            prop="specificationsName"
          />
          <el-table-column
            label="规格单位"
            align="center"
            :show-overflow-tooltip="true"
            sortable
            prop="unit"
          />
          <el-table-column
            label="浓度"
            align="center"
            :show-overflow-tooltip="true"
            sortable
            prop="concentration"
          />
          <el-table-column
            label="纯度"
            align="center"
            :show-overflow-tooltip="true"
            sortable
            prop="purity"
          />
          <el-table-column
            label="失败原因"
            :show-overflow-tooltip="true"
            width="200"
            sortable
            prop="failReason"
          />
        </el-table>

        <!--        试题导入错误提示表格-->
        <el-table
          :data="importErrorData"
          :cell-style="cellStyleReson"
          border
          stripe
          v-if="page == 'questionManageInfo'"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            label="EXCEL行"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="errorLine"
          />
          <el-table-column
            label="试题标题"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="queTitle"
          />
          <el-table-column
            label="试题分类"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="isQueClassify"
          />
          <el-table-column
            label="试题难易"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
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
            label="试题状态"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="queStatus"
          />
          <el-table-column
            label="失败原因"
            :show-overflow-tooltip="true"
            sortable
            prop="failReason"
          />
        </el-table>
                <!--        试题导入错误提示表格-->
        <el-table
          :data="importErrorData"
          :cell-style="cellStyleReson"
          border
          stripe
          v-if="page == 'fixedAssetLedger'"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="50"
          ></el-table-column>
          <el-table-column
            label="EXCEL行"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="errorLine"
          />
          <el-table-column
            label="固定资产名称"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="name"
          />
          <el-table-column
            label="固定资产编号"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="code"
          />
          <el-table-column
            label="实验室编号"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="labCode"
          >
          </el-table-column>
          <el-table-column
            label="固定资产分类"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="classification"
          />
                 <el-table-column
            label="规格型号"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="specification"
          />
                 <el-table-column
            label="购置日期"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="acquisitionTime"
          />
                           <el-table-column
            label="二级单位"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="deptId"
          />
                           <el-table-column
            label="数量"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="number"
          />
            <el-table-column
            label="单价(元)"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="unitPrice"
          />
            <el-table-column
            label="总价(元)"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="totalPrice"
          />
            <el-table-column
            label="放置地点"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
            sortable
            prop="levelAndRoom"
          />
          <el-table-column
            label="失败原因"
            :show-overflow-tooltip="true"
            sortable
            prop="failReason"
          />
        </el-table>
      </div>
      <div class="form_handle_area">
        <el-button type="primary" @click="confirmWarn">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "dragUpload",
  props: {
    //上传文件的接口地址
    url: {
      type: String,
      required: true,
    },
    //下载模板名称
    templateName: {
      type: String,
      required: true,
    },
    //下载模板接口地址
    templateUrl: {
      type: String,
      required: true,
    },
    //  引用的页面  标准库（dangerStandard） 试题（questionManageInfo）
    page: {
      type: String,
    },
  },
  data() {
    return {
      basicUrl: process.env.VUE_APP_BASE_API,
      upload: {
        headers: { Authorization: "Bearer " + getToken() }, // 设置上传的请求头部
        isUploading: false, // 是否禁用上传
      },
      errorTemplt: false, //上传文件与模板不匹配时的提示(在上传页面展示)
      uploadWarn: false, //是否显示 “错误提示” 弹框
      importErrorData: [], //模板上传后，错误行信息（在“错误提示” 弹框展示）
      fileList: [], //文件列表
      uploadMsg: "",
    };
  },
  methods: {
    handleExceed() {
      this.$message.error("只能上传一个文件");
    },
    // 提交上传文件
    submitFileForm() {
      if (this.$refs.upload.uploadFiles.length <= 0) {
        this.$message.error("请选择文件");
      }
      this.$refs.upload.submit();
    },
    // 文件上传前的校验 —— 常见的校验有：校验文件类型，文件大小
    beforeUpload(file) {
      // 允许上传的文件格式列表
      let acceptList = ["xlsx", "xls"]
      // 根据文件名获取文件的后缀名
      let fileType = file.name.split('.').pop().toLowerCase()
      // 判断文件格式是否符合要求
      if (acceptList.indexOf(fileType) === -1) {
        this.$message.error('只能上传 xlsx/xls 格式的文件 !');
        return false
      }
      // 判断文件大小是否符合要求
      if (file.size / 1024 / 1024 > 5) {
        this.$message.error('上传文件大小不能超过 5M !');
        return false
      }
    },
    //关闭上传弹框
    closeUpload() {
      this.$emit("isOpenUpload", false); //关闭导入对话框
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      console.log("fileList---", fileList);
      this.upload.isUploading = false;
      this.fileList = fileList;
      //code=501,模板不对；code=500,导入的文件某些数据不对
      if (response.code == 200) {
        this.fileList = [];
        this.$emit("isOpenUpload", false); //关闭导入对话框
        this.$message.success("导入成功");
        //更新父页面表格数据
        this.$emit("updateTableList");
      } else if (response.code == 501) {
        this.errorTemplt = true;
        this.fileList = [];
        this.msgError(response.msg || "导入数据不能为空或模板不正确。");
        // this.uploadMsg = response.msg
        //   ? response.msg
        //   : "导入数据不能为空或模板不正确。";
      } else if (response.code == 500) {
        this.fileList = [];
        this.$emit("isOpenUpload", false); //关闭导入对话框
        this.uploadWarn = true;
        if (response.data) {
          this.importErrorData = response.data;
        }
        this.uploadMsg = response.msg;
      }
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    //下载模板
    importTemplate() {
      let fileName = this.templateName + ".xls";
      window.location.href =
        process.env.VUE_APP_BASE_API +
        this.templateUrl +
        "?fileName=" +
        encodeURI(fileName);
    },
    //错误原因
    cellStyleReson(row, column, rowIndex, columnIndex) {
      if (row.column.label === "失败原因") {
        return "color:red";
      }
    },
    confirmWarn() {
      this.uploadWarn = false;
    },
  },
};
</script>

<style scoped lang="scss">
.dialog-footer {
  background: #ffffff;
  text-align: center;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 10px 0;
}
::v-deep {
  .el-upload {
    width: 90%;
    max-width: 360px;
  }
  .el-upload-dragger {
    width: 100%;
  }
}
</style>
