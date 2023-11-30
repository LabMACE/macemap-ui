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
import { Typography } from 'react-admin';
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

            REP1:

            <DataPlot rep="REP_1" />
            <DataPlot rep="REP_2" />
            <DataPlot rep="REP_3" />
        </SimpleShowLayout>
    </Show>
);

export const DataPlot = ({ rep }) => {
    const record = useRecordContext();
    if (!record) return null;
    const repData = record.measurements.reps[rep].data;
    console.log(repData);
    const restructuredData = repData.timestamp.map((timestamp, index) => {
        const newObj = { timestamp };

        Object.keys(repData).forEach((key) => {
            if (key !== 'timestamp') {
                newObj[key] = repData[key][index];
            }
        });

        return newObj;
    });

    return (
        <Box
            marginBottom={"40px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
        >
            <strong style={{ paddingLeft: "10%", fontSize: "20px" }}>{rep}</strong>
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
        </Box>
    );

};

export default LicorDatasetShow;
