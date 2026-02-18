import { Menu, X } from "lucide-react"
import { useState } from "react"
import { MenuHeader } from "./MenuHeader"

const Header = ()=>{

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const changeMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    return(
        <header className="bg-light shadow-sm border-b border-slate-200 w-full relative mb-12 md:mb-0">

            <div className="container-app flex items-center justify-between relative p-3">
                <div className="flex items-center justify-center font-bold text-xl">
                    <a href="/">Autoflex Gestão</a>
                </div>

                <nav className="hidden  md:flex">
                    <MenuHeader />
                </nav>
                {/*botao mobile*/}
                <div className="md:hidden flex items-center">
                    <button
                    type="button"
                    className="md:hidden text-dark hover:bg-primary/80 hover:text-light p-2 rounded-lg transition-all cursor-pointer"
                    onClick={changeMenu}
                    >
                    {isMenuOpen ? (
                        <X size={24} className="text-dark" />
                    ) : (
                        <Menu size={24} className="text-dark" />
                    )}
                    </button>
                </div>
            </div>


            {/*menu*/}
            {isMenuOpen && (
                <div className={`md:hidden bg-light mt-2 right-0 w-full absolute z-10 top-11 flex flex-col items-center 
                justify-center gap-4 font-semibold transition-all duration-300 ease-in-out border-t border-slate-200`
                
                }>
                    <MenuHeader />
                </div>
            )}
        </header>
    )
}

export default Header