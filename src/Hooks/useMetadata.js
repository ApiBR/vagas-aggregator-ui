import axios from "axios";
import toastr from "toastr";
import { useEffect, useState } from "react";
import FormatDate from "../Helpers/FormatDate";

const BASE_URL = "https://apibr.com/vagas/api/v2/";

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
