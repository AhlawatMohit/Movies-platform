 import { useState, useEffect } from "react";
import { fetchApiData } from "../utils/api";

const useFetch  = (url)  => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading("loading...");
        setError(null);
        setData(null);

        fetchApiData(url)
        .then((res) => {
            setLoading(false);
            setData(res);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
            setLoading(false);
            setError('Something Went Wrong In Fetching Data!');
        });

    }, [url]);

    return { data, loading, error };

};

export default useFetch;