import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Lookup, Editing, RequiredRule } from 'devextreme-react/data-grid';
import './StatsTabs.css';

export const SquadTab = (props) => {
    const [homePlayers, setHomePlayers] = useState({ lookup: [], datasource: [] });
    const [awayPlayers, setAwayPlayers] = useState({ lookup: [], datasource: [] });

    useEffect(() => {
        loadHomeData();
    }, []);

    useEffect(() => {
        loadAwayData();
    }, []);

    const loadHomeData = async () => {
        //const token = await authService.getAccessToken();
        const homeResponse = await fetch(`api/Club/GetPlayers/${props.homeId}`);
        const homeLookupData = await homeResponse.json();
        const homeData = {
            lookup: homeLookupData,
            datasource: props.data.filter(x => x.player.clubId == props.homeId)
        };
        setHomePlayers(homeData);
    }
    const loadAwayData = async () => {
        const awayResponse = await fetch(`api/Club/GetPlayers/${props.awayId}`);
        const awayLookupData = await awayResponse.json();
        const awayData = {
            lookup: awayLookupData,
            datasource: props.data.filter(x => x.player.clubId == props.awayId)
        }; 
        setAwayPlayers(awayData);
    }

    const onRowInserting = (e) => {
        //TO DO add player number
        e.data.type = 1;
    }

    const onRowInserted = (e) => {
        const data = {
            "fixtureId": props.fixtureId,
            "playerId": e.data.playerId,
            "type": e.data.type,
            "minute": 0
        }
        addStatsData(data);
    }

    const addStatsData = async (data) => {
        await fetch("api/Stats/Add", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(result => console.log(result));
    }

    return (
        <div className='squad-tab-main'>
            <div className='squad-tab-left'>
                <h1>{props.home}</h1>
                <DataGrid
                    dataSource={homePlayers.datasource}
                    width={'70%'}
                    onRowInserting={onRowInserting}
                    onRowInserted={onRowInserted}
                    noDataText=""
                    showBorders={true}>
                    <Editing
                        allowAdding={true}
                        allowDeleting={true}
                        useIcons={true} />
                    <Column dataField="playerId" caption="Player" displayExpr="lastName">
                        <RequiredRule />
                        <Lookup
                            dataSource={homePlayers.lookup}
                            valueExpr="id"
                            displayExpr="lastName"
                        />
                    </Column>
                    <Column dataField="player.number" caption="No." width={50}></Column>
                    <Column dataField="type" visible={false}></Column>
                    <Column dataField="minute" visible={false}></Column>
                </DataGrid>
            </div>
            <div className='squad-tab-right'>
                <h1>{props.away}</h1>
                <DataGrid
                    dataSource={awayPlayers.datasource}
                    onRowInserting={onRowInserting}
                    onRowInserted={onRowInserted}
                    noDataText=""
                    width={'70%'}
                    showBorders={true}>
                    <Editing
                        allowAdding={true}
                        allowDeleting={true}
                        useIcons={true} />
                    <Column dataField="playerId" caption="Player" displayExpr="lastName">
                        <RequiredRule />
                        <Lookup
                            dataSource={awayPlayers.lookup}
                            valueExpr="id"
                            displayExpr="lastName"
                        />
                    </Column>
                    <Column dataField="player.number" caption="No." width={50}></Column>
                    <Column dataField="type" visible={false}></Column>
                    <Column dataField="minute" visible={false}></Column>
                </DataGrid>
            </div>
        </div>
    );
}
