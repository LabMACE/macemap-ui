import {
    useRecordContext,
    useRedirect,
    useGetManyReference,
    useCreatePath
} from 'react-admin';
import {
    MapContainer,
    Marker,
    CircleMarker,
    Popup,
    Polygon,
    Tooltip
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Link } from 'react-router-dom';
import { BaseLayers } from './Layers';

export const LocationFieldPointsShow = ({ source, resource_key }) => {
    const record = useRecordContext();
    const createPath = useCreatePath();
    const { data, isLoading, error } = useGetManyReference(
        source,
        {
            target: resource_key,
            id: record.id,
        }
    );

    if (!record) return null;
    if (!data) return null;


    return (
        <MapContainer
            style={{ width: '100%', height: '400px' }}
            // Use the bounds of all points to set the bounds of the map or null if no points
            bounds={data.length > 0 ? data.map((point) => point["geom"]["coordinates"]) : null}
            scrollWheelZoom={true}
        >
            <BaseLayers />
            <MarkerClusterGroup
                chunkedLoading
            >
                {isLoading ? null :
                    (
                        data.map((point, index) => (
                            <Marker
                                key={index}
                                position={point["geom"]["coordinates"]}
                            ><Tooltip permanent>{point["name"]}</Tooltip>
                                <Popup>
                                    <b>{point["name"]}</b>
                                    <br />
                                    {point["description"]}
                                    <br /><br />
                                    <Link to={createPath({ type: 'show', resource: source, id: point['id'] })}>
                                        Go to resource</Link>

                                </Popup>
                            </Marker>
                        ))
                    )}
            </MarkerClusterGroup>
        </MapContainer >
    );
};

export const LocationFieldPointsList = ({ records, resource }) => {
    const redirect = useRedirect();
    const createPath = useCreatePath();

    return (
        <MapContainer
            style={{ width: '100%', height: '400px' }}
            // Use the bounds of all points to set the bounds of the map or null if no points
            bounds={records.length > 0 ? records.map((point) => point["geom"]["coordinates"]) : null}
            scrollWheelZoom={true}
        >
            <BaseLayers />
            <MarkerClusterGroup
                chunkedLoading
            >
                {records.map((point, index) => (
                    <CircleMarker
                        key={index}
                        center={point["geom"]["coordinates"]}
                        opacity={1}
                        radius={20}
                        color={"red"}
                    ><Tooltip permanent>{point["name"]}</Tooltip>
                        <Popup>
                            <b>{point["name"]}</b>
                            <br />
                            {point["description"]}
                            <br /><br />
                            <Link to={createPath({ type: 'show', resource: resource, id: point['id'] })}>
                                Go to resource</Link>

                        </Popup>
                    </CircleMarker>
                ))}
            </MarkerClusterGroup>
        </MapContainer >
    );
};

export const LocationFieldAreas = ({ rowClick, areas }) => {
    const redirect = useRedirect();
    return (
        <MapContainer
            style={{ width: '100%', height: '700px' }}
            // Use the bounds of all areas to set the bounds of the map
            bounds={areas.map((area) => area["geom"]["coordinates"])}
            scrollWheelZoom={true} >
            <BaseLayers />
            {
                areas.map(
                    (area, index) => (
                        < Polygon
                            key={index}
                            eventHandlers={{
                                click: () => {
                                    redirect('show', 'areas', area['id']);
                                }
                            }}
                            positions={area["geom"]['coordinates']}
                        >
                            <Tooltip permanent>{area.name}</Tooltip>


                        </Polygon>
                    )

                )
            }
        </MapContainer >
    );
};
