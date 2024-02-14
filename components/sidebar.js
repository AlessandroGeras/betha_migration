import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../public/img/logo2.png';
import { useRouter } from 'next/router';
import { FaUserFriends, FaHome, FaHotel, FaUsers, FaUser, FaDoorOpen, FaFileAlt, FaChartLine, FaWrench } from "react-icons/fa";


const Sidebar = () => {

    const router = useRouter();
    const [isSubMenuOpenHome, setIsSubMenuOpenHome] = useState(false); //Botões
    const [isSubMenuOpenPrestadores, setIsSubMenuOpenPrestadores] = useState(false);
    const [isSubMenuOpenCadastros, setIsSubMenuOpenCadastros] = useState(false);
    const [isSubMenuOpenDocumentos, setIsSubMenuOpenDocumentos] = useState(false);
    const [isSubMenuOpenConta, setIsSubMenuOpenConta] = useState(false);
    const [isSubMenuOpenMenu, setIsSubMenuOpenMenu] = useState(false);
    const [isSubMenuOpeColaboradores, setIsSubMenuOpenColaboradores] = useState(false);
    const [isSubMenuOpenConfiguração, setIsSubMenuOpenConfiguração] = useState(false);
    const [isSubMenuOpeNF, setIsSubMenuOpenNF] = useState(false);
    const [viewAll, setViewAll] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    const [permission, setPermission] = useState('');

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        const userPermission = localStorage.getItem('permission');
        if (userRole == 'internal') {
            setViewAll(true);
        }
        else {
            setViewAll(false);
        }

        if (userPermission == 'read') {
            setIsAdmin(false);
            setPermission("read");
        }
    }, []);

    const toggleSubMenuHome = () => {
        setIsSubMenuOpenHome(!isSubMenuOpenHome);
    };

    const toggleSubMenuPrestadores = () => {
        setIsSubMenuOpenPrestadores(!isSubMenuOpenPrestadores);
    };

    const toggleSubMenuCadastros = () => {
        setIsSubMenuOpenCadastros(!isSubMenuOpenCadastros);
    };

    const toggleSubMenuDocumentos = () => {
        setIsSubMenuOpenDocumentos(!isSubMenuOpenDocumentos);
    };

    const toggleSubMenuOutsourced = () => {
        setIsViewOutsourcedOpen(!isViewOutsourcedOpen);
    };

    const toggleSubMenuConta = () => {
        setIsSubMenuOpenConta(!isSubMenuOpenConta);
    };

    const toggleSubMenuMenu = () => {
        setIsSubMenuOpenMenu(!isSubMenuOpenMenu);
    };

    const toggleSubMenuColaboradores = () => {
        setIsSubMenuOpenColaboradores(!isSubMenuOpeColaboradores);
    };

    const toggleSubMenuConfiguração = () => {
        setIsSubMenuOpenConfiguração(!isSubMenuOpenConfiguração);
    };

    const toggleSubMenuNF = () => {
        setIsSubMenuOpenNF(!isSubMenuOpeNF);
    };

    const dashboardClick = () => {
        router.push('/dashboard');
    };

    const documentosClick = () => {
        router.push('/documents');
    }

    const terceirosClick = () => {
        router.push('/outsourced');
    }

    const adicionarTerceirosClick = () => {
        router.push('/add-outsourced');
    }

    const categoriasTerceirosClick = () => {
        router.push('/category-outsourced');
    }

    const addCategoriasTerceirosClick = () => {
        router.push('/add-category-outsourced');
    }

    const addDocPendenteClick = () => {
        router.push('/add-pending-document');
    };

    const colaboradoresClick = () => {
        router.push('/collaborators');
    };

    const usuariosClick = () => {
        router.push('/users');
    };

    const adicionarColaboradoresClick = () => {
        router.push('/add-collaborator');
    };

    const categoriasColaboradoresClick = () => {
        router.push('/category-collaborators');
    };

    const adicionarcategoriasColaboradoresClick = () => {
        router.push('/add-category-collaborators');
    };

    const adicionarUsuariosClick = () => {
        router.push('/add-user');
    };

    const myaccount = () => {
        router.push('/myaccount');
    };

    const docCategoryClick = () => {
        router.push('/category-documents');
    };

    const addDocCategoryClick = () => {
        router.push('/add-category-documents');
    };

    const nfClick = () => {
        router.push('/nf');
    };

    const configuração = () => {
        router.push('/configuration');
    };

    const exitClick = () => {
        console.log("teste");
        localStorage.removeItem('FontanaUser');
        localStorage.removeItem('Token');
        localStorage.removeItem('Role');
        router.push('/login');
    }

    return (
        <div className={`bg-gray-100 min-h-screen flex z-50`}>


            {/* Barra Lateral */}
            <div className="bg-white flex flex-col items-center">
                {/* Ícones na parte de cima */}
                <div className="mb-8 w-full">
                    <div className="p-4 cursor-pointer">
                        <Image src={logo} alt="ALT_TEXT" className="" />
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500 relative" onMouseEnter={toggleSubMenuHome} onMouseLeave={toggleSubMenuHome}>
                        <FaHome className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenHome &&
                            <div className="absolute top-0 left-[68px] bg-white w-[250px] text-center py-[10px] shadow-md hover:bg-blue-500 hover:text-white" onClick={dashboardClick}>
                                <p>Página Inicial</p>
                            </div>}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500 relative" onMouseEnter={toggleSubMenuDocumentos} onMouseLeave={toggleSubMenuDocumentos}>
                        <FaFileAlt className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenDocumentos && <div className="absolute top-0 left-[68px] bg-white shadow-md">
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]' onClick={documentosClick}>Listar Docs</button>
                            {viewAll && isAdmin && (<div>
                                <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px] border-b-2 border-gray-300' onClick={addDocPendenteClick}>Incluir Doc Pendente</button>
                                <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]' onClick={docCategoryClick}>Categoria de Docs</button>
                                <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]' onClick={addDocCategoryClick}>Criar Categoria de Doc</button>
                            </div>)}
                        </div>}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500 relative" onMouseEnter={toggleSubMenuColaboradores} onMouseLeave={toggleSubMenuColaboradores}>
                        <FaUsers className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpeColaboradores && <div className="absolute top-0 left-[68px] bg-white shadow-md">
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]' onClick={colaboradoresClick}>Colaboradores de Terceiro</button>
                            {isAdmin && (<div>
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px] border-b-2 border-gray-300' onClick={adicionarColaboradoresClick}>Adicionar Colaborador</button>
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]' onClick={categoriasColaboradoresClick}>Categorias Colaborador</button>
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]' onClick={adicionarcategoriasColaboradoresClick}>Criar Categoria Colaborador</button>
                            </div>)}
                        </div>}
                    </div>
                    {viewAll && (<div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500 relative" onMouseEnter={toggleSubMenuCadastros} onMouseLeave={toggleSubMenuCadastros}>
                        <FaHotel className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenCadastros && <div className="absolute top-0 left-[68px] bg-white shadow-md">
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]' onClick={terceirosClick}>Listar Terceiros</button>
                            {isAdmin && (<div>
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px] border-b-2 border-gray-300 ' onClick={adicionarTerceirosClick}>Incluir Terceiro</button>
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]' onClick={categoriasTerceirosClick}>Categorias Terceiro</button>
                            <button className='hover:bg-blue-500 hover:text-white block w-[250px] py-[10px] border-b-2 border-gray-300' onClick={addCategoriasTerceirosClick}>Criar Categoria Terceiro</button>
                            </div>)}
                        </div>}
                    </div>)}
                    {viewAll && (<div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500 relative" onMouseEnter={toggleSubMenuPrestadores} onMouseLeave={toggleSubMenuPrestadores}>
                        <FaUserFriends className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenPrestadores && <div className='absolute top-0 left-[68px] bg-white shadow-md text-center'>
                            <button className="hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]" onClick={usuariosClick}><p>Usuários</p></button>                           
                        </div>}
                    </div>)}
                    {viewAll && (<div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500 relative" onMouseEnter={toggleSubMenuNF} onMouseLeave={toggleSubMenuNF}>
                        <FaChartLine className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpeNF && <div className='absolute top-0 left-[68px] bg-white shadow-md text-center'>
                            <button className="hover:bg-blue-500 hover:text-white block w-[250px] py-[10px]" onClick={nfClick}><p>Nota Fiscal - Medições</p></button>                           
                        </div>}
                    </div>)}
                </div>

                {/* Ícones na parte de baixo */}
                <div className='mt-auto w-full'>
                    {viewAll && isAdmin && (<div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500 relative" onMouseEnter={toggleSubMenuConfiguração} onMouseLeave={toggleSubMenuConfiguração}>
                        <FaWrench className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenConfiguração && <button className="absolute top-0 left-[68px] bg-white px-8 py-[10px] w-[250px] shadow-md hover:bg-blue-500 hover:text-white" onClick={configuração}>
                            <p>Configurações</p>
                        </button>}
                    </div>)}
                    {!viewAll && (<div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500 relative" onMouseEnter={toggleSubMenuConta} onMouseLeave={toggleSubMenuConta}>
                        <FaUser className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenConta && <button className="absolute top-0 left-[68px] bg-white px-8 py-[10px] w-[250px] shadow-md hover:bg-blue-500 hover:text-white" onClick={myaccount}>
                            <p>Minha Conta</p>
                        </button>}
                    </div>)}                    
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-red-500 relative" onMouseEnter={toggleSubMenuMenu} onMouseLeave={toggleSubMenuMenu}>
                        <FaDoorOpen className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenMenu && <button className="absolute top-0 left-[68px] bg-white px-8 py-[10px] w-[250px] shadow-md hover:bg-red-500 hover:text-white" onClick={exitClick}>
                            <p>Sair</p>
                        </button>}
                    </div>
                </div>
            </div>


        </div>
    );
};


export default Sidebar;
