
const Home = ({ onExplore }) => {
    return (
        <div className="min-h-[80vh] bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-5 py-10">

            <div className="max-w-2xl w-full text-center">

                {/* Heart Icon */}
                <div className="text-6xl mb-6 animate-pulse">
                    💗
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-pink-600">Coy</span>
                </h1>

                {/* Description */}
                <p className="text-gray-500 text-lg md:text-xl mb-8 leading-relaxed">
                    Discover people, make connections, and find
                    meaningful relationships.
                </p>

                {/* Explore Button */}
                <button
                    onClick={onExplore}
                    className="bg-pink-600 hover:bg-pink-700 cursor-pointer text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                    Explore Discover <span className="ml-2">→</span>
                </button>

                {/* Bottom Text */}
                <p className="text-gray-400 text-sm mt-10">
                    Your next connection might be just one swipe away.
                </p>

            </div>
        </div>
    );
};

export default Home;
