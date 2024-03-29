import {MdOutlineClose} from "react-icons/md";
import {TextInput} from "@/components/inputs/textInput";
import {Controller, useForm} from "react-hook-form";
import {OutlinePrimaryContainedButton, PrimaryContainedButton} from "@/components/buttons/contained-btns";
import {classNames} from "@/utils/tools";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {authorization, createCompanies, createUser, editCompany, editUser} from "@/pocketbase/users";
import {companyValidation} from "@/utils/validations/company-validation";
import moment from "moment";
interface Iprops {
    setModule : (value: boolean) => void;
    companies? : ICompanies,
    editeMode? : boolean
}
const ModuleCompanies = ({setModule , editeMode , companies} : Iprops) =>{
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const { handleSubmit, control: FormControl  , reset} = useForm<ICompanies>({
        resolver: zodResolver(companyValidation),
        defaultValues : {
           employeesNumber : companies?.employeesNumber,
            founder : companies?.founder,
            location : companies?.location,
            id : companies?.id,
            name : companies?.name,
        }
    });
    const submitForm = async (data : ICompanies) =>{
        if (loading) return;
        setLoading(true)
        const date = new Date()
        data.foundationDate =  moment(date).format("YYYY-MM-DD hh:mm a")
        const create = await authorization()
        data.creator = create.data?.username || ''
        const response = editeMode ? await editCompany(data , companies?.id || '' ):  await createCompanies(data)
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
                            editeMode ? 'Edit Companies' :   'New Companies'
                        }
                    </p>
                    <button onClick={()=> setModule(false)}>
                        <MdOutlineClose />
                    </button>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="mt-lg">
                    <div className="space-y-md">
                        <Controller
                            name="name"
                            control={FormControl}
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter Company Name"
                                    error={error?.message}
                                    labelTitle="Company Name"
                                    type="text"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={FormControl}
                            name="location"
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your company Location"
                                    labelTitle="Location"
                                    type="text"
                                    error={error?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={FormControl}
                            name="employeesNumber"
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your company employeesNumber"
                                    labelTitle="employeesNumber"
                                    type="number"
                                    error={error?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={FormControl}
                            name="founder"
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your company founder"
                                    labelTitle="founder"
                                    type="text"
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

export default ModuleCompanies