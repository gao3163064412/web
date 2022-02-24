<template>
  <div class="crmLogin">
    <div v-show="flag == 0" class="login_cont">
      <div class="loginNewBg">
        <div class="log_content">
          <div class="wel">欢迎登录</div>
          <el-form
            :hide-required-asterisk="true"
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            label-position="top"
          >
            <el-form-item label="用户名" prop="username"
              ><el-input
                v-model="loginForm.username"
                type="text"
                auto-complete="off"
              >
              </el-input
            ></el-form-item>
            <el-form-item label="登录密码" prop="password" class="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                @keyup.enter.native="handleLogin"
              >
              </el-input>
              <div class="a"></div>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button
                :loading="loading"
                size="medium"
                style="
                  width: 100%;
                  background-color: #2255a4;
                  color: #fff;
                  border: 0;
                "
                @click.native.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
            <div class="flx al_c just_between">
              <!-- <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox> -->
              <div></div>
              <div @click="registerBtn()" style="cursor: pointer; color: #fff">
                立即注册
              </div>
            </div>
          </el-form>
          <Verify
            @success="capctchaCheckSuccess"
            :mode="'pop'"
            :captchaType="'blockPuzzle'"
            :imgSize="{ width: '330px', height: '155px' }"
            ref="verify"
          ></Verify>
        </div>
        <!-- <div class="left">
        <div class="imgbox">
          <div class="text">
            <img :src="$store.state.settings.logoUrl" alt="" />
            <div></div>
          </div>

          <div class="cent"></div>
          <span class="txt"></span>
        </div>
        <ul class="statement">
          <li>系统支持主流浏览器、火狐、谷歌、360极速</li>
          <li>北京盛元广通科技有限公司 Copyright©2016-2021 版权所有</li>
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
              <div
                @click="registerBtn()"
                style="cursor: pointer; color: #009944"
              >
                立即注册
              </div>
            </div>
          </el-form>
        </div>
      </div> -->
      </div>
      <div class="log_bottom">
        <div>系统支持主流浏览器、火狐、谷歌、360极速</div>
        <div>北京盛元广通科技有限公司 Copyright©2016-2021 版权所有</div>
      </div>
    </div>
    <!-- 注册 -->
    <div class="register" v-if="flag == 1">
      <div class="top">
        <!-- <img src="../assets/images/regTitle.png" alt="" /> -->
        <div>
          <div class="SysIcon">
            <img src="../assets/images/systemIcon.png" alt="" />
          </div>
          <div class="sysDesc">
            <div class="cnDesc">智慧实验室数字化管理平台</div>
            <div class="enDesc"></div>
          </div>
          <div class="pageName">用户注册</div>
        </div>
      </div>
      <div class="regBox">
        <div class="titleBox">
          <div class="titleDesc">个人信息</div>
        </div>
        <div class="contentBox">
          <el-row :gutter="12">
            <el-form
              ref="baseInfoForm"
              :model="formData"
              :rules="rules"
              size="medium"
              label-width="100px"
            >
             <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="formData.name"
                      placeholder="请输入姓名"
                      :maxlength="30"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="formData.sex" size="medium">
                      <el-radio
                        v-for="(item, index) in sexOptions"
                        :key="index"
                        :label="item.value"
                        :value="item.value"
                        :disabled="item.disabled"
                        >{{ item.label }}</el-radio
                      >
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
                  <el-row>
              <el-col :span="12">
                <el-form-item label="人员类型" prop="personType">
                  <el-select
                    v-model="formData.personType"
                    placeholder="请选择人员类型"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in personTypeOptions"
                      :key="index"
                      :label="item.dictLabel"
                      :value="item.dictCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号" prop="phone">
                  <el-input
                    v-model="formData.phone"
                    placeholder="请输入手机号"
                    :maxlength="20"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
                 </el-row>
                 <el-row>
                <el-col :span="12">
                  <el-form-item label="通讯地址" prop="postalAddres">
                    <el-input
                      v-model="formData.postalAddres"
                      placeholder="请输入通讯地址"
                      :maxlength="30"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电子邮箱" prop="email">
                    <el-input
                      v-model="formData.email"
                      placeholder="请输入电子邮箱"
                      :maxlength="30"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单位名称" prop="company">
                    <el-input
                      v-model="formData.company"
                      placeholder="请输入单位名称"
                      :maxlength="30"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="部门名称" prop="deptName">
                    <el-input
                      v-model="formData.deptName"
                      placeholder="请输入部门名称"
                      :maxlength="30"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--<el-row>
        
               <el-col :span="12">
                <el-form-item label="申请期限" prop="applyTimeList">
                  <el-date-picker
                    type="daterange"
                    v-model="formData.applyTimeList"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    start-placeholder="请选择起始时间"
                    end-placeholder="请选择结束时间"
                    range-separator="至"
                    :picker-options="pickerOptions"
                    clearable
                  ></el-date-picker>
                </el-form-item>
              </el-col> 
               </el-row>-->
              <el-row>
              <el-col :span="12">
                <el-form-item label="研究方向" prop="research">
                  <el-input
                    v-model="formData.research"
                    placeholder="请输入研究方向"
                    :maxlength="30"
                    clearable
                  ></el-input>
                </el-form-item>
                  <el-form-item label="密码" prop="password">
                  <el-input
                    v-model="formData.password"
                    placeholder="请输入密码"
                    :maxlength="30"
                    type="password"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input
                    v-model="formData.confirmPassword"
                    placeholder="请输入确认密码"
                    type="password"
                    :maxlength="30"
                    clearable
                  ></el-input>
                </el-form-item>


                <el-form-item label="注册理由" prop="registerReason">
                  <el-input
                    v-model="formData.registerReason"
                    placeholder="请输入注册理由"
                    :maxlength="150"
                    clearable
                  ></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="上传照片" prop="photoUrl">
                  <!-- <imageUpload
                    _action="/common/noLoginUpload"
                    :fileType="fileType"
                    :fileSize="fileSize"
                    v-model="formData.photoUrl"
                  >
                    <div class="el-upload__tip" slot="tip">
                      请上传
                      <template v-if="fileSize">
                        大小不超过
                        <b style="color: #f56c6c">{{ fileSize }}KB</b>
                      </template>
                      <template v-if="fileType">
                        格式为
                        <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                      </template>
                      的文件
                    </div>
                  </imageUpload> -->
                  <div class="flx">
                    <userAvatar v-model="formData.photoUrl" fileSize="200" />
                    <img
                      class="img1"
                      src="@/assets/images/demo1.jpg"
                      alt="规范示例图片"
                    />
                    <div class="flx column font12 line-h20">
                      <span>1、人脸正面免冠照，露出眉毛和眼睛。</span>
                      <span>2、照片大小不超过200KB。</span>
                      <span>3、照片尺寸建议为300px*350px。</span>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
                </el-row>





            </el-form>
          </el-row>
        </div>
      </div>
      <div class="regBox" style="height: 10.677vw">
        <div class="titleBox">
          <div class="titleDesc">课题组信息</div>
        </div>
        <div class="contentBox">
          <el-row :gutter="12">
            <el-form
              ref="unitInfoFrom"
              :model="formData2"
              :rules="rules"
              size="medium"
              label-width="100px"
            >
              <el-col :span="12">
                <el-form-item label="课题组负责人" prop="teacher">
                  <el-input
                    v-model="formData2.teacher"
                    placeholder="请输入课题组负责人"
                    :maxlength="30"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="teaPhone">
                  <el-input
                    v-model="formData2.teaPhone"
                    placeholder="请输入联系电话"
                    :maxlength="20"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作单位" prop="teaCompany">
                  <el-input
                    v-model="formData2.teaCompany"
                    placeholder="请输入工作单位"
                    :maxlength="30"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职称" prop="teaTitle">
                  <el-input
                    v-model="formData2.teaTitle"
                    placeholder="请输入职称"
                    :maxlength="30"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>

      <div class="btnCls">
        <div>
          <el-button type="primary" @click="submitForm">提交审核</el-button>
        </div>
        <div>注：提交后，系统管理员在48小时内审核通过，才能登录！<span style="cursor: pointer" @click="flag = 0">返回登录>></span></div>

      </div>

      <!-- <el-button @click="resetForm">重置</el-button> -->

      <div class="bottom">
        <div>系统支持主流浏览器、火狐、谷歌、360极速</div>
        <div>北京盛元广通科技有限公司 Copyright©2016-2021 版权所有</div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import Verify from "@/components/Verifition/Verify";
