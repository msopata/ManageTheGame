import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Lookup, Editing, RangeRule, RequiredRule } from 'devextreme-react/data-grid';

export const StatisticsTab = (props) => {
    const [homePlayers, setHomePlayers] = useState({ lookup: [], datasource: [] });
    const [awayPlayers, setAwayPlayers] = useState({ lookup: [], datasource: [] });

    const lookupItems =
        [
            { value: 2, text: "Goal" },
            { value: 3, text: "Assist" },
            { value: 4, text: "Yellow card" },
            { value: 5, text: "Red card" },
            { value: 6, text: "MVP" }
        ];

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

    const onRowInserted = (e) => {
        const data = {
            "fixtureId": props.fixtureId,
            "playerId": e.data.playerId,
            "type": e.data.type,
            "minute": parseInt(e.data.minute)
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
                    onRowInserted={onRowInserted}
                    noDataText=""
                    width={'90%'}
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
                    <Column dataField="type">
                        <RequiredRule />
                        <Lookup
                            dataSource={lookupItems}
                            valueExpr="value"
                            displayExpr="text"
                        />
                    </Column>
                    <Column dataField="minute" width={50} dataType="Number" caption="Min." alignment="center">
                        <RangeRule min={0} max={90} />
                    </Column>
                </DataGrid>
            </div>
            <div className='squad-tab-right'>
                <h1>{props.away}</h1>
                <DataGrid
                    dataSource={awayPlayers.datasource}
                    onRowInserted={onRowInserted}
                    noDataText=""
                    width={'90%'}
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
                    <Column dataField="type">
                        <RequiredRule />
                        <Lookup
                            dataSource={lookupItems}
                            valueExpr="value"
                            displayExpr="text"
                        />
                    </Column>
                    <Column dataField="minute" width={50} dataType="Number" caption="Min." alignment="center">
                        <RangeRule min={0} max={90} />
                    </Column>
                </DataGrid>
            </div>
        </div>
    );
}
