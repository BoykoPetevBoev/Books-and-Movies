const MovieSchema = require('../models/MovieModel.js');

function create(data) {
    const model = new MovieSchema(data);
    return model.save();
}

function update(data) {
    return MovieSchema.findOneAndUpdate({ _id: data._id }, data, { new: true })
}

function findAll() {
    return MovieSchema.find({})
}

function findOne(id) {
    return MovieSchema.findById(id)
}

// function remove(id) {
//     return MovieSchema.findByIdAndDelete(id);
// }

module.exports = {
    findAll,
    findOne,
    update,
    create,
    // remove,
}