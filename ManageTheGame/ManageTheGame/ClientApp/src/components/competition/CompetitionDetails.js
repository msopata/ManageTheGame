﻿import React, { Component, useEffect, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
import { CompetitionStarted } from './CompetitionStarted';
import { CompetitionStartup } from './CompetitionStartup';
const url = 'api/Competition';

export const CompetitionDetails = (props) => {

    useEffect(() => {
        console.log(props);
    }, []);

    return (
        (props.location.state.started) ?
            <CompetitionStarted competitionId={props.location.state.id} /> :
            <CompetitionStartup competitionId={props.location.state.id} />
    );
}

/*    
 *    async loadCompetitions() {
        //const token = await authService.getAccessToken();
        const response = await fetch('api/Competition');
        const data = await response.json();
        this.setState({ competitions: data });
    }*/