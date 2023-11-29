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
    Datagrid,
    FunctionField,
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

const thermometerMapper = {
    'black': 'Black',
    'white': 'White',
};

const typeMapper = {
    'air': 'Air',
    'soil': 'Soil',
};

const depthMapper = {
    'na': 'N/A',
    '2_5_cm': '2 to 5 cm',
    '10_15_cm': '10 to 15 cm',
};

export const SubSiteShow = () => (
    <Show title={<SubSiteTitle />} actions={<SubSiteShowActions />}>
        <SimpleShowLayout>
            <TextField label="Subsite name" source="name" />
            <ReferenceField
                label="Site"
                source='site_id'
                reference='sites'
                link="show"
            >
                <ChipField source='name' />
            </ReferenceField>
            <TextField source="description" />
            <NumberField source="latitude" />
            <NumberField source="longitude" />
            <NumberField source="elevation" />
            <DateField source="created_at" />
            <ArrayField source="luminosities">
                <Datagrid bulkActionButtons={false} style={{ tableLayout: 'fixed', width: '20%' }}>
                    <NumberField source="measurement_lux" label="Measurement (lux)" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="temperatures">
                <Datagrid bulkActionButtons={false} style={{ tableLayout: 'fixed', width: '50%' }}>
                    <NumberField source="measurement_celsius" label="Measurement (°C)" />
                    <FunctionField
                        render={
                            record => `${typeMapper[record.type]}`
                        }
                    />
                    <FunctionField
                        label="Depth (cm)"
                        render={
                            record => `${depthMapper[record.depth_from_surface_cm]}`
                        }
                    />
                    <FunctionField
                        label="Thermometer"
                        render={
                            record => `${thermometerMapper[record.thermometer_characteristic]}`
                        }
                    />
                </Datagrid>
            </ArrayField>

        </SimpleShowLayout>
    </Show>
);

export default SubSiteShow;
