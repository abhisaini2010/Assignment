
import express from "express";

import {
    getFeed,
    swipeProfile,
    getMatches
} from "../controllers/discoverController.js";

const router = express.Router();

router.get("/feed", getFeed);
router.post("/swipe", swipeProfile);
router.get("/matches", getMatches);

export default router;
