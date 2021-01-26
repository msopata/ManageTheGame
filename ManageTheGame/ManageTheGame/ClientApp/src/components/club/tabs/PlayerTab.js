import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Popup, RequiredRule, RangeRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
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
                useIcons={true}>
                <Popup
                    width={600}
                    height={'auto'}
                    showTitle={true}
                    title="Add/Edit Player"
                />
            </Editing>
            <Column dataField="firstName">
                <RequiredRule />
            </Column>
            <Column dataField="lastName">
                <RequiredRule />
            </Column>
            <Column dataField="birth" caption="Date" dataType="date" format="yyyy/MM/dd" width={200}></Column>
            <Column dataField="number">
                <RequiredRule />
            </Column>
            <Column dataField="height">
                <RangeRule min={1} />
            </Column>
            <Column dataField="nationality"></Column>
        </DataGrid>
    );
}
