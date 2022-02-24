<template>
   <div>
     <div class="history">
        <div class="top">{{title}}</div>
        <div class="bjt">
          <div>
            <el-steps direction="vertical" :active="historyList.length"  :space="150">
              <template v-for="(item,index) in historyList">
              <el-step :icon="item.exStatus=='1'?'el-icon-success':'el-icon-error'" style="flex-basis:auto!important" :key="index">
                <template slot="description">
                  <div class="content">
                    <div class="tp">
                     <div  v-if="!item.appUser">
                       <span>| 申请人：{{item.appUserName}}</span> <span>联系电话：{{item.phone}}</span>
                                <div class="center">
                      <!-- 1同意，2逐级驳回，3驳回到申请人 -->
                      <i style="color:#09BB07">提交申请</i>
                    </div>
                       </div>
                      <div v-if="item.appUser">
                        <span >| 审批人：{{item.applyUserName}}</span> <span>{{item.roleName}}</span>
                        <div class="center">
                      <!-- 1同意，2逐级驳回，3驳回到申请人 -->
                      <i :class="item.exStatus=='1'?'greenFont':'redFont'">{{item.exStatus=="1"?"同意":(item.exStatus=='2'?'逐级驳回':'驳回到申请人')}}</i>
                      <span v-if="item.remarks" style="color:#1890ff" class="remarks">（{{item.remarks}}）</span>
                      <div v-if="item.fileUrl" class="fileUrl">
                        <span>附件名称：</span> <span style="cursor:pointer;color:#1890FF" @click="showPdf(item.fileUrl)">{{item.fileName}}</span>
                      </div>
                   <!-- <div v-if="item.fileUrl!=null&&item.fileUrl.length>0">
                        <span>附件名称：</span> <view-attachPDF :fileUrl="process.env.VUE_APP_BASE_API+item.fileUrl[0].url"></view-attachPDF></div> -->
                    </div>
                      </div>

                    </div>

                    <div style="color: #909090">
                      申请日期：{{item.exTime}}
                    </div>
                  </div>
                </template>
              </el-step>
              </template>
            </el-steps>
          </div>
        </div>
      </div>
      <el-drawer title="查看pdf"  :visible.sync="open" size="45%" append-to-body>
        <view-attachPDF :fileUrl="fileUrl"></view-attachPDF>
      </el-drawer>
   </div>
</template>

<script>
import viewAttachPDF from "../viewAttachPDF";
export default {
  props:{
   historyList:{
     type:Array
   },
   title:{
     type:String,
     default:"采购计划审批进度"
   }
  },
data() {
   return {
    showFileUrl:process.env.VUE_APP_BASE_API,
    fileUrl:"",
    open:false,
}

},
 computed:{

 },

   methods: {
     showPdf(url){
         this.open=true;
         this.fileUrl=`${this.showFileUrl}${url}`
     }
},

   created() {

},

    mounted() {

},

components: {
 viewAttachPDF
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
    border-bottom: 1px solid#ECECEC;
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
    padding-bottom: 10px;
    ::v-deep{
      .el-icon-error{
        color: red;


      }
    }
    .content {
      font-size: 15px;
      padding-bottom: 10px;
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
        .greenFont{
          color: #09BB07;
        }
        .redFont{
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

.fileUrl{
  margin-top: 9px;
}

.remarks{
  display: inline-block;
  width: 600px;
  word-break: break-all;
  vertical-align: text-top;
}
  .el-step.is-vertical{
flex-basis:auto!important;
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
