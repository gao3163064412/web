import request from '@/utils/request'

// 存入主题
export function setTheme(data) {
  return request({
    url: '/system/redis/setLayoutSetting',
    method: 'post',
    data: data
  })
}

// 获取主题
export function getTheme() {
  return request({
    url: '/system/redis/getLayoutSetting',
    method: 'get'
  })
}
