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
} from 'react-admin';

const LicorEdit = () => {
    return (
        <Edit redirect="list">
            <SimpleForm >
                <TextInput source="name" validate={[required()]} />
                <TextInput source="description" />
                <NumberInput source="latitude" />
                <NumberInput source="longitude" />
                <NumberInput source="elevation" />
                <ReferenceInput source="field_campaign_id" reference="fieldcampaigns" >
                    <SelectInput
                        label="Field Campaign"
                        source="field_campaign_id"
                        optionText="name"
                        validate={required()} />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
};

export default LicorEdit;
