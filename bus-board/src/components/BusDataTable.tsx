import React from "react";
import {IJsonBus} from "../models/IJsonBus";
import {BusDataRow} from "./BusDataRow";
import LoadingBar from "./LoadingBar";

export const BusDataTable: React.FC<{ bussesData: IJsonBus[], buttonPressed: boolean }> = ({bussesData, buttonPressed}) => {

    const rows: React.ReactElement[] = [];//scapam de any mai tarziu
    if (!buttonPressed) {
        return (
            <div>
                <div>Search a Stop Point to show available busses.</div>
            </div>

        )
    }
    if (bussesData.length === 0 || bussesData === undefined) {
        return (
            <h1>
                There are no available buses!
            </h1>
        );
    }

    for (let i = 0; i < bussesData.length; i++) {
        rows.push(<BusDataRow busData={bussesData[i]}/>);
    }

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