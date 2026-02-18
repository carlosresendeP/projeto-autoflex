const Footer = ()=>{

    const currentYear = new Date().getFullYear();

    return(
        <footer className="bg-dark text-light py-3 mt-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-start md:flex-row justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold">AutoFlex</h3>
                        <p className="text-gray-400 text-sm">Todos os direitos reservados © {currentYear}</p>
                    </div>
                    <div className="text-sm font-semibold">
                        <p>Desenvolvido por: <a href="https://github.com/carlosresendeP" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Carlos Paula</a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer