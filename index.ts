import {JsonBus} from "./JsonBus";
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


async function getDataForStopPoints(code: string): Promise<JsonBus[]> {
    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${code}/Arrivals/?app_key=0751e7d29b944370b4ad1378bb1c3f66`);
        const data = await response.json();

        let busses: JsonBus[] = data;
        busses.sort(Sorter.sortByArrivalTime);

        //to be considered, moving this as a separate function
        let max5Busses: JsonBus[] = new Array();
        for (let i = 0; i < busses.length && i < 5; i++) {
            max5Busses.push(busses[i]);
        }
        return max5Busses;
    } catch (error: any) {
        console.error(error)
    }
}

function printBusesFieldsForUser(busesData: JsonBus[]) {
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
    const first5Buses: JsonBus[] = await getDataForStopPoints(code);
    printBusesFieldsForUser(first5Buses);
}

main()