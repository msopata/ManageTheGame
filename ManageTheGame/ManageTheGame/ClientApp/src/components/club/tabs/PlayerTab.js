import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Paging, Editing } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
const url = 'api/Player';

export const PlayerTab = (props) => {
    const playersData = createStore({
        key: 'id',
        loadUrl: `api/Club/GetPlayers/${props.clubId}`,
        updateUrl: `${url}/Update`,
        insertUrl: `${url}/Add/${props.clubId}`,
        deleteUrl: `${url}/Delete`
    });

    return (
        <DataGrid
            dataSource={playersData}
            keyExpr="id"
            focusedRowEnabled={true}
            showBorders={true}>
            <Editing
                mode="popup"
                allowAdding={true}
                allowUpdating={true}
                allowDeleting={true}
                useIcons={true} />
            <Column dataField="firstName"></Column>
            <Column dataField="lastName"></Column>
            <Column dataField="birth" caption="Date" dataType="date" format="yyyy/MM/dd" width={200}></Column>
            <Column dataField="number"></Column>
            <Column dataField="height"></Column>
            <Column dataField="nationality"></Column>
        </DataGrid>
    );
}
