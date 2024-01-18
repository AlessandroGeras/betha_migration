import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';

const AddCategoryDocuments = () => {
    const [formData, setFormData] = useState({
        categoria: '',
        tipo_documento: [],
        vencimento: 'Fixo',
        dataVencimento: new Date().toISOString().split('T')[0],
        diasAntecipacao: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const [isTokenVerified, setTokenVerified] = useState(false);

    const closeModal = () => {
        setFormData({
            categoria: '',
            tipo_documento: [],
            vencimento: 'Fixo',
            dataVencimento: new Date().toISOString().split('T')[0],
            diasAntecipacao: '',
        });
        setShowModal(false);
    };

    const handleCheckboxChange = (value) => {
        const isSelected = formData.tipo_documento.includes(value);

        setFormData((prevData) => ({
            ...prevData,
            tipo_documento: isSelected
                ? prevData.tipo_documento.filter((item) => item !== value)
                : [...prevData.tipo_documento, value],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            alert('Por favor, selecione uma data atual ou futura.');
            return;
        }

        setFormData({ ...formData, dataVencimento: e.target.value });
    };

    const calculateDaysAntecipation = () => {
        const dataVencimento = new Date(formData.dataVencimento);
        const dataAtual = new Date();
        const diffInMilliseconds = dataVencimento - dataAtual;
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

        setFormData({ ...formData, diasAntecipacao: diffInDays.toString() });
    };

    useEffect(() => {
        if (formData.vencimento === 'Periodo') {
            calculateDaysAntecipation();
        }
    }, [formData.dataVencimento, formData.vencimento]);

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('Token');

            if (!token) {
                router.push('/login');
                return;
            }

            const requestBody = {
                token: token,
                formData: formData,
            };

            const response = await fetch('/api/store-category-documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.status === 401) {
                router.push('/login');
            } else {
                setTokenVerified(true);
            }

            if (!response.ok) {
                setPopupMessage('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
            }

            setPopupMessage('Categoria criada com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    const handleSubmitCancel = () => {
        router.push('/category-documents');
    };

    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 items-center justify-center bg-gray-50">
                <div className="bg-blue-500 text-white p-2 text-left mb-28 w-full">
                    <span className="ml-2">Adicionar Categoria de Documentos</span>
                </div>
                <div className="grid grid-cols-7 gap-4 w-3/4 mx-auto">
                    <div className="col-span-3">
                        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                            Nome da Categoria<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="categoria"
                            id="categoria"
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="col-span-4"></div>

                    <div className="col-span-3">
                        <label htmlFor="numeração" className="block text-sm font-medium text-gray-700">
                            Numeração<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="numeração"
                            id="numeração"
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                        </select>
                    </div>

                    <div className="col-span-4"></div>

                    <div className="col-span-2">
                        <label htmlFor="vencimento" className="block text-sm font-medium text-gray-700">
                            Formato Vencimento<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="vencimento"
                            id="vencimento"
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="Fixo">Dia fixo</option>
                            <option value="Periodo">Período</option>
                        </select>
                    </div>

                    {/* <div className="col-span-1" style={{ visibility: formData.vencimento === 'Periodo' ? 'hidden' : 'visible' }}>
                        <label htmlFor="dia" className="block text-sm font-medium text-gray-700">
                            Dia fixo<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={31}
                            name="dia"
                            id="dia"
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div> */}

                    {/* <div className="col-span-2">
                        <label htmlFor="notificação" className="block text-sm font-medium text-gray-700">
                            Notificação antecipada<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="notificação"
                            id="notificação"
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div> */}


                    {/* {formData.vencimento === 'Periodo' && (
                        <div className="col-span-3">
                            <label htmlFor="dataVencimento" className="block text-sm font-medium text-gray-700">
                                Data de Vencimento<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="dataVencimento"
                                id="dataVencimento"
                                value={formData.dataVencimento}
                                onChange={handleDateChange}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    )} */}

                    {/* {formData.vencimento === 'Periodo' && (<div className="col-span-2">
                        <label htmlFor="diasAntecipacao" className="block text-sm font-medium text-gray-700">
                            Quant. dias<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="diasAntecipacao"
                            id="diasAntecipacao"
                            value={formData.diasAntecipacao}
                            readOnly
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>)} */}

                    <div className="col-span-3">
                        <label htmlFor="auditoria" className="block text-sm font-medium text-gray-700">
                            Doc para auditoria<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="auditoria"
                            id="auditoria"
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                        </select>
                    </div>

                    <div className="col-span-5 flex justify-center">
                        <button
                            type="button"
                            onClick={handleSubmitCancel}
                            className="bg-red-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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

export default AddCategoryDocuments;
