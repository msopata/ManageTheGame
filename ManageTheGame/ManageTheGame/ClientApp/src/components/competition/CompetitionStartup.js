import React, { Component, useEffect, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Lookup } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
const url = 'api/Competition';

export const CompetitionStartup = (props) => {
    const [competition, setCompetition] = useState({});
    useEffect(() => {
        loadCompetitionDetails();
    }, []);

    const clubLookupData = createStore({
        key: 'id',
        loadUrl: `api/Club/Get`,
    });

    const loadCompetitionDetails = async () => {
        //const token = await authService.getAccessToken();
        const response = await fetch(`api/Competition/GetCompetitionDetails/${props.match.params.id}`);
        const data = await response.json();
        setCompetition(data);
    }

    const onValueChanged = (e) => {
        console.log(e);
    }

    const onRowInserting = (e) => {
        console.log("przed", e)
        const data = {
            competitionId: props.match.params.id,
            clubId: e.data.id
        }
        addClubToCompetition(data);
    }

    const addClubToCompetition = async (data) => {
        const response = await fetch(`api/CompetitionClubs/Add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    return (
        <div>
            {competition.name}<br/>
            Maximum number of teams: {competition.teamCount}
            <DataGrid
                dataSource={competition.clubs}
                keyExpr="id"
                width={500}
                focusedRowEnabled={true}
                onRowInserting={onRowInserting}
                onRowInserted={(e)=>console.log(e)}
                showBorders={true}>
                <Editing
                    allowAdding={true}
                    allowDeleting={true}
                    useIcons={true} />
                <Column dataField="id" caption="Name" displayExpr="name">
                    <Lookup
                        dataSource={clubLookupData}
                        valueExpr="id"
                        displayExpr="name"
                        onValueChanged={onValueChanged}
                    />
                </Column>
                <Column dataField="abbreviation"></Column>
            </DataGrid>
        </div>
    );
}
