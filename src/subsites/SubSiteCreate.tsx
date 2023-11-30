/* eslint react/jsx-key: off */
import {
    Create,
    SimpleForm,
    TextField,
    TextInput,
    required,
    Toolbar,
    SaveButton,
    NumberInput,
    ReferenceInput,
    SelectInput,
    DateTimeInput,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';

const SubSiteCreate = props => {
    const SubSiteCreateToolbar = props => {
        return (
            <Toolbar {...props} >
                <SaveButton disabled={props.pristine} />
            </Toolbar>
        )
    };

    return (
        <Create redirect="show" mutationMode="pessimistic">
            <SimpleForm >
                <ReferenceInput source="site_id" reference="sites" >
                    <SelectInput
                        label="Site"
                        source="site_id"
                        optionText={(record) => `${record.name} (${record.field_campaign.name})`}
                        validate={required()}
                    />
                </ReferenceInput>
                <TextInput source="name" validate={[required()]} />
                <TextInput source="description" multiline />
                <DateTimeInput source="recorded_at" validate={[required()]} />
                <NumberInput source="latitude" validate={[required()]} />
                <NumberInput source="longitude" validate={[required()]} />
                <NumberInput source="elevation" />
                <ArrayInput label="Temperature Measurements" source="temperatures">
                    <SimpleFormIterator inline>
                        <TextInput source="id" style={{ display: 'none' }} />

                        <NumberInput
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
                <ArrayInput label="Luminosity Measurements" source="luminosities">
                    <SimpleFormIterator inline>
                        <TextInput source="id" style={{ display: 'none' }} />
                        <TextInput
                            label="Luminosity (lux)"
                            source="measurement_lux"
                            validate={[required()]}
                            helperText={false}
                        />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create >
    )
};

export default SubSiteCreate;
