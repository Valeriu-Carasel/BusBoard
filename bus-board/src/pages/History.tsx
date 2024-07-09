import React, {useEffect, useState} from "react";
import './History.css';


function History(): React.ReactElement{
    const [dataFromWiki, setDataFromWiki] = useState("");
    // useEffect(()=> {
    //     fetch("https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=Transport_for_London&format=json")
    //         .then(response =>response.json())
    //         .then(json => console.log(json))
    // },[]);
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
            </div>
        </>
    );
}

export default History;