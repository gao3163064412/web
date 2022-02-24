<template>
  <div class="upload-file">
    <!-- v-show="fileList.length == 0" -->
    <el-upload
      v-show="isDel"
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :accept="accept"
      :drag="drag"
      :multiple="multiple"
      :on-progress="handleOnProgress"
      :show-file-list="false"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :headers="headers"
      :ref="myref"
      :class="{ column: drag }"
      class="pt4 flx al_c"
    >
        <div v-if="drag"  >
        <!-- 拖拽类型 -->
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <div class="flx mr16" v-else>
        <!-- 上传按钮 -->
        <el-button size="mini" v-show="!isView" type="primary">选取文件</el-button>
      </div>
      <!-- 上传提示 -->
      <div  v-show="!isView"
        class="el-upload__tip"
        :class="{ mt0: !drag }"
        slot="tip"
        v-if="showTip"
      >
        请上传
        <template v-if="fileSize">
          大小不超过 <span class="c_red">{{ fileSize }}MB</span>
        </template>
        <template v-if="fileType">
          格式为 <span class="c_red">{{ fileType.join("/") }}</span>
        </template>
        的文件
      </div>
    </el-upload>
    <!-- 文件列表 -->
    <transition-group
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        :key="file.uid"
        class="el-upload-list__item ele-upload-list__item-content"
        :class="isDel ? 'bg_fff' : ''"
        v-for="(file, index) in fileList"
      >

        <el-link @click="showPdf(file)">
          <el-tooltip
            :disabled="file.name.length < 21"
            :content="file.name"
            placement="top-start"
          >
            <span class="el-icon-document">
              {{ file.name | ellipsis(20) }}
            </span>
          </el-tooltip>
        </el-link>
        <div v-if="isDel" class="ele-upload-list__item-content-action">
          <el-link
            v-show="!isView"
            style="min-width: 28px"
            :underline="false"
            @click="handleDelete(index)"
            type="danger"
          >
            删除</el-link
          >
        </div>
      </li>
    </transition-group>
    <el-progress v-show="showProgress" :percentage="percentage"></el-progress>
    <!--查看培训须知 -->
    <el-drawer
      :title="title"
      :visible.sync="openView"
      size="55%"
      append-to-body
    >
      <div v-if="urltype == 'video'">
        <div class="box">
          <video class="wid100" :src="baseUrl + fileUrl" controls>
            您的浏览器不支持播放视频,请尝试使用谷歌浏览器。
          </video>
        </div>
      </div>
      <div else>
        <div class="box">
          <pdf
            ref="myPdfComponent"
            v-for="i in numPages"
            :key="i"
            :page="i"
            :src="src"
          ></pdf>
        </div>
      </div>
      <div
        v-if="showDo"
        style="position: absolute; right: 50px; top: 105px; z-index: 9"
      >
        <el-button @click="doIt('print')" size="small" type="primary"
          >打印</el-button
        >
        <!-- <el-button
          @click="$refs.myPdfComponent[0].print()"
          size="small"
          type="primary"
          >打印</el-button
        > -->
        <el-button size="small" plain @click="doIt('download')" type="primary"
          >下载</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import pdf from "vue-pdf";
