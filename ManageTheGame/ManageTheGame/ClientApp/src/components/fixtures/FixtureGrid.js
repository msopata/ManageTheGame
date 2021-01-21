import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Lookup, Paging, MasterDetail, RangeRule, RequiredRule, Popup } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { FixtureDetails } from "./details/FixtureDetails";
import { useHistory } from "react-router-dom";
const url = 'api/Fixture';

export const FixtureGrid = (props) => {
    let history = useHistory();
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

    const onRowDblClick = (e) => {
        history.push(`/stats`, e.data);
    }

    const renderDetails = (e) => {
        return (
            <FixtureDetails fixtureData={e.data.data} />
        );
    }

    return (
        <DataGrid
            dataSource={fixturesData}
            keyExpr="id"
            onRowUpdating={onRowUpdating}
            onRowDblClick={onRowDblClick}
            focusedRowEnabled={true}
            showBorders={true}>
            <Editing
                mode="popup"
                allowDeleting={true}
                allowUpdating={true}
                useIcons={true}>
                <Popup
                    width={600}
                    height={'auto'}
                    showTitle={true}
                    title="Edit Fixture"
                />
            </Editing>
            <Paging pageSize={props.teamCount/2} />
            <Column dataField="date" caption="Date" dataType="date" format="yyyy/MM/dd" width={200}></Column>
            <Column dataField="gameweek" caption="GW" calculateDisplayValue={(e) => e.gameweek + 1} width={50} alignment="center"></Column>
            <Column dataField="home.name" caption="Home" alignment="right"></Column>
            <Column dataField="homeGoals" caption="" alignment="center" width={50}></Column>
            <Column dataField="awayGoals" caption="" alignment="center" width={50}></Column>
            <Column dataField="away.name" caption="Away"></Column>
            <MasterDetail
                enabled={true}
                component={renderDetails}
            />
        </DataGrid>
    );
}
