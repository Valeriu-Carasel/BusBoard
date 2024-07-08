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

type jsonBus = {
    id: string,
    operationType: number,
    "vehicleId": string,
    "naptanId": string,
    "stationName": string,
    "lineId": string,
    "lineName": string,
    "platformName": string,
    "direction": string,
    "bearing": string,
    "destinationNaptanId": string,
    "destinationName": string,
    "timestamp": string,
    "timeToStation": number,
    "currentLocation": string,
    "towards": string,
    "expectedArrival": string,
    "timeToLive": string,
    "modeName": string,
    "timing": {
        "countdownServerAdjustment": string,
        "source": string,
        "insert": string,
        "read": string,
        "sent": string,
        "received": string
    }
}

function compareArrivalTimes(firstBus: jsonBus, secondBus: jsonBus): number {
    let firsTime: Date = new Date(firstBus.expectedArrival);
    let secondTime: Date = new Date(secondBus.expectedArrival);
    if (firsTime < secondTime) {
        return -1;
    }
    if (firsTime == secondTime) {
        return 0;
    }
    return 1;
}

async function getDataFromAPI(code: string): Promise<jsonBus[]> {
    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${code}/Arrivals/?app_key=0751e7d29b944370b4ad1378bb1c3f66`);
        const data = await response.json();

        let busses: jsonBus[] = data;
        compareArrivalTimes(busses[0], busses[1]);
        busses.sort(compareArrivalTimes);

        let max5Busses: jsonBus[] = new Array();
        for (let i = 0; i < busses.length && i < 5; i++) {
            max5Busses.push(busses[i]);
        }
        return busses;
    } catch (error: any) {
        console.error(error)
    }
}

async function main(): Promise<void> {
    //let code: string = await askForStopCode();
    let code = "490008660N"; //to be removed later
    await getDataFromAPI(code);

}

main()