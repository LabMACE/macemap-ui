import {
    Show,
    SimpleShowLayout,
    TextField,
    ReferenceManyCount,
    useRecordContext,
    TopToolbar,
    EditButton,
    DeleteButton,
    usePermissions,
    NumberField,
    DateField,
    ReferenceField,
    ReferenceManyField,
    SimpleList,
    CreateButton,
    useRedirect,
    ChipField,
    ArrayField,
    Datagrid,
    FunctionField,
    FileField,
} from "react-admin";
import { LocationFieldPointsShow } from "../maps/Points";
import { Box } from '@mui/material';
import {
    LineChart,
    Line,
    Label,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';

const LicorDatasetTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>{record.place} Area</span>;
};


export const LicorDatasetShow = () => (
    <Show title={<LicorDatasetTitle />} >
        <SimpleShowLayout>
            <TextField source="key" />
            <TextField source="measurements.remark" />
            <ReferenceField
                label="Licor"
                source='licor_id'
                reference='licor'
                link="show"
            >
                <ChipField source='name' />
            </ReferenceField>
            <TextField source="measurements.reps.REP_1.header" />
            <DataPlot />
            {/* <ArrayField source="measurements.reps.REP_1.summary.timestamp">
                <Datagrid bulkActionButtons={false} style={{ tableLayout: 'fixed', width: '50%' }}>
                    <NumberField source="measurement_celsius" label="Measurement (°C)" />

                </Datagrid>
            </ArrayField> */}
        </SimpleShowLayout>
    </Show>
);

export const DataPlot = () => {
    const record = useRecordContext();
    if (!record) return null;
    console.log(record.measurements.reps.REP_1.data);
    const data = record.measurements.reps.REP_1.data;
    // const restructuredData = data.timestamp.map((timestamp, index) => ({
    //     timestamp,
    //     chamber_p: data.chamber_p[index],
    //     chamber_p_t: data.chamber_p_t[index],
    // }));
    const restructuredData = data.timestamp.map((timestamp, index) => {
        const newObj = { timestamp };

        Object.keys(data).forEach((key) => {
            if (key !== 'timestamp') {
                newObj[key] = data[key][index];
            }
        });

        return newObj;
    });


    return (
        <ResponsiveContainer width="95%" height={400}>
            <LineChart
                width={1000}
                height={400}
                data={restructuredData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" >
                    <Label value="Time" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis yAxisId="left" domain={['chamber_p']} >

                </YAxis>
                <YAxis yAxisId="right" domain={['chamber_p_t']} orientation="right" >

                </YAxis>
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="chamber_p" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="chamber_p_t" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>

        // <LineChart
        //     width={800}
        //     height={400}
        //     data={restructuredData}
        //     margin={{
        //         top: 5,
        //         right: 30,
        //         left: 20,
        //         bottom: 5,
        //     }}
        // >
        //     <CartesianGrid strokeDasharray="3 3" />
        //     <XAxis dataKey="timestamp" >
        //         <Label value="Time" offset={-5} position="insideBottom" />
        //     </XAxis>
        //     <YAxis yAxisId="left" domain={['soil_t']}>
        //         <Label value="Temperature (°C)" angle={-90} offset={5} position="insideLeft" />
        //     </YAxis>
        //     <YAxis yAxisId="right" domain={['chamber_p']}>
        //         <Label value="Temperature (°C)" angle={-90} offset={5} position="insideLeft" />
        //     </YAxis>
        //     <Tooltip />
        //     <Legend />
        //     <Line yAxisId="left" type="monotone" dataKey="chamber_p" stroke="#8884d8" activeDot={{ r: 8 }} />
        //     <Line yAxisId="right" type="monotone" dataKey="chamber_p_t" stroke="#ff0000" activeDot={{ r: 8 }} />
        // </LineChart >

    );

};

export default LicorDatasetShow;
