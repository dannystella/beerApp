let Comment = require('../models/commentModel');
let Article = require('../models/articleModel');
let Beer = require('../models/beerModel');
let beerHelpers = require('./beerController');
let commentHelpers = {};

commentHelpers.save = (comment) => {
    let streamData = comment.streamData;
    let beerId = comment.id;
    comment = comment.values;
    comment.streamData = streamData;
    return commentHelpers.create(comment)
        .then((commentText) => {
            return beerHelpers.addComment(beerId, commentText);
        })
}

commentHelpers.create = (schema) => {
    return Comment.create(schema)
        .then((comment) => {
            return comment;
        })
}

commentHelpers.delete = (id) => {
    return Comment.findOneAndRemove({ _id: id }).exec();

}

module.exports = commentHelpers;