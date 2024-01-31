import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { useRouter } from 'next/router';

const FindDocument = () => {
    const [formData, setFormData] = useState({
        notificacao: 7,
    });

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const [isTokenVerified, setTokenVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    const closeModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchCategoriaOptions = async () => {
            try {

                const token = localStorage.getItem('Token');

                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch(`/api/configuration`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });

                const data = await response.json();

                if (response.status === 401) {
                    router.push('/login');
                } else {
                    setFormData({
                        notificacao: data.notificacao.NOTIFICACAO,
                    });
                    setTokenVerified(true);
                    setLoading(false);
                }

            } catch (error) {
                console.error('Erro ao obter as configurações:', error);
            }
        };
        fetchCategoriaOptions();
    }, []);

   const handleSubmitSuccess = async (e) => {
    e.preventDefault();

    if (formData.notificacao < 0) {
        setPopupMessage('Não são aceitos valores negativos na notificação');
        setShowModal(true);
        setModalColor('#e53e3e');
        setTextColor('#e53e3e');
        return;
    }

    try {
        const token = localStorage.getItem('Token');

        if (!token) {
            router.push('/login');
            return;
        }

        const resposta = await fetch('/api/configuration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify({ formData: { ...formData, notificacao: String(formData.notificacao) }, token }), // Convertendo notificacao para string
        });

        const data = await resposta.json();

        // Restante do seu código...
    } catch (error) {
        console.error('Erro ao contatar o servidor:', error);
    }
};

    const handleSubmitCancel = () => {
        router.push('/dashboard');
    };


    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 items-center justify-center bg-gray-50">
                <div className="bg-blue-500 text-white p-2 text-left mb-[120px] w-full">
                    <span className="ml-2">Configurações</span>
                </div>

                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
                            <div className="text-blue-500 text-md text-center flex-grow">
                                <div className="flex items-center justify-center h-full text-4xl">
                                    Carregando configurações...
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                <div className="mt-6 mx-auto w-[400px]">
                    <label htmlFor="notificacao" className="block text-sm font-medium text-gray-700">
                        Receber notificação antecipada do vencimento em dias<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="notificacao"
                        id="notificacao"
                        onChange={handleInputChange}
                        value={formData.notificacao}
                        required
                        min="0"
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>


                <div className="col-span-7 flex justify-center mt-10 pb-4">
                    <button
                        type="button"
                        onClick={handleSubmitCancel}
                        className="bg-white mx-1 text-red-500 border solid border-red-500 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmitSuccess}
                        className="bg-blue-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Salvar
                    </button>
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
        </div >
    );
};

export default FindDocument;
