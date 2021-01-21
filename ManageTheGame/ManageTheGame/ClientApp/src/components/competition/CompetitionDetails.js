import React, { Component, useEffect, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
import { CompetitionStarted } from './CompetitionStarted';
import { CompetitionStartup } from './CompetitionStartup';
const url = 'api/Competition';

export const CompetitionDetails = (props) => {

    return (
        (props.location.state.started) ?
            <CompetitionStarted
                competitionId={props.location.state.id}
                teamCount={props.location.state.teamCount}
                competitionName={props.location.state.name} /> :
            <CompetitionStartup competitionId={props.location.state.id} />
    );
}
