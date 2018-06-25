let Comment = require('../models/commentModel');
let Article = require('../models/articleModel');
let Beer = require('../models/beerModel');
let beerHelpers = require('./beerController');
let commentHelpers = {};

commentHelpers.save = (comment) => {
    // console.log(comment, "COMMENTS");
    // if (comment.trigger === 'beer') {
    //     return beerHelpers.addComment(comment.id, comment.values);
    // }
    let beerId = comment.id;
    comment = comment.values
    return commentHelpers.create(comment)
    .then((commentText) => {
        return beerHelpers.addComment(beerId, commentText);

    })

}

commentHelpers.create = (schema) => {
    console.log(schema);
    return Comment.create(schema)
    .then((comment) => {
        console.log("real comment", comment);
        return comment;
    })
}

commentHelpers.delete = (id) => {
    return Comment.findOneAndRemove({_id: id}).exec();

}

module.exports = commentHelpers;