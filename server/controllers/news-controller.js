module.exports = function (data) {
    return {
        createNews(req, res){
            // TODO:
            res.send('CREATE NEWS')
        },
        getAllNews(req, res) {
            data.getAllNews()
                .then((news) => {
                    console.log(news);
                    res.render('news/news', { data: news });
                });
        }
    }
};
