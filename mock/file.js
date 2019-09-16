


res.setHeader('Content-Disposition','attachment;filename=test.txt');

setTimeout(() => {
    next(null, {
        code: '0000',
        message: '本地模拟返回的Blob的type无论成功还是失败都为json',
        url: req.url,
        query: req.query,
        data: req.data
    })
}, 1500)