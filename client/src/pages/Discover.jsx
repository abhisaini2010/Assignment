
import { useEffect, useRef, useState } from "react";
import TinderCard from "react-tinder-card";

import ProfileCard from "../components/ProfileCard";
import MatchPopup from "../components/MatchPopup";
import Matches from "../components/Matches";
import api from "../services/api";

const Discover = () => {

    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeView, setActiveView] = useState("discover");
    const [matchedProfile, setMatchedProfile] = useState(null);

    const cardRef = useRef(null);
    const isSwiping = useRef(false);

    // Fetch profiles
    const fetchProfiles = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/feed");

            setProfiles(response.data.profiles);

        } catch (error) {
            console.error("Feed error:", error);

            setError("Unable to load profiles. Please try again.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    // Handle swipe
    const handleSwipe = async (direction) => {

        if (isSwiping.current || profiles.length === 0) {
            return;
        }

        isSwiping.current = true;

        const currentProfile = profiles[0];

        const action = direction === "right" ? "like" : "pass";

        try {

            const response = await api.post("/swipe", {
                profileId: currentProfile._id,
                action
            });

            console.log("Swipe result:", response.data);

            // Check whether a mutual match occurred
            if (response.data.matched && response.data.match) {
                setMatchedProfile(response.data.match);
            }

            // Remove swiped profile
            setProfiles((prevProfiles) =>
                prevProfiles.filter(
                    (profile) => profile._id !== currentProfile._id
                )
            );

        } catch (error) {

            console.error("Swipe error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to save swipe. Please try again."
            );

            // Reload feed to restore the card if needed
            await fetchProfiles();

        } finally {
            isSwiping.current = false;
        }
    };

    // Desktop button swipe
    const swipe = (direction) => {

        if (isSwiping.current || !cardRef.current) {
            return;
        }

        cardRef.current.swipe(direction);
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Loading profiles...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center px-4 py-8">

            {/* Discover and Matches Navigation */}
            <div className="flex justify-center gap-4 mb-8">

                <button
                    onClick={() => setActiveView("discover")}
                    className={`px-6 py-2 rounded-full hover:cursor-pointer font-semibold transition ${
                        activeView === "discover"
                            ? "bg-pink-600 text-white"
                            : "bg-white text-gray-600 shadow"
                    }`}
                >
                    Discover
                </button>

                <button
                    onClick={() => setActiveView("matches")}
                    className={`px-6 py-2 rounded-full hover:cursor-pointer font-semibold transition ${
                        activeView === "matches"
                            ? "bg-pink-600 text-white"
                            : "bg-white text-gray-600 shadow"
                    }`}
                >
                    Matches
                </button>

            </div>

            {activeView === "discover" ? (

                <>

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Discover
                    </h1>

                    <p className="text-gray-500 mb-8 text-center">
                        Find someone who shares your interests.
                    </p>

                    {error && (
                        <div className="mb-4 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Profile Card */}
                    {profiles.length > 0 ? (

                        <div className="relative w-full max-w-sm">

                            <TinderCard
                                ref={cardRef}
                                key={profiles[0]._id}
                                onSwipe={handleSwipe}
                                onCardLeftScreen={() => {}}
                                swipeRequirementType="position"
                                swipeThreshold={100}
                                preventSwipe={["up", "down"]}
                            >

                                <ProfileCard profile={profiles[0]} />

                            </TinderCard>

                        </div>

                    ) : (

                        <div className="flex flex-col items-center justify-center mt-16">

                            <div className="text-6xl mb-4">
                                💖
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800">
                                No More Profiles
                            </h2>

                            <p className="text-gray-500 mt-2 text-center">
                                You've seen everyone for now.
                            </p>

                        </div>

                    )}

                    {/* Like and Pass Buttons */}
                    {profiles.length > 0 && (

                        <div className="flex items-center gap-10 mt-8">

                            <button
                                onClick={() => swipe("left")}
                                disabled={!!error || isSwiping.current}
                                className="w-16 h-16 rounded-full bg-white shadow-lg border border-gray-200 text-red-500 text-3xl hover:bg-red-50 transition disabled:opacity-50"
                                aria-label="Pass profile"
                            >
                                ✕
                            </button>

                            <button
                                onClick={() => swipe("right")}
                                disabled={!!error || isSwiping.current}
                                className="w-16 h-16 rounded-full bg-pink-600 shadow-lg text-white text-3xl hover:bg-pink-700 transition disabled:opacity-50"
                                aria-label="Like profile"
                            >
                                ♥
                            </button>

                        </div>

                    )}

                </>

            ) : (

                <Matches />

            )}

            {/* Match Popup */}
            {matchedProfile && (
                <MatchPopup
                    profile={matchedProfile}
                    onClose={() => setMatchedProfile(null)}
                />
            )}

        </div>
    );
};

export default Discover;
