import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

// ensure env population:
dotenv.config();

// new router instance:
const router = express.Router();

// this is for creating/retrieving posts for/by users.
export default router;