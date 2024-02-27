"use client"
import {useQuery} from "@tanstack/react-query";
import {ChangeEventHandler, useState} from "react";
import {getAllCompanies} from "@/pocketbase/users";
import Loading from "@/components/loading";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {FiPlus} from "react-icons/fi";
import ModuleCompanies from "@/components/module/companiesModule";
import WarningBtn from "@/components/buttons/warningBtn";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const CompaniesList  = () =>{
    const [page , setPage] = useState(1)
    const [perPage , setPerPage] = useState(10)
    const [module , setModule] = useState(false)
    const [company , setCompany] = useState<ICompanies>()
    const [editMode , setEditMode] = useState(false)
    const {data : companies ,  isLoading} = useQuery({
        queryKey : [page , perPage],
        queryFn : () => getAllCompanies(page , perPage)
    })
    const router = useRouter()
    const handlePerPage : ChangeEventHandler<HTMLSelectElement> = (event) =>{
        setPerPage(+event.target.value)
    }
    const handleEdit = (company : ICompanies) => {
        setCompany(company)
        setEditMode(true)
        setModule(true)
    }
    const handleNavigate =  (id : string) => {
        router.push(`/panel/${id}`)
    }
    return (
        <>
            {
                module && <ModuleCompanies setModule={setModule} companies={company} editeMode={editMode}/>
            }
        <div className={'w-full flex flex-col items-center'}>
            <div className="px-4 sm:px-6 lg:px-8 mt-16 w-full">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">
                            My Companies
                        </h1>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            onClick={() => setModule(true)}
                            type="button"
                            className="rounded-md bg-primary-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center gap-2"
                        >
                            <FiPlus/>
                            New Company
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {
                                isLoading && <Loading/>
                            }
                            {
                                !isLoading &&
                                <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg max-h-[70vh] overflow-y-scroll ">
                                    <table className="min-w-full divide-y divide-gray-300">
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
                                                Company Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Location
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                founder
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                foundationDate
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                employeesNumber
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                            >
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white ">
                                        {companies?.items.map((companies, index) => (
                                            <tr key={companies.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {companies.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {companies.location}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {companies.founder}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {companies.foundationDate}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {companies.employeesNumber}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex items-center justify-center gap-4">

                                                    <WarningBtn onClick={()=>handleEdit(companies)}/>
                                                    <button
                                                        onClick={()=> handleNavigate(companies.id)}
                                                        className="text-primary-700 bg-primary-100 rounded-md py-2 px-4 hover:text-primary-800"
                                                    >
                                                        Ledger
                                                    </button>
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
                                            <p className={'text-dark-800'}>{page} of {companies?.totalPages}</p>
                                            <div className={'flex items-center gap-1'}>
                                                <button disabled={page <= 1}
                                                        className={'disabled:text-gray-300 text-gray-600'}
                                                        onClick={() => setPage(page - 1)}
                                                >
                                                    <IoIosArrowBack/>
                                                </button>
                                                <button disabled={companies?.totalPages! <= page}
                                                        className={'disabled:text-gray-300 text-gray-600'}
                                                        onClick={() => setPage(page + 1)}
                                                >
                                                    <IoIosArrowForward/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CompaniesList