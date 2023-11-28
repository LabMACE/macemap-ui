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

const SiteEdit = () => {
    return (
        <Edit>
            <SimpleForm >
                <TextField source="id" />
                <TextInput source="name" validate={[required()]} />
                <TextInput source="description" />
                <NumberInput source="latitude" validate={[required()]} />
                <NumberInput source="longitude" validate={[required()]} />
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

export default SiteEdit;
