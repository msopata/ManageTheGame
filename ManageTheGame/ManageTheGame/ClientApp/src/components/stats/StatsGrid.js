import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Lookup, Paging, MasterDetail } from 'devextreme-react/data-grid';
import TabPanel from 'devextreme-react/tab-panel'
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { SquadTab } from './tabs/SquadTab';
import { StatisticsTab } from './tabs/StatisticsTab';
import { data } from 'jquery';
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
        const squads = data.filter(x => x.Type == 1);
        setSquadsData(squads);
        const stats = data.filter(x => x.Type > 1);
        setStatsData(stats);
    }

    const renderTab = (e) => {
        switch (e.index) {
            case 0:
                return (
                    <div>
                        <SquadTab data={squadData} />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <StatisticsTab data={statsData} />
                    </div>
                );
        }
    }

    return (

        <div>
            <TabPanel
                dataSource={['Squads', 'Game facts']}
                itemComponent={renderTab}
            />
        </div>
    );
}
