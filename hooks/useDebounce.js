import { useState, useEffect } from "react";

var useDebounce = (value, delay) => {
    var [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay)

        return () => clearTimeout(handler)
    }, [value])

    return debounceValue
}

export default useDebounce