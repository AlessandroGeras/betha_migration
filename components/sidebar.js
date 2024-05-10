import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUserFriends, FaHome, FaHotel, FaUsers, FaUser, FaDoorOpen, FaFileAlt, FaChartLine, FaWrench,FaSync  } from "react-icons/fa";
import { FiLayout } from "react-icons/fi";
import { BsPersonVcard } from "react-icons/bs";

const Sidebar = () => {

    const router = useRouter();
    const [isSubMenuOpenHome, setIsSubMenuOpenHome] = useState(false)
    const [isSubMenuOpenDocuments, setIsSubMenuOpenDocuments] = useState(false);
    const [isSubMenuOpenPrestadores, setIsSubMenuOpenPrestadores] = useState(false);
    const [isSubMenuOpenCadastros, setIsSubMenuOpenCadastros] = useState(false);
    const [isSubMenuOpenDocumentos, setIsSubMenuOpenDocumentos] = useState(false);
    const [isSubMenuOpenConta, setIsSubMenuOpenConta] = useState(false);
    const [isSubMenuOpenMenu, setIsSubMenuOpenMenu] = useState(false);
    const [isSubMenuOpeColaboradores, setIsSubMenuOpenColaboradores] = useState(false);
    const [isSubMenuOpenConfiguração, setIsSubMenuOpenConfiguração] = useState(false);
    const [isSubMenuOpeNF, setIsSubMenuOpenNF] = useState(false);
    const [isSubMenuOpeSync, setIsSubMenuOpenSync] = useState(false);
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

        if (userPermission == 'outsourcedRead') {
            setIsAdmin(false);
            setPermission("outsourcedRead");
        }
    }, []);

    const toggleSubMenuHome = () => {
        setIsSubMenuOpenHome(!isSubMenuOpenHome);
    };

    const toggleSubMenuDocuments = () => {
        setIsSubMenuOpenDocuments(!isSubMenuOpenDocuments);
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

    const toggleSubMenuSync = () => {
        setIsSubMenuOpenSync(!isSubMenuOpeSync);
    };

    const dashboardClick = () => {
        router.push('/dashboard');
    };

    const layoutsClick = () => {
        router.push('/layouts');
    }

    const parceirosClick = () => {
        router.push('/parceiros');
    }

    const incluirParceiroClick = () => {
        router.push('/incluir-parceiro');
    }

    const categoriasTerceirosClick = () => {
        router.push('/category-outsourced');
    }

    const addCategoriasTerceirosClick = () => {
        router.push('/add-category-outsourced');
    }

    const incluirLayoutClick = () => {
        router.push('/incluir-layout');
    };

    const addDocPendenteColaboradorClick = () => {
        router.push('/add-pending-document-collaborator');
    };

    const prefeiturasClick = () => {
        router.push('/prefeituras');
    };

    const usuariosClick = () => {
        router.push('/usuarios');
    };

    const adicionarUsuariosClick = () => {
        router.push('/incluir-usuario');
    };

    const adicionarPrefeiturasClick = () => {
        router.push('/incluir-prefeitura');
    };

    const categoriasColaboradoresClick = () => {
        router.push('/category-collaborators');
    };

    const adicionarcategoriasColaboradoresClick = () => {
        router.push('/add-category-collaborators');
    };

    const myaccount = () => {
        router.push('/minha-conta');
    };

    const docCategoryClick = () => {
        router.push('/category-documents');
    };

    const addDocCategoryClick = () => {
        router.push('/add-category-documents');
    };

    const perfisClick = () => {
        router.push('/perfis');
    };

    const adicionarPerfisClick = () => {
        router.push('/incluir-perfil');
    };

    const incluirDocumentosClick = () => {
        router.push('/incluir-documentos');
    };

    const visualizarDocumentosClick = () => {
        router.push('/visualizar-documentos');
    };

    const documentosClick = () => {
        router.push('/documentos');
    };

    const syncClick = () => {
        router.push('/sincronizacao');
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
                        <img src="\img\logo_m.png" alt="Descrição da imagem" className="w-[35px]" />
                    </div>

                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuHome} onMouseLeave={toggleSubMenuHome}>
                        <FaHome className="text-gray-500 text-xl group-hover:text-white" />
                        {isSubMenuOpenHome && (
                            <div className="absolute top-0 left-[68px] bg-white w-[250px] text-center py-[10px] shadow-md hover:bg-orange-600 hover:text-white" onClick={dashboardClick}>
                                <p>Página Inicial</p>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuDocuments} onMouseLeave={toggleSubMenuDocuments}>
                        <FaFileAlt className="text-gray-500 text-xl group-hover:text-white" />
                        {isSubMenuOpenDocuments && <div className="absolute top-0 left-[68px] bg-white shadow-md">
                            <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]' onClick={documentosClick}>Listar Documentos</button>
                            <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]' onClick={incluirDocumentosClick}>Incluir Documentos</button>
                            <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]' onClick={visualizarDocumentosClick}>Visualizar Documentos</button>
                            <div>

                            </div>
                        </div>}
                    </div>

                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuDocumentos} onMouseLeave={toggleSubMenuDocumentos}>
                        <FiLayout className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenDocumentos && <div className="absolute top-0 left-[68px] bg-white shadow-md">
                            <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]' onClick={layoutsClick}>Listar Layouts</button>
                            <div>
                                <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]' onClick={incluirLayoutClick}>Incluir Layout</button>
                            </div>
                        </div>}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuColaboradores} onMouseLeave={toggleSubMenuColaboradores}>
                        <FaUsers className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpeColaboradores && <div className="absolute top-0 left-[68px] bg-white shadow-md">
                            <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]' onClick={parceirosClick}>Listar Parceiros</button>
                            <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px] border-b-2 border-gray-300' onClick={incluirParceiroClick}>Incluir Parceiro</button>
                            <div>

                            </div>
                        </div>}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuCadastros} onMouseLeave={toggleSubMenuCadastros}>
                        <FaHotel className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenCadastros && <div className="absolute top-0 left-[68px] bg-white shadow-md">
                            <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]' onClick={prefeiturasClick}>Listar Prefeituras</button>
                            <div>
                                <button className='hover:bg-orange-600 hover:text-white block w-[250px] py-[10px] border-b-2 border-gray-300 ' onClick={adicionarPrefeiturasClick}>Incluir Prefeitura</button>
                            </div>
                        </div>}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuPrestadores} onMouseLeave={toggleSubMenuPrestadores}>
                        <FaUserFriends className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenPrestadores && <div className='absolute top-0 left-[68px] bg-white shadow-md text-center'>
                            <button className="hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]" onClick={usuariosClick}><p>Usuários</p></button>
                            <button className="hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]" onClick={adicionarUsuariosClick}><p>Incluir Usuários</p></button>
                        </div>}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuNF} onMouseLeave={toggleSubMenuNF}>
                        <BsPersonVcard className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpeNF && <div className='absolute top-0 left-[68px] bg-white shadow-md text-center'>
                            <button className="hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]" onClick={perfisClick}><p>Perfis</p></button>
                            <button className="hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]" onClick={adicionarPerfisClick}><p>Incluir Perfil</p></button>
                        </div>}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuSync} onMouseLeave={toggleSubMenuSync}>
                        <FaSync className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpeSync && <div className='absolute top-0 left-[68px] bg-white shadow-md text-center'>
                            <button className="hover:bg-orange-600 hover:text-white block w-[250px] py-[10px]" onClick={syncClick}><p>Sincronização de Dados</p></button>
                        </div>}
                    </div>
                </div>

                {/* Ícones na parte de baixo */}
                <div className='mt-auto w-full'>
                    {/*  <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuConfiguração} onMouseLeave={toggleSubMenuConfiguração}>
                        <FaWrench className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenConfiguração && <button className="absolute top-0 left-[68px] bg-white px-8 py-[10px] w-[250px] shadow-md hover:bg-orange-600 hover:text-white" onClick={configuração}>
                            <p>Configurações</p>
                        </button>}
                    </div> */}
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-orange-600 relative" onMouseEnter={toggleSubMenuConta} onMouseLeave={toggleSubMenuConta}>
                        <FaUser className='text-gray-500 text-xl group-hover:text-white' />
                        {isSubMenuOpenConta && <button className="absolute top-0 left-[68px] bg-white px-8 py-[10px] w-[250px] shadow-md hover:bg-orange-600 hover:text-white" onClick={myaccount}>
                            <p>Minha Conta</p>
                        </button>}
                    </div>
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
