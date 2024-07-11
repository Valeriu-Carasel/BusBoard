import React from "react";
import {JsonBus} from "../models/JsonBus";
import {BusDataRow} from "./BusDataRow";

interface BusDataTableProps {
    bussesData: JsonBus[],
    buttonPressed: boolean
}

export const BusDataTable: React.FC<BusDataTableProps> = ({bussesData, buttonPressed}) => {

    if (!buttonPressed) {
        return (
            <div>Search a Stop Point to show available busses.</div>
        )
    }
    if (bussesData === undefined || bussesData.length === 0) {
        return (
            <h1>
                There are no available busses!
            </h1>
        );
    }

   const rows = bussesData.map((x: JsonBus): React.ReactElement => {
        return <BusDataRow busData={x}/>
    });

    return (
        <table>
            <tr>
                <th>Line name</th>
                <th>Destination</th>
                <th>Route</th>
                <th>Time to station</th>
            </tr>
            {rows}
        </table>
    );
}