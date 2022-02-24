import request from '@/utils/request'

// 查询访客申请列表
export function listManage(query) {
  return request({
    url: '/visitor/manage/list',
    method: 'get',
    params: query
  })
}
//访客申请查看
export function getManage(id) {
  return request({
    url: '/visitor/manage/' + id,
    method: 'get'
  })
}

// 修改访客管理状态
export function updateStatus(data) {
  return request({
    url: 'system/user/changeStatus/edit',
    method: 'post',
    data: data
  })
}
// 新增访客管理
export function addManage(data) {
  return request({
    url: '/visitor/manage',
    method: 'post',
    data: data
  })
}

// 修改访客管理
export function updateManage(data) {
  return request({
    url: '/visitor/manage/edit',
    method: 'post',
    data: data
  })
}

// 删除访客管理
export function delManage(id) {
  return request({
    url: '/visitor/manage/delete/' + id,
    method: 'get'
  })
}

// 导出访客管理
export function exportManage(query) {
  return request({
    url: '/visitor/manage/export',
    method: 'get',
    params: query
  })
}
// 导出访客管理
export function exportManageExp(query) {
  return request({
    url: '/visitor/manage/exportVisitorManage',
    method: 'get',
    params: query
  })
}
//访客申请审核
export function applyAudit(query) {
  return request({
    url: '/visitor/manage/audit',
    method: 'get',
    params: query
  })
}
//访客管理列表

export function getlistManage(query) {
  return request({
    url: '/visitor/manage/manageList',
    method: 'get',
    params: query
  })
}
//访问管理查看按钮

export function getManageById(id) {
  return request({
    url: '/visitor/manage/visitorsByUserId?id=' + id,
    method: 'get'
  })
}
//查看用户角色
export function getRolesById(id) {
  return request({
    url: '/system/role/optionselect?id=' + id,
    method: 'get'
  })
}
//用户已有角色
export function getHasRolesById(id) {
  return request({
    url: '/visitor/manage/findRoleByUser?id=' + id,
    method: 'get'
  })
}
//更改角色
export function updateRoles(data) {
  return request({
    url: '/visitor/manage/updateRoles',
    method: 'post',
    data: data
  })
}
//重置密码

export function resetPsd(data) {
  return request({
    url: '/visitor/manage/resetPassword',
    method: 'post',
    data: data
  })
}




