import {JsonBus} from "../modules/JsonBus";
import {StopPoint} from "../modules/StopPoint";

export class Sorter{

    public static sortByDistance(firstStopPoint: StopPoint, secondStopPoint: StopPoint): number{
        return firstStopPoint.distance - secondStopPoint.distance;
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