import {
    List,
    Datagrid,
    TextField,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    ReferenceManyCount,
} from "react-admin";


const FieldCampaignListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

export const FieldCampaignList = () => {

    return (
        <List actions={<FieldCampaignListActions />}>
            <Datagrid rowClick="show">
                <TextField source="name" />
                <TextField source="description" />
                <ReferenceManyCount
                    label="Sites"
                    reference="sites"
                    target="field_campaign_id"
                    link
                />
            </Datagrid>
        </List>
    );
};



export default FieldCampaignList;
