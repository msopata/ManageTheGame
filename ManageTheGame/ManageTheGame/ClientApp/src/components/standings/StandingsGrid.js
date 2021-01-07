import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column } from 'devextreme-react/data-grid';
const url = 'api/Fixture';

export const StandingsGrid = (props) => {

    const [standings, setStandings] = useState({});
    useEffect(() => {
        loadStandings();
    }, []);

    const loadStandings = async () => {
        //const token = await authService.getAccessToken();
        const response = await fetch(`${url}/GetStandings/${props.competitionId}`);
        const data = await response.json();
        data.forEach((element, index) => { element.position = index + 1 });
        setStandings(data);
    }


    return (
        <DataGrid
            dataSource={standings}
            //onRowPrepared={onRowPrepared}
            //focusedRowEnabled={true}
            showBorders={true}>
            <Column dataField="position" caption="Lp." width={50} alignment="center"></Column>
            <Column dataField="clubName" caption="Club"></Column>
            <Column dataField="points" caption="Points" width={80}> </Column>
            <Column dataField="games" caption="Games" width={80}></Column>
            <Column dataField="goalsScored" caption="GS" width={80} ></Column>
            <Column dataField="goalsConceded" caption="GC" width={80} ></Column>
        </DataGrid>
    );
}
