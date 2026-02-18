export const MenuHeader = () => {
    return (
        <>
            <ul className="flex items-center justify-center gap-4 font-semibold py-2">
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
        </>
    )
}