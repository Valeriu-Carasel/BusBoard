import React, {useState} from 'react';
import {getDataForStopPoints} from './apiClients/BusStopPointAPI'
import {IJsonBus} from "./modules/IJsonBus";
import {BusDataTable} from "./components/BusDataTable";

async function getBuses(stopPoint: string): Promise<IJsonBus[]> {
    const bussesArray: IJsonBus[] | undefined = await getDataForStopPoints(stopPoint);
    return bussesArray != undefined ? bussesArray : new Array<IJsonBus>();
}

function App(): React.ReactElement {
    const [buttonPressed, setButtonPressed] = useState<boolean>(false);
    const [stopPoint, setStopPoint] = useState<string>("");
    const [tableData, setTableData] = useState<IJsonBus[]>([]);

    async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const data: IJsonBus[] = await getBuses(stopPoint);
        setTableData(data);
        setButtonPressed(true);
    }

    function updateStopPoint(data: React.ChangeEvent<HTMLInputElement>): void {
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