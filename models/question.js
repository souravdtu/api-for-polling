
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
        unique: true
    },
    options: [
        {   id:{
                type: String
            },
            text: {
                type: String
            },
            votes: {
                type: Number
            },
            link_to_vote:{
                type: String
            }
        }
    ]

});

const Question = mongoose.model('Question',questionSchema);
module.exports = Question;