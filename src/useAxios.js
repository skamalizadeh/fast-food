import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = 'https://react-mini-projects-api.classbon.com/FastFood';
const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const result = await axios.request(axiosParams);
            setResponse(result.data);
        } catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return { response, loading, loading };
}
export default useAxios;