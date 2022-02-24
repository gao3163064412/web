import request from '@/utils/request'

// 查询登录日志列表
export function list(query) {
  return request({
    url: '/monitor/logininfor/list',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function delLogininfor(infoId) {
  return request({
    url: '/monitor/logininfor/delete/' + infoId,
    method: 'get'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: '/monitor/logininfor/clean/delete',
    method: 'get'
  })
}

// 导出登录日志
export function exportLogininfor(query) {
  return request({
    url: '/monitor/logininfor/export',
    method: 'get',
    params: query
  })
}
