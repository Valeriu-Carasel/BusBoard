export interface IStopPoint {
    naptanId: string,
    platformName: string,
    indicator: string,
    stopLetter: string,
    modes: string[],
    icsCode: string,
    smsCode: string,
    stopType: string,
    stationNaptan: string,
    accessibilitySummary: string,
    hubNaptanCode: string,
    //lines: Identifier[]
    //lineGroup: LineGroup[]
    //lineModeGroups: LineModeGroup[],
    fullName: string,
    naptanMode: string,
    status: boolean,
    id: string,
    url: string,
    commonName: string,
    distance: number,
    placeType: string,
    //additionalProperties: AdditionalProperties[],
    //children: Place[],
    childrenUrls: string[],
    lat: number,
    lon: number
}

