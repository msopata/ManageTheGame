import React, { Component, useEffect, useRef, useState } from 'react';
import TabPanel from 'devextreme-react/tab-panel'
import { FixtureGrid } from '../fixtures/FixtureGrid'
import { StandingsGrid } from '../standings/StandingsGrid'
import { ContentCard } from '../common/ContentCard';
//const url = 'api/CompetitionCLub';

export const CompetitionStarted = (props) => {
    const [standingsGridUpdated, updateStandingsGrid] = useState(false);
    const renderTab = (e) => {
        switch (e.index) {
            case 0:
                return (
                   <div>
                        <StandingsGrid competitionId={props.competitionId} />
                   </div>
                );
            case 1:
                return (
                    <div>
                        <FixtureGrid
                            competitionId={props.competitionId}
                            updateStandingsGrid={updateStandingsGrid}
                            teamCount={props.teamCount}
                        />
                   </div>
                );
            case 2:
                return (
                   <div>
                        "Stats"
                   </div>
                );
        }
    }

    return (

        <div>
            <ContentCard>
                <TabPanel
                    dataSource={['Standings', 'Fixtures', 'Stats']}
                    itemComponent={renderTab}
                />
            </ContentCard>
        </div>
    );
}
