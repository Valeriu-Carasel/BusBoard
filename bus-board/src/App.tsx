import React, {useState} from 'react';
import {getBussesForStopPoint} from '../../index'

async function getBuses(stopPoint: string): Promise<string[]> {
    const bussesString: string = await getBussesForStopPoint(stopPoint);
    const bussesArray: string[] = bussesString.split(" | ");
    return bussesArray;
}
function App(): React.ReactElement {
  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<string>("");
  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // to stop the form refreshing the page when it submits
    const data = await getBuses(postcode);
    setTableData(data);
  }
  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    setPostcode(data.target.value)
  }
  return <>
    <h1> BusBoard </h1>
    <form action="" onSubmit={formHandler}>
      <label htmlFor="postcodeInput"> StopPoint: </label>
      <input type="text" id="postcodeInput" onChange={updatePostcode}/>
      <input type="submit" value="Submit"/>
    </form>
    {JSON.stringify(tableData, null, 4) /* this will just render the string - try creating a table 'dynamically'! */}
  </>;
}
export default App;