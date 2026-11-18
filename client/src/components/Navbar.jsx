
const Navbar = ({ activeTab, setActiveTab }) => {

    const tabs = ["Home", "Discover"];

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-200">

            <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

                <h1 className="text-2xl font-bold text-pink-600">
                    Coy
                </h1>

                <div className="flex items-center gap-3">

                    {tabs.map((tab) => (

                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full font-medium hover:cursor-pointer transition ${
                                activeTab === tab
                                    ? "bg-pink-600 text-white"
                                    : "text-gray-600 hover:bg-pink-50"
                            }`}
                        >
                            {tab}
                        </button>

                    ))}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;