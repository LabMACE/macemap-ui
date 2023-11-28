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


const SubSiteListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

export const SubSiteList = () => {

    return (
        <List actions={<SubSiteListActions />} disableSyncWithLocation>
            <Datagrid rowClick="show">
                <TextField source="name" />
                <TextField source="description" />
                <NumberField source="elevation" />
                <NumberField source="latitude" />
                <NumberField source="longitude" />
                <DateField source="created_at" />
                <ReferenceField
                    source='site_id'
                    reference='sites'
                    link="show"
                >
                    <TextField source='name' />
                </ReferenceField>
            </Datagrid>
        </List>
    );
};



export default SubSiteList;
