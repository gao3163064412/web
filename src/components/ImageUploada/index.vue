<template>
  <div>
    <div class="component-upload-image">
      <el-upload
        :action="uploadImgUrl"
        list-type="picture-card"
        :on-success="handleUploadSuccess"
        :before-upload="handleBeforeUpload"
        :on-error="handleUploadError"
        name="file"
     
        :show-file-list="false"
        :headers="isHeader ? headers : ''"
        style="display: inline-block; vertical-align: top"
      >
        <el-image v-if="!value" :src="value">
          <div slot="error" class="image-slot">
            <i class="el-icon-plus" />
          </div>
        </el-image>
        <div v-else class="image">
          <el-image
            :src="value"
            :style="`width:150px;height:150px;`"
            fit="fill"
          />
          <div class="mask">
            <div class="actions">
              <span title="预览" @click.stop="dialogVisible = true">
                <i class="el-icon-zoom-in" />
              </span>
              <span title="移除" @click.stop="removeImage">
                <i class="el-icon-delete" />
              </span>
            </div>
          </div>
        </div>
      </el-upload>
      <el-dialog
        :visible.sync="dialogVisible"
        title="预览"
        width="800"
        append-to-body
      >
        <img
          :src="value"
          style="display: block; max-width: 100%; margin: 0 auto"
        />
      </el-dialog>
    </div>
    <slot name="tip"></slot>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      dialogVisible: false,
      uploadImgUrl:
        process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
      prefixion: process.env.VUE_APP_BASE_API,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
  },
  created() {},
  props: {
    value: {
      type: String,
      default: "",
    },
    // slb 传入fileType时候校验  不影响以前的使用
    fileType: {
      //上传类型
      type: Array,
      default: () => [],
    },
    fileSize: {
      //上传数据大小  KB为单位
      type: String,
      default: "",
    },
    _action: {
      //自定义上传路径
      type: String,
      default: "",
    },
    isHeader: {
      //是否传递  header  默认传递
      type: Boolean,
      default: true,
    },
  },
  methods: {
    removeImage() {
      this.$emit("input", "");
    },
    handleUploadSuccess(res) {
      console.log(res);
      this.$emit("input", this.prefixion + res.fileName);
      this.loading.close();
    },
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType.length > 0) {
        //当fileType传值的时候校验，不影响以前该组件使用
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name
            .slice(file.name.lastIndexOf(".") + 1)
            .toLowerCase();
        }
        const isTypeOk = this.fileType.some((type = type.toLowerCase()) => {
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
        const isLt = file.size / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} KB!`);
          return false;
        }
      }
      this.loading = this.$loading({
        lock: true,
        text: "上传中",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    handleUploadError() {
      this.$message({
        type: "error",
        message: "上传失败",
      });
      this.loading.close();
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.image {
  position: relative;
  .mask {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
    height: auto;
  }
  &:hover .mask {
    opacity: 1;
  }
}
</style>