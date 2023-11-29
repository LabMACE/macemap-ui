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
    CreateButton,
} from "react-admin";
import { LocationFieldPointsShow } from "../maps/Points";

const FieldCampaignTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Area</span>;
};



const SiteCreateButton = ({ site }) => {
    // Redirect to the edit page of the newly created post forwarding the
    // site ID
    return (<CreateButton
        label="Create site in this field campaign"
        resource='sites'
        state={{ record: { field_campaign_id: site } }} />);

};

const FieldCampaignShowActions = () => {
    const record = useRecordContext();
    if (!record) return null;
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <>
                <SiteCreateButton site={record.id} />
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
            <LocationFieldPointsShow source="sites" resource_key="field_campaign_id" />
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
