import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';

const AddOutsourced = () => {
    const [formData, setFormData] = useState({
        id_user: '',
        cnpj: '',
        usuario: '',
        sobrenome: '',
        endereco: '',
        cidade: '',
        email: '',
        telefone: '',
        uf: '',
        password: '',
        confirmPassword: '',
        ID_ADM_GESTAO_TERCEIROS: '',

    });

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const router = useRouter();
    const [isTokenVerified, setTokenVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isButtonEnabled, setButtonEnabled] = useState(true);

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
        const hasMinimumLength = password.length >= 8;

        return {
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            hasMinimumLength,
        };
    };

    const passwordValidation = validatePassword(newPassword);



    const handleEnableButton = (e) => {
        setButtonEnabled(!isButtonEnabled);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const resetForm = () => {
        setFormData({
            id_user: '',
            cnpj: '',
            usuario: '',
            sobrenome: '',
            endereco: '',
            cidade: '',
            email: '',
            telefone: '',
            uf: '',
            password: '',
            confirmPassword: '',
            ID_ADM_GESTAO_TERCEIROS: '',
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cnpj') {
            const formattedcnpj = value
                .replace(/\D/g, '') // Remove caracteres não numéricos
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formatação para cnpj
            setFormData({ ...formData, [name]: formattedcnpj });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        if (formData.uf == "") {
            setPopupMessage('Não foi possível alterar seus dados pessoais. Verifique se os dados estão preenchidos.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        if (!isButtonEnabled) {
            if (!passwordValidation.hasUpperCase) {
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                setPopupMessage('A senha deve conter pelo menos uma letra maiúscula');
                return;
            } else if (!passwordValidation.hasLowerCase) {
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                setPopupMessage('A senha deve conter pelo menos uma letra minúscula');
                return;
            } else if (!passwordValidation.hasNumber) {
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                setPopupMessage('A senha deve conter pelo menos um número');
                return;
            } else if (!passwordValidation.hasSpecialChar) {
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                setPopupMessage('A senha deve conter pelo menos um caractere especial');
                return;
            } else if (!passwordValidation.hasMinimumLength) {
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                setPopupMessage('A senha deve ter no mínimo 8 caracteres');
                return;
            } else if (newPassword !== confirmPassword) {
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                setPopupMessage('As senhas não conferem');
                return;
            }
        }



        try {
            const token = localStorage.getItem('Token');

            const response = await fetch('/api/update-myaccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    password: newPassword,
                    token,
                }),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível alterar seus dados pessoais. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível alterar seus dados pessoas. Verifique se os dados estão preenchidos.');
            }

            resetForm();
            const data = await response.json();
            console.log(data.user);

            setFormData({
                cnpj: data.user.cnpj,
                usuario: data.user.NM_USUARIO,
                sobrenome: data.user.SOBRENOME,
                endereco: data.user.ENDEREÇO,
                cidade: data.user.CIDADE,
                email: data.user.ST_EMAIL,
                telefone: data.user.TELEFONE,
                uf: data.user.UF,
                id_user: data.user.ID_USUARIO,
                ID_ADM_GESTAO_TERCEIROS: data.user.ID_ADM_GESTAO_TERCEIROS,
                password: '', // Default or empty string
                confirmPassword: '', // Default or empty string
            });


            setPopupMessage('Dados pessoais alterados com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');           
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    const handleSubmitCancel = () => {
        router.push('/dashboard');
    };

    useEffect(() => {
        const fetchCategoriaOptions = async () => {
            try {
                const token = localStorage.getItem('Token');
                const nome = localStorage.getItem('FontanaUser');

                if (!token) {
                    // Se o token não estiver presente, redirecione para a página de login
                    console.log("sem token");
                    router.push('/login');
                    return;
                }

                const requestBody = {
                    token: token,
                    nome: nome,
                };

                const response = await fetch('/api/myaccount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                const data = await response.json();
                if (response.status === 401) {
                    router.push('/login');
                }
                else {
                    setTokenVerified(true);
                }

                setFormData({
                    cnpj: data.user.CNPJ,
                    usuario: data.user.NM_USUARIO,
                    sobrenome: data.user.SOBRENOME,
                    endereco: data.user.ENDEREÇO,
                    cidade: data.user.CIDADE,
                    email: data.user.ST_EMAIL,
                    telefone: data.user.TELEFONE,
                    uf: data.user.UF,
                    id_user: data.user.ID_USUARIO,
                    password: '', // Adicione as chaves que estão faltando com valores padrão
                    confirmPassword: '',
                    ID_ADM_GESTAO_TERCEIROS: data.user.ID_ADM_GESTAO_TERCEIROS,
                });
            } catch (error) {
                console.error('Erro ao alterar os dados pessoais:', error);
            }
        };

        fetchCategoriaOptions();
    }, [router]);


    return (
        <div className="flex h-screen">
            {/* Barra lateral */}
            <Sidebar />
            <Head>
                <title>Alterar dados pessoais</title>
            </Head>

            {/* Tabela principal */}
            <div className="flex-1 items-center justify-center bg-gray-50">
                <div className="bg-blue-500 text-white p-2 text-left mb-16 w-full">
                    {/* Conteúdo da Barra Superior, se necessário */}
                    <span className="ml-2">Alterar dados pessoais</span>
                </div>

                <div className="grid grid-cols-7 gap-4 w-3/4 mx-auto">
                    {/* Linha 1 */}

                    {/* Linha 2 */}

                    {/* Linha 3 */}
                    <div className="col-span-4">
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

                    <div className="col-span-3">
                        <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
                            CNPJ
                        </label>
                        <input
                            type="text"
                            name="cnpj"
                            id="cnpj"
                            value={formData.cnpj}
                            onChange={handleInputChange}
                            placeholder="000.000.000-00"
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            maxLength={11}
                            required
                            disabled
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
                    <div className="col-span-3">
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

                    <div className="col-span-4">
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


                    {/* Linha 6 (Senha, Confirmação de Senha) */}
                    {formData.ID_ADM_GESTAO_TERCEIROS == 'S' && (<div className="col-span-2 mt-[22px]">
                        <button
                            type="button"
                            onClick={handleEnableButton}
                            className="bg-green-500 text-white p-2 rounded-md focus:outline-none"
                        >
                            Habilitar troca de senha
                        </button>
                    </div>)}

                    {formData.ID_ADM_GESTAO_TERCEIROS == 'S' && (<div className="col-span-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            disabled={isButtonEnabled}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>)}

                    {formData.ID_ADM_GESTAO_TERCEIROS == 'S' && (<div className="col-span-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isButtonEnabled}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>)}

                    {newPassword && (<div className="text-sm mt-1 col-span-3"></div>)}

                    {newPassword && (
                        <div className="text-sm mt-1 col-span-2">
                            <span className={passwordValidation.hasUpperCase ? 'text-blue-500' : 'text-red-500'}>
                                {passwordValidation.hasUpperCase ? '✔' : 'X'} Uma letra maiúscula
                            </span>
                            <br />
                            <span className={passwordValidation.hasLowerCase ? 'text-blue-500' : 'text-red-500'}>
                                {passwordValidation.hasLowerCase ? '✔' : 'X'} Uma letra minúscula
                            </span>
                            <br />
                            <span className={passwordValidation.hasNumber ? 'text-blue-500' : 'text-red-500'}>
                                {passwordValidation.hasNumber ? '✔' : 'X'} Um número
                            </span>
                            <br />
                            <span className={passwordValidation.hasSpecialChar ? 'text-blue-500' : 'text-red-500'}>
                                {passwordValidation.hasSpecialChar ? '✔' : 'X'} Um caractere especial
                            </span>
                            <br />
                            <span className={passwordValidation.hasMinimumLength ? 'text-blue-500' : 'text-red-500'}>
                                {passwordValidation.hasMinimumLength ? '✔' : 'X'} Pelo menos 8 caracteres
                            </span>
                        </div>
                    )}

                    {newPassword && (<div className="text-sm mt-1 col-span-2"></div>)}


                    {/* Linha 7 (Botão Habilitar) */}
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
                            Alterar Cadastro
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
