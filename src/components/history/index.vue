<template>
  <div>
    <div class="history">
      <div class="top">{{title}}</div>
      <div class="bjt">
        <div>
          <el-steps direction="vertical" :active="historyList.length" :space="150">
            <template v-for="(item,index) in historyList">
              <el-step :icon="item.exStatus=='1'||item.appUser!=null?'el-icon-success':'el-icon-error'" :key="index">
                <template slot="description">
                  <div class="content">
                    <div class="tp">
                      <!--  -->
                      <div  v-if="!item.appUser">
                        <span>| 审批人：{{item.applyUserName}} {{item.roleName}}</span>

                        <div class="center">
                          <!-- 1同意，2逐级驳回，3驳回到申请人 -->
                          <i :class="item.exStatus=='1'?'greenFont':'redFont'">{{item.exStatus=="1"?"同意":(item.exStatus=='2'?'逐级驳回':'驳回到申请人')}}</i>
                          <span v-if="item.remarks" class="remarkStyle" style="color:#1890ff">（{{item.remarks}}）</span>
                          <div v-if="item.fileUrl!=null&&item.fileUrl.length>0">
                            <span>附件名称：</span> <span style="cursor:pointer;color:#1890FF"
                                                     @click="showPdf(item.fileUrl)">{{item.fileName}}</span></div>
                          <!-- files -->
                        </div>
                        <div style="color: #909090">
                          审批日期：{{item.exTime}}
                        </div>
                      </div>
                      <div v-else-if="item.appUser!=null">
                        <span>| 申请人：{{item.appUserName}}</span> <span>联系电话：{{item.phone}}</span>
                        <div class="center">

                          <i style="color:#09BB07">提交申请</i>
                        </div>
                        <div style="color: #909090">
                          申请日期：{{item.exTime}}
                        </div>
                      </div>


                       <!-- 1同意，2逐级驳回，3驳回到申请人 -->
                    </div>

                  </div>
                </template>
              </el-step>
            </template>
          </el-steps>
        </div>
      </div>
    </div>
    <el-drawer title="查看pdf" :visible.sync="open" size="45%" append-to-body>
      <viewAttachPDF :fileUrl="fileUrl"></viewAttachPDF>
    </el-drawer>
  </div>
</template>

<script>
  import viewAttachPDF from "@/components/viewAttachPDF";
  export default {
    components: {
      viewAttachPDF
    },
    props: {
      historyList: {
        type: Array
      },
      title: {
        type: String,
        default: "采购计划审批进度"
      }
    },

    data() {
      return {
        open: false,
        showFileUrl: process.env.VUE_APP_BASE_API,
        fileUrl: null,

      }

    },
    computed: {},

    methods: {
      showPdf(url) {
        this.open = true;
        this.fileUrl = `${this.showFileUrl}${url}`
        console.log(this.fileUrl)
      }

    },

    created() {

    },

    mounted() {

    },


  }
</script>
<style lang="scss" scoped>
  .history {
    height: 100%;
    background: #ffffff;

    .top {
      height: 51px;
      line-height: 51px;
      border-bottom: 1px solid #ECECEC;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #171717;
      padding-left: 36px;
    }

    .bjt {
      height: 91%;
      margin-top: 23px;
      margin-left: 37px;
      overflow-y: auto;
      padding-bottom: 20px;
      ::v-deep {
        .el-icon-error {
          color: red;


        }
      }

      .content {
        padding-bottom: 10px;
        font-size: 15px;
        // border-bottom: 4px dotted #bfbebe;
        margin-bottom: 10px;
        .tp {
          span:nth-child(1) {
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #4D4D4D;
          }

          span:nth-child(2) {
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #909090;
          }

          .greenFont {
            color: #09BB07;
          }

          .redFont {
            color: #FF4848;
          }
        }

        .center {
          margin-top: 11px;
          margin-bottom: 14px;
        }

      }
    }
  }
  .el-step{
flex-basis:auto!important;
    ::v-deep{
        .center {

          margin-top: 11px;
          margin-bottom: 14px;
          .remarkStyle{
              display: inline-block;
  width: 600px;
  word-break: break-all;
  vertical-align: text-top;
          }
        }
    }
  }
    .bjt>div{
::v-deep{
  .el-steps{

  .el-step:last-child{

   .el-step__description{
     padding-right: 10%;
   }
  }
  }

}
  }
</style>
