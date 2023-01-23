const crypto = require("crypto")
const express = require("express")
const Feed = require("../models/Feed")

const router = express.Router()

router.post("/new", (_, res) => {
    const newFeed = new Feed({
        key: "feed-" + crypto.randomUUID()
    })
    newFeed
        .save()
        .then(feed => res.status(201).json(feed))
        .catch(err => res.status(500).json({ error: err }))
})

router.post("/delete", (req, res) => {
    const feedKey = req.headers["x-feed-key"]
    if (!feedKey) {
        return res.status(400).json({ error: "Missing feed key" })
    }
    Feed.findOne({ key: feedKey }).then(feed => {
        if (!feed) {
            return res.status(404).json({ error: "Feed with key " + feedKey + " not found" })
        }
        Feed
            .deleteOne({ key: feedKey })
            .then(() => res.status(200).json())
            .catch(err => res.status(500).json({ error: err }))

    })
})

router.get("/last", (req, res) => {
    const feedKey = req.headers["x-feed-key"]
    if (!feedKey) {
        return res.status(400).json({ error: "Missing feed key" })
    }
    Feed.findOne({ key: feedKey }).then(feed => {
        if (!feed) {
            return res.status(404).json({ error: "Feed with key " + feedKey + " not found" })
        }
        return res.status(200).json({ value: feed.data.length > 0 ? feed.data[feed.data.length - 1].get("value") : "" })
    })
})

router.get("/all", (req, res) => {
    const feedKey = req.headers["x-feed-key"]
    if (!feedKey) {
        return res.status(400).json({ error: "Missing feed key" })
    }
    Feed.findOne({ key: feedKey }).then(feed => {
        if (!feed) {
            return res.status(404).json({ error: "Feed with key " + feedKey + " not found" })
        }
        return res.status(200).json({ feed: feed })
    })
})

router.post("/data", (req, res) => {
    const feedKey = req.body.key
    const feedData = req.body.value
    if (!feedKey) {
        return res.status(400).json({ error: "Missing feed key" })
    }
    Feed.findOne({ key: feedKey }).then(feed => {
        if (!feed) {
            return res.status(404).json({ error: "Feed with key " + feedKey + " not found" })
        }
        let data = feed.data
        data.push({ date: Date.now(), value: feedData })
        feed.data = data
        feed
            .save()
            .then(feed => res.status(201).json(feed))
            .catch(err => res.status(500).json({ error: err }))
    })
})

module.exports = router