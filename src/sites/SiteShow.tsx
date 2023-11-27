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


const SiteTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Area</span>;
};

const SiteShowActions = () => {
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

export const SiteShow = () => (
    <Show title={<SiteTitle />} actions={<SiteShowActions />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="description" />
        </SimpleShowLayout>
    </Show>
);

export default SiteShow;
