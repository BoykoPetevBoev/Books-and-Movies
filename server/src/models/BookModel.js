
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    chapters: [{
        name: {
            type: String
        },
        isReaded: {
            type: Boolean,
            default: false
        }
    }],
    rating: {
        type: Number,
        default: 0
    },
    favorites : {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Book', BookSchema);