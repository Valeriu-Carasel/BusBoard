import React, {useState} from 'react';
import {getDataForStopPoints} from './apiClients/BusStopPointAPI'
import {JsonBus} from "./modules/JsonBus";
import {BusDataTable} from "./components/BusDataTable";

async function getBuses(stopPoint: string): Promise<JsonBus[]> {
    const bussesArray: JsonBus[] | undefined = await getDataForStopPoints(stopPoint);
    return bussesArray !== undefined ? bussesArray : new Array<JsonBus>();
}

const App: React.FC = () =>{
    const [buttonPressed, setButtonPressed] = useState<boolean>(false);
    const [stopPoint, setStopPoint] = useState<string>("");
    const [tableData, setTableData] = useState<JsonBus[]>([]);

    async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const data: JsonBus[] = await getBuses(stopPoint);
        if (data.length === 0)
            console.error("There is no array")
        setTableData(data);
        setButtonPressed(true);
    }

    const updateStopPoint = (data: React.ChangeEvent<HTMLInputElement>): void => {
        setStopPoint(data.target.value)
    }

    return <>
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> StopPoint: </label>
            <input type="text" id="postcodeInput" onChange={updateStopPoint}/>
            <input type="submit" value="Submit"/>
        </form>
        <BusDataTable bussesData={tableData} buttonPressed={buttonPressed}></BusDataTable>
    </>;
}

export default App;