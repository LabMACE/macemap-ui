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
} from "react-admin";
import { LocationFieldPoints } from "../maps/Points";
import { Box } from '@mui/material';

const SiteTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Area</span>;
};

const SubSiteCreateButton = ({ site }) => {
    // Redirect to the edit page of the newly created post forwarding the
    // site ID
    return (<CreateButton
        label="Create subsite in this site"
        resource='subsites'
        state={{ record: { site_id: site } }} />);

};

const SiteShowActions = () => {
    const record = useRecordContext();
    if (!record) return null;
    console.log(record);
    const { permissions } = usePermissions();

    const redirect = useRedirect();
    const handleDeleteRedirect = () => {
        redirect('show', 'fieldcampaigns', record.field_campaign_id);
    }
    return (
        <TopToolbar>
            {permissions === 'admin' && <>
                <SubSiteCreateButton site={record.id} />
                <EditButton />
                <DeleteButton
                    redirect={handleDeleteRedirect} />
            </>}
        </TopToolbar>
    );
}

export const SiteShow = () => (
    <Show title={<SiteTitle />} actions={<SiteShowActions />}>
        <SimpleShowLayout>

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
                <ChipField source='name' />

            </ReferenceField>
            <ReferenceManyField
                label="Sub-Sites"
                reference="subsites"
                target="site_id">
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `${record.description}`}
                    tertiaryText={record => new Date(record.created_at).toLocaleDateString()}
                    linkType={record => record.canEdit ? "edit" : "show"}
                />
            </ReferenceManyField>
            <LocationFieldPoints source="subsites" resource_key="site_id" />

        </SimpleShowLayout>
    </Show>
);

export default SiteShow;
