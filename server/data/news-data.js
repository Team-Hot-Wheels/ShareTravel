module.exports = function (models) {
    let {News} = models;

    return {
        createNews(article) {
            let news = new News(article);

            return new Promise((resolve, reject) => {
                news.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(news);
                });
            });
        },
        getAllNews() {
            return new Promise((resolve, reject) => {
                News.find((err, news) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(news);
                });
            });
        },
        deleteNews(newsId) {
            return new Promise((resolve, reject) => {
                News.find({ '_id': newsId }).remove().exec();
                resolve();
            });
        }
    }
}