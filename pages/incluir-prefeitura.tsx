import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Dashboard = () => {

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();

    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');

    const [categoriaOptions, setCategoriaOptions] = useState<{ parceiro: string }[]>([]);

    const [formData, setFormData] = useState({
        status: 'Ativo',
        observacoes: '',
        cnpj: '',
        prefeitura: '',
        contato: '',
        sobrenome: '',
        endereco: '',
        cidade: '',
        email: '',
        telefone: '',
        uf: '',
        revenda: '',
    });

    const resetForm = () => {
        setFormData({
            status: 'Ativo',
            observacoes: '',
            cnpj: '',
            prefeitura: '',
            contato: '',
            sobrenome: '',
            endereco: '',
            cidade: '',
            email: '',
            telefone: '',
            uf: '',
            revenda: '',
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
        router.push('/prefeituras');
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();


        if (formData.cnpj == "" || formData.prefeitura == "" || formData.contato == "" || formData.endereco == "" || formData.cidade == "" || formData.uf == "" || formData.telefone == "" || formData.email == ""  || formData.revenda == "") {
            setPopupMessage('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        try {
            const response = await fetch('/api/incluir-prefeitura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
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

            console.log('Usuário criado com sucesso!', responseData);
            setPopupMessage('Usuário criado com sucesso!');
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

                // Fetching data from /api/parceiros
                const parceirosResponse = await fetch(`/api/parceiros`, {
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
                        <title>Incluir Prefeitura</title>
                    </Head>

                    {/* Tabela principal */}
                    <div className="flex-1 items-center justify-center bg-gray-50">
                        <div className="bg-orange-600 text-white p-2 text-left mb-16 w-full">
                            {/* Conteúdo da Barra Superior, se necessário */}
                            <span className="ml-2">Adicionar Prefeitura</span>
                        </div>
                        <div className="grid grid-cols-7 gap-4 w-3/4 mx-auto">

                            {/* Linha 1 */}
                            <div className="col-span-3">
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

                            <div className="col-span-4 row-span-2">
                                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                                    Observações
                                </label>
                                <textarea
                                    name="observacoes"
                                    id="observacoes"
                                    value={formData.observacoes}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 pb-[20px]"
                                />
                            </div>

                            {/* Linha 2 */}
                            <div className="col-span-3">
                                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
                                    CNPJ <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="cnpj"
                                    id="cnpj"
                                    value={formData.cnpj}
                                    onChange={handleInputChange}
                                    placeholder="00.000.000/0000-00"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                    maxLength={18}
                                    required
                                />
                            </div>

                            {/* Linha 3 */}
                            <div className="col-span-4">
                                <label htmlFor="prefeitura" className="block text-sm font-medium text-gray-700">
                                    Nome Prefeitura <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="prefeitura"
                                    id="prefeitura"
                                    value={formData.prefeitura}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="contato" className="block text-sm font-medium text-gray-700">
                                    Nome do Contato <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="contato"
                                    id="contato"
                                    required
                                    value={formData.contato}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>


                            {/* Linha 4 (Endereço, Cidade) */}
                            <div className="col-span-3">
                                <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                                    Endereço <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="endereco"
                                    id="endereco"
                                    value={formData.endereco}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                                    Cidade <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="cidade"
                                    id="cidade"
                                    value={formData.cidade}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="uf" className="block text-sm font-medium text-gray-700">
                                    UF
                                </label>
                                <input
                                    type="text"
                                    name="uf"
                                    id="uf"
                                    required
                                    value={formData.uf}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            {/* Linha 5 (Email, Telefone, UF) */}
                            <div className="col-span-3">
                                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                                    Telefone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="telefone"
                                    id="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>


                            <div className="col-span-3">
                                <label htmlFor="revenda" className="block text-sm font-medium text-gray-700">
                                    Revenda
                                </label>
                                <select
                                    name="revenda"
                                    id="revenda"
                                    value={formData.revenda}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="" disabled selected>
                                        Selecione uma revenda
                                    </option>
                                    {categoriaOptions.map((parceiro) => (
                                        <option key={parceiro.parceiro} value={parceiro.parceiro}>
                                            {parceiro.parceiro}
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
