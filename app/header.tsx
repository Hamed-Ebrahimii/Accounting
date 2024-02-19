import Logo from "@/app/admin/icon/logo";

const Header = () => {
    return(
        <header className={'w-full flex items-center px-20 py-6'}>
            <Logo/>
            <div className={'w-full flex items-center justify-center gap-10'}>
                <p className={'text-gray-500 font-medium text-lg'}>
                    Product
                </p>
                <p className={'text-gray-500 font-medium text-lg'}>
                    Features
                </p>
                <p className={'text-gray-500 font-medium text-lg'}>
                    Marketplace
                </p>
                <p className={'text-gray-500 font-medium text-lg'}>
                    Company
                </p>
            </div>
        </header>
    )
}
export default Header