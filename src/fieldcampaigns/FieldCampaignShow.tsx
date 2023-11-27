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
        </SimpleShowLayout>
    </Show>
);

export default FieldCampaignShow;
