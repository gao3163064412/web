<template>
  <div>
    <div
      :style="{ background: options.img ? '' : '' }"
      @click="editCropper()"
      class="el-upload--picture-card"
    >
      <img v-if="options.img" v-bind:src="options.img" class="img-lg2" />
      <div v-else class="image-slot img-lg2" style="height: 100%;display: flex;justify-content: center;align-items: center;">
        <i class="el-icon-plus"></i>
      </div>
    </div>
<!--    <div-->
<!--      class="user-info-head "-->
<!--      :style="{ background: options.img ? '' : 'rgba(0,0,0,0.5)' }"-->
<!--      @click="editCropper()"-->
<!--    >-->
<!--      <img v-bind:src="options.img" class="img-lg2" />-->
<!--    </div>-->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      @opened="modalOpened"
      @close="closeDialog()"
    >
      <el-row>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview2">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload
            action="#"
            :http-request="requestUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <el-button
            icon="el-icon-plus"
            size="small"
            @click="changeScale(1)"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-minus"
            size="small"
            @click="changeScale(-1)"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="rotateLeft()"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="rotateRight()"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <el-button type="primary" size="small" @click="uploadImg()"
            >提 交</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { VueCropper } from "vue-cropper";
import { uploadAvatar2 } from "@/api/system/user";

export default {
  components: { VueCropper },
  props: {
    value: String,
    fileSize: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 是否显示弹出层
      open: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: "修改头像",
      options: {
        img: store.getters.avatar, //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 350, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
      },
      previews: {},
    };
  },
  methods: {
    // 编辑头像
    editCropper() {
      this.open = true;
    },
    // 打开弹出层结束时的回调
    modalOpened() {
      this.visible = true;
    },
    // 覆盖默认的上传行为
    requestUpload() {},
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf("image/") == -1) {
        this.msgError("文件格式错误，请上传图片格式jpg、png、jpeg、gif、bmp等图片。");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data);
        if (this.fileSize) {
          const isLt = data.size / 1024 < this.fileSize;
          if (!isLt) {
            this.$message.error(`上传文件大小不能超过 ${this.fileSize} KB!`);
            return false;
          }
        }
        let formData = new FormData();
        formData.append("avatarfile", data);
        uploadAvatar2(formData).then((response) => {
          this.open = false;
          this.options.img = process.env.VUE_APP_BASE_API + response.url;
          this.$emit("input", this.options.img);
          this.visible = false;
          // store.commit("SET_AVATAR", this.options.img);
          // this.msgSuccess("修改成功");
        });
      });
    },
    // 实时预览
    realTime(data) {
      this.previews = data;
    },
    // 关闭窗口
    closeDialog() {
      // this.options.img = store.getters.avatar;
      this.visible = false;
    },
  },
};
</script>
<style scoped lang="scss">
.user-info-head {
  position: relative;
  display: inline-block;
  width: 120px;
  height: 140px;
}

.user-info-head:hover:after {
  content: "+";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 140px;
  text-align: center;
  // border-radius: 50%;
}
.avatar-upload-preview2 {
  position: absolute;
  top: 50%;
  left: 275px;
  transform: translate(50%, -50%);
  width: 300px;
  height: 350px;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}



.el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 0.42857rem;
  box-sizing: border-box;
  width: 120px;
  height: 140px;
  cursor: pointer;
  line-height: 140px;
  vertical-align: top;
  .img-lg2 {
    width: 118px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
