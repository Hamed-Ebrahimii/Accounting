import {HTMLAttributes} from "react";

const WarningBtn = ( props : HTMLAttributes<HTMLButtonElement>) =>{
    return(
        <button
            {...props}
            className={'px-4 py-2 rounded-md bg-yellow-light text-warning'}
        >
            Edit
        </button>
    )
}
export default WarningBtn