const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notifySchema = new Schema({
    faculty:{
        type: Schema.Types.ObjectId,
        ref:'faculty'
    },
    content:{
        type: String,
    },
    title:{
        type: String,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
})
const Notify = mongoose.model('notify', notifySchema);
module.exports = Notify;