import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');

    const [categoriaOptions, setCategoriaOptions] = useState<{ }[]>([]);

    const [formData, setFormData] = useState({
        perfil: '',
    });

    const [checkboxData, setCheckboxData] = useState({
        layouts: {
            incluir: false,
            alterar: false,
            excluir: false
        },
        parceiros: {
            incluir: false,
            alterar: false,
            excluir: false
        },
        perfis: {
            incluir: false,
            alterar: false,
            excluir: false
        },
        prefeituras: {
            incluir: false,
            alterar: false,
            excluir: false
        },
        remessas: {
            incluir: false,
            alterar: false,
            excluir: false
        },
        usuarios: {
            incluir: false,
            alterar: false,
            excluir: false
        }
    });    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (group, permission) => {
        setCheckboxData(prevState => ({
            ...prevState,
            [group]: {
                ...prevState[group],
                [permission]: !prevState[group][permission]
            }
        }));
    };

    const handleSubmitCancel = () => {
        router.push('/perfis');
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        if (formData.perfil == "") {
            setPopupMessage('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        try {
            const response = await fetch('/api/alterar-perfil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    checkboxesData: checkboxData,
                    id,
                }),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
            }

            const responseData = await response.json();

            console.log('Dados salvos com sucesso!', responseData);
            setPopupMessage('Dados salvos com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching data from /api/auth
                const authResponse = await fetch(`/api/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const authData = await authResponse.json();

                if (!authResponse.ok) {
                    throw new Error(authData.error);
                } else {
                    setShowAll(true);
                }

                // Fetching data from /api/parceiros
                const parceirosResponse = await fetch(`/api/encontrar-perfil`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id,
                    }),
                });

                const parceirosData = await parceirosResponse.json();
                setCategoriaOptions(parceirosData.success);

                setFormData({
                    perfil:parceirosData.success.perfil,
                });
                setCheckboxData({
                    layouts: {
                        incluir: parceirosData.success.layoutsIncluir,
                        alterar: parceirosData.success.layoutsAlterar,
                        excluir: parceirosData.success.layoutsExcluir,
                    },
                    parceiros: {
                        incluir: parceirosData.success.parceirosIncluir,
                        alterar: parceirosData.success.parceirosAlterar,
                        excluir: parceirosData.success.parceirosExcluir,
                    },
                    perfis: {
                        incluir: parceirosData.success.perfisIncluir,
                        alterar: parceirosData.success.perfisAlterar,
                        excluir: parceirosData.success.perfisExcluir,
                    },
                    prefeituras: {
                        incluir: parceirosData.success.prefeiturasIncluir,
                        alterar: parceirosData.success.prefeiturasAlterar,
                        excluir: parceirosData.success.prefeiturasExcluir,
                    },
                    remessas: {
                        incluir: parceirosData.success.remessasIncluir,
                        alterar: parceirosData.success.remessasAlterar,
                        excluir: parceirosData.success.remessasExcluir,
                    },
                    usuarios: {
                        incluir: parceirosData.success.usuariosIncluir,
                        alterar: parceirosData.success.usuariosAlterar,
                        excluir: parceirosData.success.usuariosExcluir,
                    }
                });



            } catch (error) {
                setPopupMessage(error.message);
                setShowModal(true);
                router.push('/');
            }
        };

        fetchData();
    }, []);


    const closeModal = () => {
        setShowModal(false);
    };

    return showAll && (
        <div>
            <div>
                <div className="flex h-screen">
                    {/* Barra lateral */}
                    <Sidebar />
                    <Head>
                        <title>Alterar Perfil</title>
                    </Head>

                    {/* Tabela principal */}
                    <div className="flex-1 items-center justify-center bg-gray-50">
                        <div className="bg-orange-600 text-white p-2 text-left mb-16 w-full">
                            {/* Conteúdo da Barra Superior, se necessário */}
                            <span className="ml-2">Alterar Perfil</span>
                        </div>
                        <div className="grid grid-cols-7 gap-0 w-3/4 mx-auto">
                            {/* Linha 1 */}
                            <div className="col-span-2 mb-4">
                                <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">
                                    Perfil <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="perfil"
                                    id="perfil"
                                    value={formData.perfil}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                    maxLength={18}
                                    required
                                    disabled
                                />
                            </div>
                            <div className="col-span-5"></div>

                            {/* Linha 3 */}
                            <div className='col-span-7'>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-orange-600 border border-gray-200 sm:flex dark:bg-orange-600 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ">
                                        <div className="flex items-center ps-3">

                                            <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Layouts</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="layouts-incluir" type="checkbox" checked={checkboxData.layouts.incluir}
                                                onChange={() => handleCheckboxChange('layouts', 'incluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="layouts-incluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inclusão</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="layouts-alterar" type="checkbox" checked={checkboxData.layouts.alterar}
                                                onChange={() => handleCheckboxChange('layouts', 'alterar')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="layouts-alterar" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alteração</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="layouts-excluir" type="checkbox" checked={checkboxData.layouts.excluir}
                                                onChange={() => handleCheckboxChange('layouts', 'excluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="layouts-excluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Exclusão</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className='col-span-7'>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-orange-600 border border-gray-200 sm:flex dark:bg-orange-600 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ">
                                        <div className="flex items-center ps-3">

                                            <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Parceiros</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="parceiros-incluir" type="checkbox" checked={checkboxData.parceiros.incluir}
                                                onChange={() => handleCheckboxChange('parceiros', 'incluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="parceiros-incluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inclusão</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="parceiros-alterar" type="checkbox" checked={checkboxData.parceiros.alterar}
                                                onChange={() => handleCheckboxChange('parceiros', 'alterar')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="parceiros-alterar" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alteração</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="parceiros-excluir" type="checkbox" checked={checkboxData.parceiros.excluir}
                                                onChange={() => handleCheckboxChange('parceiros', 'excluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="parceiros-excluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Exclusão</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className='col-span-7'>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-orange-600 border border-gray-200 sm:flex dark:bg-orange-600 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ">
                                        <div className="flex items-center ps-3">

                                            <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Perfis</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="perfis-incluir" type="checkbox" checked={checkboxData.perfis.incluir}
                                                onChange={() => handleCheckboxChange('perfis', 'incluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="perfis-incluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inclusão</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="perfis-alterar" type="checkbox" checked={checkboxData.perfis.alterar}
                                                onChange={() => handleCheckboxChange('perfis', 'alterar')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="perfis-alterar" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alteração</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="perfis-excluir" type="checkbox" checked={checkboxData.perfis.excluir}
                                                onChange={() => handleCheckboxChange('perfis', 'excluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="perfis-excluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Exclusão</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className='col-span-7'>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-orange-600 border border-gray-200 sm:flex dark:bg-orange-600 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ">
                                        <div className="flex items-center ps-3">

                                            <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prefeituras</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="prefeituras-incluir" type="checkbox" checked={checkboxData.prefeituras.incluir}
                                                onChange={() => handleCheckboxChange('prefeituras', 'incluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="prefeituras-incluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inclusão</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="prefeituras-alterar" type="checkbox" checked={checkboxData.prefeituras.alterar}
                                                onChange={() => handleCheckboxChange('prefeituras', 'alterar')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="prefeituras-alterar" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alteração</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="prefeituras-excluir" type="checkbox" checked={checkboxData.prefeituras.excluir}
                                                onChange={() => handleCheckboxChange('prefeituras', 'excluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="prefeituras-excluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Exclusão</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className='col-span-7'>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-orange-600 border border-gray-200 sm:flex dark:bg-orange-600 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ">
                                        <div className="flex items-center ps-3">

                                            <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remessas</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="remessas-incluir" type="checkbox" checked={checkboxData.remessas.incluir}
                                                onChange={() => handleCheckboxChange('remessas', 'incluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="remessas-incluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inclusão</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="remessas-alterar" type="checkbox" checked={checkboxData.remessas.alterar}
                                                onChange={() => handleCheckboxChange('remessas', 'alterar')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="remessas-alterar" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alteração</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="remessas-excluir" type="checkbox" checked={checkboxData.remessas.excluir}
                                                onChange={() => handleCheckboxChange('remessas', 'excluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="remessas-excluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Exclusão</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className='col-span-7'>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-orange-600 border border-gray-200 sm:flex dark:bg-orange-600 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ">
                                        <div className="flex items-center ps-3">

                                            <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuários</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="usuarios-incluir" type="checkbox" checked={checkboxData.usuarios.incluir}
                                                onChange={() => handleCheckboxChange('usuarios', 'incluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="usuarios-incluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inclusão</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="usuarios-alterar" type="checkbox" checked={checkboxData.usuarios.alterar}
                                                onChange={() => handleCheckboxChange('usuarios', 'alterar')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="usuarios-alterar" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alteração</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="usuarios-excluir" type="checkbox" checked={checkboxData.usuarios.excluir}
                                                onChange={() => handleCheckboxChange('usuarios', 'excluir')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="usuarios-excluir" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Exclusão</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-span-7 flex justify-center mt-4">
                                <button
                                    type="submit"
                                    onClick={handleSubmitCancel}
                                    className="border border-orange-600 mx-1 text-orange-600 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 hover:bg-orange-100"
                                >
                                    Fechar
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmitSuccess}
                                    className="bg-orange-600 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 hover:bg-orange-500"
                                >
                                    Salvar
                                </button>
                            </div>

                            <div className="col-span-1"></div>
                        </div>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-row relative">
                                {/* Pseudo-elemento para a barra lateral */}
                                <style>
                                    {`
                                        .modal-content::before {
                                            content: '';
                                            background-color: ${modalColor}; /* Cor dinâmica baseada no estado */
                                            width: 4px; /* Largura da barra lateral */
                                            height: 100%; /* Altura da barra lateral */
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                        }
                                    `}
                                </style>

                                <button
                                    className={`absolute top-2 right-2 text-${textColor === '#3f5470' ? 'blue' : 'red'}-500`}
                                    onClick={closeModal}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>

                                <div className={`text-md text-center flex-grow`} style={{ color: textColor }}>
                                    {popupMessage}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
