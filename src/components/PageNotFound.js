import {Link } from "react-router-dom";
let PageNotFound = ()=>{
    return (
    <>
        <h1  className="display-1 text-center mt-3 text-danger">Page Not Found</h1>
        <p className="h5 text-center mt-3 text-danger">
            <Link to = "/"> Go to Home </Link>
        </p>
    </>
    )
}

export default PageNotFound;