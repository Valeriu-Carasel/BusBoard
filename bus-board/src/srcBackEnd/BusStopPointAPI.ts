import {IJsonBus} from "./IJsonBus";
import {Sorter} from "./Sorter";

export async function getDataForStopPoints(code: string): Promise<IJsonBus[] | undefined> {
    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${code}/Arrivals/?app_key=0751e7d29b944370b4ad1378bb1c3f66`);
        const busses: IJsonBus[] = await response.json();

        busses.sort(Sorter.sortByArrivalTime);

        let firstBusses: IJsonBus[] = busses.slice(0, 5);
        return firstBusses;
    } catch (error: any) {
        console.error(error)
    }
}

function getInfoForBusesFieldsForUser(busesData: IJsonBus[]): string {
    let bussesText = "";
    for (let i = 0; i < busesData.length; i++) {
        let busText: string = "";
        busText += "Line name: " + busesData[i].lineName + " | ";
        busText += "Destination: " + busesData[i].destinationName + " | ";
        busText += "Route: " + busesData[i].towards + " | ";
        busText += "Time until it arrives: " + Math.round(busesData[i].timeToStation / 60) + "m";
        bussesText += busText + "\n";
    }
    return bussesText;
}
