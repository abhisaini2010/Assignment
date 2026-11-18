
import mongoose from "mongoose";
import Profile from "../models/Profile.js";
import Swipe from "../models/Swipe.js";

// GET /api/feed
export const getFeed = async (req, res) => {
    try {
        // Find all profiles already swiped on
        const swipedProfiles = await Swipe.find().select("profileId");

        const swipedIds = swipedProfiles.map(
            (swipe) => swipe.profileId
        );

        // Return profiles that haven't been swiped on
        const profiles = await Profile.find({
            _id: { $nin: swipedIds }
        });

        res.status(200).json({
            success: true,
            count: profiles.length,
            profiles
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// POST /api/swipe
export const swipeProfile = async (req, res) => {
    try {
        const { profileId, action } = req.body;

        // Validate profile ID
        if (!mongoose.isValidObjectId(profileId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid profile ID"
            });
        }

        // Validate action
        if (!["like", "pass"].includes(action)) {
            return res.status(400).json({
                success: false,
                message: "Action must be like or pass"
            });
        }

        // Check whether profile exists
        const profile = await Profile.findById(profileId)
            .select("+likedUser");

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        // Prevent duplicate swipes
        const existingSwipe = await Swipe.findOne({ profileId });

        if (existingSwipe) {
            return res.status(409).json({
                success: false,
                message: "You have already swiped on this profile"
            });
        }

        // Save swipe
        await Swipe.create({
            profileId,
            action
        });

        // Check for mutual like
        const matched = action === "like" && profile.likedUser;

        // Return match details only for mutual matches
        const match = matched
            ? {
                _id: profile._id,
                name: profile.name,
                age: profile.age,
                photo: profile.photo,
                bio: profile.bio,
                city: profile.city,
                interests: profile.interests
            }
            : null;

        res.status(201).json({
            success: true,
            message: matched ? "It's a match!" : "Swipe saved successfully",
            matched,
            match
        });

    } catch (error) {
        // Also handle duplicate-key errors
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You have already swiped on this profile"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET /api/matches
export const getMatches = async (req, res) => {
    try {
        // Find profiles that the user has liked
        const likedSwipes = await Swipe.find({
            action: "like"
        }).populate({
            path: "profileId",
            select: "+likedUser name age photo bio city interests"
        });

        // Keep only mutual matches
        const matches = likedSwipes
            .filter(
                (swipe) =>
                    swipe.profileId && swipe.profileId.likedUser
            )
            .map((swipe) => {
                const profile = swipe.profileId;

                return {
                    _id: profile._id,
                    name: profile.name,
                    age: profile.age,
                    photo: profile.photo,
                    bio: profile.bio,
                    city: profile.city,
                    interests: profile.interests
                };
            });

        res.status(200).json({
            success: true,
            count: matches.length,
            matches
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
