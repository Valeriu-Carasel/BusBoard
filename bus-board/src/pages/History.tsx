import React, {useEffect, useState} from "react";
import './History.css';
import styled from "styled-components";


function clickImageButton(): void{

}

function History(): React.ReactElement{
    const [dataFromWiki, setDataFromWiki] = useState("");
    // useEffect(()=> {
    //     fetch("https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=Transport_for_London&format=json")
    //         .then(response =>response.json())
    //         .then(json => console.log(json))
    // },[]);
    const Button = styled.button`
            background: transparent;
          border-radius: 3px;
          border: 2px solid #BF4F74;
          color: #BF4F74;
          margin: 0 1em;
          padding: 0.25em 1em;`
    return (
        <>
            <img src="resources/bus1.jpg"></img>
            <div className="HeaderImage">
                <button className="ClassBottomButtons" id="Lefty"> b1</button>
                <button className="ClassBottomButtons" id="Righty"> b2 </button>
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
                <Button>Text pentru buton</Button>
            </div>
        </>
    );
}

export default History;