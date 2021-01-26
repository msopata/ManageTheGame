import React, { Component, useEffect, useRef, useState } from 'react';
import TabPanel from 'devextreme-react/tab-panel'
import { FixtureTab } from './tabs/FixtureTab'
import { PlayerTab } from './tabs/PlayerTab';
import { StatsTab } from './tabs/StatsTab';
import { ContentCard } from '../common/ContentCard';
//const url = 'api/CompetitionCLub';

export const ClubDetails = (props) => {
    const renderTab = (e) => {
        switch (e.index) {
            case 0:
                return (
                    <div>
                        <PlayerTab clubId={props.location.state.id} />
                   </div>
                );
            case 1:
                return (
                    <div>
                        <FixtureTab clubId={props.location.state.id} />
                   </div>
                );
            case 2:
                return (
                    <div>
                        <StatsTab clubId={props.location.state.id} />
                   </div>
                );
        }
    }

    return (

        <ContentCard title={props.location.state.name}>
            <TabPanel
                dataSource={['Players', 'Fixtures', 'Stats']}
                itemComponent={renderTab}
            />
        </ContentCard>
    );
}
