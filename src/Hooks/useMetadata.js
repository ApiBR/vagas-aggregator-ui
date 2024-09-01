import axios from "axios";
import toastr from "toastr";
import { useEffect, useState } from "react";
import FormatDate from "../Helpers/FormatDate";

const BASE_URL = "https://apibr.com/vagas/api/v2/";

/**
 * A custom React hook that retrieves and manages metadata from an API.
 *
 * This hook uses the `useState` and `useEffect` hooks to fetch API metadata,
 * including the version and date, when the component mounts. It handles the
 * API request using Axios and provides error handling through toastr notifications.
 *
 * @returns {Object} An object containing the API metadata:
 *   - {string} version - The version of the API.
 *   - {string} date - The date associated with the API version.
 *
 * @example
 * const { version, date } = useMetadata();
 * console.log(`API Version: ${version}, Date: ${date}`);
 *
 * @throws {Error} Throws an error if the API request fails, which is handled
 *                 by displaying a toastr error notification.
 */
export default function useMetadata() {
    const [metadata, setMetadata] = useState({
        version: "0.0.0",
        date: "--/--/----"
    });



    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        axios.head(BASE_URL, {
            cancelToken: cancelToken.token
        }).then((res) => {
            const data = {
                version: res.headers["x-api-version"],
                date: FormatDate(new Date(res.headers["x-api-date"]), true)
            };

            setMetadata(data);
        })
            .catch((err) => {
                toastr.error("Não foi possível obter os metadados da API.");
            });
    }, []);

    return metadata;
}
