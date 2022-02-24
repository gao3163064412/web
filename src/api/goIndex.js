import request from '@/utils/request'

export function getUrlToken(ticket) {
    return request({
      url: '/osslogin?ticket='+ticket,
      method: 'get'
    })
  }


  export function getIsToken() {
    return request({
      url: '/getToken',
      method: 'get'
    })
  }

