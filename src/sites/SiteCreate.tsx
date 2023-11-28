/* eslint react/jsx-key: off */
import {
    Create,
    SimpleForm,
    TextField,
    TextInput,
    required,
    useCreate,
    Toolbar,
    SaveButton,
    useRedirect,
    NumberInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';
import { useState } from 'react';

const SiteCreate = () => {

    const SiteCreateToolbar = props => {
        return (
            <Toolbar {...props} >
                <SaveButton disabled={props.pristine} />
            </Toolbar>
        )
    };

    return (
        <Create >
            <SimpleForm toolbar={<SiteCreateToolbar />} >
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
        </Create >

    )
};

export default SiteCreate;
