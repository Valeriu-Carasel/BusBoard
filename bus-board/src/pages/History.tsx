import React, {useEffect, useState} from "react";
import './History.css';
import styled from "styled-components";
import poza1 from "../resources/bus1.jpg";
import poza2 from "../resources/bus2.jpg";
import poza3 from "../resources/bus3.jpg";

const Div = styled.div`
        background-image: url(${poza1});
        width: 1000px;
        height: 550px;
        object-fit: fill;
        background-size:  cover;
        position: relative;
    `;

function History(): React.ReactElement{
    const [currentPic,setCurrentPic] = useState(0);

    const clickImageButton = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const button: HTMLButtonElement = event.currentTarget;
        const direction: number = button.id === "Lefty"? -1: 1;

        setCurrentPic(currentPic + direction);
    };

    useEffect(()=>{
        const element: HTMLElement | null = document.getElementById("DivPoza");
        console.log(currentPic);
        if (element !== null) {
            switch (Math.abs(currentPic + 3) % 3) {
                case 0: element.style.backgroundImage = `url(${poza1})`; break;
                case 1: element.style.backgroundImage = `url(${poza2})`; break;
                case 2: element.style.backgroundImage = `url(${poza3})`; break;
            }
        }
    },[currentPic])

    return (
        <>
            <div className="HeaderImage" id="DivPoza">
                <button className="ClassBottomButtons" id="Lefty" onClick={clickImageButton}> b1</button>
                <button className="ClassBottomButtons" id="Righty" onClick={clickImageButton}> b2 </button>
            </div>
            <h1>Titlu</h1>
            <div>
                <h2>Titlu sectiune</h2>
                <p>Text Lorem Ipsum....</p>
            </div>
            <div>
                <button> b1</button>
                <h3>Stats</h3>
                <p>Stat text</p>
                <button> b2 </button>
            </div>
        </>
    );
}

export default History;