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
                <TextInput source="description" validate={[required()]} />

            </SimpleForm>
        </Create >

    )
};

export default SiteCreate;
