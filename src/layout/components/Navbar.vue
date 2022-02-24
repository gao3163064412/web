<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
      v-if="!topNav"
    />
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip> -->
        <div
          class="fontLibrary right-menu-item iconfont icon-zifuxiao"
          @click="isShowFontLibrary"
        ></div>
        <div
          class="clearSession iconfont icon-delete right-menu-item"
          @click="clearAllCookie"
        ></div>
        <div class="notifiy right-menu-item" @click="showSystemNotice">
          <div
            v-show="isShowNotifilyIcon"
            class="origin iconfont icon-tongzhi"
          ></div>
          <div class="bgRed" v-if="messageNum > 0 && isShowNotifilyIcon">
            {{ messageNum | NumFilter }}
          </div>
        </div>
        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <FontLibrary
      :showFontLibrary="showFontLibrary"
      v-if="showFontLibrary.isShow"
    ></FontLibrary>
  </div>
</template>

<script>
import FontLibrary from "@/components/FontLibrary/index";
import { mapGetters, mapActions } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import { listNotice, checkNoticeIcon } from "../../api/system/notice";
export default {
  components: {
    FontLibrary,
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    listNotice,
    RuoYiDoc,
  },
  data() {
    return {
      isShowNotifilyIcon: false,
      // total: 0,
      isShowNotice: true,
      //showFontLibrary:false
      showFontLibrary: { isShow: false },
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "messageNum"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },
  mounted() {
    // this.getListTotal();
    this.setMessageNum();
    checkNoticeIcon().then((res) => {
      this.isShowNotifilyIcon = res.data;
    });
  },
  filters:{
      NumFilter(e){
        var a;
         if(e>=100){
           a='99+'
         }else{
           a=e
         }
         return a
      }
  },
  methods: {
    ...mapActions(["setMessageNum"]),
    ////删除cookie中所有定变量函数 并 登出
    clearAllCookie() {
      this.$confirm("是否确认清除浏览器缓存？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let myDate = new Date();
        myDate.setTime(-1000); //设置时间
        let data = document.cookie;
        let dataArray = data.split("; ");
        for (let i = 0; i < dataArray.length; i++) {
          let varName = dataArray[i].split("=");
          document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
        }
        this.$store.dispatch("LogOut").then(() => {
          location.href = "/";
        });
      });
    },
    // getListTotal() {
    //   listNotice({ pageNum: 1, pageSize: 10 }).then((response) => {
    //     this.total = response.total;
    //   });
    // },
    isShowFontLibrary() {
      this.showFontLibrary.isShow = !this.showFontLibrary.isShow;
    },
    showSystemNotice() {
      this.isShowNotice = !this.isShowNotice;
      this.$router.push({ path: "/baseManage/notice" });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.href = "/";
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }
    .notifiy {
      position: relative;
      .bgRed {
        position: absolute;
        min-width: 15px;
        height: 15px;
        float: right;
        right: 5px;
        background: red;
        border-radius: 8px;
        top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 12px;
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      .icon-tongzhi {
        font-size: 18px !important;
        cursor: pointer;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
