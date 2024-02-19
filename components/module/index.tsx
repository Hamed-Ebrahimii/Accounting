import {MdOutlineClose} from "react-icons/md";
import {TextInput} from "@/components/inputs/textInput";
import {Controller, useForm} from "react-hook-form";
import {OutlinePrimaryContainedButton, PrimaryContainedButton} from "@/components/buttons/contained-btns";
import {classNames} from "@/utils/tools";
import React from "react";
import {loginFormSchema, loginFormType} from "@/utils/validations/login-validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {createUser, editUser} from "@/pocketbase/users";
interface Iprops {
    setModule : (value: boolean) => void;
    user? : IUser,
    editeMode? : boolean
}
const Module = ({setModule , editeMode , user} : Iprops) =>{
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const { handleSubmit, control: FormControl  , reset} = useForm<IUser>({
        resolver: zodResolver(loginFormSchema),
        defaultValues : {
            username : user?.username,
            password : user?.password
        }
    });
    const submitForm = async (data : IUser) =>{
        if (loading) return;
        if (data.username === user?.username &&  data.password === user?.password){
            setError('Please change your username or password')
            return
        }
        setLoading(true)
        const response = editeMode ? await editUser(data , user?.id || ''): await createUser(data)
        if (response.error){
            setError(response.error)
        }
        setLoading(false)
        setModule(false)
        location.reload()
    }
    return(
        <div className={'fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40  z-10 py-16'}>
            <div className={'bg-white rounded-lg py-8 px-10 w-4/12 mx-auto'}>
                    <div className={'w-full flex items-center justify-between'}>
                        <p className={'text-lg font-medium'}>
                            {
                             editeMode ? 'Edit Accountant' :   'New Accountant'
                            }
                        </p>
                        <button onClick={()=> setModule(false)}>
                            <MdOutlineClose />
                        </button>
                    </div>
                <form onSubmit={handleSubmit(submitForm)} className="mt-lg">
                    <div className="space-y-md">
                        <Controller
                            name="username"
                            control={FormControl}
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your username"
                                    error={error?.message}
                                    labelTitle="Username"
                                    type="text"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={FormControl}
                            name="password"
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your password"
                                    labelTitle="Password"
                                    type="password"
                                    error={error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className=" rounded-md overflow-hidden mt-xl space-y-4">
                        <PrimaryContainedButton
                            type="submit"
                            title={<p className="font-semibold text-white">{ loading ? 'please wait' : editeMode ? "Edite" : "Add"}</p>}
                            disabled={loading}
                        />
                        <OutlinePrimaryContainedButton
                            type={'reset'}
                            title={<p
                            className="font-semibold text-primary-700">Clear</p>}
                            onClick={()=>reset()}
                        />

                    </div>
                    <div
                        className={classNames(
                            !!error ? "block" : "hidden",
                            "bg-red-50 ring-1 ring-red-300 text-red-600",
                            "px-sm py-xs rounded-md mt-md"
                        )}
                    >
                        {error}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Module