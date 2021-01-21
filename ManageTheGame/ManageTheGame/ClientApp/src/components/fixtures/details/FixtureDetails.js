import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Lookup, Editing, Scrolling, Popup, RequiredRule, RangeRule } from 'devextreme-react/data-grid';
import './FixtureDetails.css';

export const FixtureDetails = (props) => {
    const [stats, setStats] = useState({ home: [], away: [] });

    const images = [
        { id: 2, path: require("./goal.png") },
        { id: 3, path: require("./asisst.png") },
        { id: 4, path: require("./yellow_card.png") },
        { id: 5, path: require("./red_card.png") },
        { id: 6, path: require("./trophy.png") }
    ];

    useEffect(() => {
        loadHomeData(props.fixtureData.id);
    }, []);

    const loadHomeData = async (fixtureId) => {
        const response = await fetch(`api/Stats/GetFixtureStats/${fixtureId}`);
        const data = await response.json();
        const homeData = data.filter(x => x.player.clubId == props.fixtureData.homeId && x.type != 1);
        const awayData = data.filter(x => x.player.clubId == props.fixtureData.awayId && x.type != 1);
        const obj = { home: homeData, away: awayData };
        //console.log("obj", obj);
        setStats(obj);
    }

    const cellRender = (e) => {
        return <img src={images.find(x => x.id == e.value).path} width={20} height={20} alt={'image'} />;
    }

    const fixMinutesDisplay = (rowData) => {
        return (rowData.minute != 0) ?
            rowData.minute + "'" : "MVP";
    }

    return (
        <div className='fixture-tab-main'>
            <div className='fixture-tab-left'>
                <h1>{props.fixtureData.home.name}</h1>
                <DataGrid
                    dataSource={stats.home}
                    width={'70%'}
                    showColumnLines={false}
                    showColumnHeaders={false}
                    noDataText="">
                    <Scrolling />
                    <Column dataField="minute" calculateDisplayValue={fixMinutesDisplay}></Column>
                    <Column dataField="player.lastName" caption="Player" alignment="right"></Column>
                    <Column dataField="type" caption="icon" cellRender={cellRender}></Column>
                </DataGrid>
            </div>
            <div className='fixture-tab-right'>
                <h1>{props.fixtureData.away.name}</h1>
                <DataGrid
                    dataSource={stats.away}
                    noDataText=""
                    showColumnLines={false}
                    showColumnHeaders={false}
                    width={'70%'}>
                    <Scrolling />
                    <Column dataField="type" caption="icon" cellRender={cellRender}></Column>
                    <Column dataField="player.lastName" caption="Player"></Column>
                    <Column dataField="minute" calculateDisplayValue={fixMinutesDisplay}></Column>
                </DataGrid>
            </div>
        </div>
    );
}
