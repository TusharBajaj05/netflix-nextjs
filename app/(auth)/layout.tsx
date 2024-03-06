import { ReactNode } from "react";
import Image from "next/image";
import Background from '../../public/login_background.jpg';
import Logo from '../../public/netflix_logo.svg';

export default function AuthLayout({children} : {children : ReactNode}){
    return(
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Image 
                src={Background}
                alt="Backgroung img"
                priority
                fill
                className="hidden sm:flex sm:object-cover -z-10 brightness-50"
                />
            <Image
                src={Logo}
                alt="Logo img"
                priority
                height={180}
                width={165}
                className="absolute left-4 top-4 object-contain md:left-12 md:top-6"
            />
            {children}
        </div>
    )
}