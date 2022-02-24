<template>
  <div>
      跳转页面
  </div>
</template>

<script>
import { getUrlToken } from "../../src/api/goIndex";
import { setToken,getToken,removeToken} from '@/utils/auth'

export default {
   data(){
       return {
              
       }
   },
   methods:{
       getUrlToken(){
           //获取到href
           var urlParams = window.location.href;

           var ticket=urlParams.split("ticket=")[1]
           console.log(ticket);
 


         if (getToken()) {
            this.$store.commit('SET_TOKEN', '')
            this.$store.commit('SET_ROLES', [])
            this.$store.commit('SET_PERMISSIONS', [])
            removeToken()
         }

           
          
           getUrlToken(ticket).then(res=>{
                 console.log(res);
                if (res.code==200) {
                  var token=res.token;

                  //存储token到本地
                  setToken(token)
                 this.$store.dispatch("GetInfo");
                 this.$router.push("/index")
                }else{
                    this.$message.error(res.msg)
                }

           })

       }
   },
   created(){
     this.getUrlToken()
   },
   mounted(){
   
   },

}
</script>

<style>

</style> 