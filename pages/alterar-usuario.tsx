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

    const [categoriaOptions, setCategoriaOptions] = useState<{ perfil: string;}[]>([]);

    const [formData, setFormData] = useState({
        status: 'Ativo',
        usuario: '',
        nome: '',
        email:'',
        perfil: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitCancel = () => {
        router.push('/usuarios');
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        if (formData.usuario == "" || formData.nome == "" || formData.email == "" || formData.perfil == "") {
            setPopupMessage('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        try {
            const response = await fetch('/api/alterar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id,
                }),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    setPopupMessage('O email fornecido já está em uso.');
                    setShowModal(true);
                    setModalColor('#e53e3e');
                    setTextColor('#e53e3e');
                } else {
                    // Para outros códigos de status de erro, exiba uma mensagem genérica de erro
                    setPopupMessage('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
                    setShowModal(true);
                    setModalColor('#e53e3e');
                    setTextColor('#e53e3e');
                }
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

                const usuarioResponse = await fetch(`/api/encontrar-usuario`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id,
                    }),
                });

                const usuarioData = await usuarioResponse.json();

                if (!usuarioResponse.ok) {
                    throw new Error(usuarioData.error);
                } else {
                    const perfil = usuarioData.success;
                    setFormData({
                        status:usuarioData.success.status,
                        usuario:usuarioData.success.usuario,
                        nome:usuarioData.success.nome,
                        email:usuarioData.success.email,
                        perfil:usuarioData.success.perfil,
                    });
                }


                const parceirosResponse = await fetch(`/api/perfis`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const parceirosData = await parceirosResponse.json();

                if (parceirosData && parceirosData.success) {
                    setCategoriaOptions(parceirosData.success);
                    console.log("teste");
                    console.log(categoriaOptions);
                } else {
                    throw new Error('Falha ao obter dados dos parceiros.');
                }

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
                        <title>Incluir Usuário</title>
                    </Head>

                    {/* Tabela principal */}
                    <div className="flex-1 items-center justify-center bg-gray-50">
                        <div className="bg-orange-600 text-white p-2 text-left mb-16 w-full">
                            {/* Conteúdo da Barra Superior, se necessário */}
                            <span className="ml-2">Adicionar Usuário</span>
                        </div>
                        <div className="grid grid-cols-7 gap-4 w-3/4 mx-auto">

                            {/* Linha 1 */}
                            <div className="col-span-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>




                            {/* Linha 3 */}
                            <div className="col-span-4">
                                <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                                    Usuário <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="usuario"
                                    id="usuario"
                                    value={formData.usuario}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="col-span-4">
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                                    Nome <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    required
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    E-mail <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>



                            <div className="col-span-4">
                                <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">
                                    Perfil <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="perfil"
                                    id="perfil"
                                    value={formData.perfil}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Selecione um perfil
                                    </option>
                                    {categoriaOptions.map((perfil) => (
                                        <option key={perfil.perfil} value={perfil.perfil}>
                                            {perfil.perfil}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="col-span-2">

                            </div>

                            {/* Linha 6 (Botão Cadastrar) */}
                            <div className="col-span-1"></div>


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
