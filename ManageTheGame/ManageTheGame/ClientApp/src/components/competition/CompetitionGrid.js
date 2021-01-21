import React from 'react';
//import authService from './api-authorization/AuthorizeService';
import DataGrid, { Column, Editing, Lookup, Popup, RequiredRule, RangeRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useHistory } from "react-router-dom";
import { ContentCard } from '../common/ContentCard';
const url = 'api/Competition';

export const CompetitionGrid = () => {
    const competitionTypes =
        [
            { value: 1, text: "League" }
            //TO DO
            //{ value: 2, text: "League with rematches" },
            //{ value: 4, text: "Cup" },
            //{ value: 5, text: "League + Cup" },
            //{ value: 6, text: "Playoff" }
        ];

    let history = useHistory();
    const competitionData = createStore({
        key: 'id',
        loadUrl: `${url}/Get`,
        updateUrl: `${url}/Update`,
        insertUrl: `${url}/Add`,
        deleteUrl: `${url}/Delete`,
    });

    const onRowUpdating = (row) => {
        row.newData = Object.assign({}, row.oldData, row.newData);
    }

    const onRowDblClick = (e) => {
        history.push(`/competitions/${e.data.id}`, e.data);
    }

    const onEditorPreparing = (e) => {
        if (e.dataField == "type" || e.dataField == "teamCount") {
            if (!e.row.isNewRow && e.row.data.started)
                e.editorOptions.disabled = true;
        }          
    }

    return (
        <ContentCard title="Competitions">
            <DataGrid
                dataSource={competitionData}
                focusedRowEnabled={true}
                onRowDblClick={onRowDblClick}
                onEditorPreparing={onEditorPreparing}
                onRowUpdating={onRowUpdating}
                showBorders={true}>
                <Editing
                    mode="popup"
                    allowAdding={true}
                    allowUpdating={true}
                    allowDeleting={true}
                    useIcons={true}>
                    <Popup
                        width={600}
                        height={'auto'}
                        showTitle={true}
                        title="Add/Edit Competition"
                    />
                </Editing>
                <Column dataField="name">
                    <RequiredRule />
                </Column>
                <Column dataField="type" visible={false}>
                    <Lookup
                        dataSource={competitionTypes}
                        valueExpr="value"
                        displayExpr="text"
                    />
                    <RequiredRule />
                </Column>
                <Column dataField="dateFrom" dataType="date" format="yyyy/MM/dd"></Column>
                <Column dataField="dateTo" dataType="date" format="yyyy/MM/dd"></Column>
                <Column dataField="description"></Column>
                <Column dataField="teamCount">
                    <RequiredRule />
                    <RangeRule min={2} message="Competition must have at least 2 teams" />
                </Column>
            </DataGrid>
        </ContentCard>
    );
}