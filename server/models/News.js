const mongoose = require('mongoose');

let newsSchema = mongoose.Schema({
    title: { type: String },
    content: { type: String },
    createdOn: { type: Date }
});

mongoose.model("News", newsSchema);

module.exports = mongoose.model("News");

let News = mongoose.model("News", newsSchema);

module.exports.seedFirstArticle = () => {
    let currentDate = Date.now();

    News.find({}).then(news => {
        if (news.length === 0) {
            News.create({
                title: 'Travel share is alive!',
                content: 'Welcome to our app! :)',
                createdOn: currentDate
            })
            News.save
        }
    })
};