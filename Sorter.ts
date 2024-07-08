import {JsonBus} from "./JsonBus";

export class Sorter{

    public static getFirstFewSortedElements(nrOfElements: number){

    }

    public static sortByDistance(stopPoint1: any, stopPoint2: any): number{
        if (stopPoint1.distance < stopPoint2.distance) {
            return -1;
        }
        if (stopPoint1.distance == stopPoint2.distance) {
            return 0;
        }
        return 1;
    }

    public static sortByArrivalTime(firstBus: JsonBus, secondBus: JsonBus): number {
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
}