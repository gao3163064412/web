import request from '@/utils/request'
// 获取未读取消息数
export function getMessageNum() {
  return request({
    url: '/system/notice/getNoReadNum',
    method: 'get',
  })
}

// 查询公告列表
export function listNotice(query) {
  return request({
    url: '/system/notice/list',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'get'
  })
}
//是否展示消息图标
export function checkNoticeIcon() {
  return request({
    url: 'system/notice/checkNoticeIcon',
    method: 'get'
  })
}

// 保存公告
export function addNotice(data) {
  return request({
    url: '/system/notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data) {
  return request({
    url: '/system/notice/edit',
    method: 'post',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId) {
  return request({
    url: '/system/notice/delete/' + noticeId,
    method: 'get'
  })
}
// 获取通知公告树
export function selectNoticeTree() {
  return request({
    url: '/system/notice/selectNoticeTree',
    method: 'get'
  })
}
// 发布公告
export function publishNotice(data) {
  return request({
    url: '/system/notice/release',
    method: 'post',
    data: data
  })
}
// 获取角色信息列表
export function getRoleList() {
  return request({
    url: '/share/getRoles',
    method: 'get'
  })
}
// 获取角人员列表
export function getUserList(data) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: data
  })
}

// 批量查看
export function batch_view(noticeIds) {
  return request({
    url: `system/notice/batch_view/${noticeIds}`,
    method: 'get'
  })
}


// 导出
export function exportNotice(query) {
  return request({
    url: `/system/notice/export`,
    method: 'GET',
    params: query
  })
}