import {
  getPhoneCode,
  getDPersonType,
  getCustomerRegister,
  updateUserPwd,
  registered,
} from "@/api/login";
// import { getLoginSetupInfo } from "../api/loginAdmin/loginAdmin";
import userAvatar from "@/components/userAvatar";
export default {
  components: { Verify, userAvatar },
  name: "login",
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
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
      pickerOptions: {
        disabledDate(v) {
          return v.getTime() < new Date().getTime() - 86400000;
        },
      },
      fileType: ["jpg", "jpeg", "png", "svg"],
      fileSize: "200", //这里是  KB为单位
      formDataClass: {},
      personTypeOptions: [],
      nameEnglish: "",
      // backgroundAddr:"background:url(" + require("../assets/images/ClientBgc.png") + ");", //背景图
      flag: 0,
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */,
      auth_time: 0 /*倒计时 计数器*/,

      formData: {},
      rules: {
        photoUrl:[{ required: true, message: "请上传照片", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "性别不能为空", trigger: "change" }],
        personType: [
          { required: true, message: "请选择人员类型", trigger: "change" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号格式有误",
            trigger: "blur",
          },
        ],
        // postalAddres: [
        //   { required: true, message: "请输入通讯地址", trigger: "blur" },
        // ],
        //email: [{required: true, message: '请输入电子邮箱',trigger: 'blur' }],
        email: [{ validator: checkEmail, required: true, trigger: "blur" }],
        company: [
          { required: true, message: "请输入单位名称", trigger: "blur" },
        ],
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        research: [
          { required: true, message: "请输入研究方向", trigger: "blur" },
        ],
        // applyTimeList: [
        //   { required: true, message: "申请期限不能为空", trigger: "change" },
        // ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}$/,
            message: "密码必须包含字母、数字、特殊字符，长度8到16位",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { validator: confirm, required: true, trigger: "blur" },
        ],
        registerReason: [
          { required: true, message: "请输入注册理由", trigger: "blur" },
        ],
        teacher: [
          { required: true, message: "请输入课题组负责人", trigger: "blur" },
        ],
        teaPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        teaCompany: [
          { required: true, message: "请输入工作单位", trigger: "blur" },
        ],
        teaTitle: [{ required: true, message: "请输入职称", trigger: "blur" }],
      },
      rules2: {
        teacher: [
          { required: true, message: "请输入课题组负责人", trigger: "blur" },
        ],
        teaPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号格式有误",
            trigger: "blur",
          },
        ],
        teaCompany: [
          { required: true, message: "请输入工作单位", trigger: "blur" },
        ],
        teaTitle: [{ required: true, message: "请输入职称", trigger: "blur" }],
      },
      rules3: {
        phonenumber: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
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
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}$/,
            message: " 密码必须包含字母、数字、特殊字符，长度8到16位",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { validator: confirm2, required: true, trigger: "blur" },
        ],
      },
      sexOptions: [
        {
          label: "女",
          value: 1,
        },
        {
          label: "男",
          value: 0,
        },
      ],

      sendAuthCode2: true /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */,
      auth_time2: 0 /*倒计时 计数器*/,

      formData2: {
        phonenumber: undefined,
        password: undefined,
        confirmPassword: undefined,
        msmCode: undefined,
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
        .dispatch("Login", this.loginForm)
        .then(() => {
          this.$router.push({ path: "/index" }).catch(() => {});
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleLogin() {
      //记录当前登录页面的路由名称
      // this.$store.commit("setLoginName","/login")
      // sessionStorage.setItem("LoginName","/login")
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
    registerBtn() {
      this.flag = 1;
      this.personTypeOptions = [];
      getDPersonType("person_type").then((response) => {
        let data = response.data;
        data.forEach((ele) => {
          let obj = {};
          obj.dictLabel = ele.dictLabel;
          obj.dictCode = ele.dictValue;
          this.personTypeOptions.push(obj);
        });
      });
    },
    // 注册
    submitForm() {
      this.formData.teaTitle = this.formData2.teaTitle;
      this.formData.teaCompany = this.formData2.teaCompany;
      this.formData.teaPhone = this.formData2.teaPhone;
      this.formData.teacher = this.formData2.teacher;
      const p1 = new Promise((resolve, reject) => {
        this.$refs["unitInfoFrom"].validate((valid) => {
          if (valid) resolve();
        });
      });

      const p2 = new Promise((resolve, reject) => {
        this.$refs["baseInfoForm"].validate((valid) => {
          if (valid) resolve();
        });
      });
      Promise.all([p1, p2]).then(() => {
        console.log("验证通过,提交表单");
        registered(this.formData).then((res) => {
          if (res.code == 200) {
            this.$message.success("注册成功");
            this.flag = 0;
            this.resetForm();
          } else {
            this.$message.error("注册失败");
          }
        });
      });

      // this.$refs["unitInfoFrom"].validate()
      //       this.$refs["baseInfoForm"].validate((valid) => {
      //         if (valid) {
      //           registered(this.formData).then((res) => {
      //             if (res.code == 200) {
      //               this.$message.success("注册成功");
      //               this.flag = 0
      //               this.resetForm();
      //             } else {
      //               this.$message.error("注册失败");
      //             }
      //           });
      //         } else {
      //           return false;
      //         }
      //       });
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
      this.$refs["baseInfoForm"].resetFields();
      this.$refs["unitInfoFrom"].resetFields();
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
    // this.getCookie();
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.crmLogin {
  height: 100%;
  overflow-x: hidden;
  display: flex;
  background-color: #f8f8f8;
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
        color: #ffffff;
        margin-top: 2.323vw;
        text-align: center;
      }
      .txt {
        display: inline-block;
        font-size: 1.094vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
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
        background: #337ab7;
        border-radius: 1.25vw;
        font-size: 0.99vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
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
  height: 52.969vw;
  background: #f8f8f8;
  .top {
    width: 100vw;
    /*padding: 8px 0;*/
    background: #ffffff;
    display: flex;
    align-items: center;
    > div {
      width: 30.208vw;
      height: 3.646vw;
      margin-left: 10.469vw;
      display: flex;
      flex-direction: row;
      align-items: center;
      .SysIcon > img {
        width: 3.646vw;
        height: 3.646vw;
      }
      .sysDesc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        .cnDesc {
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #434343;
        }
        .enDesc {
          font-size: 9px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #434343;
        }
      }
      .pageName {
        width: 6.25vw;
        line-height: 2.083vw;
        height: 2.083vw;
        text-align: right;
        font-size: 1.042vw;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #337ab7;
        border-left: 1px solid #949494;
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
    margin-top: 10px;
    width: 74.115vw;
    // height: 24.844vw;
    background: #ffffff;
    border-radius: 0.521vw;

    .titleBox {
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      border-bottom: 1px solid #ebebeb;
      .titleDesc {
        color: #337ab7;
        margin-top: 0.064vw;
        margin-left: 20px;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: bold;
      }
    }

    .contentBox {
      width: 67.708vw;
      margin: 20px auto 0;
      ::v-deep {
        .el-input--medium .el-input__inner {
          // background: #FFFFFF;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          // width: 100%;
          // height: 2.516vw;
          // background-color: rgba(196, 196, 196, 0.13);
          // border-radius: 36px;
          // border: none;
        }
        .el-form-item--medium .el-form-item__label {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #111111;
          line-height: 40px;
        }
        .el-input {
          width: 90%;
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
        background: #337ab7;
        border-radius: 1.25vw;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
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
  .btnCls {
    width: 22.344vw;
    text-align: center;
    margin: 10px auto 0;
    display: flex;
    flex-direction: column;
    .el-button {
      width: 100%;
      height: 40px;
      background: #337ab7;
      border-radius: 1.25vw;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
    :nth-child(2) {
      margin-top: 10px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ff4848;
      margin-bottom: 10px;
      span{
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #337ab7;
        padding-right: 0px;
        text-align: right;
        margin-left: 20px;
      }
    }

  }
}

.bottom {
  width: 100vw;
  padding: 10px 0;
  background: #ededed;
  // position: fixed;
  bottom: 0;
  font-size: 0.573vw;
  text-align: center;
  div:nth-child(2) {
    margin-top: 10px;
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
  color: #ffffff;
  position: absolute;
  bottom: 10px;
  left: 10%;
  li {
    list-style: none;
    text-align: center;
  }
}
.login_cont {
  width: 100%;
  height: 100%;
  background: #1758b4;
  overflow: hidden;

  .loginNewBg {
    background-image: url("../assets/images/loginNewBg.png");
    background-size: 1920px 1080px;
    background-repeat: no-repeat;
    height: 100%;
    padding-top: 238px;
    display: flex;
    justify-content: center;
    // align-items: center;
  }
}
.log_content {
  width: 500px;
  height: 456px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0px 15px 24px 0px rgba(32, 32, 32, 0.23);
  border-radius: 15px;
  box-sizing: border-box;
  padding: 47px 68px 55px 75px;
  ::v-deep {
    .el-input__inner {
      background-color: transparent;
      color: #fff;
      font-weight: 500;
    }
    .el-form-item__label {
      color: #fff;
      font-weight: 500;
    }
    .el-checkbox__label {
      color: #fff;
    }
  }
}
.wel {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  line-height: 22px;
  text-align: center;
}
.log_bottom {
  color: #fff;
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-size: 11px;
}
.line-h20 {
  line-height: 20px;
  color: #ff4848;
  padding-left: 12px;
}
.img1 {
  width: 111.5px;
  height: 140px;
  margin-left: 75px;
}



</style>
