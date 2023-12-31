import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';

const AddOutsourced = () => {
    const [formData, setFormData] = useState({
        status: 'Em Análise',
        tipo_documento: '',
        nomeTerceiro: '',
        colaborador: '',
        vencimento: '',
    });

    const [categoriaOptions, setCategoriaOptions] = useState([]);
    const [outsourcedOptions, setOutsourcedOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const router = useRouter();

    const closeModal = () => {
        setShowModal(false);
    };

    const resetForm = () => {
        setFormData({
            status: 'Em Análise',
            tipo_documento: '',
            nomeTerceiro: '',
            colaborador: '',
            vencimento: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!formData.tipo_documento || !formData.nomeTerceiro || !formData.colaborador || !formData.vencimento) {
            setPopupMessage('Por favor, preencha todos os campos obrigatórios.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        try {
            const response = await fetch('/api/store-pending-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível salvar a pendência de documento. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível salvar a pendência de documento. Verifique se os dados estão preenchidos.');
            }

            const responseData = await response.json();

            console.log('Pendência de documento criada com sucesso!', responseData);
            setPopupMessage('Pendência de documento criada com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
            resetForm();
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    useEffect(() => {
        const fetchCategoriaOptions = async () => {
            try {
                const response = await fetch('/api/category-documents');
                const data = await response.json();
                console.log(data.docs);

                setCategoriaOptions(data.success ? data.docs.rows : [])
                setOutsourcedOptions(data.success ? data.usersfound.rows : [])

            } catch (error) {
                console.error('Erro ao obter opções de categoria:', error);
            }
        };
        fetchCategoriaOptions();
    }, []);

    return (
        <div className="flex h-screen">
            {/* Barra lateral */}
            <Sidebar />

            {/* Tabela principal */}
            <div className="flex-1 items-center justify-center bg-gray-50">
                <div className="bg-blue-500 text-white p-2 text-left mb-28 w-full">
                    <span className="ml-2">Adicionar Documento Pendente</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-4 gap-4 w-3/4 mx-auto">
                        {/* Linha 1 */}
                        <div className="col-span-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="status"
                                id="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                required>
                                <option value="Análise">Em Análise</option>
                                <option value="Faltante">Faltante</option>
                                <option value="Vencido">Vencido</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="tipo_documento" className="block text-sm font-medium text-gray-700">
                                Tipo de Documento <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="tipo_documento"
                                id="tipo_documento"
                                value={formData.tipo_documento}
                                onChange={(e) => handleInputChange(e)}
                                required
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="" disabled>
                                    Selecione uma categoria
                                </option>
                                {categoriaOptions
                                    .sort((a, b) => a.CATEGORIA.localeCompare(b.CATEGORIA))
                                    .map((categoria) => (
                                        <option key={categoria.CATEGORIA} value={categoria.CATEGORIA}>
                                            {categoria.CATEGORIA}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Linha 2 */}
                        <div className="col-span-2">
                            <label htmlFor="nome_terceiro" className="block text-sm font-medium text-gray-700">
                                Nome Terceiro <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="nomeTerceiro"
                                id="nome_terceiro"
                                value={formData.nomeTerceiro}
                                onChange={(e) => handleInputChange(e)}
                                required
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="" disabled>
                                    Selecione Terceiro
                                </option>
                                {outsourcedOptions
                                    .filter((terceiro) => terceiro && terceiro.NM_USUARIO)
                                    .sort((a, b) => (a.NM_USUARIO || '').localeCompare(b.NM_USUARIO || ''))
                                    .map((terceiro) => (
                                        <option key={terceiro.ID_USUARIO} value={terceiro.NM_USUARIO}>
                                            {terceiro.NM_USUARIO}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="colaborador" className="block text-sm font-medium text-gray-700">
                                Colaborador <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="colaborador"
                                id="colaborador"
                                required
                                value={formData.colaborador}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        {/* Linha 3 */}
                        <div className="col-span-1"></div>

                        <div className="col-span-2">
                            <label htmlFor="vencimento" className="block text-sm font-medium text-gray-700">
                                Vencimento <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="vencimento"
                                id="vencimento"
                                required
                                value={formData.vencimento}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="col-span-1"></div>

                        {/* Linha 6 (Botão Cadastrar) */}
                        <div className="col-span-4 flex justify-center">
                            <button
                                type="submit"
                                className="bg-red-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>

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
        </div>
    );
};

export default AddOutsourced;
