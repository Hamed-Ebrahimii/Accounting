import {MdFacebook} from "react-icons/md";
import {AiOutlineInstagram} from "react-icons/ai";
import {FaGithub, FaTwitter} from "react-icons/fa";
import {TiSocialDribbble} from "react-icons/ti";

const Footer = () =>{
    return(
        <footer className={'w-full mt-10 bg-primary-900 py-12 px-28 flex items-center justify-between'}>
            <p className={'text-gray-300'}>© 2020 Workflow, Inc. All rights reserved.</p>
            <div className={'flex items-center gap-6'}>
                <MdFacebook className={'text-gray-300 size-6'} />
                <AiOutlineInstagram className={'text-gray-300 size-6'} />
                <FaTwitter className={'text-gray-300 size-6'} />
                <FaGithub className={'text-gray-300 size-6'} />
                <TiSocialDribbble className={'text-gray-300 size-6'} />
            </div>
        </footer>
    )
}
export default Footer