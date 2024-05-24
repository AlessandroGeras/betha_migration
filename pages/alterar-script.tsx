import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const IncluirScript = () => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    const [showModal2, setShowModal2] = useState(false);
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');

    const [categoriaOptions, setCategoriaOptions] = useState<{ banco: string }[]>([]);

    const [formData, setFormData] = useState({
        status: 'Não executado',
        observacao: '',
        query: '',
        api: '',
        banco: '',
    });

    const resetForm = () => {
        setFormData({
            status: 'Não executado',
            observacao: '',
            query: '',
            api: '',
            banco: '',
        });
    };

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

        if (formData.query === "" || formData.api === "" || formData.banco === "") {
            setPopupMessage('Não foi possível criar o script. Verifique se os dados estão preenchidos.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        try {
            const response = await fetch('/api/alterar-script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData, id,
                }),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível alterar o script. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível alterar o script. Verifique se os dados estão preenchidos.');
            }

            const responseData = await response.json();

            console.log('Script alterado com sucesso!', responseData);
            setPopupMessage('Script alterado com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    const handleSubmitDelete = (id) => {
        setShowModal(true);
        setShowModal2(true);
        setModalColor('#3f5470');
        setTextColor('#3f5470');
    };

    const handleSubmitDeleteConfirm = async (id) => {
        try {
            const response = await fetch('/api/excluir-script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível excluir o script.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível excluir o script.');
            }

            const responseData = await response.json();

            console.log('Script excluído com sucesso!', responseData);
            setPopupMessage('Script excluído com sucesso!');
            router.push('/dashboard');
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    useEffect(() => {
        if (id) {
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

                    const bancosResponse = await fetch(`/api/bancos`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const bancosData = await bancosResponse.json();

                    if (bancosData && bancosData.success) {
                        setCategoriaOptions(bancosData.success);
                    } else {
                        throw new Error('Falha ao obter dados dos parceiros.');
                    }

                    const scriptResponse = await fetch(`/api/visualizar-script2`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id }),
                    });

                    const scriptData = await scriptResponse.json();

                    if (!scriptResponse.ok) {
                        throw new Error(scriptData.error);
                    } else {
                        setFormData({
                            status: scriptData.success.status,
                            observacao: scriptData.success.observacao,
                            query: scriptData.success.query,
                            api: scriptData.success.api,
                            banco: scriptData.success.banco,
                        });
                    }
                } catch (error) {
                    setPopupMessage(error.message);
                    setShowModal(true);
                    router.push('/');
                }
            };

            fetchData();
        }
    }, [id]);

    const closeModal = () => {
        setShowModal(false);
        setShowModal2(false);
    };

    return showAll && (
        <div>
            <div className="flex h-screen">
                <Sidebar />
                <Head>
                    <title>Adicionar Script</title>
                </Head>

                <div className="flex-1 items-center justify-center bg-gray-50">
                    <div className="bg-orange-600 text-white p-2 text-left mb-16 w-full">
                        <span className="ml-2">Adicionar Script</span>
                    </div>
                    <div className="grid grid-cols-7 gap-4 w-3/4 mx-auto">
                        <div className="col-span-4">
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
                                <option value="" disabled>
                                    Selecione um banco
                                </option>
                                {categoriaOptions.map((banco) => (
                                    <option key={banco.banco} value={banco.banco}>
                                        {banco.banco}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-4">
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

                        <div className="col-span-4">
                            <label htmlFor="api" className="block text-sm font-medium text-gray-700">
                                API <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="api"
                                id="api"
                                value={formData.api}
                                onChange={handleInputChange}
                                required
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="col-span-4 row-span-2">
                            <label htmlFor="observacao" className="block text-sm font-medium text-gray-700">
                                Observações
                            </label>
                            <textarea
                                name="observacao"
                                id="observacao"
                                value={formData.observacao}
                                onChange={handleInputChange}
                                rows={4}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 pb-[20px]"
                            />
                        </div>

                        <div className="col-span-2"></div>

                        <div className="col-span-1"></div>

                        <div className="col-span-7 flex justify-center mt-4">
                            <button onClick={() => handleSubmitDelete(id)}
                                type="button"
                                className="bg-red-600 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-red-300 hover:bg-red-500"
                            >
                                Excluir
                            </button>
                            <button
                                type="button"
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
                        <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-row">
                            <style>
                                {`
                                    .modal-content::before {
                                    content: '';
                                    background-color: ${modalColor};
                                    width: 4px;
                                    height: 100%;
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

                            <div
                                className="text-md text-center flex-grow"
                                style={{ color: textColor }}
                                dangerouslySetInnerHTML={{ __html: popupMessage }}
                            />
                        </div>
                    </div>
                )}

                {showModal2 && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-col text-center">
                            <span className='font-semibold text-red-500'>Deseja excluir o script?</span>
                            <div className='flex'>
                                <button
                                    className="mx-auto mt-4 w-[300px]"
                                    onClick={() => handleSubmitDeleteConfirm(id)}
                                >
                                    <span className="bg-blue-950 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                                        Excluir script
                                    </span>
                                </button>
                                <button
                                    className="mx-auto mt-4 w-[300px]"
                                    onClick={closeModal}
                                >
                                    <span className="bg-red-700 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                                        Cancelar e fechar
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncluirScript;
