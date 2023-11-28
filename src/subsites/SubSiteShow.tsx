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
    ArrayField,
    SingleFieldList,
    ChipField,
} from "react-admin";


const SubSiteTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Area</span>;
};

const SubSiteShowActions = () => {
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

export const SubSiteShow = () => (
    <Show title={<SubSiteTitle />} actions={<SubSiteShowActions />}>
        <SimpleShowLayout>
            <ReferenceField
                label="Site name"
                source='site_id'
                reference='sites'
                link="show"
            >
                <TextField source='name' />
            </ReferenceField>
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="elevation" />
            <NumberField source="latitude" />
            <NumberField source="longitude" />
            <DateField source="created_at" />
            <ArrayField source="temperatures">
                <SingleFieldList linkType={false}>
                    <ChipField source="measurement_celsius" size="small" />
                </SingleFieldList>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);

export default SubSiteShow;
