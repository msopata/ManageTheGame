import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Paging, Editing } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
const url = 'api/Player';

export const SquadTab = (props) => {

    useEffect(() => {
        console.log(props.data);
    }, []);

    return (
        "Hello"
    );
}
