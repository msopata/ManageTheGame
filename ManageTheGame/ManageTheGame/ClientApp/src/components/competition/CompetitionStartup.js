import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Lookup } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
//const url = 'api/CompetitionCLub';

export const CompetitionStartup = (props) => {
    let dataGridRef = useRef();
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
        const response = await fetch(`api/Competition/GetCompetitionDetails/${props.competitionId}`);
        const data = await response.json();
        setCompetition(data);
    }

    const onRowInserting = (e) => {
        const data = {
            "competitionId": props.competitionId,
            "clubId": e.data.id
        }
        addClubToCompetition(data);
    }

    const onRowInserted = (e) => {
        setTimeout(e.component.refresh, 1000);
    }

    const onRowRemoving = async (e) => {
        console.log(competition)
        /*
        await fetch(`api/CompetitionClub/Delete`, {
            method: "DELETE",
            body: JSON.stringify({ "key": e.key }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(result => console.log(result));
            */
    }

    const startCompetition = () => {
        console.log("start");
    }


    const addClubToCompetition = async (data) => {      
        await fetch("api/CompetitionClub/Add", {
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(result => console.log(result));    
    }

    return (

        <div>
            {competition.name}<br />
            {competition.clubs &&
                `Number of teams: ${competition.clubs.length} out of ${competition.teamCount}`
            }
            <DataGrid
                ref={ref => dataGridRef = ref}
                dataSource={competition.clubs}
                keyExpr="id"
                width={500}
                onRowInserted={onRowInserted}
                focusedRowEnabled={true}
                onRowInserting={onRowInserting}
                onRowRemoving={onRowRemoving}
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
                    />
                </Column>
                <Column dataField="abbreviation"></Column>
            </DataGrid>
            <br />
            <Button onClick={startCompetition} text="Draw fixtures and start" />
        </div>
    );
}
