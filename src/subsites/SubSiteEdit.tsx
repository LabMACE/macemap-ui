/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    TextField,
    ReferenceInput,
    NumberInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,

} from 'react-admin';

const SubSiteEdit = () => {
    return (
        <Edit mutationMode='pessimistic' redirect="show" >
            <SimpleForm >
                <ReferenceInput source="site_id" reference="sites" >
                    <SelectInput
                        label="Site"
                        source="site_id"
                        optionText="name"
                        validate={required()}
                        disabled={true}
                    />
                </ReferenceInput>
                <TextInput source="name" validate={[required()]} />
                <TextInput source="description" multiline />
                <NumberInput source="latitude" validate={[required()]} />
                <NumberInput source="longitude" validate={[required()]} />
                <NumberInput source="elevation" />
                <ArrayInput label="Temperature Measurements" source="temperatures">
                    <SimpleFormIterator inline>
                        <TextInput source="id" style={{ display: 'none' }} />
                        <TextInput
                            label="Measurement (°C)"
                            source="measurement_celsius"
                            validate={[required()]}
                            helperText={false}
                        />
                        <SelectInput
                            source="thermometer_characteristic"
                            helperText={false}
                            validate={[required()]}
                            choices={[
                                { id: 'black', name: 'Black' },
                                { id: 'white', name: 'White' }
                            ]}
                        />
                        <SelectInput
                            source="type"
                            helperText={false}
                            validate={[required()]}
                            choices={[
                                { id: 'air', name: 'Air' },
                                { id: 'soil', name: 'Soil' }
                            ]}
                        />
                        <SelectInput
                            source="depth_from_surface_cm"
                            helperText={false}
                            choices={[
                                { id: 'na', name: 'N/A' },
                                { id: '2_5_cm', name: '2 to 5 cm' },
                                { id: '10_15_cm', name: '10 to 15 cm' }
                            ]}
                        />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    )
};

export default SubSiteEdit;
