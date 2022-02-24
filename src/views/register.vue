<template>
  <div class="crmLogin">
    <div v-show="flag == 0">
      <div class="left" :style="backgroundAddr">
        <div class="imgbox">
          <div class="text">
            <img :src="$store.state.settings.logoUrl" alt="" />
            <div>
              {{ $store.state.settings.untilTitle
              }}{{ $store.state.settings.systemTitle }}
            </div>
          </div>

          <div class="cent">
            {{ $store.state.settings.systemTitle }}
          </div>
          <span class="txt"
            >{{ $store.state.settings.untilTitle
            }}{{ $store.state.settings.systemTitle }}</span
          >
        </div>
        <ul class="statement">
          <li>系统支持主流浏览器、火狐、谷歌、360极速</li>
          <li>
            北京盛元广通科技有限公司 Copyright©2016-2021 {{ $store.state.settings.untilTitle }}
            版权所有
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="loginBox">
          <div class="title">欢迎登陆</div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            label-position="top"
          >
            <el-form-item label="用户名账号" prop="username">
              <el-input
                v-model="loginForm.username"
                type="text"
                auto-complete="off"
                placeholder="请输入账户"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password" class="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="请输入密码"
                @keyup.enter.native="handleLogin"
              >
              </el-input>
              <div class="a"></div>
            </el-form-item>
            <Verify
              @success="capctchaCheckSuccess"
              :mode="'pop'"
              :captchaType="'blockPuzzle'"
              :imgSize="{ width: '330px', height: '155px' }"
              ref="verify"
            ></Verify>

            <el-form-item style="width: 100%">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width: 100%"
                @click.native.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
            <div class="changeBtn">
              <el-checkbox
                v-model="loginForm.rememberMe"
                style="margin: 0px 0px 25px 0px; color: #999999"
                >记住密码</el-checkbox
              >
              <div @click="flag = 2" style="cursor: pointer">忘记密码</div>
              <div @click="flag = 1" style="cursor: pointer; color: #009944">
                立即注册
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 注册 -->
    <div class="register" v-show="flag == 1">
      <div class="top">
        <!-- <img src="../assets/images/regTitle.png" alt="" /> -->
           <div>
          <div class="SysIcon"><img :src="$store.state.settings.logoUrl" alt="" /></div>
          <div class="sysDesc">
            <div class="cnDesc">     {{ $store.state.settings.untilTitle
              }}{{ $store.state.settings.systemTitle }}</div>
            <div class="enDesc">{{nameEnglish}}</div>
          </div>
        </div>
      </div>
      <div class="regBox">
        <div class="titleBox">
          <div class="title">用户注册</div>
        </div>
        <div class="contentBox">
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="20px"
            label-position="left"
          >
            <el-form-item label="单位" label-width="110px" prop="unit">
              <el-input
                v-model="formData.unit"
                placeholder="请输入单位"
                clearable
                :style="{ width: '82%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门/课题组" label-width="110px" prop="teamName">
              <el-input
                v-model="formData.teamName"
                placeholder="请输入部门/课题组"
                clearable
                :style="{ width: '82%' }"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="姓名" label-width="110px" prop="nickName">
              <el-input
                v-model="formData.nickName"
                placeholder="请输入姓名"
                clearable
                :style="{ width: '82%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" label-width="110px" prop="phonenumber" class="phonenumber">
              <el-input
                v-model="formData.phonenumber"
                placeholder="请输入手机号"
                clearable
                :style="{ width: '63%' }"
              ></el-input>
              <span class="sendAuthCode" v-show="sendAuthCode" @click="getCode"
                >获取验证码</span
              >
              <span
                class="sendAuthCode"
                v-show="!sendAuthCode"
                style="color: red"
                >{{ auth_time }}秒之后重新发送验证码</span
              >
            </el-form-item>
            <el-form-item label="验证码" label-width="110px" prop="msmCode">
              <el-input
                v-model="formData.msmCode"
                placeholder="请输入验证码"
                clearable
                :style="{ width: '82%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="内部电话" label-width="110px" prop="inPhone">
              <el-input
                v-model="formData.inPhone"
                placeholder="请输入内部电话"
                clearable
                :style="{ width: '82%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="110px" prop="password">
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
                clearable
                :style="{ width: '82%' }"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="110px" prop="confirmPassword">
              <el-input
                v-model="formData.confirmPassword"
                placeholder="请输入确认密码"
                clearable
                :style="{ width: '82%' }"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <!-- <el-button @click="resetForm">重置</el-button> -->
            </el-form-item>
            <div class="backLogin">
              <span @click="flag = 0">返回登录</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 忘记密码   -->
    <div class="register" v-show="flag == 2">
      <div class="top">
        <!-- <img src="../assets/images/regTitle.png" alt="" /> -->
        <div>
          <div class="SysIcon"><img :src="$store.state.settings.logoUrl" alt="" /></div>
          <div class="sysDesc">
            <div class="cnDesc">     {{ $store.state.settings.untilTitle
              }}{{ $store.state.settings.systemTitle }}</div>
            <div class="enDesc">{{nameEnglish}}</div>
          </div>
        </div>
      </div>
      <div class="regBox">
        <div class="titleBox">
          <div class="title">忘记密码</div>
        </div>
        <div class="contentBox">
          <el-form
            ref="elForm2"
            :model="formData2"
            :rules="rules2"
            size="medium"
            label-width="20px"
            label-position="left"
          >
            <el-form-item label="手机号" label-width="110px" prop="phonenumber" class="phonenumber">
              <el-input
                v-model="formData2.phonenumber"
                placeholder="请输入手机号"
                clearable
                :style="{ width: '63%' }"
              ></el-input>
              <span
                class="sendAuthCode"
                v-show="sendAuthCode2"
                @click="getCode2"
                >获取验证码</span
              >
              <span
                class="sendAuthCode"
                v-show="!sendAuthCode2"
                style="color: red"
                >{{ auth_time2 }}秒之后重新发送验证码</span
              >
            </el-form-item>
            <el-form-item label="验证码" label-width="110px" prop="msmCode">
              <el-input
                v-model="formData2.msmCode"
                placeholder="请输入验证码"
                clearable
                :style="{ width: '82%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="110px" prop="password">
              <el-input
                v-model="formData2.password"
                placeholder="请输入密码"
                clearable
                :style="{ width: '82%' }"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="110px" prop="confirmPassword">
              <el-input
                v-model="formData2.confirmPassword"
                placeholder="请输入确认密码"
                clearable
                :style="{ width: '82%' }"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item size="large">
              <el-button type="primary" @click="submitForm2">提交</el-button>
              <!-- <el-button @click="resetForm">重置</el-button> -->
            </el-form-item>
            <div class="backLogin">
              <span @click="flag = 0">返回登录</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import Verify from "@/components/Verifition/Verify";
