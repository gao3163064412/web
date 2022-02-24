import request from '@/utils/request'

// 查询采购申请列表
export function listPurchase(query) {
  return request({
    url: '/purchase/purchase/list',
    method: 'get',
    params: query
  })
}










// 查询采购申请详细
export function getPurchase(query) {
  return request({
    url: '/purchase/purchase/view',
    method: 'get',
    params: query
  })
}


//计划批号下拉
export function getPlanCode() {
  return request({
    url: '/purchase/purchase/getPlanCode',
    method: 'get'
  })
}


//获取采购计划列表



export function getPlanDetails(purId) {
  return request({
    url: '/purchase/purchase/get_plan_details/'+purId,
    method: 'get'
  })
}



//获取采购申请详细信息

export function getPurchaseEdit(applyId) {
  return request({
    url: '/purchase/purchase/'+applyId,
    method: 'get'
  })
}












// 新增采购申请
export function addPurchase(data) {
  return request({
    url: '/purchase/purchase/add',
    method: 'post',
    data: data
  })
}




// 审批记录
export function auditRecordApplyId(applyId) {
  return request({
    url: '/purchase/purchase/auditRecord/'+applyId,
    method: 'get',
  })
}







// 修改采购申请
export function updatePurchase(data) {
  return request({
    url: '/purchase/purchase/edit',
    method: 'post',
    data: data
  })
}

// 删除采购申请
export function delPurchase(applyId) {
  return request({
    url: '/purchase/purchase/delete/' + applyId,
    method: 'get'
  })
}

// 导出采购申请
export function exportPurchase(query) {
  return request({
    url: '/purchase/purchase/export',
    method: 'get',
    params: query
  })
}





// 查看页面导出功能

export function exportShow(query) {
  return request({
    url: '/purchase/purchase/view/export',
    method: 'get',
    params: query
  })
}

//预览采购申请单
export function viewApplyFrom(applyId) {
  return request({
    url: '/purchase/purchase/getApplyFrom/'+applyId,
    method: 'get',
  })
}

