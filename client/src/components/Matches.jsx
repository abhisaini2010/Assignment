
import { useEffect, useState } from "react";
import api from "../services/api";

const Matches = () => {

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchMatches = async () => {
            try {
                const response = await api.get("/matches");
                setMatches(response.data.matches);

            } catch (error) {
                console.error("Matches error:", error);
                setError("Unable to load matches.");

            } finally {
                setLoading(false);
            }
        };

        fetchMatches();

    }, []);

    if (loading) {
        return (
            <div className="text-center py-16 text-gray-500">
                Loading matches...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16 text-red-500">
                {error}
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="text-center py-16">

                <div className="text-6xl mb-4">💗</div>

                <h2 className="text-2xl font-bold text-gray-800">
                    No Matches Yet
                </h2>

                <p className="text-gray-500 mt-2">
                    Keep discovering to find your match.
                </p>

            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Matches ({matches.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {matches.map((profile) => (

                    <div
                        key={profile._id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
                    >

                        <img
                            src={profile.photo}
                            alt={profile.name}
                            className="w-full h-64 object-cover"
                        />

                        <div className="p-4">

                            <h3 className="text-xl font-bold text-gray-800">
                                {profile.name}, {profile.age}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                                📍 {profile.city}
                            </p>

                            <p className="text-gray-600 text-sm mt-3">
                                {profile.bio}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">

                                {profile.interests.map((interest, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs"
                                    >
                                        {interest}
                                    </span>
                                ))}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Matches;
