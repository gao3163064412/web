import request from '@/utils/request'

// 查询签章管理列表
export function listSignature(query) {
  return request({
    url: '/system/signature/list',
    method: 'get',
    params: query
  })
}

// 查询签章管理详细
export function getSignature(id) {
  return request({
    url: '/system/signature/' + id,
    method: 'get'
  })
}

// 新增签章管理
export function addSignature(data) {
  return request({
    url: '/system/signature',
    method: 'post',
    data: data
  })
}

// 修改签章管理
export function updateSignature(data) {
  return request({
    url: '/system/signature/edit',
    method: 'post',
    data: data
  })
}

// 删除签章管理
export function delSignature(id) {
  return request({
    url: '/system/signature/delete/' + id,
    method: 'get'
  })
}

// 导出签章管理
export function exportSignature(query) {
  return request({
    url: '/system/signature/export',
    method: 'get',
    params: query
  })
}
