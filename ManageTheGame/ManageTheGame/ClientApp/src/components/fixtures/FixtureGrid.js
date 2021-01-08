import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Lookup, Paging } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
const url = 'api/Fixture';

export const FixtureGrid = (props) => {
    const fixturesData = createStore({
        key: 'id',
        loadUrl: `${url}/GetCompetitionFixtures/${props.competitionId}`,
        updateUrl: `${url}/Update`,
        insertUrl: `${url}/Add`,
        deleteUrl: `${url}/Delete`
    });

    useEffect(() => {
        props.updateStandingsGrid(false);
    }, []);

    const onRowUpdating = (row) => {
        row.newData = Object.assign({}, row.oldData, row.newData);
        props.updateStandingsGrid(true);
    }

    return (
        <DataGrid
            dataSource={fixturesData}
            keyExpr="id"
            onRowUpdating={onRowUpdating}
            focusedRowEnabled={true}
            showBorders={true}>
            <Editing
                mode="popup"
                allowAdding={true}
                allowDeleting={true}
                allowUpdating={true}
                useIcons={true} />
            <Paging pageSize={4} />
            <Column dataField="date" caption="Date" dataType="date" format="yyyy/MM/dd" width={200}></Column>
            <Column dataField="gameweek" caption="GW" calculateDisplayValue={(e) => e.gameweek + 1} width={50} alignment="center"></Column>
            <Column dataField="home.name" caption="Home" alignment="right"></Column>
            <Column dataField="homeGoals" caption="" alignment="center" width={50}></Column>
            <Column dataField="awayGoals" caption="" alignment="center" width={50}></Column>
            <Column dataField="away.name" caption="Away"></Column>
        </DataGrid>
    );
}
