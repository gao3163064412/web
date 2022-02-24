import request from '@/utils/request'

// 查询销售商管理列表
export function listSell(query) {
  return request({
    url: '/sell/sell/list',
    method: 'get',
    params: query
  })
}

// 查询销售商管理详细
export function getSell(sellId) {
  return request({
    url: '/sell/sell/' + sellId,
    method: 'get'
  })
}

// 新增销售商管理
export function addSell(data) {
  return request({
    url: '/sell/sell/add',
    method: 'post',
    data: data   
  })
}

// 修改销售商管理
export function updateSell(data) {
  return request({
    url: '/sell/sell/edit',
    method: 'post',
    data: data
  })
}

// 删除销售商管理
export function delSell(sellId) {
  return request({
    url: '/sell/sell/delete/' + sellId,
    method: 'get'
  })
}

// 导出销售商管理
export function exportSell(query) {
  return request({
    url: '/sell/sell/export',
    method: 'get',
    params: query
  })
}



//采购记录  
export function recordList(query) {
  return request({
    url: '/sell/sell/record_list',
    method: 'get',
    params: query
  })
}

//采购记录 导出



export function recordListExport(query) {
  return request({
    url: '/sell/sell/record_list/export',
    method: 'get',
    params: query
  })
}