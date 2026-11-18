
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Discover from "./pages/Discover";

function App() {

    // Show Home page when the app opens
    const [activeTab, setActiveTab] = useState("Home");

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === "Home" ? (
                <Home
                    onExplore={() => setActiveTab("Discover")}
                />
            ) : (
                <Discover />
            )}

        </div>
    );
}

export default App;
