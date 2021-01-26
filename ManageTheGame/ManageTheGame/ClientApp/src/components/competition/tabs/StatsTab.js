import React, { Component, useEffect, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column } from 'devextreme-react/data-grid';
//const url = 'api/Competition';

export const StatsTab = (props) => {
    const [statsData, setStatsData] = useState([]);

    useEffect(() => {
        loadPlayersStats(props.competitionId);
    }, []);

    const loadPlayersStats = async (competitionId) => {
        const response = await fetch(`api/Competition/GetCompetitionStats/${competitionId}`);
        const data = await response.json();
        console.log("data", data);
        setStatsData(data);
    }

    return (
        <DataGrid
            dataSource={statsData}
            showBorders={true}>
            <Column dataField="lastName" caption="Player" calculateDisplayValue={(e) => `${e.firstName[0]}. ${e.lastName}`}></Column>
            <Column dataField="clubName" caption="Club"></Column>
            <Column dataField="goals"></Column>
            <Column dataField="assists"></Column>
            <Column dataField="games"></Column>
            <Column dataField="yellowCards"></Column>
            <Column dataField="redCards"></Column>
            <Column dataField="mvp" caption="MVP"></Column>
        </DataGrid>
    );
}
