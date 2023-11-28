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
} from "react-admin";


const SiteTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Area</span>;
};

const SubSiteCreateButton = ({ site }) => {
    // const redirect = useRedirect();
    // const record = useRecordContext();
    // the record can be empty while loading
    // if (!record) return null;
    // const handleClick = () => {
    // redirect('/dashboard');
    // redirect('create', 'subsites', undefined, 'hello');
    // }
    return (<CreateButton
        label="Create subsite"
        resource='subsites'
        state={{ record: { site_id: site } }} />);

};

const SiteShowActions = () => {
    const record = useRecordContext();
    if (!record) return null;
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <>
                <SubSiteCreateButton site={record.id} />
                <EditButton />
                <DeleteButton />
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
                <TextField source='name' />
            </ReferenceField>
            <ReferenceManyField label="Sub-Sites" reference="subsites" target="site_id">
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

export default SiteShow;
