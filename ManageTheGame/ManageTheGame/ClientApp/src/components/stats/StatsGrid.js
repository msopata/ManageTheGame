import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Lookup, Paging, MasterDetail } from 'devextreme-react/data-grid';
import TabPanel from 'devextreme-react/tab-panel'
import { SquadTab } from './tabs/SquadTab';
import { StatisticsTab } from './tabs/StatisticsTab';
import { ContentCard } from '../common/ContentCard';
const url = 'api/Stats';

export const StatsGrid = (props) => {
    const [squadData, setSquadsData] = useState([]);
    const [statsData, setStatsData] = useState([]);
  
    useEffect(() => {
        loadStats(props.location.state.id);
    }, []);

    const loadStats = async (fixtureId) => {
        const response = await fetch(`${url}/GetFixtureStats/${fixtureId}`);
        const data = await response.json();
        const squads = data.filter(x => x.type == 1);
        console.log("data", data);
        console.log("squads", squads);
        setSquadsData(squads);
        const stats = data.filter(x => x.type > 1);
        setStatsData(stats);
    }

    const renderTab = (e) => {
        switch (e.index) {
            case 0:
                return (
                    <div>
                        <SquadTab
                            fixtureId={props.location.state.id}
                            data={squadData}
                            homeId={props.location.state.homeId}
                            home={props.location.state.home.name}
                            awayId={props.location.state.awayId}
                            away={props.location.state.away.name}
                        />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <StatisticsTab
                            fixtureId={props.location.state.id}
                            data={statsData}
                            homeId={props.location.state.homeId}
                            home={props.location.state.home.name}
                            awayId={props.location.state.awayId}
                            away={props.location.state.away.name}
                        />
                    </div>
                );
        }
    }

    return (

        <ContentCard title="Statistics">
            <TabPanel
                dataSource={['Squads', 'Game facts']}
                itemComponent={renderTab}
            />
        </ContentCard>
    );
}
