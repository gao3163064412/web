<template>
    <div class="sidebar-logo-container dynicClass" :class="{'collapse':collapse}" :style="{ backgroundColor:sidebarBgCol}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title" :style="{ color: sidebarTitleBg}">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title" :style="{ color: sidebarTitleBg}">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    variables() {
      return variables;
    },
    // sidebarTitleBg(){
    //   let styleColor
    //     if(this.sideTheme === 'theme-dark'){
    //         styleColor= this.variables.sidebarTitle
    //     }else if(this.sideTheme === 'theme-light'){
    //         styleColor= this.variables.sidebarLightTitle
    //     }else if(this.sideTheme === 'theme-blue'){
    //         styleColor= this.variables.sidebarBlueTitle
    //     }else if(this.sideTheme === 'theme-skyBlue'){
    //         styleColor= this.variables.sidebarSkyBlueTitle
    //     }
    //     return styleColor;
    // },
    // sidebarBgCol(){
    //     let style={}
    //     if(this.sideTheme === 'theme-dark'){
    //         style.backgroundColor= this.variables.menuBg
    //     }else if(this.sideTheme === 'theme-light'){
    //     style.backgroundColor= this.variables.menuLightBg
    //     }else if(this.sideTheme === 'theme-blue'){
    //     style.backgroundColor= this.variables.menuBlueBg
    //     }else if(this.sideTheme === 'theme-skyBlue'){
    //         style.backgroundColor= this.variables.menuSkyBlueBg
    //     }
    //     return `${style.backgroundColor}`;
    // },
    sidebarTitleBg(){
      let styleColor
      if(this.sideTheme === 'theme-dark'){
        styleColor= this.variables.sidebarTitle
      }else if(this.sideTheme === 'theme-light'){
        styleColor= this.variables.sidebarLightTitle
      }else if(this.sideTheme === 'theme-blue'){
        styleColor= this.variables.sidebarBlueTitle
      }else if(this.sideTheme === 'theme-skyBlue'){
        styleColor= this.variables.sidebarSkyBlueTitle
      }
      return styleColor;
    },
    sidebarBgCol(){
      let sidbarColor=''
      if(this.sideTheme === 'theme-dark'){
        sidbarColor= 'theme-dark'
      }else if(this.sideTheme === 'theme-light'){
        sidbarColor= 'theme-light'
      }else if(this.sideTheme === 'theme-blue'){
        sidbarColor= 'theme-blue'
      }else if(this.sideTheme === 'theme-skyBlue'){
        sidbarColor= 'theme-skyBlue'
      }
      return sidbarColor
    },
	sideTheme() {
      return this.$store.state.settings.sideTheme
    },
  },
  data() {
    return {
      // title: '智慧实验室数字化管理平台',
      title: '',
      logo: logoImg
    }
  }
}
</script>

