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

    return (
        <DataGrid
            dataSource={fixturesData}
            keyExpr="id"
            //onRowInserted={onRowInserted}
            focusedRowEnabled={true}
            columnAutoWidth={true}
            //onRowInserting={onRowInserting}
            showBorders={true}>
            <Editing
                mode="popup"
                allowAdding={true}
                allowDeleting={true}
                allowUpdating={true}
                useIcons={true} />
            <Paging pageSize={4} />
            <Column dataField="date" caption="Date" dataType="date"></Column>
            <Column dataField="gameweek" caption="GW" calculateDisplayValue={(e) => e.gameweek + 1} width={50} alignment="center"></Column>
            <Column dataField="home.name" caption="Home" alignment="right"></Column>
            <Column dataField="homeGoals" caption=""></Column>
            <Column dataField="awayGoals" caption="" alignment="left"></Column>
            <Column dataField="away.name" caption="Away"></Column>
        </DataGrid>
    );
}
