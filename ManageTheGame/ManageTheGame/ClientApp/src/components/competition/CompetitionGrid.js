import React, { Component, useEffect, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';

const url = 'api/Competition';

export const CompetitionGrid = () => {
    //const [competitions, setCompetitions] = useState([]);

    const competitionData = createStore({
        key: 'id',
        loadUrl: `${url}/Get`,
        updateUrl: `${url}/Update`,
        insertUrl: `${url}/Add`,
        deleteUrl: `${url}/Delete`,      
    });

    `String text ${expression}dffsfs`

    const onRowUpdating = (row) => {
        row.newData = Object.assign({}, row.oldData, row.newData);
    }

    return (
        <DataGrid
            dataSource={competitionData}
            focusedRowEnabled={true}
            onRowUpdating={onRowUpdating}
            showBorders={true}>
            <Editing
                mode="popup"
                allowAdding={true}
                allowUpdating={true}
                allowDeleting={true}
                useIcons={true} />
            <Column dataField="name"></Column>
            <Column dataField="type" visible={false}></Column>
            <Column dataField="dateFrom" dataType="date" format="yyyy/MM/dd"></Column>
            <Column dataField="dateTo" dataType="date" format="yyyy/MM/dd"></Column>
            <Column dataField="description"></Column>
            <Column dataField="teamCount"></Column>
        </DataGrid>
    );
}

/*    
 *    async loadCompetitions() {
        //const token = await authService.getAccessToken();
        const response = await fetch('api/Competition');
        const data = await response.json();
        this.setState({ competitions: data });
    }*/
