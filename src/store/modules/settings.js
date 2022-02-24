import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'
import {getTheme} from "@/api/setting";

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''
const state = {
  // theme: storageSetting.theme || variables.theme,
  // sideTheme: storageSetting.sideTheme || sideTheme,
  // showSettings: showSettings,
  // topNav:  storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  // tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  // fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
  // sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo
  theme: variables.theme,
  sideTheme: sideTheme,
  topNav:  topNav,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  showSettings: showSettings,
  systemTitle:"",//实验室预约检测系统
  untilTitle:"",//中国科学院上海药物研究所
  logoUrl:"",//logo
}
const mutations = {
  // CHANGE_SETTING: (state, { key, value }) => {
  //   if (state.hasOwnProperty(key)) {
  //     state[key] = value
  //   }
  // }
  GET_SETTING: (state,data)=>{
    console.log()
    state.theme = data.theme ? data.theme : variables.theme;
    state.sideTheme = data.sideTheme ? data.sideTheme : sideTheme;
    state.topNav = data.topNav ? data.topNav : topNav;
    state.tagsView = data.tagsView ? data.tagsView : tagsView;
    state.fixedHeader = data.fixedHeader ? data.fixedHeader : fixedHeader;
    state.sidebarLogo = data.sidebarLogo ? data.sidebarLogo : sidebarLogo;
  },
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_SYSTEMNAME:(state,data)=>{
    state.systemTitle=data
  },
  CHANGE_COMPANYNAME:(state,data)=>{
    state.untilTitle=data
  },
  CHANGE_LOGOURL:(state,data)=>{
    state.logoUrl=data
  }
}

const actions = {
  getSetting({ commit }, data) {
    // 用于初始化
    // console.log('aaa111')
    commit('GET_SETTING', data)
  },
  changeSetting({ commit }, data) {
    // console.log('aaa2222')
    commit('CHANGE_SETTING', data)
  },
  changeCompanyName ({commit},data){
    commit('CHANGE_COMPANYNAME',data)
  },
  changesystemName ({commit},data){
    commit('CHANGE_SYSTEMNAME',data)
  },

  changeLogoUrl ({commit},data){
    commit('CHANGE_LOGOURL',data)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

