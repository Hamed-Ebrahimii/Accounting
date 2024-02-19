"use client";

import {FiPlus} from "react-icons/fi";
import {ChangeEventHandler, useState} from "react";
import Module from "@/components/module";
import DeleteModule from "@/components/module/delete";
import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "@/pocketbase/users";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import Loading from "@/components/loading";
interface IUsersList {
  users: IUser[];
}
export const UsersList = () => {
  const [module , setModule] = useState(false)
  const [editMode , setEditMode] = useState(false)
  const [user , setUser] = useState<IUser>()
  const [deleteMode , setDeleteMode] = useState(false)
  const [page , setPage] = useState(1)
  const [perPage , setPerPage] = useState(10)
  const {data : users , isLoading} = useQuery({
    queryKey : [page , perPage],
    queryFn : () => getAllUsers(page , perPage)
  })
    const handleEdit = (user : IUser) => {
      setUser(user)
      setEditMode(true)
      setModule(true)
    }
    const handlePerPage : ChangeEventHandler<HTMLSelectElement> = (event) =>{
      setPerPage(+event.target.value)
    }
  return (
      <>
        {
          module && <Module setModule={setModule} user={user} editeMode={editMode}/>
        }
        {
          deleteMode && <DeleteModule id={user?.id || ''} setModule={setDeleteMode}/>
        }

    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
              onClick={()=> setModule(true)}
            type="button"
            className="rounded-md bg-primary-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center gap-2"
          >
            <FiPlus />
            New Accountant
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
                !isLoading && <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg ">
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
                        Username
                      </th>
                      <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        password
                      </th>
                      <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
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
                    {users?.items.map((user, index) => (
                        <tr key={user.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.username}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.password}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.isAdmin ? "Manager" : "Accountant"}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex items-center justify-center gap-4">
                            <button
                                disabled={user.isAdmin}
                                onClick={() => {
                                  setUser(user)
                                  setDeleteMode(true)
                                }}
                                className={`text-danger bg-red-100 py-2 px-4 hover:text-red-800 rounded-md disabled:opacity-50`}
                            >
                              Delete Account
                            </button>
                            <button
                                onClick={() => handleEdit(user)}
                                className="text-primary-700 bg-primary-100 rounded-md py-2 px-4 hover:text-primary-800"
                            >
                              Edit Account
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                  <div className={'w-full flex items-center px-6 py-4 bg-white border-t gap-7'}>
                    <div className={'flex items-center gap-2'}>
                      <p className={'text-dark-800 font-medium text-sm'}>Rows Per Page:</p>
                      <select value={perPage} onChange={handlePerPage} className={'border-none outline-none'}>
                        <option value={10} selected>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                      </select>
                    </div>
                    <div className={'flex items-center gap-2'}>
                      <p className={'text-dark-800'}>{page} of {users?.totalPages}</p>
                      <div className={'flex items-center gap-1'}>
                        <button disabled={page <= 1}
                                className={'disabled:text-gray-500'}
                                onClick={() => setPage(page - 1)}
                        >
                          <IoIosArrowBack/>
                        </button>
                        <button disabled={users?.totalPages! <= page}
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
      </>
  );
};
