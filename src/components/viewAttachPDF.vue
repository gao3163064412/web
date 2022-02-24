<template>
  <div class="">
      <!-- 预览paf -->
      <pdf v-for="i in numPages" :key="i" :page="i" :src="src"></pdf>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  name:  'viewAttachPDF',
  components: {
    pdf
  },
   props: {
       fileUrl:{
           required:true,
           default:""
       }
   },
  data() {
    return {
          src: "", // pdf文件地址
        numPages: "",
    };
  },
  watch:{
    'fileUrl'(newVal){
       this.fileUrl=newVal
      this.getNumPages(this.fileUrl)


      // if( Array.isArray(this.fileUrl)&&this.fileUrl.length>0){
      //   this.fileUrl.forEach(item=>{this.getNumPages(item)})
      // }else{

      // }
    }
  },
  created() {
  },
    mounted() {
       this.getNumPages(this.fileUrl)
    },
  methods: {
    // #计算pdf页码总数
    getNumPages(fileUrl) {
      this.open3 = true;
      console.log(fileUrl);
      let CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/";
      let perfix64 = fileUrl;
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
  }
};
</script>
<style lang="scss" scoped>

</style>
