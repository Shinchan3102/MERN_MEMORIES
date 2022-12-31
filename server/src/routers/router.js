const express = require('express');
const router = express.Router();
const User = require('../models/place');
const auth = require('../middleware/auth');
const cloudinary = require('../cloudinary');
const upload = require('../multer');

router.get('/memory', async (req, res) => {
    try {
        const { page } = req.query;
        const LIMIT = 9;
        const startPage = (Number(page) - 1) * LIMIT;
        const total = await User.countDocuments({});
        const userSend = await User.find().sort({ _id: -1 }).limit(LIMIT).skip(startPage);
        res.status(200).json({ data: userSend, currentPage: Number(page), totalPages: Math.ceil(total / LIMIT) });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/memory/search', async (req, res) => {
    try {
        const { searchQuery, tags } = req.query;
        // console.log(tags);
        // console.log(searchQuery);
        const title = new RegExp(searchQuery, 'i');
        const memories = await User.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        // console.log(memories);
        res.json({ data: memories });

    } catch (err) {
        // console.log(err);
        res.status(400).json({ message: err.message });
    }
})

router.get('/memory/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const memory = await User.findById(id);
        res.status(200).json(memory);
    } catch (err) {
        // console.log(err);
        res.status(400).json({ message: err.message });
    }
})

router.post('/memory', upload.single("img"),auth, async (req, res) => {
    try {
        console.log(req.body);
        console.log('after');
        console.log(req.file);
        const result = await cloudinary.uploader.upload(req.file.path);
        // console.log(imageUrl);
        const imageUrl = result.secure_url;
        req.body.img = imageUrl;
        console.log(imageUrl);
        const tags=(req.body.tags).toString().split(',');
        const newPlace = new User({ ...req.body, creator: req.userId ,tags});
        await newPlace.save();
        console.log(newPlace);
        res.status(201).json(newPlace);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
})

router.patch('/memory/:_id',upload.single('img'), auth, async (req, res) => {
    try {
        const { _id } = req.params;
        console.log(_id);
        console.log(req.body);
        const memory = req.body;
        const tags=(req.body.tags).toString().split(',');
        console.log(tags);
        const updatedMemory = await User.findByIdAndUpdate(_id, { ...memory, _id ,tags}, { new: true });
        if (!updatedMemory) {
            return res.status(404).send("No any memory is available");
        }
        res.json(updatedMemory);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
})

router.patch('/memory/:_id/likes', auth, async (req, res) => {
    try {
        const { _id } = req.params;
        const memory = await User.findById(_id);
        const alreadyLiked = memory.likes.findIndex((_id) => _id === String(req.userId));
        if (alreadyLiked === -1) {
            memory.likes.push(String(req.userId));
        } else {
            memory.likes = memory.likes.filter((_id) => _id !== String(req.userId));
        }
        const likedMemory = await User.findByIdAndUpdate(_id, memory, { new: true });
        res.json(likedMemory);
    } catch (err) {
        console.log(err);
    }
})

router.patch('/memory/:_id/comment', auth, async (req, res) => {
    try {
        // console.log('comments');
        const { _id } = req.params;
        const { comment } = req.body;
        // console.log(comment);
        const memory = await User.findById(_id);
        memory.comments.unshift(comment);
        const updatedMemory = await User.findByIdAndUpdate(_id, memory, { new: true });
        // console.log(updatedMemory);
        res.json(updatedMemory);
    } catch (err) {
        console.log(err);
    }
})

router.delete('/memory/:_id', auth, async (req, res) => {
    try {
        const { _id } = req.params;
        const deleteMemory = await User.findByIdAndDelete(_id);
        if (!deleteMemory) {
            return res.status(404).send("no any memory is available to delete");
        }
        res.json({ message: 'memory deleted successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;