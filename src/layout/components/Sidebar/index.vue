<template>
    <div :class="{'has-logo':showLogo}" :style="{backgroundColor:sidebarBgCol}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="sidebarBgCol"
                :text-color="settings.sideTheme === 'theme-dark' ? variables.menuText : 'rgba(0,0,0,.65)'"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in sidebarRouters"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
        sidebarBgCol(){
            let style={}
            if(this.settings.sideTheme === 'theme-dark'){
                style.backgroundColor= this.variables.menuBg
            }else if(this.settings.sideTheme === 'theme-light'){
            style.backgroundColor= this.variables.menuLightBg 
            }else if(this.settings.sideTheme === 'theme-blue'){
            style.backgroundColor= this.variables.menuBlueBg   
            }else if(this.settings.sideTheme === 'theme-skyBlue'){ 
                style.backgroundColor= this.variables.menuSkyBlueBg 
            }
            return `${style.backgroundColor}`;
        }

    }
};
</script>
