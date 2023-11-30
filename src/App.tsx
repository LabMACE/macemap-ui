/* eslint react/jsx-key: off */
import React, { useState, useRef, useEffect } from 'react';
import {
    Admin,
    Resource,
    AuthProvider,
    DataProvider,
} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import Keycloak, {
    KeycloakConfig,
    KeycloakTokenParsed,
    KeycloakInitOptions,
} from 'keycloak-js';
import { httpClient } from 'ra-keycloak';
import { keycloakAuthProvider } from './authProvider';
import Layout from './Layout';
import users from './users';
import axios from 'axios';
import addUploadCapabilities from './addUploadFeature'
import sites from "./sites";
import licor from "./licor";
import licordataset from "./licordataset";
import subsites from "./subsites";
import fieldcampaigns from './fieldcampaigns';

const initOptions: KeycloakInitOptions = { onLoad: 'login-required' };

const getPermissions = (decoded: KeycloakTokenParsed) => {
    const roles = decoded?.realm_access?.roles;
    if (!roles) {
        return false;
    }
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('user')) return 'user';
    return false;
};


const apiUrl = '/api/config/keycloak';

const App = () => {
    const [keycloak, setKeycloak] = useState();
    const [loading, setLoading] = useState(true);
    const authProvider = useRef<AuthProvider>();
    const dataProvider = useRef<DataProvider>();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(apiUrl);
                const keycloakConfig = response.data;

                // Initialize Keycloak here, once you have the configuration
                const keycloakClient = new Keycloak(keycloakConfig);
                await keycloakClient.init(initOptions);

                keycloakClient.onTokenExpired = () => {
                    keycloakClient
                        .updateToken(60) // Specify a time in seconds when to refresh the token
                        .then((refreshed) => {
                            if (refreshed) {
                                console.log('Token refreshed successfully');
                            } else {
                                console.log('Token not refreshed, or not needed');
                            }
                        })
                        .catch(() => {
                            console.error('Error refreshinsubsitesg token');
                        });
                };
                authProvider.current = keycloakAuthProvider(keycloakClient, {
                    onPermissions: getPermissions,
                });
                dataProvider.current = addUploadCapabilities(
                    simpleRestProvider(
                        '/api',
                        httpClient(keycloakClient)
                    )
                );
                setKeycloak(keycloakClient);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    // hide the admin until the dataProvider and authProvider are ready
    if (!keycloak & loading) return <p>Loading...</p>;

    return (
        <Admin
            authProvider={authProvider.current}
            dataProvider={dataProvider.current}
            title="MaceMap"
            layout={Layout}
        >
            {permissions => (
                <>
                    <Resource
                        name="fieldcampaigns"
                        {...fieldcampaigns} />
                    <Resource name="sites" {...sites} />
                    <Resource name="subsites" {...subsites} />
                    <Resource name="licor" {...licor} />
                    <Resource name="licordataset" {...licordataset} />
                </>
            )}
        </Admin>
    );
};
export default App;
