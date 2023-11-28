import {
    List,
    Datagrid,
    TextField,
    ReferenceManyCount,
    useGetList,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    ArrayField,
    NumberField,
    Count,
    DateField,
    ReferenceField,
} from "react-admin";


const SiteListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

export const SiteList = () => {

    return (
        <List actions={<SiteListActions />} disableSyncWithLocation>
            <Datagrid rowClick="show">
                <TextField source="name" />
                <TextField source="description" />
                <NumberField source="elevation" />
                <NumberField source="latitude" />
                <NumberField source="longitude" />
                <DateField source="created_at" />
                <ReferenceField
                    source='field_campaign_id'
                    reference='fieldcampaigns'
                    link="show"
                >
                    <TextField source='name' />
                </ReferenceField>
            </Datagrid>
        </List>
    );
};



export default SiteList;
