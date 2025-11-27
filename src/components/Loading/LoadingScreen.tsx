import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoadingScreen: React.FC = () => {
    console.log("LoadingScreen is rendering!");
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <ThreeDots
                color="#1976d2" // Color of the spinner
                height={80} // Height of the spinner
                width={80} // Width of the spinner
            />
        </div>
    );
};

export default LoadingScreen;