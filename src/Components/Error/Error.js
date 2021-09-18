import React, { useEffect } from 'react'
import '../../assets/css/Error.css'
const Error = (props) => {
    const { error, setError } = props;
    useEffect(() => {
        if(error !== null){
            setTimeout(() => {
                setError(null)
            }, 2000);
        }
    }, [])
    return (
        <div className={error !== null? `error_container showError`: `error_container`}>
            { error ? error : "Something went wrong!"  }
        </div>
    )
}

export default Error
