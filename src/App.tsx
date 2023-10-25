/* eslint react/jsx-key: off */
import React, { useState, useRef, useEffect } from 'react';
import {
    Admin,
    Resource,
    CustomRoutes,
    AuthProvider,
    DataProvider,
} from 'react-admin';
import { Route } from 'react-router-dom';
import Keycloak, {
    KeycloakConfig,
    KeycloakTokenParsed,
    KeycloakInitOptions,
} from 'keycloak-js';
import { keycloakAuthProvider } from 'ra-keycloak';

import CustomRouteLayout from './customRouteLayout';
import CustomRouteNoLayout from './customRouteNoLayout';
import myDataProvider, {
    keyCloakTokenDataProviderBuilder,
} from './dataProvider';
import i18nProvider from './i18nProvider';
import Layout from './Layout';
import users from './users';
import sensors from './sensors';
import { AreaList, AreaShow } from "./Areas";

const config: KeycloakConfig = {
    url: 'https://enac-it4r-sso.epfl.ch/',
    realm: 'SOIL',
    clientId: 'sensormap-frontend-dev-local',
};

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

const App = () => {
    const [keycloak, setKeycloak] = useState<Keycloak>(undefined);
    const authProvider = useRef<AuthProvider>(undefined);
    const dataProvider = useRef<DataProvider>(undefined);

    useEffect(() => {
        const initKeyCloakClient = async () => {
            const keycloakClient = new Keycloak(config);
            await keycloakClient.init(initOptions);
            authProvider.current = keycloakAuthProvider(keycloakClient, {
                onPermissions: getPermissions,
            });
            dataProvider.current = keyCloakTokenDataProviderBuilder(
                myDataProvider,
                keycloakClient
            );
            setKeycloak(keycloakClient);
        };
        if (!keycloak) {
            initKeyCloakClient();
        }
    }, [keycloak]);

    // hide the admin until the dataProvider and authProvider are ready
    if (!keycloak) return <p>Loading...</p>;

    return (
        <Admin
            authProvider={authProvider.current}
            dataProvider={dataProvider.current}
            i18nProvider={i18nProvider}
            title="SOIL Sensor Map"
            layout={Layout}
        >
            {permissions => (
                <>
                    <Resource
                        name="areas"
                        list={AreaList}
                        show={AreaShow}
                    />
                    <Resource name="sensors" {...sensors} />
                    {permissions ? (
                        <>
                            {permissions === 'admin' ? (
                                <Resource name="users" {...users} />
                            ) : null}
                        </>
                    ) : null}
                </>
            )}
        </Admin>
    );
};
export default App;
