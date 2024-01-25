import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { useRouter } from 'next/router';

const FindDocument = () => {
    const [formData, setFormData] = useState({       
        id_documento: '',
        nome_terceiro:'',
        formato_vencimento:'',
        dia_fixo:'',
    });

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const [isTokenVerified, setTokenVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    const closeModal = () => {
        setFormData({
            id_documento: '',
            nome_terceiro:'',
            formato_vencimento:'',
            dia_fixo:'',
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
        const cleanValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Remove caracteres que não são letras ou números
        setFormData({ ...formData, [name]: cleanValue });
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, arquivo: file });
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

    useEffect(() => {
        const fetchCategoriaOptions = async () => {
            try {
                setLoading(true);

                if (!id) {
                    return
                }

                const token = localStorage.getItem('Token');

                if (!token) {
                    router.push('/login');
                    return;
                }

                const getAll = true;

                const response = await fetch(`/api/find-document`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, id }),
                });

                const data = await response.json();

                if (response.status === 401) {
                    router.push('/login');
                } else {
                    setTokenVerified(true);
                    setLoading(false);

                    setFormData({                       
                        id_documento: data.docs.ID_DOCUMENTO,
                        nome_terceiro:data.docs.TERCEIRO,
                        formato_vencimento:data.docs.FORMATO_VENCIMENTO,
                        dia_fixo:'',
                    });
                }
            } catch (error) {
                console.error('Erro ao obter opções de categoria:', error);
            }
        };

        fetchCategoriaOptions();
    }, [id]);

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('Token');
            const id = localStorage.getItem('FontanaUser');

            if (!token) {
                router.push('/login');
                return;
            }

            console.log(formData.id_documento);

            const requestBody = {
                token: token,
                formData: formData,
                id:id,
            };

            const response = await fetch('/api/update-pending-document', {
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
                setPopupMessage('Não foi possível atualizar o documento. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível atualizar o documento. Verifique se os dados estão preenchidos.');
            }

            setPopupMessage('Documento atualizado com sucesso!');
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
                <div className="bg-blue-500 text-white p-2 text-left mb-[120px] w-full">
                    <span className="ml-2">Documento - {formData.documento}</span>
                </div>

                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
                            <div className="text-blue-500 text-md text-center flex-grow">
                                <div className="flex items-center justify-center h-full text-4xl">
                                    Carregando documento...
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-7 gap-4 w-3/4 mx-auto">    

                 <div className="col-span-2"></div>                

                    <div className="col-span-2">
                        <label htmlFor="documento" className="block text-sm font-medium text-gray-700">
                            Tipo de Documento<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="documento"
                            id="documento"
                            onChange={handleInputChange}
                            value={formData.documento}
                            disabled
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>                   

                    <div className="col-span-1">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="status"
                            id="status"
                            onChange={handleInputChange}
                            value={formData.status}
                            disabled
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="col-span-1"></div>

                    <div className="col-span-2"></div>

                    <div className="col-span-3">
                        <label htmlFor="identificacao" className="block text-sm font-medium text-gray-700">
                            Número/Identificação do Documento<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="identificacao"
                            id="identificacao"
                            value={formData.identificacao}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="col-span-2"></div>

                    <div className="col-span-2"></div>

                    <div className="col-span-2">
                        <label htmlFor="formato_vencimento" className="block text-sm font-medium text-gray-700">
                            Formato Vencimento<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="formato_vencimento"
                            id="formato_vencimento"
                            onChange={handleInputChange}
                            value={formData.formato_vencimento}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="Fixo">Dia fixo</option>
                            <option value="Periodo">Período</option>
                        </select>
                    </div>

                    <div className="col-span-1" style={{ visibility: formData.vencimento === 'Periodo' ? 'hidden' : 'visible' }}>
                        <label htmlFor="dia_fixo" className="block text-sm font-medium text-gray-700">
                            Dia fixo<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={31}
                            name="dia_fixo"
                            id="dia_fixo"
                            onChange={handleInputChange}
                            value={formData.dia_fixo}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="col-span-2"></div>

                    {formData.vencimento === 'Periodo' && (
                        <div className="col-span-2"></div>)}

                    {formData.vencimento === 'Periodo' && (
                        <div className="col-span-1">
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
                    )}

                    {formData.vencimento === 'Periodo' && (
                        <div className="col-span-2">
                            <label htmlFor="diasAntecipacao" className="block text-sm font-medium text-gray-700">
                                Quant. dias
                            </label>
                            <input
                                type="text"
                                name="diasAntecipacao"
                                id="diasAntecipacao"
                                value={formData.diasAntecipacao}
                                readOnly
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    )}

                    <div className="col-span-2"></div>

                    {formData.vencimento === 'Periodo' && (
                        <div className="col-span-2"></div>)}

                    <div className="col-span-3">
                        <label htmlFor="notificacao" className="block text-sm font-medium text-gray-700">
                            Receber notificação antecipada do vencimento em dias<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="notificacao"
                            id="notificacao"
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="col-span-2"></div>



                    <div className="col-span-2"></div>
                    <div className="col-span-3">
                        <label htmlFor="arquivo" className="block text-sm font-medium text-gray-700">
                            Enviar Arquivo<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            name="arquivo"
                            id="arquivo"
                            onChange={handleFileChange}  // Adicione uma função para lidar com a mudança de arquivo
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="col-span-7 flex justify-center">
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

export default FindDocument;
