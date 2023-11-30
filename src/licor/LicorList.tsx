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
    useRecordContext,
    FileField,
} from "react-admin";
import { Link } from 'react-router-dom';

const LICORDownloadName = () => {
    const record = useRecordContext();
    const downloadLink = `/api/licor/${record.id}/data`;
    return downloadLink
};

const LicorListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

export const LicorList = () => {
    const { data, total, isLoading, error } = useGetList(
        'sites', {}
    );

    if (isLoading) return <p>Loading sites...</p>;
    console.log(data);

    return (
        <List actions={<LicorListActions />} disableSyncWithLocation>
            <Datagrid rowClick="show">
                <TextField source="name" />
                <TextField source="description" />
                <DateField source="recorded_at" showTime={true} />
                <FileField
                    source="url"
                    target="_blank"
                    title="name"
                    download={true}
                    label="Download"
                />

            </Datagrid>
        </List>
    );
};



export default LicorList;
