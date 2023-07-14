import axios from "axios";

const useAxios = (options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [abort, setAbort] = React.useState(() => {});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(abortController.abort);
        const res = await axios({ ...options, signal });
        setResponse(res);
        setLoading(false)
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    return () => {
      abort();
    };
  }, []);

  return { response, error, loading, abort };
};

export default useAxios
