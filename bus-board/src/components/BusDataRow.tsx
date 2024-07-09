import React from "react";
import {IJsonBus} from "../modules/IJsonBus";

export const BusDataRow: React.FC<{ busData: IJsonBus }> = ({busData}) => {
    return (
        <tr>
            <td> {busData.lineName} </td>
            <td> {busData.destinationName} </td>
            <td> {busData.towards} </td>
            <td> {Math.round(busData.timeToStation / 60)}m</td>
        </tr>
    );
}