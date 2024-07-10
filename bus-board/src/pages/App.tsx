import React, {useEffect, useState} from 'react';
import {getDataForStopPoints} from '../apiClients/BusStopPointAPI'
import {IJsonBus} from "../models/IJsonBus";
import {BusDataTable} from "../components/BusDataTable";
import LoadingBar from "../components/LoadingBar";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {clear} from "@testing-library/user-event/dist/clear";

async function getBuses(stopPoint: string): Promise<IJsonBus[]> {
    const bussesArray: IJsonBus[] | undefined = await getDataForStopPoints(stopPoint);
    return bussesArray != undefined ? bussesArray : new Array<IJsonBus>();
}

function App(): React.ReactElement {
    const [buttonPressed, setButtonPressed] = useState<boolean>(false);
    const [stopPoint, setStopPoint] = useState<string>("");
    const [tableData, setTableData] = useState<IJsonBus[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    let tableLikeElement: React.ReactElement = <BusDataTable bussesData={tableData} buttonPressed={buttonPressed}/>;

    async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setButtonPressed(true);
        setLoading(true);
        getBuses(stopPoint).then(result => {
            setTableData(result);
            setTimeout(() => {setLoading(false);},500);
        });
    }

    function updateStopPoint(data: React.ChangeEvent<HTMLInputElement>): void {
        setStopPoint(data.target.value)
    }

    const [progressBarPercent,setProgressBarPercent] = useState(0);
    useEffect(() => {
        setInterval(() => setProgressBarPercent((Math.floor(Math.random() *100) +1) % 100),350);
    }, []);

    return <>
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> StopPoint: </label>
            <input type="text" id="postcodeInput" onChange={updateStopPoint}/>
            <input type="submit" value="Submit"/>
        </form>
        {loading ? <LoadingBar perc={progressBarPercent}/> : <BusDataTable bussesData={tableData} buttonPressed={buttonPressed}/>}
    </>;
}

export default App;