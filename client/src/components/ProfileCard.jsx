
const ProfileCard = ({ profile }) => {
    return (
        <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">

            {/* Profile Image */}
            <div className="relative h-[420px]">

                <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                />

                {/* Name and Age */}
                <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent">

                    <h2 className="text-3xl font-bold text-white">
                        {profile.name}, {profile.age}
                    </h2>

                    <p className="text-white text-sm mt-1">
                        📍 {profile.city}
                    </p>

                </div>

            </div>

            {/* Profile Details */}
            <div className="p-5">

                <p className="text-gray-600 text-sm">
                    {profile.bio}
                </p>

                {/* Interests */}
                <div className="flex flex-wrap gap-2 mt-4">

                    {profile.interests.map((interest, index) => (

                        <span
                            key={index}
                            className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-medium"
                        >
                            {interest}
                        </span>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default ProfileCard;
