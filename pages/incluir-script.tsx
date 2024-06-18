import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const IncluirScript = () => {
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();

    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');

    const [categoriaOptions, setCategoriaOptions] = useState<{ banco: string }[]>([]);

    const [formData, setFormData] = useState({
        status: 'Não executado',
        observacao: '',
        query: '',
        api: '',
        banco: '',
        tabela: '',
        tamanho: '',
    });

    const resetForm = () => {
        setFormData({
            status: 'Não executado',
            observacao: '',
            query: '',
            api: '',
            banco: '',
            tabela: '',
            tamanho: '',
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cnpj') {
            const formattedCNPJ = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            setFormData({ ...formData, [name]: formattedCNPJ });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmitCancel = () => {
        router.push('/dashboard');
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        if (formData.query === "" || formData.api === "" || formData.banco === "" || formData.tamanho === "") {
            setPopupMessage('Não foi possível criar o script. Verifique se os dados estão preenchidos.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        try {
            const response = await fetch('/api/incluir-script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 400 && errorData.error.startsWith("Esse registro já existe no banco")) {
                    setPopupMessage(errorData.error);
                } else {
                    setPopupMessage('Não foi possível criar o script. Verifique se os dados estão preenchidos.');
                }
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error(errorData.error || 'Erro ao criar o script.');
            }

            const responseData = await response.json();

            console.log('Script criado com sucesso!', responseData);
            setPopupMessage('Script criado com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
            resetForm();
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

                // Fetching data from /api/bancos
                const bancosResponse = await fetch(`/api/bancos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const bancosData = await bancosResponse.json();

                if (bancosData && bancosData.success) {
                    setCategoriaOptions(bancosData.success);
                    console.log("teste");
                    console.log(categoriaOptions);
                } else {
                    throw new Error('Falha ao obter dados dos bancos.');
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
            <div className="flex h-screen">
                {/* Barra lateral */}
                <Sidebar />
                <Head>
                    <title>Adicionar Script</title>
                </Head>

                {/* Tabela principal */}
                <div className="flex-1 items-center justify-center bg-gray-50">
                    <div className="bg-orange-600 text-white p-2 text-left mb-16 w-full">
                        {/* Conteúdo da Barra Superior, se necessário */}
                        <span className="ml-2">Adicionar Script</span>
                    </div>
                    <div className="grid grid-cols-7 gap-4 w-3/4 mx-auto">

                        <div className="col-span-7">
                            <label htmlFor="banco" className="block text-sm font-medium text-gray-700">
                                Banco <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="banco"
                                id="banco"
                                value={formData.banco}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                required
                            >
                                <option value="" disabled selected>
                                    Selecione um banco
                                </option>
                                {categoriaOptions.map((banco) => (
                                    <option key={banco.banco} value={banco.banco}>
                                        {banco.banco}
                                    </option>
                                ))}
                            </select>
                        </div>                        

                        <div className="col-span-7">
                            <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                                Query <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="query"
                                id="query"
                                value={formData.query}
                                onChange={handleInputChange}
                                required
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="col-span-7">
                            <label htmlFor="api" className="block text-sm font-medium text-gray-700">
                                Api <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="api"
                                id="api"
                                value={formData.api}
                                onChange={handleInputChange}
                                required
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        {/* Linha 1 */}
                        <div className="col-span-7">
                            <label htmlFor="observacao" className="block text-sm font-medium text-gray-700">
                                Observações
                            </label>
                            <textarea
                                name="observacao"
                                id="observacao"
                                value={formData.observacao}
                                onChange={handleInputChange}
                                rows={2}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 pb-[20px]"
                            />
                        </div>

                        <div className="col-span-7">
                            <label htmlFor="tamanho" className="block text-sm font-medium text-gray-700">
                                Tamanho em kb <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="tamanho"
                                id="tamanho"
                                value={formData.tamanho}
                                onChange={handleInputChange}
                                required
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="col-span-2"></div>

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
    );
};

export default IncluirScript;
