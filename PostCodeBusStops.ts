import {Sorter} from "./Sorter";
import {JsonBus} from "./JsonBus";
import {GeographicData} from "./GeographicData";

async function askForPostCode(): Promise<string> {
    const reader = require("readline");
    const inquirer = reader.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const questionInit = (questionText: string) =>
        new Promise<string>(resolve => inquirer.question(questionText, resolve));
    let code: string = await questionInit("Please enter a post code: ");
    inquirer.close();
    return code;
}


async function getAllStopTypes(): Promise<string[]> {
    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Meta/StopTypes/?app_key=0751e7d29b944370b4ad1378bb1c3f66`);
        const stopTypes = await response.json();

        return stopTypes;
    } catch (error: any) {
        console.error(error)
    }
}

async function getGeographicDataForPostalCode(code: string): Promise<GeographicData> {
    try {
        code = code.replace(" ","%20");
        const response = await fetch(`https://api.postcodes.io/postcodes/${code}`);
        const location: GeographicData = await response.json();
        return location;
    } catch (error: any) {
        console.error(error)
    }
}

async function getStopPointsForGeographicData(geoData: GeographicData, stopTypes: string[]): Promise<any> {
    try {
        const radius = 1000;
        const stopTypesHTML = stopTypes.toString();
        const latitude = geoData.result.latitude;
        const longitude = geoData.result.longitude;

        const response = await fetch(`https://api.tfl.gov.uk/StopPoint?stopTypes=${stopTypesHTML}&lat=${latitude}&lon=${longitude}&radius=${radius}`);
        const data = await response.json();
        const stopPoints = data.stopPoints;

        stopPoints.sort(Sorter.sortByDistance);

        return stopPoints;

    } catch (error: any) {
        console.error(error)
    }
}

function printBusesFieldsForUser(busesData: JsonBus[]) {
    for (let i = 0; i < busesData.length; i++) {
        let busText: string = "";
        busText += "Station name: " + busesData[i].stationName + " | ";
        busText += "Line name: " + busesData[i].lineName + " | ";
        busText += "Destination: " + busesData[i].destinationName + " | ";
        busText += "Route: " + busesData[i].towards + " | ";
        busText += "Time until it arrives: " + Math.round(busesData[i].timeToStation / 60) + "m";
        console.log(busText);
    }
}

async function getBusesForStopPoint(code: string): Promise<JsonBus[]> {
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

function concatArrays(array1: any[], array2: any[]): void{
    for (let i = 0; i < array2.length; i++){
        array1.push(array2[i]);
    }
}

async function main() {
    const allStopTypes: string[] = await getAllStopTypes();
    const postalCode: string = await askForPostCode();
    const geographicData: GeographicData = await getGeographicDataForPostalCode(postalCode);
    const stopPoints = await getStopPointsForGeographicData(geographicData, allStopTypes);

    let allBuses: JsonBus[] = [];
    let nrOfNonEmptyStations: number = 0;
    for (let i = 0; i < stopPoints.length && nrOfNonEmptyStations<2; i++){
        const busesFirstStop: JsonBus[] = await getBusesForStopPoint(stopPoints[i].id);
        if (busesFirstStop.length != 0) {
            nrOfNonEmptyStations++;
            concatArrays(allBuses, busesFirstStop);
        }
    }
    printBusesFieldsForUser(allBuses);
}

main()