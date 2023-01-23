const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FeedSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    data: {
        type: Array,
        of: Map
    }
})

module.exports = Feed = mongoose.model("feeds", FeedSchema)
