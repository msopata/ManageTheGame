import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Paging, Editing } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
const url = 'api/Player';

export const StatsTab = (props) => {
    const [statsData, setStatsData] = useState([]);

    useEffect(() => {
        loadPlayersStats(props.clubId);
    }, []);

    const loadPlayersStats = async (clubId) => {
        const response = await fetch(`api/Club/GetStats/${clubId}`);
        const data = await response.json();
        setStatsData(data);
    }

    return (
        <DataGrid
            dataSource={statsData}
            showBorders={true}>
            <Column dataField="firstName"></Column>
            <Column dataField="lastName"></Column>
            <Column dataField="games"></Column>
            <Column dataField="mvp" caption="MVP"></Column>
            <Column dataField="goals"></Column>
            <Column dataField="assists"></Column>
            <Column dataField="yellowCards"></Column>
            <Column dataField="redCards"></Column>
        </DataGrid>
    );
}
