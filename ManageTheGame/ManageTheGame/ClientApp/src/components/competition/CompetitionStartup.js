import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Lookup } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
import { ContentCard } from '../common/ContentCard';
//const url = 'api/CompetitionCLub';

export const CompetitionStartup = (props) => {
    let dataGridRef = useRef();
    const [competition, setCompetition] = useState({});
    const [clubLookupData, setClubLookupData] = useState({});
    const [clubAddition, setClubAddition] = useState(false);

    useEffect(() => {
        loadCompetitionDetails();
    }, [clubAddition]);

    useEffect(() => {
        loadClubData();
    }, []);


    const loadClubData = async () => {
        const response = await fetch(`api/Club/Get`);
        const data = await response.json();
        setClubLookupData(data);
    }

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
        setTimeout(() => setClubAddition(!clubAddition), 1000);
    }

    const startCompetition = async (competitionId) => {
        await fetch(`api/Competition/UpdateCompetitionStart/${competitionId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(result => console.log(result));  
    }

    const onCompetitionStartBtnClick = () => {
        startCompetition(props.competitionId);
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

        <ContentCard title={competition.name}>
            <div style={{ color: "white"}}>
                {competition.clubs && `Teams selected: ${competition.clubs.length} out of ${competition.teamCount}`}
            </div>
            <br/>
            <DataGrid
                ref={ref => dataGridRef = ref}
                dataSource={competition.clubs}
                keyExpr="id"
                width={'50%2'}
                focusedRowEnabled={true}
                onRowInserting={onRowInserting}
                onRowInserted={onRowInserted}
                showBorders={true}>
                <Editing
                    allowAdding={competition.clubs && competition.clubs.length != competition.teamCount}
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
            <Button onClick={onCompetitionStartBtnClick} text="Draw fixtures and start" useSubmitBehavior={true} disabled={competition.clubs && competition.clubs.length != competition.teamCount} />
        </ContentCard>
    );
}
