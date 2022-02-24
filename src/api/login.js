import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
//注册接口
export function registered(data) {
  return request({
    url: '/registered',
    method: 'post',
    data: data
  })
}
//人员类型
 //person_type
// 根据字典类型查询字典数据信息人员类型
export function getDPersonType(dictType) {
  return request({
    url: '/system/dict/data/selectByType/' + dictType,   
    method: 'get'
  })
}