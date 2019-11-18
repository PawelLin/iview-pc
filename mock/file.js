


res.setHeader('Content-Disposition','attachment;filename=test.txt');

setTimeout(() => {
    next(null, undefined) // 下载成功
    // next(null, {
    //     code: '0000',
    //     message: '下载失败，form下载忽略',
    //     url: req.url,
    //     query: req.query,
    //     data: req.data
    // })
}, 1500)