import { getPhoneCode, getCustomerRegister, updateUserPwd } from "@/api/login";
// import { getLoginSetupInfo } from "../api/loginAdmin/loginAdmin";
export default {
  components: { Verify },
  name: "crmLogin",
  data() {
    var confirm = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    var confirm2 = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.formData2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      nameEnglish:"",
     // backgroundAddr:"background:url(" + require("../assets/images/ClientBgc.png") + ");", //背景图
      flag: 0,
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */,
      auth_time: 0 /*倒计时 计数器*/,

      formData: {
        unit: undefined,
        teamName: undefined,
        nickName: undefined,
        phonenumber: undefined,
        inPhone: undefined,
        password: undefined,
        confirmPassword: undefined,
        msmCode: undefined,
      },
      rules: {
        unit: [{ required: true, message: "请输入单位",trigger: "blur",},],
        teamName: [{required: true, message: "请输入部门/课题组",trigger: "blur",},],
        nickName: [{required: true, message: "请输入姓名",trigger: "blur", },],
        phonenumber: [{ required: true, message: "请输入手机号", trigger: "blur",},
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,  message: "手机号格式有误",
            trigger: "blur",
          }, ],inPhone: [ { required: true, message: "请输入内部电话",trigger: "blur",}, ],
        msmCode: [ { required: true, message: "请输入验证码",trigger: "blur", },],
        password: [ { required: true, message: "请输入密码", trigger: "blur", }, { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}$/,
            message: "密码必须包含字母、数字、特殊字符，长度8到16位", trigger: "blur", },],
        confirmPassword: [ { validator: confirm, required: true, trigger: "blur" },],
      },
      sendAuthCode2: true /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */,
      auth_time2: 0 /*倒计时 计数器*/,

      formData2: {
        phonenumber: undefined,
        password: undefined,
        confirmPassword: undefined,
        msmCode: undefined,
      },

      rules2: {
        phonenumber: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号格式有误",
            trigger: "blur",
          },
        ],
        msmCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}$/,
            message: " 密码必须包含字母、数字、特殊字符，长度8到16位",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { validator: confirm2, required: true, trigger: "blur" },
        ],
      },

      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
      },

      loading: false,
      redirect: undefined,
    };
  },

  methods: {
    // // 获取设置信息
    // getLoginSetupInfos() {
    //   getLoginSetupInfo().then((res) => {
    //     this.$store.dispatch("settings/changeLogoUrl", res.data.logoUrl);
    //     this.$store.dispatch(
    //       "settings/changeCompanyName",
    //       res.data.companyName
    //     );
    //     this.$store.dispatch("settings/changesystemName", res.data.systemName);
    //     this.nameEnglish= res.data.nameEnglish
    //     //获取背景图信息
    //     console.log(res.data.bgList);
    //     res.data.bgList.some((element) => {
    //       if (element.setup_type === "0" && element.default_bg) {
    //         this.backgroundAddr = `background: url('${element.backgroundAddr}')`;
    //         console.log(this.backgroundAddr);
    //         return true;
    //       }
    //     });

    //     //获取logo图
    //   });
    // },

    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    capctchaCheckSuccess(params) {
      this.loginForm.code = params.captchaVerification;
      this.loading = true;
      if (this.loginForm.rememberMe) {
        Cookies.set("username", this.loginForm.username, { expires: 30 });
        Cookies.set("password", encrypt(this.loginForm.password), {
          expires: 30,
        });
        Cookies.set("rememberMe", this.loginForm.rememberMe, { expires: 30 });
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      this.$store
        .dispatch("CrmLogin", this.loginForm)
        .then(() => {
          // this.$router.push({ path: this.redirect || "/" }).catch(() => {});
          this.$router.push({ path: "/crmIndex" }).catch(() => {});
          console.log(this.route.path);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleLogin() {
      //记录当前登录页面的路由名称
      this.$store.commit("setLoginName", "/crmLogin");
      sessionStorage.setItem("LoginName", "/crmLogin");
      // this.common.initrouters()
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$refs.verify.show();
        }
      });
    },

    // 注册部分

    //获取验证码
    getCode() {
      this.$refs["elForm"].validateField("phonenumber", (err) => {
        if (err) {
          console.log("未通过");
          return;
        } else {
          console.log("已通过");

          getPhoneCode(this.formData.phonenumber).then((res) => {
            if (res.code == 200) {
              this.sendAuthCode = false; //显示倒计时
              this.$message.success("验证码已发送注意查看");
              this.auth_time = 300;
              var auth_timetimer = setInterval(() => {
                this.auth_time--;
                if (this.auth_time <= 0) {
                  this.sendAuthCode = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            } else {
              this.$message.error("获取验证码失败");
            }
          });
        }
      });
    },

    getCode2() {
      this.$refs["elForm2"].validateField("phonenumber", (err) => {
        if (err) {
          console.log("未通过");
          return;
        } else {
          console.log("已通过");

          getPhoneCode(this.formData2.phonenumber).then((res) => {
            if (res.code == 200) {
              this.sendAuthCode2 = false; //显示倒计时
              this.$message.success("验证码已发送注意查看");
              this.auth_time2 = 300;
              var auth_timetimer = setInterval(() => {
                this.auth_time2--;
                if (this.auth_time2 <= 0) {
                  this.sendAuthCode2 = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            } else {
              this.$message.error("获取验证码失败");
            }
          });
        }
      });
    },

    // 注册
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          getCustomerRegister(this.formData).then((res) => {
            if (res.code == 200) {
              this.$message.success("注册成功");
              this.resetForm();
            } else {
              this.$message.error("注册失败");
            }
          });
        } else {
          return false;
        }
      });
    },

    //修改密码
    submitForm2() {
      this.$refs["elForm2"].validate((valid) => {
        if (valid) {
          updateUserPwd(this.formData2).then((res) => {
            if (res.code == 200) {
              this.$message.success("修改成功");
              this.resetForm2();
            } else {
              this.$message.error("修改失败");
            }
          });
        } else {
          return false;
        }
      });
    },

    resetForm() {
      this.$refs["elForm"].resetFields();
      this.sendAuthCode = true;
      this.auth_time = 0;
    },

    resetForm2() {
      this.$refs["elForm2"].resetFields();
      this.sendAuthCode2 = true;
      this.auth_time2 = 0;
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCookie();
    this.getLoginSetupInfos();
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.crmLogin {
  height: 100%;
  display: flex;
  .left {
    width: 52.344vw;
    height: 100vh;
    // background: url("../assets/images/ClientBgc.png");
    background-repeat: no-repeat !important;
    background-size: cover !important;
    overflow: hidden;
    .imgbox {
      width: 33.333vw;
      height: 21.615vw;
      background: rgba(0, 153, 68, 0.35);
      border: 1px solid #009944;
      // width: 33.333vw;
      // height: 37.448vw;
      margin-top: 13.719vw;
      margin-left: 9.115vw;
      // background-image: url("../assets/images/titleBgc.png");
      // background-repeat: no-repeat;
      // background-size: cover;

      .text {
        display: flex;
        align-items: center;
        margin-top: 3.594vw;
        margin-left: 4.271vw;
        height: 4.063vw;
        color: #fff;
        font-size: 1.25vw;
        img {
          width: 3.542vw;
          height: 4.375vw;
        }
        div {
          margin-left: 1.719vw;
        }
      }

      .cent {
        font-size: 2.083vw;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #FFFFFF;
        margin-top: 2.323vw;
        text-align: center;
      }
      .txt {
        display: inline-block;
        font-size: 1.094vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 1.667vw;
        margin-left: 7.292vw;
      }
    }
  }
  .right {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 49.531vw;
    height: 100%;
   // background: url("../assets/images/topIcon.png");
    background-repeat: no-repeat;
    background-size: cover;
    .loginBox {
      width: 30.557vw;
      margin-left: 10.365vw;
      .title {
        text-align: center;
        font-size: 2.5vw;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #009944;
        margin-top: 9.688vw;
      }
      ::v-deep {
        .el-input--medium .el-input__inner {
          height: 3.745vw;
          background-color: rgba(196, 196, 196, 0.13);
          border-radius: 36px;
          border: none;
        }
      }

      .el-button {
        width: 30.573vw;
        height: 3.75vw;
        background: #009944;
        border-radius: 1.875vw;
        font-size: 0.99vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 2.813vw;
      }

      .changeBtn {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}

// 注册
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: #F8F8F8;
  .top {
    width: 100vw;
    min-height: 60px;
    /*height: 5.417vw;*/
    background: #FFFFFF;
    >div {
     // width: 19.323vw;
      width: 30vw;
      height: 3.646vw;
      margin-top: 1.042vw;
      margin-left: 16.979vw;
      margin-bottom: 0.729vw;
      display: flex;
      flex-direction: row;
      .SysIcon >img{
        width: 60px;
        height: 60px;
      }
      .sysDesc{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .cnDesc{
          font-size: 24px;

        }
        .enDesc{
          font-size: 12px;
        }
      }

    }
    // img{
    //   width: 19.323vw;
    //   height: 3.646vw;
    //   margin-top: 1.042vw;
    //   margin-left: 16.979vw;
    //   margin-bottom: 0.729vw;
    // }
  }
  .regBox {
    margin: 0 auto;
    margin-top: 0.885vw;
    width: 62.5vw;
    height: 42.344vw;
    background: #FFFFFF;
    border-radius: 0.521vw;

    .titleBox {
      height: 3.177vw;
      overflow: hidden;
      border-bottom: 1px solid #EBEBEB;
      .title {
        font-size: 0.938vw;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #009944;
        margin-top: 1.146vw;
        margin-left: 2.656vw;
      }
    }

    .contentBox {
      width: 33.135vw;
      margin: 0 auto;
      margin-top: 3.281vw;
      ::v-deep {
        .el-input--medium .el-input__inner {
          width: 100%;
          height: 2.516vw;
          background-color: rgba(196, 196, 196, 0.13);
          border-radius: 36px;
          border: none;
        }

      }

      .sendAuthCode {
        font-size: 0.625vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #009944;
        margin-left: 2%;
        cursor: pointer;
      }

      .el-button {
        margin-left: 18%;
        width: 21.229vw;
        height: 2.5vw;
        background: #009944;
        border-radius: 1.25vw;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
      }
      .backLogin {
        font-size: 0.625vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #009944;
        text-align: right;
        cursor: pointer;
      }
    }
  }
}

.bottom {
  width: 100vw;
  height: 3.281vw;
  background: #EDEDED;
  position: fixed;
  bottom: 0;
  font-size: 0.573vw;
  text-align: center;
  div {
    margin-top: 0.729vw;
  }
  div:nth-child(2) {
    margin-top: 0.521vw;
  }
}

.phonenumber {
  ::v-deep {
    .el-form-item__content {
      display: flex;

    }
  }
}

.statement {
  font-size: 11px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #FFFFFF;
  position: absolute;
  bottom: 10px;
  left: 10%;
  li {
    list-style: none;
    text-align: center;
  }
}
</style>
<style  lang="scss">
.contentBox{
  ::v-deep{
    .el-form-item__content{
  width:80%;
}
  }

}
</style>
