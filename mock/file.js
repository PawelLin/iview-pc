
res.setHeader('Content-Type', 'application/octet-stream')
res.setHeader('Content-Disposition','attachment;filename=test.txt');
setTimeout(() => {
    res.send('test.txt') // 下载成功
    // next(null, {
    //     code: '0000',
    //     message: '下载失败，form下载忽略'
    // })
}, 1500)