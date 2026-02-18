const Header = ()=>{
    return(
        <header className="bg-light shadow-sm border-b border-slate-200 w-full p-3">

            <div className="container-app flex items-center justify-between">
                <div className="flex items-center justify-center font-bold text-xl">
                    <a href="/">Autoflex Gestão</a>
                </div>
                <nav>
                    <ul className="flex justify-center items-center gap-4 font-semibold">
                        <li className="hover:bg-primary/80 py-1 px-3 rounded-md transition-colors text-dark hover:text-light">
                            <a href="/">Home</a>
                        </li>

                        <li className="hover:bg-primary/80 py-1 px-3 rounded-md transition-colors text-dark hover:text-light">
                            <a href="/products">Produtos</a>
                        </li>
                        <li className="hover:bg-primary/80 py-1 px-3 rounded-md transition-colors text-dark hover:text-light">
                            <a href="/materials">Materiais</a>
                        </li>
                        <li className="hover:bg-primary/80 py-1 px-3 rounded-md transition-colors text-dark hover:text-light">
                            <a href="/compositions">Composições</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header