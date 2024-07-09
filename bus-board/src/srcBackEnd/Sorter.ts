import {IJsonBus} from "./IJsonBus";
import {IStopPoint} from "./IStopPoint";

export class Sorter{

    public static sortByDistance(stopPoint1: IStopPoint, stopPoint2: IStopPoint): number{
        return stopPoint1.distance - stopPoint2.distance;
    }

    public static sortByArrivalTime(firstBus: IJsonBus, secondBus: IJsonBus): number {
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