import axios from './axios'

// 获取机构列表
export function getOrgList (pOrgCode) {
    return axios.post('/common/org', { pOrgCode })
}