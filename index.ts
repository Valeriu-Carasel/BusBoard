import {IJsonBus} from "./IJsonBus";
import {Sorter} from "./Sorter";

async function askForStopCode(): Promise<string> {
    const reader = require("readline");
    const inquirer = reader.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const questionInit = (questionText: string) =>
        new Promise<string>(resolve => inquirer.question(questionText, resolve));
    let code: string = await questionInit("Please enter a stop code: ");
    console.log(code);
    inquirer.close();
    return code;
}


async function getDataForStopPoints(code: string): Promise<IJsonBus[]> {
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

function printBusesFieldsForUser(busesData: IJsonBus[]) {
    for (let i = 0; i < busesData.length; i++) {
        let busText: string = "";
        busText += "Line name: " + busesData[i].lineName + " | ";
        busText += "Destination: " + busesData[i].destinationName + " | ";
        busText += "Route: " + busesData[i].towards + " | ";
        busText += "Time until it arrives: " + Math.round(busesData[i].timeToStation / 60) + "m";
        console.log(busText);
    }
}

async function main(): Promise<void> {
    let code: string = await askForStopCode();
    const first5Buses: IJsonBus[] = await getDataForStopPoints(code);
    printBusesFieldsForUser(first5Buses);
}

main()