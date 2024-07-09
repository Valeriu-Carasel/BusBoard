import {JsonBus} from "./JsonBus";
import {PartialStopPoint} from "./PartialJSONTypes";

export class Sorter{

    public static sortByDistance(stopPoint1: PartialStopPoint, stopPoint2: PartialStopPoint): number{
        return stopPoint1.distance - stopPoint2.distance;
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