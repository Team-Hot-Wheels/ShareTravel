module.exports = function (data) {
    return {
        getAllNews(req, res) {
            data.getAllNews()
                .then((news) => {
                    res.render('news/news', {data: news});
                });
        },
        deleteNews(req, res) {
            let newsId = req.body.id;
            data.deleteNews(newsId).then(() =>
                res.redirect('/admin/admin-delete-news'));
        },
        deleteNewsIndex(req, res) {
            data.getAllNews()
                .then((news) => {
                    res.render('admin/admin-delete-news', {data: news});
                });
        }
    }
};