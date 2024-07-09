import React, {useState} from 'react';
import {getDataForStopPoints} from './srcBackEnd/BusStopPointAPI'
import {IJsonBus} from "./srcBackEnd/IJsonBus";

async function getBuses(stopPoint: string): Promise<IJsonBus[]> {
    const bussesArray: IJsonBus[] | undefined = await getDataForStopPoints(stopPoint);
    if (bussesArray != undefined) {
        return bussesArray;
    }
    return new Array();
}



const BusDataRow: React.FC<{busData: IJsonBus}> = ({busData}) =>{
  return (
      <tr>
        <td> {busData.lineName} </td>
        <td> {busData.destinationName} </td>
        <td> {busData.towards} </td>
        <td> {Math.round(busData.timeToStation/60)}m </td>
      </tr>
  );
}

const BusDataTable: React.FC<{ bussesData: IJsonBus[], buttonPressed: boolean }> = ({bussesData, buttonPressed}) =>{

  const rows: React.ReactElement[] = [];//scapam de any mai tarziu
  if (!buttonPressed){
    return (
        <div>Search a Stop Point to show available busses.</div>
    )
  }
  if(bussesData.length === 0 || bussesData === undefined){
    return(
        <h1>
          There are no available buses!
        </h1>
    );
  }

  for(let i = 0; i < bussesData.length; i++){
    rows.push(<BusDataRow busData={bussesData[i]}/>);
  }

  return (
    <table>
      <tr>
        <th>Line name</th>
        <th>Destination</th>
        <th>Route</th>
        <th>Time to station</th>
      </tr>
      {rows}
    </table>
  );
}

function App(): React.ReactElement {
    const [buttonPressed, setButtonPressed] = useState<boolean>(false);
    const [stopPoint, setStopPoint] = useState<string>("");
    const [tableData, setTableData] = useState<IJsonBus[]>([]);

    async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); // to stop the form refreshing the page when it submits
        const data: IJsonBus[] = await getBuses(stopPoint);
        setTableData(data);
        setButtonPressed(true);
    }

    function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
        setStopPoint(data.target.value)
    }

    return <>
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> StopPoint: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
        <BusDataTable bussesData={tableData} buttonPressed = {buttonPressed}></BusDataTable>
    </>;
}

export default App;