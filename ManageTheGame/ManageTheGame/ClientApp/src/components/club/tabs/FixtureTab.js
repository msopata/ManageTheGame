import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
const url = 'api/Club';

export const FixtureTab = (props) => {
    const fixturesData = createStore({
        key: 'id',
        loadUrl: `${url}/GetFixtures/${props.clubId}`,
    });

    return (
        <DataGrid
            dataSource={fixturesData}
            keyExpr="id"
            focusedRowEnabled={true}
            showBorders={true}>
            <Column dataField="date" caption="Date" dataType="date" format="yyyy/MM/dd" width={200}></Column>
            <Column dataField="competition.name"></Column>
            <Column dataField="home.name" caption="Home" alignment="right"></Column>
            <Column dataField="homeGoals" caption="" alignment="center" width={50}></Column>
            <Column dataField="awayGoals" caption="" alignment="center" width={50}></Column>
            <Column dataField="away.name" caption="Away"></Column>
        </DataGrid>
    );
}
