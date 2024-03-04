import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';

const AddOutsourced = () => {
    const [statusOptions] = useState(['Ativo', 'Inativo', 'Período']); // Definindo as opções de status fixas
    const [selectedStatus, setSelectedStatus] = useState('Ativo'); // Definindo o status inicial como 'Ativo'
    const [isTokenVerified, setTokenVerified] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const router = useRouter();
    const { id } = router.query;

    const closeModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();
        

        try {
            const token = localStorage.getItem('Token');

            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch('/api/update-status-outsourced', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,selectedStatus,id,
                }),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível salvar o status. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível salvar o status. Verifique se os dados estão preenchidos.');
            }

            const responseData = await response.json();

            setPopupMessage('Status salvo com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    const handleSubmitCancel = () => {
        router.push('/outsourced');
    };

    useEffect(() => {
        const fetchStatusOptions = async () => {
            try {
                const token = localStorage.getItem('Token');
                const id_user = localStorage.getItem('FontanaUser');

                if (!id) {
                    return;
                }

                if (!token) {
                    router.push('/login');
                    return;
                }

                const getAll = true;
                const response = await fetch(`/api/find-status-outsourced`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, getAll, id_user, id }),
                });

                const data = await response.json();

                if (response.status === 401) {
                    router.push('/login');
                } else if (response.status === 403) {
                    router.push('/403');
                } else {
                    setTokenVerified(true);
                    setSelectedStatus(data.user.STATUS); // Definindo o status inicial com o valor vindo da API
                }
            } catch (error) {
                console.error('Erro ao obter opções de status:', error);
            }
        };

        fetchStatusOptions();
    }, [router]);

    return (
        <div>
            {isTokenVerified && (
                <div>
                    <div className="flex h-screen">
                        <Sidebar />
                        <Head>
                            <title>Alterar Status</title>
                        </Head>

                        <div className="flex-1 items-center justify-center bg-gray-50">
                            <div className="bg-blue-500 text-white p-2 text-left mb-36 w-full">
                                <span className="ml-2">Alterar Status de Terceiro</span>
                            </div>
                            <div className="grid grid-cols-7 gap-4 w-[1300px] mx-auto">
                                <div className="col-span-7">
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        value={selectedStatus}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-7 flex justify-center mt-4">
                                    <button
                                        type="button"
                                        onClick={handleSubmitCancel}
                                        className="bg-red-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleSubmitSuccess}
                                        className="bg-blue-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {showModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-row relative">
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
                                        className={`absolute top-2 right-2 text-${
                                            textColor === '#3f5470' ? 'blue' : 'red'
                                        }-500`}
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
            )}
        </div>
    );
};

export default AddOutsourced;
