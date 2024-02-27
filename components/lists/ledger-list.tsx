"use client"
import {ChangeEventHandler, useState} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import WarningBtn from "@/components/buttons/warningBtn";
import {FiPlus} from "react-icons/fi";
import ModuleLedger from "@/components/module/newLedger";

const LedgerList = ({ledger , companyId , isAdmine} : {ledger : PocketbaseResponse<ILedger> , companyId : string , isAdmine : boolean}) =>{
    const [page , setPage] = useState(1)
    const [perPage , setPerPage] = useState(10)
    const [module , setModule] = useState(false)
    const [ledgerState , setLedgerState] = useState<ILedger>()
    const [editMode , setEditMode] = useState(false)
    const handlePerPage : ChangeEventHandler<HTMLSelectElement> = (event) =>{
        setPerPage(+event.target.value)
    }
    return (
        <>
            {
                module && <ModuleLedger setModule={setModule} companyID={companyId} ledger={ledgerState} editeMode={editMode}/>
            }
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-10 ">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg ">
                    <table className="min-w-full divide-y divide-gray-300 ">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                                #
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Title
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Credit
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Debit
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Date
                            </th>
                            <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {ledger.items.map((ledger, index) => (
                            <tr key={ledger.companyId}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {ledger.title}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {ledger.credit}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {ledger.debit}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {ledger.description}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {ledger.date}
                                </td>
                                <td className={`relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex items-center justify-center gap-4`}>
                                   <div className={`${isAdmine ? 'hidden' : ''}`}>
                                       <WarningBtn onClick={()=> {
                                           setModule(true)
                                           setLedgerState(ledger)
                                           setEditMode(true)

                                       }}/>
                                   </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className={'w-full flex items-center px-6 py-4 bg-white border-t gap-7'}>
                        <div className={'flex items-center gap-2'}>
                            <p className={'text-dark-800 font-medium text-sm'}>Rows Per Page:</p>
                            <select value={perPage} onChange={handlePerPage}
                                    className={'border-none outline-none'}>
                                <option value={10} selected>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <p className={'text-dark-800'}>{page} of {ledger?.totalPages}</p>
                            <div className={'flex items-center gap-1'}>
                                <button disabled={page <= 1}
                                        className={'disabled:text-gray-500'}
                                        onClick={() => setPage(page - 1)}
                                >
                                    <IoIosArrowBack/>
                                </button>
                                <button disabled={ledger?.totalPages! <= page}
                                        className={'disabled:text-gray-500'}
                                        onClick={() => setPage(page + 1)}
                                >
                                    <IoIosArrowForward/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => setModule(true)} className={`w-44 py-2 rounded-md bg-primary-700 flex gap-3 text-white justify-center items-center mx-auto mt-4 hover:bg-primary-800 ${isAdmine ? 'hidden' : ''}`}>
                <FiPlus />
                New
            </button>
        </div>
        </>
    )
}
export default LedgerList