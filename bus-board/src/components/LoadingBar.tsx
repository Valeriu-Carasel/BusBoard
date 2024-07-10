import React from "react";

interface LoadingBarProps{
    perc: number
}

const LoadingBar: React.FC<{perc: number}> = ({perc}) => {
    const percent = perc;
    const containerStyles = {
        height: 20,
        width: "200px",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    };
    const fillerStyles = {
        transition: 'all 0.2s',
        height: '100%',
        width: `${percent}%`,
        backgroundColor: "#0000ff",
        borderRadius: 'inherit',
    };
    return <div style = {containerStyles}>
            <div style = {fillerStyles }>
        </div>
    </div>;
}

export default LoadingBar;