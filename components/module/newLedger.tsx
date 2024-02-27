import {MdOutlineClose} from "react-icons/md";
import {TextInput} from "@/components/inputs/textInput";
import {Controller, useForm} from "react-hook-form";
import {OutlinePrimaryContainedButton, PrimaryContainedButton} from "@/components/buttons/contained-btns";
import {classNames} from "@/utils/tools";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createLedger, editLeger, } from "@/pocketbase/users";
import {ledgerType, ledgerValidation} from "@/utils/validations/ledger-validation";
import moment from "moment/moment";
import {useParams} from "next/navigation";
interface Iprops {
    setModule : (value: boolean) => void;
    ledger? : ILedger,
    editeMode? : boolean,
    companyID? : string
}
const ModuleLedger = ({setModule , editeMode , ledger , companyID} : Iprops) =>{
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const { handleSubmit, control: FormControl  , reset} = useForm<ledgerType>({
        resolver: zodResolver(ledgerValidation),
        defaultValues : {
           title : ledger?.title,
           description : ledger?.description,
           debit : ledger?.debit,
           credit : ledger?.credit
        }
    });
    const IdCompany = useParams()
    const submitForm = async (data : ledgerType) =>{
        if (loading) return;
        if (ledger?.description === data.description && ledger?.title === data.title && ledger?.credit === data.credit && ledger?.debit === data.debit){
            setError('Please change your description or title or  credit or debit')
            return
        }
        setLoading(true)
        const dataLedger : ILedger = {
            title: data.title,
            description: data.description,
            credit: data.credit,
            debit : data.debit,
            companyId : companyID || '',
            date : moment().format("YYYY-MM-DD hh:mm a")
        }
        const response = editeMode ? await editLeger(ledger?.id || '' , dataLedger): await createLedger(dataLedger)
        if (response.error){
            setError(response.error)
        }
        setLoading(false)
        setModule(false)
        location.reload()
    }
    const handleReset = () =>{
        reset()
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
                            name="title"
                            control={FormControl}
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your title"
                                    error={error?.message}
                                    labelTitle="Title"
                                    type="text"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={FormControl}
                            name="description"
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your description"
                                    labelTitle="Description"
                                    type="text"
                                    error={error?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={FormControl}
                            name="credit"
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your credit"
                                    labelTitle="Credit"
                                    type="number"
                                    error={error?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={FormControl}
                            name="debit"
                            render={({field, fieldState: {error}}) => (
                                <TextInput
                                    placeholder="Enter your debit"
                                    labelTitle="Debit"
                                    type="number"
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
                            type={'button'}
                            title={<p
                                className="font-semibold text-primary-700">Clear</p>}
                            onClick={()=>handleReset()}
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

export default ModuleLedger