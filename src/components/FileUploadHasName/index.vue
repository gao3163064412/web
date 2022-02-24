<template>
  <div class="upload-file">
    <el-upload
      v-if="isDisable"
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="1"
      :drag="drag"
      accept=".pdf,.doc,.docx"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :headers="headers"
      :class="{ flx: !drag }"
      class="upload-file-uploader al_c"
      ref="upload"
    >
      <div v-if="drag">
        <!-- 拖拽类型 -->
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <div class="flx mr16" v-else>
        <!-- 上传按钮 -->
        <el-button size="mini" type="primary">{{btnName}}</el-button>
      </div>
      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
        </template>
        的文件
      </div>
    </el-upload>

    <!-- 文件列表 -->
    <transition-group
      v-if="!drag"
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        :key="file.uid"
        class="el-upload-list__item ele-upload-list__item-content"
        v-for="(file, index) in list"
      >
        <el-link @click="showPdf(file)">
          <span class="el-icon-document">
            <!-- {{ getFileName(file.name) }} -->
          </span>
        </el-link>
        <div v-if="isDel" class="ele-upload-list__item-content-action">
          <el-link :underline="false" @click="handleDelete(index)" type="danger"
            >删除</el-link
          >
        </div>
      </li>
    </transition-group>
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
const baseUrl = process.env.VUE_APP_BASE_API;
export default {
  name: "FileUpload",
  components: { pdf },
  props: {
    //是否只展示列表，不可以上传只能查看
    isDisable: {
      type: Boolean,
      default: true,
    },
    btnName:{
         type: String,
      default: "选取文件",
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
    //上传的文件类型 视频文件  video  文本文件  pdf
    urltype: {
      type: String,
      default: "pdf", // 上传的pdf,word文件服务器地址
    },
    myAction: String, //传入了action
    title: String,
    drag: {
      type: Boolean,
      default: false,
    },
    // 是否显示"删除"按钮
    isDel: { type: Boolean, default: true },
    //是否展示  打印  和  下载按钮
    showDo: { type: Boolean, default: true },
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
      fileList: [],
      //查看pdf文件分页
      numPages: "",
      //是否弹出查看pdf的弹窗
      openView: false,
      //所选文件路径
      fileUrl: "",
    };
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
    // 列表
    list() {
      let temp = 1;
      if (this.value) {
        // 首先将值转为数组
        const list = Array.isArray(this.value) ? this.value : [this.value];
        // 然后将数组转为对象数组
        return list.map((item) => {
          if (typeof item === "string") {
            item = { name: item, url: item };
          }
          item.uid = item.uid || new Date().getTime() + temp++;
          return item;
        });
      } else {
        this.fileList = [];
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
      this.loading = this.$loading({
        lock: true,
        text: "上传中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      return true;
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`只允许上传单个文件`);
    },
    // 上传失败
    handleUploadError(err) {
      this.loading.close();
      this.$message.error("上传失败, 请重试");
    },

    // 上传成功回调
    handleUploadSuccess(res, file, fileList) {
      let files = [];
      fileList.forEach((item) => {
        let itemObj = {};
        itemObj.name = item.name;
        itemObj.url = item.response.url;
        files.push(itemObj);
      });
      this.loading.close();
      if (res.code == 200) {
        //  this.fileName = file.name
        this.fileList = files;
        this.list = this.fileList;
        console.log(files);
        this.$message.success("上传成功");
        this.$emit("input", this.fileList);
      } else {
        this.fileList = [];
        this.$message.error(res.msg);
      }
    },
    //     handleUploadSuccess(res, file,fileList) {

    //   this.loading.close();
    //   if (res.code == 200) {
    //     this.$message.success("上传成功");
    //     this.$emit("input", res.url);
    //   } else {
    //     this.fileList = [];
    //     this.$message.error(res.msg);
    //   }
    // },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1);
      this.$emit("input", "");
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
    showPdf({ fileUrl, url }) {
      if (this.urltype != "video") {
        this.getNumPages(fileUrl || url);
      } else {
        this.fileUrl = fileUrl || url;
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
        // console.log(this.$refs.pdf)
        // this.$refs.myPdfComponent[0].print()
      } else if (handle == "download") {
        let fileName = this.getFileName(this.value);
        this.my_downLoad(`/common/download?fileName=${fileName}`);
      }
    },
  },
  created() {
    this.fileList = this.list;
  },
};
</script>

<style scoped lang="scss">
.el-icon-document{
  color:#1890ff;
}
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>