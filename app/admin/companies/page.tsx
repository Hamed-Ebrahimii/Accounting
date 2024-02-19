"use client"
import Loading from "@/components/loading";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {ChangeEventHandler, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getAllCompanies} from "@/pocketbase/users";

const Companies = () =>{
    const [page , setPage] = useState(1)
    const [perPage , setPerPage] = useState(10)
    const {data : companies , isLoading} = useQuery({
        queryKey : [page , perPage],
        queryFn : () => getAllCompanies(page , perPage)
    })
    const handlePerPage : ChangeEventHandler<HTMLSelectElement> = (event) =>{
        setPerPage(+event.target.value)
    }
    return (
        <div className={'w-full flex flex-col items-center'}>
        <div className="px-4 sm:px-6 lg:px-8 mt-16 ">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Companies List
                    </h1>
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
                                            Company Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Creator
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
                                    {companies?.items.map((companies, index) => (
                                        <tr key={companies.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {companies.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {companies.creator}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex items-center justify-center gap-4">

                                                <button
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
                                                    className={'disabled:text-gray-500'}
                                                    onClick={() => setPage(page - 1)}
                                            >
                                                <IoIosArrowBack/>
                                            </button>
                                            <button disabled={companies?.totalPages! <= page}
                                                    className={'disabled:text-gray-500'}
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
    )
}
export default Companies