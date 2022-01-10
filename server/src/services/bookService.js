const BookSchema = require('../models/BookModel.js');

function create(data) {
    const model = new BookSchema(data);
    return model.save();
}

function update(data) {
    return BookSchema.findOneAndUpdate({ _id: data._id }, data, { new: true })
}

function findAll() {
    return BookSchema.find({})
}

function findOne(id) {
    return BookSchema.findById(id)
}

// function remove(id) {
//     return BookSchema.findByIdAndDelete(id);
// }

module.exports = {
    findAll,
    findOne,
    update,
    create,
    // remove,
}