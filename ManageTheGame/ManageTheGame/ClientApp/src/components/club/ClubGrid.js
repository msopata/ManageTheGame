import React, { Component, useEffect, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Popup } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from 'react-router-dom';

const url = 'api/Club';

export const ClubGrid = () => {
    //const [competitions, setCompetitions] = useState([]);
    let history = useHistory();
    const clubData = createStore({
        key: 'id',
        loadUrl: `${url}/Get`,
        updateUrl: `${url}/Update`,
        insertUrl: `${url}/Add`,
        deleteUrl: `${url}/Delete`,      
    });

    const onRowUpdating = (row) => {
        row.newData = Object.assign({}, row.oldData, row.newData);
    }

    const onRowDblClick = (e) => {
        history.push(`/clubs/${e.data.id}`, e.data);
    }

    return (
        <DataGrid
            dataSource={clubData}
            focusedRowEnabled={true}
            onRowDblClick={onRowDblClick}
            onRowUpdating={onRowUpdating}
            showBorders={true}>
            <Editing
                mode="popup"
                allowAdding={true}
                allowUpdating={true}
                allowDeleting={true}
                useIcons={true} />
            <Column dataField="name"></Column>
            <Column dataField="abbreviation"></Column>
            <Column dataField="founded" dataType="date" format="yyyy/MM/dd"></Column>
            <Column dataField="description"></Column>
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
