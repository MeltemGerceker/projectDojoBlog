import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //console.log("use effect ran");
        //console.log(blogs);

        const abortCont = new AbortController();

        //setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) 
                    throw Error("could not fetch data for this resource.");
                return res.json();
            })
            .then((data) => {
                setData(data);
                setError(null);
                setIsPending(false);
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log("fetch aborted");
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
                
            });
        //}, 1000);

        return () => { // componentWillUnmount
            console.log("fetch aborted");
            abortCont.abort();
        }
        

    }, [url]); // empty dependencies array makes sure that the useEffect runs in the first render, only.
   
    return {data, isPending, error};
};

export default useFetch;