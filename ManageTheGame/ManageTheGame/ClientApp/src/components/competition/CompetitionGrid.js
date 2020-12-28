import React, { Component } from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel
} from 'devextreme-react/data-grid';

export class CompetitionGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { competitions: [] };
    }

    componentDidMount() {
        this.loadCompetitions();
    }

    render() {
        console.log(this.state.competitions);
        return (
            <DataGrid
                dataSource={this.state.competitions}
                showBorders={true}>
                <Column dataField="name"></Column>
                <Column dataField="dateFrom"></Column>
                <Column dataField="dateTo"></Column>
                <Column dataField="description"></Column>
                <Column dataField="teamCount"></Column>
            </DataGrid>   
            );
        
    }

    async loadCompetitions() {
        //const token = await authService.getAccessToken();
        const response = await fetch('api/Competition');
        const data = await response.json();
        this.setState({ competitions: data });
    }
}
