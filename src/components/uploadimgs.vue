<template>
  <div class="uploadimgs">
    <div v-if="imgsback.length > 0&&isAdd==false" class="flex">
      <div
        class="img-box"
        v-for="(item, i) in imgsback"
        :key="i"
      >
        <img class="img" :src="uploadFileUrl+item.backgroundAddr" alt=""/>
        <!-- <span @click="delimgback(i)"><i class="el-icon-delete"></i></span> -->
        <div class="hoverImg">
          <div>
            <span data-v-82a94682="" title="预览" @click="showView(item.backgroundAddr)"><i data-v-82a94682="" class="el-icon-zoom-in"></i></span>
            <span data-v-82a94682="" title="移除" @click.stop="delimgback(i)"><i data-v-82a94682="" class="el-icon-delete"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div
      tabindex="0"
      v-if="imgsback.length < sizeback||isAdd==true"
      class="img-file el-upload el-upload--picture-card">
      <div data-v-82a94682="" class="el-image">
        <div class="image-slot">
          <i data-v-82a94682="" class="el-icon-plus"></i>
        </div>
      </div>
      <input
        type="file"
        ref="clearFiles"
        id="files"
        multiple
        name="file"
        class="el-upload__input"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        @change.stop="fileChangeback($event)"
      />
    </div>

  </div>

</template>

<script>
  import {
    uploadImgs,
  } from "@/api/chemicals/stander";

  export default {

    props: {   //对传过来的值类型进行限制
      // imgsback: {default: []},
      Btn: Function,
      isAdd:{    type: Boolean,
      default: false},
    },

    data() {
      return {
   uploadFileUrl: process.env.VUE_APP_BASE_API,
        imgsback:[],
        sizeback: 1, // 限制上传数量
        submits: {
          //上传设置信息
          bgListDto: [
            {
              backgroundAddr: "",
              default_bg: "",
              id: 1,
            },
          ],
          companyName: "",
          id: 1,
          logoUrl: "",
          systemName: "",
        },
      }

    },


    methods: {
      showView(i) {
        this.$emit('showView', i)
      },

      /* 图片上传 */
      fileChangeback(e) {
        // 加入图片
        const imgLength = this.imgsback.length + e.target.files.length;
        if (imgLength > this.sizeback) {
          this.$message.error("图片上传不能超过1张");
          this.$refs.clearFiles.value = "";
          return;
        }
        var avatarImg = e.target.files;
        var formData = new FormData();

        avatarImg.forEach((element, index) => {
          formData.append(`file`, element);
        });
        uploadImgs(formData).then((res) => {
          var imgsback = res.url;
          // var imgArray=[];
            var a = {
              backgroundAddr: imgsback
            };
            this.imgsback.push(a);
            console.log(this.imgsback);
             this.$emit("input", imgsback);
          
        });
      }, //删除图片的方法
      delimgback(i) {
        this.imgsback.splice(i, 1);
      },
    },

    created() {
      this.imgsback=[]
    },

    mounted() {

    },

    components: {},

  }
</script>
<style lang="scss" scoped>
  .uploadimgs {
    display: flex;
  }

  ::v-deep {
    .el-form-item__content {
      display: flex;

      .flex {
        position: relative;
        display: flex;

        img {
          width: 148px;
          height: 148px;
          // margin-left: 10px;
        }
      }
    }
  }

  .img-file {
    position: relative;

    .el-upload__input {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 999;
      display: block !important;
      opacity: 0;
    }
  }

  .img-box {
    position: relative;
    margin-left: 10px;
    width: 150px;
    height: 150px;
  }
img{
    width: 150px;
    height: 150px; 
}
  .hoverImg {
    display: none;
    width: 148px;
    height: 148px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    position: absolute;
    top: 0;

    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    i {
      font-size: 28px;
      color: #8c939d;
      font-family: "element-icons" !important;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
    }
  }

  .img-box:hover .hoverImg {
    display: block;
  }

  .el-image {
    width: 150px;
    height: 150px;
  }

  ::v-deep {
    .image .mask {
      width: 150px;
      height: 150px;
    }
  }

  .active {
    border: 1px solid red;
  }

  .img-box:nth-child(1) {
    margin-left: 0px;
  }

  ::v-deep {
    .el-upload--picture-card {
      margin-left: 10px;
    }
  }

</style>
