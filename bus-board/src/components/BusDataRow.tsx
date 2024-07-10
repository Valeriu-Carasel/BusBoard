import React from "react";
import {JsonBus} from "../models/JsonBus";

interface BusDataProps {
    busData: JsonBus
}

export const BusDataRow: React.FC<BusDataProps> = ({busData}) => {
    return (
        <tr>
            <td> {busData.lineName} </td>
            <td> {busData.destinationName} </td>
            <td> {busData.towards} </td>
            <td> {Math.round(busData.timeToStation / 60)}m</td>
        </tr>
    );
}