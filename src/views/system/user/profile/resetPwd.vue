<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="100px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input
        v-model="user.oldPassword"
        placeholder="请输入旧密码"
        type="password"
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        v-model="user.newPassword"
        placeholder="请输入新密码"
        type="password"
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        placeholder="请确认密码"
        type="password"
      />
    </el-form-item>
    <div class="flx pr al_c just_center">
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </div>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/user";

export default {
  data() {
        var equalToPassword = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入确认密码"));
      } else if (this.user.newPassword !== value) {
        callback(new Error("两次输入密码不一致!"));
      } else if(this.user.oldPassword == value){
        callback(new Error("新密码和旧密码不能一致!"));
      }else {
        callback();
      }
    };

    return {
      test: "1test",
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined,
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
           {
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}$/,
            message: "密码必须包含字母、数字、特殊字符，长度8到16位",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
           {
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,16}$/,
            message: "密码必须包含字母、数字、特殊字符，长度8到16位",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(
            (response) => {
              this.msgSuccess("修改成功");
            }
          );
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form-item {
  display: flex;
}
::v-deep {
  .el-form-item--medium .el-form-item__content {
    margin-left: 50px !important;
    width: 500px;
  }
}
.pr {
  padding-right: 520px;
}
</style>
