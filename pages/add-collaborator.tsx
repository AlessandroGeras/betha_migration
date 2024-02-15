import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';

const AddOutsourced = () => {
    const [formData, setFormData] = useState({
        status: 'Pendente',
        observacoes: '',
        cpf: '',
        usuario: '',
        sobrenome: '',
        endereco: '',
        cidade: '',
        email: '',
        telefone: '',
        uf: '',
        principal: '',
        nome_terceiro: '',
        id_usuario: '',
    });

    const [enterprises, setEnterprises] = useState([]);
    const [categoriaOptions, setCategoriaOptions] = useState<{ CATEGORIA: string }[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const router = useRouter();
    const [isTokenVerified, setTokenVerified] = useState(false);
    const [viewAll, setViewAll] = useState(true);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (userRole == 'internal') {
            setViewAll(true);
        }
        else {
            setViewAll(false);
        }        
    }, []);


    const closeModal = () => {
        setShowModal(false);
    };

    const resetForm = () => {
        setFormData({
            status: 'Ativo',
            observacoes: '',
            cpf: '',
            usuario: '',
            sobrenome: '',
            endereco: '',
            cidade: '',
            email: '',
            telefone: '',
            uf: '',
            principal: '',
            nome_terceiro: '',
            id_usuario: '',
        });
    }

    const handleSelectChange = (e) => {
        setFormData({ ...formData, nome_terceiro: e.target.value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cpf') {
            const formattedCPF = value
                .replace(/\D/g, '') // Remove caracteres não numéricos
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formatação para CPF
            setFormData({ ...formData, [name]: formattedCPF });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        if (formData.uf == "" || formData.principal == "") {
            setPopupMessage('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;

        }

        try {
            const token = localStorage.getItem('Token');
            const id = localStorage.getItem('FontanaUser');
            const role = localStorage.getItem('role');

            const response = await fetch('/api/store-collaborator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData, token, id, role
                }),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
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

    const handleSubmitCancel = () => {
        router.push('/collaborators');
    };

    useEffect(() => {
        const fetchCategoriaOptions = async () => {
            try {
                const token = localStorage.getItem('Token');

                if (!token) {
                    // Se o token não estiver presente, redirecione para a página de login
                    console.log("sem token");
                    router.push('/login');
                    return;
                }

                const getAll = true;

                const response = await fetch(`/api/category-collaborators`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, getAll }),
                });

                const data = await response.json();
                if (response.status === 401) {
                    router.push('/login');
                }
                else {
                    setTokenVerified(true);
                    setEnterprises(data.uniqueEnterprises);
                }

                setCategoriaOptions(data.success ? data.docs.rows : []);
            } catch (error) {
                console.error('Erro ao obter opções de categoria:', error);
            }
        };

        fetchCategoriaOptions();
    }, [router]);


    return (
        <div className="flex h-screen">
            {/* Barra lateral */}
            <Sidebar />
            <Head>
                <title>Adicionar Colaboradoe</title>
            </Head>

            {/* Tabela principal */}
            <div className="flex-1 items-center justify-center bg-gray-50">
                <div className="bg-blue-500 text-white p-2 text-left mb-16 w-full">
                    {/* Conteúdo da Barra Superior, se necessário */}
                    <span className="ml-2">Adicionar Colaborador</span>
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
                            <option value="Pendente">Pendente</option>
                        </select>
                    </div>

                    <div className="col-span-4 row-span-2">
                        <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                            Obs. Status
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
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                            CPF <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            placeholder="000.000.000-00"
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            maxLength={11} // Alterado para um número
                            required
                        />
                    </div>

                    {/* Linha 3 */}
                    <div className="col-span-3">
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                            Nome de Contato <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="usuario"
                            id="usuario"
                            required
                            value={formData.usuario}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="col-span-4">
                        <label htmlFor="id_usuario" className="block text-sm font-medium text-gray-700">
                            ID Usuário para identificação no sistema <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="id_usuario"
                            id="id_usuario"
                            value={formData.id_usuario}
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
                            UF <span className="text-red-500">*</span>
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
                    {/* <div className="col-span-3">
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
                    </div>* /}

                   {/* <div className="col-span-4">
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
                    </div> /}





                    {/* Linha 6 (Botão Função) */}
                    <div className="col-span-3">
                        <label htmlFor="principal" className="block text-sm font-medium text-gray-700">
                            Função <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="principal"
                            id="principal"
                            value={formData.principal}
                            onChange={(e) => handleInputChange(e)}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled selected>
                                Selecione uma categoria
                            </option>
                            {categoriaOptions.map((categoria) => (
                                <option key={categoria.CATEGORIA} value={categoria.CATEGORIA}>
                                    {categoria.CATEGORIA}
                                </option>
                            ))}
                        </select>
                    </div>

                    {viewAll && (<div className="col-span-4">
                        <label htmlFor="nomeTerceiro" className="block text-sm font-medium text-gray-700">
                            Nome Terceiro <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="nomeTerceiro"
                            id="nomeTerceiro"
                            value={formData.nome_terceiro}
                            onChange={(e) => handleSelectChange(e)}
                            required
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>
                                Selecione uma empresa
                            </option>
                            {enterprises.map((empresa, index) => (
                                <option key={index} value={empresa}>
                                    {empresa}
                                </option>
                            ))}
                        </select>
                    </div>)}

                    <div className="col-span-2"></div>




                    {/* Linha 7 (Botão Cadastrar) */}
                    <div className="col-span-1"></div>


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
