
import { GuardProvider } from "@/providers/guard-provider";
import Logo from "@/app/admin/icon/logo";
import {FiUsers} from "react-icons/fi";
import {MdOutlineFolder} from "react-icons/md";
import {IoLogOutOutline} from "react-icons/io5";
import Link from "next/link";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <div className={'w-full flex'}>
        <aside className={'w-3/12 bg-primary-900 h-screen px-4 py-5'}>
            <div className={'w-full flex items-center gap-2'}>
                <Logo/>
                <p className={'text-xl text-white font-semibold'}>workflow</p>
            </div>
            <div className={'w-full mt-5 space-y-1'}>
                <button className={'w-full p-2 rounded-lg focus:bg-primary-800 flex items-center justify-start gap-3'}>
                   <Link href={'/admin'} className={'flex gap-3 items-center'}>
                       <FiUsers className={'size-5 text-gray-400'}/>
                       <p className={'text-white font-medium'}>User Management</p>
                   </Link>
                </button>
                <button className={'w-full p-2 rounded-lg focus:bg-primary-800 flex items-center justify-start gap-3'}>
                    <Link href={'/admin/companies'} className={'flex gap-3'}>
                        <MdOutlineFolder className={'size-5 text-gray-400'}/>
                        <p className={'text-white font-medium'}>Companies</p>
                    </Link>
                </button>
                <button className={'w-full p-2 rounded-lg focus:bg-primary-800 flex items-center justify-start gap-3'}>
                    <Link href={'/login'} className={'flex gap-3 items-center'}>
                        <IoLogOutOutline className={'size-5 text-gray-400'}/>
                        <p className={'text-white font-medium'}>Logout</p>
                    </Link>
                </button>
            </div>
        </aside>

          <GuardProvider roleMode="admin">
              {children}
          </GuardProvider>

      </div>
  );
}
