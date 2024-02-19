import Header from "@/app/header";
import Hero from "@/app/icon/hero";
import Footer from "@/app/footer";
import PathLeft from "@/app/icon/path-left";
import PathRight from "@/app/icon/path-right";
import Link from "next/link";

export default function Home() {
  return (
    <main>
        <Header/>
        <section className={'w-full min-h-screen flex flex-col items-center'}>
            <h1 className={'mt-24 text-6xl font-bold text-black'}>
                Manage Your <span className={'text-primary-700'}>Company Accounting</span>
            </h1>
            <p className={'text-gray-500 text-xl'}>Create your company, and manage all your accounting things on our platform.</p>
            <div className={'flex items-center gap-3 mt-10'}>
                <button className={'py-4 px-10 bg-primary-700 rounded-md text-white text-lg font-medium'}>
                    <Link href={'/login'}>Login</Link>
            </button>
                <button className={'py-4 px-10 bg-white rounded-md text-primary-700 text-lg font-medium shadow'}>
                    signup
                </button>
            </div>
            <div className={'mt-10'}>
                <Hero/>
            </div>
            <PathLeft className={'absolute left-0 top-12'}/>
            <PathRight className={'absolute right-0 top-0'}/>
        </section>
        <Footer/>
    </main>
  );
}
