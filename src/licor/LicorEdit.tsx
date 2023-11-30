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
        <Edit redirect="show">
            <SimpleForm >
                <TextInput source="name" validate={[required()]} />
                <TextInput source="description" />
                <ReferenceInput source="site_id" reference="sites" >
                    <SelectInput
                        label="Site"
                        source="site_id"
                        optionText={(record) => `${record.name} (${record.field_campaign.name})`}
                    />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
};

export default LicorEdit;
