


res.setHeader('Content-Disposition','attachment;filename=test.txt');

next(null, {
    code: '0000',
    url: req.url,
    query: req.query,
    data: req.data
})