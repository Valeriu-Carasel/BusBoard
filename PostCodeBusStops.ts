async function askForPostCode(): Promise<string> {
    const reader = require("readline");
    const inquirer = reader.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const questionInit = (questionText: string) =>
        new Promise<string>(resolve => inquirer.question(questionText, resolve));
    let code: string = await questionInit("Please enter a post code: ");
    console.log(code);
    inquirer.close();
    return code;
}

type geographicData = {
    "status": number,
    "result": {
        "postcode": string,
        "quality": number,
        "eastings": number,
        "northings": number,
        "country": string,
        "nhs_ha": string,
        "longitude": number,
        "latitude": number,
        "european_electoral_region": string,
        "primary_care_trust": string,
        "region": string,
        "lsoa": string,
        "msoa": string,
        "incode": string,
        "outcode": string,
        "parliamentary_constituency": string,
        "parliamentary_constituency_2024": string,
        "admin_district": string,
        "parish": string,
        "admin_county": string,
        "date_of_introduction": string,
        "admin_ward": string,
        "ced": string,
        "ccg": string,
        "nuts": string,
        "pfa": string,
        "codes": {
            "admin_district": string,
            "admin_county": string,
            "admin_ward": string,
            "parish": string,
            "parliamentary_constituency": string,
            "parliamentary_constituency_2024": string,
            "ccg": string,
            "ccg_id": string,
            "ced": string,
            "nuts": string,
            "lsoa": string,
            "msoa": string,
            "lau2": string,
            "pfa": string
        }
    }
}

async function getAllStopTypes(): Promise<string[]> {
    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Meta/StopTypes/?app_key=0751e7d29b944370b4ad1378bb1c3f66`);
        const data = await response.json();

        let stopTypes: string[] = data;
        return stopTypes;
    } catch (error: any) {
        console.error(error)
    }
}

// async function getStopPointsForGeographicData(data: geographicData, stopTypes: string[]): Promise<JsonBus[]> {
//     try {
//         const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${code}/Arrivals/?app_key=0751e7d29b944370b4ad1378bb1c3f66`);
//         const data = await response.json();
//
//         let busses: JsonBus[] = data;
//         compareArrivalTimes(busses[0], busses[1]);
//         busses.sort(compareArrivalTimes);
//
//         let max5Busses: JsonBus[] = new Array();
//         for (let i = 0; i < busses.length && i < 5; i++) {
//             max5Busses.push(busses[i]);
//         }
//         return busses;
//     } catch (error: any) {
//         console.error(error)
//     }
// }

async function getGeographicDataForPostalCode(code: string): Promise<geographicData> {
    try {
        const response = await fetch(`api.postcodes.io/postcodes/${code}`);
        const data = await response.json();

        let location: geographicData = data;
        return location;
    } catch (error: any) {
        console.error(error)
    }
}

function main() {
    getAllStopTypes();
}
main()