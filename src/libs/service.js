import Vue from 'vue'
import axios from './axios'

// 获取机构列表
export function getOrgList (pOrgCode) {
    return axios.post('/common/org', { pOrgCode })
}

export function downloadBlob (url, data) {
    return axios.post(url, data, { responseType: 'blob' }).then(res => {
        // 下载失败，返回{ code: '9999' }，但responseType: 'blob'会把data强制转为blob
        // 解决：将已转为blob类型的data转回json格式，判断是否下载成功
        let reader = new FileReader()
        reader.onload = () => {
            try {
                let data = JSON.parse(reader.result)
                Vue.prototype.$Loading.error()
                Vue.prototype.$Message.error(data.message)
            } catch (error) {
                const blob = new Blob([res.data])
                const fileName = decodeURIComponent(res.headers['content-disposition'].split(';')[1].split('filename=')[1])
                if ('download' in document.createElement('a')) { // 非IE下载
                    let a = document.createElement('a')
                    a.download = fileName
                    a.style.display = 'none'
                    a.href = URL.createObjectURL(blob)
                    document.body.appendChild(a)
                    a.click()
                    URL.revokeObjectURL(a.href) // 释放URL 对象
                    document.body.removeChild(a)
                } else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName)
                }
            }
        }
        reader.readAsText(res.data)
    })
}

export function downloadForm (url, data) {
    // let iframe = document.createElement('iframe')
    let form = document.createElement('form')
    form.method = 'post'
    form.action = `${process.env.VUE_APP_BASEURL}${url}`
    for (let key in data) {
        let i = document.createElement('input')
        i.type = 'hidden'
        i.value = data[key]
        i.name = key
        form.appendChild(i)
    }
    // iframe.appendChild(form)
    document.body.appendChild(form)
    form.submit()
    form.remove()
    // iframe.remove()
}
