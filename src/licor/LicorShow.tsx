import {
    Show,
    SimpleShowLayout,
    TextField,
    ReferenceManyCount,
    useRecordContext,
    TopToolbar,
    EditButton,
    DeleteButton,
    usePermissions,
    NumberField,
    DateField,
    ReferenceField,
    ReferenceManyField,
    SimpleList,
    CreateButton,
    useRedirect,
    ChipField,
    ArrayField,
    Datagrid,
    FunctionField,
    FileField,
    UrlField,
    useCreatePath,
} from "react-admin";
import { LocationFieldPointsShow } from "../maps/Points";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const LicorTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Area</span>;
};

const SubLicorCreateButton = ({ site }) => {
    // Redirect to the edit page of the newly created post forwarding the
    // site ID
    return (<CreateButton
        label="Create subsite in this site"
        resource='subsites'
        state={{ record: { site_id: site } }} />);

};

const LicorShowActions = () => {
    const record = useRecordContext();
    if (!record) return null;
    console.log(record);
    const { permissions } = usePermissions();

    return (
        <TopToolbar>
            {permissions === 'admin' && <>
                <SubLicorCreateButton site={record.id} />
                <EditButton />
                <DeleteButton
                    redirect="list" />
            </>}
        </TopToolbar>
    );
}

const dataSetURL = () => {
    const record = useRecordContext();
    if (!record) return null;

    const createPath = useCreatePath();

    return <Link
        to={createPath({
            resource: 'licordataset',
            type: 'show',
            id: `${record.licor_id}.${record.key}`
        })}>{record.key}</Link>;
}

export const LicorShow = () => (
    <Show title={<LicorTitle />} actions={<LicorShowActions />}>
        <SimpleShowLayout>

            <TextField source="name" />
            <TextField source="description" />
            <DateField source="recorded_at" showTime={true} />
            <DateField source="created_at" label="Uploaded at" showTime={true} />
            <FileField
                source="url"
                target="_blank"
                title="name"
                download={true}
                label="Download"
            />
            <ArrayField source="measurements">
                <Datagrid bulkActionButtons={false}>
                    <FunctionField label="key" render={dataSetURL} />
                    <TextField source="key" label="Dataset" />
                    <TextField source="measurements.remark" />
                </Datagrid>
            </ArrayField>

        </SimpleShowLayout>
    </Show>
);

export default LicorShow;
