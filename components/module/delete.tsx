import {MdOutlineClose} from "react-icons/md";
import {removeUser} from "@/requests/users";
import {useState} from "react";
interface Iprops {
    id : string,
    setModule : (module: boolean) => void
}
const DeleteModule = ({setModule , id} : Iprops) =>{
    const [loading , setLoading] = useState(false)
    const handleOnDelete = async (userId: string) => {
        if (loading) return
        setLoading(true)
       await  removeUser(userId);
        setLoading(false)
        setModule(false)
        window.location.reload();
    };
    return(
        <div className={'fixed top-0 left-0 w-full h-screen bg-black bg-opacity-45 py-16 z-20'}>
            <div className={'mx-auto py-8 px-10 bg-white rounded-xl w-4/12'}>
                <div className={'w-full flex items-center justify-between'}>
                    <p className={'text-lg font-medium'}>Delete Accountant</p>
                    <button>
                        <MdOutlineClose />
                    </button>
                </div>
                <div className={'w-full mt-5 space-y-4'}>
                    <p className={'font-medium text-gray-600'}>Are you sure you want to delete your account? </p>
                    <p className={'font-medium text-gray-500'}>
                        All of your data will be permanently removed from our servers forever. This action cannot be undone.
                    </p>
                </div>
                <button
                    onClick={() => handleOnDelete(id)}
                    disabled={loading}
                    className={'mt-5 w-full py-2 bg-danger text-white rounded-lg text-lg font-semibold disabled:opacity-50'}>
                    {
                      loading ? 'please wait' :   'Delete'
                    }
                </button>
            </div>
        </div>
    )
}
export default DeleteModule