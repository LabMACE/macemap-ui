/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required
} from 'react-admin';

const FieldCampaignEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" validate={required()} />
                <TextInput source="description" validate={required()} />
            </SimpleForm>
        </Edit>
    )
};

export default FieldCampaignEdit;
