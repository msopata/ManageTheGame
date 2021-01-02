import React, { Component, useEffect, useRef, useState } from 'react';
import TabPanel from 'devextreme-react/tab-panel'
//const url = 'api/CompetitionCLub';

export const CompetitionStarted = () => {
    const renderTab = (e) => {
        switch (e.index) {
            case 0:
                return (
                   <div>
                        "Standings"
                   </div>
                );
            case 1:
                return (
                   <div>
                       "Fixtures"
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
            <TabPanel
                dataSource={['Standings', 'Fixtures', 'Stats']}
                itemComponent={renderTab}
            />
        </div>
    );
}
