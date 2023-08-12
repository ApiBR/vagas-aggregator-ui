import axios from "axios";
import toastr from "toastr";
import { useEffect, useState } from "react";

const BASE_URL = "https://apibr.com/vagas/api/v1/";

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
            const date = new Date(res.headers["x-api-date"]);
            const mm = date.getMonth() + 1;
            const d = date.getDate();
            const data = {
                version: res.headers["x-api-version"],
                date: [(d > 9 ? "" : "0") + d, (mm > 9 ? "" : "0") + mm, date.getFullYear()].join("/")
            };

            setMetadata(data);
        })
            .catch((err) => {
                toastr.error("Não foi possível obter os metadados da API.");
            });
    }, []);

    return metadata;
}