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
    FileInput,
} from 'react-admin';
import { useState } from 'react';

const LicorCreate = () => {

    const LicorCreateToolbar = props => {
        return (
            <Toolbar {...props} >
                <SaveButton disabled={props.pristine} />
            </Toolbar>
        )
    };

    return (
        <Create redirect="list">
            <SimpleForm toolbar={<LicorCreateToolbar />} >
                <TextField source="id" />
                <FileInput source="data" validate={[required()]} />
            </SimpleForm>
        </Create >

    )
};

export default LicorCreate;
