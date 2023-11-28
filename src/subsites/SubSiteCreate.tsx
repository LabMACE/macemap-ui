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
    useRecordContext,
    useGetOne,
    DateTimeInput,
} from 'react-admin';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';
const SubSiteCreate = props => {
    // const isReturned = useWatch();
    // const siteRecord = useRecordContext();
    // if (!isReturned) return null;
    // console.log(isReturned);
    // console.log("SubSiteCreate: props: ", props.site);


    // if (isLoading) return null;
    // console.log("SubSiteCreate: fieldcampaign: ", data);

    // console.log("SubSiteCreate: site: ", data);

    const getFieldCampaignName = (field_id) => {
        // Helper to get the field name from the given ID (in the site record)
        const { data, isLoading, error, refetch } = useGetOne(
            'fieldcampaigns',
            { id: field_id },
        );
        if (isLoading) return null;

        return data.name;
    }
    const SubSiteCreateToolbar = props => {
        return (
            <Toolbar {...props} >
                <SaveButton disabled={props.pristine} />
            </Toolbar>
        )
    };

    return (
        <Create mutationMode="pessimistic">
            <SimpleForm toolbar={<SubSiteCreateToolbar />} >
                <ReferenceInput source="site_id" reference="sites" >
                    <SelectInput
                        label="Site name of new subsite"
                        source="site_id"
                        optionText={(record) => `${record.name} (${getFieldCampaignName(record.field_campaign_id)})`}
                        validate={required()}
                        disabled={true} />
                </ReferenceInput>
                <TextField source="id" />
                <TextInput source="name" validate={[required()]} />
                <TextInput source="description" />
                <DateTimeInput source="recorded_at" />
                <NumberInput source="latitude" validate={[required()]} />
                <NumberInput source="longitude" validate={[required()]} />
                <NumberInput source="elevation" />
            </SimpleForm>
        </Create >
    )
};

export default SubSiteCreate;