<style lang="scss">
  /*黑蓝*/
  $oneBg: #2F4050;
  $oneActiveUlBg: #1b2b3a;
  $oneActiveLiBg: #264a6b;
  $oneActiveBorder: #1890FF;
  $oneTxtColor: #fff;
  $oneActiveTxtColor: #fff;
  /*蓝白*/
  $twoBg: #FFF;
  $twoActiveUlBg: #E2EDFF;
  $twoActiveLiBg: #ccdcfe;
  $twoActiveBorder: #739AFA;
  $twoTxtColor: #828282;
  $twoActiveTxtColor: #267DFD;
  /*蓝蓝*/
  $threeBg: #739AFA;
  $threeActiveUlBg: #E2EDFF;
  $threeActiveLiBg: #ccdcfe;
  $threeActiveBorder: #739AFA;
  $threeTxtColor: #fff;
  $threeActiveTxtColor: #267DFD;
  /*紫色*/
  $fourBg: #EFE0FF;
  $fourActiveUlBg: #ECD1FF;
  $fourActiveLiBg: #d7b0f3;
  $fourActiveBorder: #B24FFF;
  $fourTxtColor: #6D675A;
  $fourActiveTxtColor: #fff;
  $fourHoverTxtColor: #B35DF3;

  /*黑蓝主题*/
  .theme-dark {
    color: $oneTxtColor !important;
    background-color: $oneBg !important;
    /*总的ul*/
    .el-menu {
      background-color: $oneBg !important;
      /*无子菜单的一级菜单*/
      .el-menu-item {
        color: $oneTxtColor !important;
        background-color: $oneBg !important;
        &.is-active {
          color: $oneActiveTxtColor !important;
          background-color: $oneActiveLiBg !important;
          position: relative;
          &:before {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 2px;
            height: 100%;
            display: inline-block;
            background-color: $oneActiveBorder;
          }
        }
        &:hover {
          background-color: $oneActiveUlBg !important;
        }
      }
      /*有子菜单的li*/
      .el-submenu {
        background-color: $oneBg !important;
        /*激活*/
        &.is-active {
          background-color: $oneActiveUlBg !important;
          .el-submenu__title {
            background-color: $oneActiveUlBg !important;
            &:hover {
              color: $oneActiveTxtColor !important;
              background-color: $oneActiveLiBg !important;
            }
          }
          .el-menu-item{
            color: $oneTxtColor !important;
            background-color: $oneActiveUlBg !important;
            &:hover {
              background-color: $oneActiveLiBg !important;
            }
          }
        }
        /*标题*/
        .el-submenu__title {
          color: $oneTxtColor !important;
          background-color: $oneBg !important;
          &:hover {
            background-color: $oneActiveUlBg !important;
          }
        }
        /*li*/
        .el-menu-item{
          color: $oneTxtColor !important;
          background-color: $oneBg !important;
          &.is-active {
            color: $oneActiveTxtColor !important;
            background-color: $oneActiveLiBg !important;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              left: 0;
              top: 0;
              width: 2px;
              height: 100%;
              display: inline-block;
              background-color: $oneActiveBorder;
            }
          }
          &:hover {
            color: $oneActiveTxtColor !important;
            background-color: $oneActiveUlBg !important;
          }
          &:focus {
            color: #fff !important;
            background-color: $oneActiveLiBg !important;
          }
        }
      }

    }
  }


  /*蓝白主题*/
  .theme-light {
    color: $twoTxtColor !important;
    background-color: $twoBg !important;
    /*总的ul*/
    .el-menu {
      background-color: $twoBg !important;
      /*无子菜单的一级菜单*/
      .el-menu-item {
        color: $twoTxtColor !important;
        background-color: $twoBg !important;
        &.is-active {
          color: $twoActiveTxtColor !important;
          background-color: $twoActiveLiBg !important;
          position: relative;
          &:before {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 2px;
            height: 100%;
            display: inline-block;
            background-color: $twoActiveBorder;
          }
        }
        &:hover {
          color: $twoActiveTxtColor !important;
          background-color: $twoActiveUlBg !important;
        }
      }
      /*有子菜单的li*/
      .el-submenu {
        background-color: $twoBg !important;
        /*激活*/
        &.is-active {
          background-color: $twoActiveUlBg !important;
          .el-submenu__title {
            background-color: $twoActiveUlBg !important;
            &:hover {
              color: $twoActiveTxtColor !important;
              background-color: $twoActiveLiBg !important;
            }
          }
          .el-menu-item{
            color: $twoTxtColor !important;
            background-color: $twoActiveUlBg !important;
            &:hover {
              background-color: $twoActiveLiBg !important;
            }
          }
        }
        /*标题*/
        .el-submenu__title {
          color: $twoTxtColor !important;
          background-color: $twoBg !important;
          &:hover {
            color: $twoActiveTxtColor !important;
            background-color: $twoActiveUlBg !important;
          }
        }
        /*li*/
        .el-menu-item{
          color: $twoTxtColor !important;
          background-color: $twoBg !important;
          &.is-active {
            color: $twoActiveTxtColor !important;
            background-color: $twoActiveLiBg !important;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              left: 0;
              top: 0;
              width: 2px;
              height: 100%;
              display: inline-block;
              background-color: $twoActiveBorder;
            }
          }
          &:hover {
            color: $twoActiveTxtColor !important;
            background-color: $twoActiveUlBg !important;
          }
          &:focus {
            color: $twoActiveTxtColor !important;
            background-color: $twoActiveLiBg !important;
          }
        }
      }

    }
  }


  /*蓝蓝主题*/
  .theme-blue {
    color: $threeTxtColor !important;
    background-color: $threeBg !important;
    /*总的ul*/
    .el-menu {
      background-color: $threeBg !important;
      /*无子菜单的一级菜单*/
      .el-menu-item {
        color: $threeTxtColor !important;
        background-color: $threeBg !important;
        &.is-active {
          color: $threeActiveTxtColor !important;
          background-color: $threeActiveLiBg !important;
          position: relative;
          &:before {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 2px;
            height: 100%;
            display: inline-block;
            background-color: $threeActiveBorder;
          }
        }
        &:hover {
          color: $threeActiveTxtColor !important;
          background-color: $threeActiveUlBg !important;
        }
      }
      /*有子菜单的li*/
      .el-submenu {
        background-color: $threeBg !important;
        /*激活*/
        &.is-active {
          background-color: $threeActiveUlBg !important;
          .el-submenu__title {
            color: #828282 !important;
            background-color: $threeActiveUlBg !important;
            &:hover {
              color: $threeActiveTxtColor !important;
              background-color: $threeActiveLiBg !important;
            }
          }
          .el-menu-item{
            color: #828282 !important;
            background-color: $threeActiveUlBg !important;
            &:hover {
              background-color: $threeActiveLiBg !important;
            }
          }
        }
        /*标题*/
        .el-submenu__title {
          color: $threeTxtColor !important;
          background-color: $threeBg !important;
          border-left: 2px solid $threeBg;
          &:hover {
            color: $threeActiveTxtColor !important;
            background-color: $threeActiveUlBg !important;
          }
        }
        /*li*/
        .el-menu-item{
          color: $threeTxtColor !important;
          background-color: $threeBg !important;
          &.is-active {
            color: $threeActiveTxtColor !important;
            background-color: $threeActiveLiBg !important;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              left: 0;
              top: 0;
              width: 2px;
              height: 100%;
              display: inline-block;
              background-color: $threeActiveBorder;
            }
          }
          &:hover {
            color: $threeActiveTxtColor !important;
            background-color: $threeActiveUlBg !important;
          }
          &:focus {
            color: $threeActiveTxtColor !important;
            background-color: $threeActiveLiBg !important;
          }
        }
      }

    }
  }


  /*紫色主题*/
  .theme-skyBlue {
    color: $fourTxtColor !important;
    background-color: $fourBg !important;
    /*总的ul*/
    .el-menu {
      background-color: $fourBg !important;
      /*无子菜单的一级菜单*/
      .el-menu-item {
        color: $fourTxtColor !important;
        background-color: $fourBg !important;
        &.is-active {
          color: $fourActiveTxtColor !important;
          background-color: $fourActiveLiBg !important;
          position: relative;
          &:before {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 2px;
            height: 100%;
            display: inline-block;
            background-color: $fourActiveBorder;
          }
        }
        &:hover {
          color: $fourHoverTxtColor !important;
          background-color: $fourActiveUlBg !important;
        }
      }
      /*有子菜单的li*/
      .el-submenu {

        background-color: $fourBg !important;
        /*激活*/
        &.is-active {
          background-color: $fourActiveUlBg !important;
          .el-submenu__title {
            color: $fourTxtColor !important;
            background-color: $fourActiveUlBg !important;
            &:hover {
              color: $fourActiveTxtColor !important;
              background-color: $fourActiveLiBg !important;
            }
          }
          .el-menu-item{
            color: $fourTxtColor !important;
            background-color: $fourActiveUlBg !important;
            &:hover {
              color: $fourActiveTxtColor !important;
              background-color: $fourActiveLiBg !important;
            }
          }
        }
        /*标题*/
        .el-submenu__title {
          color: $fourTxtColor !important;
          background-color: $fourBg !important;
          border-left: 2px solid $fourBg;
          &:hover {
            color: $fourHoverTxtColor !important;
            background-color: $fourActiveUlBg !important;
          }
        }
        /*li*/
        .el-menu-item{
          color: $fourTxtColor !important;
          background-color: $fourBg !important;
          &.is-active {
            color: $fourActiveTxtColor !important;
            background-color: $fourActiveLiBg !important;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              left: 0;
              top: 0;
              width: 2px;
              height: 100%;
              display: inline-block;
              background-color: $fourActiveBorder;
            }
          }
          &:hover {
            color: $fourHoverTxtColor !important;
            background-color: $fourActiveUlBg !important;
          }
          &:focus {
            color: $fourActiveTxtColor !important;
            background-color: $fourActiveLiBg !important;
          }
        }
      }

    }
  }
</style>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
