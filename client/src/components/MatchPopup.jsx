
const MatchPopup = ({ profile, onClose }) => {
    if (!profile) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

            <div className="bg-white rounded-3xl p-7 max-w-sm w-full text-center shadow-2xl">

                <div className="text-6xl mb-4">
                    💖
                </div>

                <h1 className="text-3xl font-bold text-pink-600">
                    It's a Match!
                </h1>

                <p className="text-gray-500 mt-2 mb-6">
                    You both liked each other.
                </p>

                <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-pink-200"
                />

                <h2 className="text-xl font-bold text-gray-800 mt-4">
                    {profile.name}, {profile.age}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                    {profile.city}
                </p>

                <button
                    onClick={onClose}
                    className="w-full mt-7 bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition"
                >
                    Continue Discovering
                </button>

            </div>

        </div>
    );
};

export default MatchPopup;