import request from "@/utils/request";
const baseUrl = process.env.VUE_APP_BASE_API;
export default {
  name: "FileUpload",
  components: { pdf },
  props: {
    limit: {
      type: Number,
      default: 1,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: "",
    },
    // 值
    value: [String, Object, Array],
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 50,
    },
    // 支持的文件后缀, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["doc", "docx", "pdf"], //默认文本类型
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
    //上传的文件类型 视频文件  video   图片类型  img
    urltype: {
      type: String,
      default: "", // 默认是 word文档和pdf
    },
    myAction: String, //传入了action
    title: String,
    drag: {
      type: Boolean,
      default: false,
    },
    //是否是查看页面
    isView: { type: Boolean, default: false },
    // 是否显示"删除"按钮
    isDel: { type: Boolean, default: true },
    //是否展示  打印  和  下载按钮
    showDo: { type: Boolean, default: false },
    // 点击删除 0假删除  1真删除（掉接口删除）  默认 假删除0
    delType: {
      type: Number,
      default: 0,
    },
    //真删除调用的删除接口   默认是公用的删除接口
    delAction: {
      type: String,
      default: "/common/deleteFile",
    },
    myref: { type: String, default: "upload" },
  },
  data() {
    return {
      baseUrl,
      uploadFileUrl:
        process.env.VUE_APP_BASE_API +
        (this.myAction ||
          (this.urlStr == "video" ? "/common/upload" : "/common/uploadtopdf")),
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      //查看pdf文件分页
      numPages: "",
      //是否弹出查看pdf的弹窗
      openView: false,
      //所选文件路径
      fileUrl: "",
      percentage: 0,
      showProgress: false,
    };
  },
  mount(){
    console.log(this.isView)
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
    // 计算文件列表中的数据
    fileList() {
      let temp = 1;
      if (this.value) {
        // 首先将值转为数组
        const list = Array.isArray(this.value) ? this.value : [this.value];
        // 然后将数组转为对象数组
        return list.map((item) => {
          if (typeof item === "string") {
            item = { name: item, url: item };
          }
          item.name = item.name ?? item.fileName ?? item.response.fileName;
          item.url = item.url ?? item.fileUrl ?? item.response.url;
          item.uid = item.uid || new Date().getTime() + temp++;
          return item;
        });
      } else {
        return [];
      }
    },
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name
            .slice(file.name.lastIndexOf(".") + 1)
            .toLowerCase();
        }
        const isTypeOk = this.fileType.some((type = type.toLowerCase()) => {
          // if (file.type.indexOf(type) > -1) return true;  解决上传  pptx成功的问题
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      // ---------------产品人员 提的需求，把loading效果注掉了，详见bug:#4923
      // this.loading = this.$loading({
      //   lock: true,
      //   text: "上传中",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      this.showProgress = true;
      return true;
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`最多只允许上传${this.limit}个文件`);
    },
    // 上传失败
    handleUploadError(err) {
      // this.loading.close();
      this.showProgress = false;
      this.$message.error("上传失败, 请重试");
    },
    // 上传成功回调
    handleUploadSuccess(res, file, fileList) {
      // this.loading.close();
      this.showProgress = false;
      if (res.code == 200) {
        if (this.drag) {
          this.$refs[this.myref].clearFiles();
          this.$message.success(res.msg);
          this.$emit("upOver");
        } else {
          this.$emit("input", fileList);
          this.$message.success("上传成功");
        }
      } else {
        this.$refs[this.myref].clearFiles();
        this.$message.error(res.msg);
      }
    },
    // 上传时钩子函数
    handleOnProgress(e, file, flist) {
      this.percentage = parseInt(e.percent.toFixed(0));
    },
    // 删除文件
    handleDelete(index) {
      if (this.delType == 1) {
        //掉接口删除
        let query = {
          fileUrl: this.fileList[index].url || this.fileList[index].fileUrl,
        };
        request({
          url: this.delAction,
          method: "get",
          params: query,
        });
      }
      let copyFileList = JSON.parse(JSON.stringify(this.fileList));
      copyFileList.splice(index, 1);
      this.$emit("input", copyFileList); //为  v-mode绑定的数据赋值为 ""
    },
    // 获取文件名称
    getFileName(name) {
      if (name.lastIndexOf("/") > -1) {
        return name.slice(name.lastIndexOf("/") + 1).toLowerCase();
      } else {
        return "";
      }
    },
    // 查看模板预览
    showPdf(val) {
      console.log('val',val)
      let fileName = val.name ? val.name : val.fileUrl;
      let fileType = fileName.substring(fileName.lastIndexOf(".")+1)
      if(fileType=='zip'||fileType=='rar'){
       this.$message.warning(".zip/.rar文件，请在列表页点击下载解压后查看")
        return
      }
      let url =val.url ? val.url : val.fileUrl;
      if (this.urltype != "video") {
        this.getNumPages(url);
      } else {
        this.fileUrl = url;
      }
      this.openView = true;
    },
    // #计算pdf页码总数
    getNumPages(filePath) {
      //这里需要传入全路径
      let CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/";
      let perfix64 = process.env.VUE_APP_BASE_API + filePath;
      this.src = pdf.createLoadingTask({
        url: perfix64,
        withCredentials: false,
        cMapUrl: CMAP_URL,
        cMapPacked: true,
      });
      this.src.promise
        .then((pdf) => {
          this.numPages = pdf.numPages;
        })
        .catch((err) => {
          console.error("pdf 加载失败", err);
        });
    },
    doIt(handle) {
      if (handle == "print") {
        // window.open(baseUrl + this.value, "_blank");
        window.open(
          baseUrl + this.value,
          "newwindow",
          "height=1000, width=1024, top=0, left=0, toolbar=no,menubar=no, scrollbars=no,resizable=no,location=n o, status=no"
        );
      } else if (handle == "download") {
        let fileName = this.getFileName(this.value);
        this.my_downLoad(`/common/examDownload?fileName=${fileName}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
  ::v-deep {
    .el-tooltip.el-icon-document {
      vertical-align: middle;
      margin: 8px 0;
    }
  }
.upload-file-uploader {
  margin-bottom: 10px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 34px;
  margin: 0px;
  position: relative;
  padding: 0 15px;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  margin-top: 5px;
}
::v-deep {
  .el-link.el-link--default {
    color: #1890ff;
  }
}
.flx {
  flex-wrap: wrap;
}
.bg_fff {
  background-color: #fff;
}
.max-wid {
  max-width: 320px;
}
</style>
