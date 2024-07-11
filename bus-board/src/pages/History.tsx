import React, {useEffect, useState} from "react";
import poza1 from "../resources/bus1.jpg";
import poza2 from "../resources/bus2.jpg";
import poza3 from "../resources/bus3.jpg";
import styled from "@emotion/styled";

const DivNou = styled.div`
    background-image: url("../resources/bus1.jpg");
    width: 1000px;
    height: 550px;
    object-fit: fill;
    background-size:  cover;
    position: relative;
    `;

const NavigationButton  = styled.button<{picture: string}>`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    position: absolute;
    bottom: 10px;
    background-image: url(${({picture}) => picture});
    left: ${({id}) => (id === "Lefty" ? "10px" : "unset")};
    right: ${({id}) => (id === "Lefty" ? "unset" : "10px")};
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
            <DivNou className="HeaderImage" id="DivPoza">
                <NavigationButton onClick={clickImageButton} id="Lefty" picture="../resources/left-arrow.jpg"></NavigationButton>
                <NavigationButton id="Righty" onClick={clickImageButton} picture="../resources/right-arrow.jpg"></NavigationButton>
            </DivNou>
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