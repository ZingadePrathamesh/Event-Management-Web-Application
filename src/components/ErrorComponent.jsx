import { Link } from "react-router-dom";

export default function ErrorComponent(){
    return(
        <div>
            <h1>ERROR 404!</h1>
            <h5>The URI does not exist.
                <br/>
                Maybe it will be in the near future.
                <br/>
                Who knows...
            </h5>
            <Link to='/'>Home</Link>
        </div>
    );
}