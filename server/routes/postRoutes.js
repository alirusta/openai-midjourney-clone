import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

// ensure env population:
dotenv.config();

// new router instance:
const router = express.Router();

// setup cloudinary for image upload:
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// get all posts:
router.route('/').get(async(req, res) => {

    try {
        const posts = await Post.find({});

        res.status(200).json({ success: true, data: posts });

    } catch (error) {
        res.status(500).json({ success: false, message: error });
    };
});

// create a post:
router.route('/').post(async(req, res) => {

    try {

        // destructure data coming from frontend:
        const { name, prompt, photo } = req.body;

        // upload & store photo url to cloudinary, get updated url back:
        const photoURL = await cloudinary.uploader.upload(photo);

        // create new post in database:
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoURL.url
        });

        res.status(201).json({ success: true, data: newPost });

    } catch (error) {
        res.status(500).json({ success: false, message: error });
    };
});

// this is for creating/retrieving posts for/by users.
export default router;