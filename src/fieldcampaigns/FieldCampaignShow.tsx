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
    ReferenceManyField,
    Datagrid,
    DateField,
    SimpleList,
} from "react-admin";


const FieldCampaignTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Area</span>;
};

const FieldCampaignShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <>
                <EditButton />
                <DeleteButton />
            </>}
        </TopToolbar>
    );
}

export const FieldCampaignShow = () => (
    <Show title={<FieldCampaignTitle />} actions={<FieldCampaignShowActions />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceManyField label="Sites" reference="sites" target="field_campaign_id">
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `${record.description}`}
                    tertiaryText={record => new Date(record.created_at).toLocaleDateString()}
                    linkType={record => record.canEdit ? "edit" : "show"}
                />
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);

export default FieldCampaignShow;
