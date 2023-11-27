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
    Count,
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
        <List actions={<SiteListActions />}>
            <Datagrid rowClick="show">
                <TextField source="name" />
                <TextField source="description" />
            </Datagrid>
        </List>
    );
};



export default SiteList;
