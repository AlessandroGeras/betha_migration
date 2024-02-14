import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';

const AddOutsourced = () => {
    const [formData, setFormData] = useState({
        categoria:'',
        numeração: 'Sim',
        formato_vencimento: 'Fixo',
        auditoria: 'Não',
    });

    const [categoriaOptions, setCategoriaOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const router = useRouter();
    const [isTokenVerified, setTokenVerified] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    const resetForm = () => {
        setFormData({
            categoria:'',
            numeração: 'Sim',
            formato_vencimento: 'Fixo',
            auditoria: 'Não',
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
       
            setFormData({ ...formData, [name]: value });
        
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();
       

        try {
            const token = localStorage.getItem('Token');

                if (!token) {
                    // Se o token não estiver presente, redirecione para a página de login
                    console.log("sem token");
                    router.push('/login');
                    return;
                }

            const response = await fetch('/api/store-category-documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,token
                }),
            });

            if (response.status === 400) {
                // Tratar erro 400 - Bad Request
                setPopupMessage('Categoria existente.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                return
            }

            if (!response.ok) {
                setPopupMessage('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
            }

            const responseData = await response.json();

            console.log('Categoria criada com sucesso!', responseData);
            setPopupMessage('Categoria criada com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
            resetForm();
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    const handleSubmitCancel = () => {
        router.push('/category-documents');
    };


    return (
        <div className="flex h-screen">
            {/* Barra lateral */}
            <Sidebar />
            <Head>
                <title>Adicionar Usuário</title>
            </Head>

            {/* Tabela principal */}
            <div className="flex-1 items-center justify-center bg-gray-50">
                <div className="bg-blue-500 text-white p-2 text-left mb-36 w-full">
                    {/* Conteúdo da Barra Superior, se necessário */}
                    <span className="ml-2">Adicionar Usuário</span>
                </div>
                <div className="grid grid-cols-7 gap-4 w-[300px] mx-auto">
                    {/* Linha 1 */}
                    <div className="col-span-7">
                        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                            Tipo de Documento <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="categoria"
                            id="categoria"
                            required
                            value={formData.categoria}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>






                   {/*  <div className="col-span-7">
                        <label htmlFor="numeração" className="block text-sm font-medium text-gray-700">
                            Informar numeração <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="numeração"
                            id="numeração"
                            value={formData.numeração}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
                    </div> */}

                    {/* <div className="col-span-7">
                        <label htmlFor="formato_vencimento" className="block text-sm font-medium text-gray-700">
                            Informar numeração <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="formato_vencimento"
                            id="formato_vencimento"
                            value={formData.formato_vencimento}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="Fixo">Fixo</option>
                            <option value="Período">Período</option>
                        </select>
                    </div>
 */}
                    <div className="col-span-7">
                        <label htmlFor="auditoria" className="block text-sm font-medium text-gray-700">
                            Doc. para auditoria <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="auditoria"
                            id="auditoria"
                            value={formData.auditoria}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                    


                    <div className="col-span-7 flex justify-center mt-4">
                        <button
                            type="submit"
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
    );
};

export default AddOutsourced;
