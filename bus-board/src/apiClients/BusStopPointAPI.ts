import {JsonBus} from "../models/JsonBus";
//import {Sorter} from "./sorter";
import {Sorter} from "./sorter"

export async function getDataForStopPoints(code: string): Promise<JsonBus[] | undefined> {
    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${code}/Arrivals/?app_key=0751e7d29b944370b4ad1378bb1c3f66`)
        switch (response.status) {
            case 404: {
                console.error("Mesaj de eroare");
                return new Array();
                break;
            }
        }
        const busses: JsonBus[] = await response.json();
        busses.sort(Sorter.sortByArrivalTime);

        let firstBusses: JsonBus[] = busses.slice(0, 5);
        return firstBusses;
    } catch (error: any) {
        console.error(error)
    }
}
