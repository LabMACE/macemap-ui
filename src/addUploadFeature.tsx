// This allows instrument data to be uploaded as base64 strings
import { fetchUtils } from 'ra-core';

const addUploadCapabilities = dataProvider => ({
    ...dataProvider,
    create: (resource, params) => {
        console.log("Creating: Uploading...", resource, params);
        if (resource === 'licor') {
            console.log("Is LICOR resource")
            // data field.
            // A new data file is an updated version of the existing file.
            // and are converted to base64 strings to be unwrapped and stored
            // in the DB

            if (!params.data.data) {
                return dataProvider.create(resource, params);
            }

            const encodedData = convertFileToBase64(params.data.data);
            // console.log("Encoded data: ", encodedData)

            // Use promise to make sure the dataProvider call happens after the
            // file has been converted to base64.
            return encodedData.then(encodedData => {
                console.log("Encoded data: ", encodedData)
                return dataProvider.create(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        data: encodedData,
                    },
                });
            });

        } else {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
            // The sensors update uses a file upload widget for the instrument

        }
    },
});


/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export default addUploadCapabilities;
