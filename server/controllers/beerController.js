let Beer = require('../models/beerModel');
let Comment = require('../models/commentModel');
let beerHelpers = {};

beerHelpers.save = (schema) => {
    return Beer.create(schema, function (err) {
        if (err) {
            if (err.code == 11000) { // unique index conflict
                return ['Resource document already exists.'];
            }
            console.log(err);
        } else {
            console.log("success");
        }
    });
}

beerHelpers.delete = (id) => {
    return Beer.findOneAndRemove({ _id: id }).exec();
}

beerHelpers.grabAll = () => {
    return Beer.find({}).exec();
}

beerHelpers.grabOne = (id) => {
    return Beer.find({ _id: id }).exec();
}

beerHelpers.addComment = (id, comment) => {
    return Beer.find({ _id: id }).exec().then((beer) => {
        beer[0].comments.push(comment);
        return beer[0].save();
    })
}

beerHelpers.deleteComment = (commentObj) => {
    let commentId = commentObj.commentId;
    let beerId = commentObj.beerId.beerId.id;
    return Beer.find({ _id: beerId }).exec().then((beer) => {
        for (var i = 0; i < beer[0].comments.length; i++) {
            if (beer[0].comments[i]._id.toString() === (commentId)) {
                beer[0].comments.splice(i, 1);
                return beer[0].save();
            }
        }
    })
}

beerHelpers.updateComment = (commentObj) => {
    let commentId = commentObj.beerId.comment._id;
    let beerId = commentObj.beerId.beerId;
    let newComment = commentObj.beerId.newComment;
    return Beer.find({ _id: beerId }).exec().then((beer) => {
        for (var i = 0; i < beer[0].comments.length; i++) {
            if (beer[0].comments[i]._id.toString() === (commentId)) {
                beer[0].comments[i].text = newComment.text;
                return beer[0].save();

            }
        }
    })
}

module.exports = beerHelpers;