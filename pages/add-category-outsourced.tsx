import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';

const AddCategoryOutsourced = () => {
    const [formData, setFormData] = useState({
        nome: '',
        tipo_documento: [], // Agora é um array para armazenar valores múltiplos
    });

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const router = useRouter();

    const closeModal = () => {
        // Limpar os valores do formulário
        setFormData({
            nome: '',
            tipo_documento: [],
        });

        // Fechar o modal
        setShowModal(false);
    };

    const handleCheckboxChange = (value) => {
        // Verifica se o valor já está no array
        const isSelected = formData.tipo_documento.includes(value);

        // Atualiza o estado com base na seleção/deseleção do checkbox
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

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        if (!formData.nome) {
            setPopupMessage('O campo "Nome da Categoria" é obrigatório.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        try {
            // Enviar dados para a API usando fetch
            const response = await fetch('/api/store-category-outsourced', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
            }

            const responseData = await response.json();

            // Lógica adicional após o envio bem-sucedido, se necessário
            console.log('Categoria criada com sucesso!', responseData);
            setPopupMessage('Categoria criada com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    const handleSubmitCancel = () => {
        router.push('/category-outsourced');
    };

    return (
        <div className="flex h-screen">
            {/* Barra lateral */}
            <Sidebar />

            {/* Tabela principal */}
            <div className="flex-1 items-center justify-center bg-gray-50">
                <div className="bg-blue-500 text-white p-2 text-left mb-28 w-full">
                    {/* Conteúdo da Barra Superior, se necessário */}
                    <span className="ml-2">Adicionar Categoria de Terceiro</span>
                </div>
                <div className="grid grid-cols-1 gap-4 w-2/4 mx-auto">
                    {/* Linha 1 */}
                    <div className="col-span-5">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                            Nome da Categoria<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    {/* Linha 2 */}
                    <div className="col-span-5 mx-auto">
                        <label htmlFor="tipo_documento" className="block text-sm font-medium text-gray-700">
                           Tipos de Documentos <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="Cartão CNPJ"
                                    name="Cartão CNPJ"
                                    value="Cartão CNPJ"
                                    checked={formData.tipo_documento.includes('Cartão CNPJ')}
                                    onChange={() => handleCheckboxChange('Cartão CNPJ')}
                                    className="mr-1"
                                />
                                <label htmlFor="Cartão CNPJ" className="select-none">Cartão CNPJ</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="CND Estadual"
                                    name="CND Estadual"
                                    value="CND Estadual"
                                    checked={formData.tipo_documento.includes('CND Estadual')}
                                    onChange={() => handleCheckboxChange('CND Estadual')}
                                    className="mr-1"
                                />
                                <label htmlFor="CND Estadual" className="select-none">CND Estadual</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="CND Federal"
                                    name="CND Federal"
                                    value="CND Federal"
                                    checked={formData.tipo_documento.includes('CND Federal')}
                                    onChange={() => handleCheckboxChange('CND Federal')}
                                    className="mr-1"
                                />
                                <label htmlFor="CND Federal" className="select-none">CND Federal</label>
                            </div>
                        </div>
                    </div>

                    {/* Linha 3 (Botão Cadastrar) */}
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

            {/* Modal */}
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

export default AddCategoryOutsourced;
