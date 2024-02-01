import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import fontana from '../public/img/fontana.png';
import logo from '../public/img/logo.png';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.0.224:5051/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {        
        const data = await response.json();
        console.log(response);
        console.log(data);
        localStorage.setItem('role', data.role);
        localStorage.setItem('FontanaUser', username);
        localStorage.setItem('Token', data.token);
        localStorage.setItem('permission', data.permission);
        router.push('/dashboard');

      } else {

        if (response.status === 401) {
          // Primeiro acesso
          setPopupMessage('Esse é seu primeiro acesso. Clique em "Esqueceu a senha?" para obter uma senha válida.');
          setShowModal(true);
        }  
        else if (response.status === 403) {
          // Primeiro acesso
          setPopupMessage('Usuário ou senha inválido.');
          setShowModal(true);
        }  
        else if (response.status === 404) {
          // Primeiro acesso
          setPopupMessage('Usuário sem permissão para acesso.');
          setShowModal(true);
        }  
        else{ 
        console.error('Falha na autenticação');
        setPopupMessage('Usuário ou senha inválido');
        setShowModal(true);
        }
      }
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
    }
  };

  const handleForgotPassword = async () => {
    if (username.trim() === '') {
      setPopupMessage('Por favor, informe o nome de usuário antes de clicar em "Esqueceu a senha?".');
      setShowModal(true);
    } else {
      try {
        const response = await fetch('http://192.168.0.224:5051/api/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          console.log('Solicitação de recuperação de senha enviada com sucesso.');
          router.push(`/recover-password?username=${encodeURIComponent(username)}`);
        }            
        
        else if (response.status === 403) {
          // Usuário não autorizado para recuperar senha
          setPopupMessage('Somente usuários autorizados ao portal gestão de terceiros podem recuperar senha.');
          setShowModal(true);
        }

        else if (response.status === 404) {
          // Usuário não autorizado para recuperar senha
          setPopupMessage('Somente usuários autorizados ao portal gestão de terceiros podem recuperar senha.');
          setShowModal(true);
          console.log("Somente usuários autorizados ao portal gestão de terceiros podem recuperar senha.");
        }
        else if (response.status === 500) {
          // Usuário não autorizado para recuperar senha
          setPopupMessage('Erro ao consultar o banco de dados. Verifique sua conexão ou contate o administrador.');
          setShowModal(true);
        }
        else {
          console.error('Erro ao solicitar recuperação de senha:', response.statusText);
          setPopupMessage('Somente usuários autorizados no portal gestão de terceiros podem recuperar senha.');
          setShowModal(true);
        }
      } catch (error) {
        console.error('Erro durante a solicitação de recuperação de senha:', error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-7/12 h-full flex items-center justify-center">
        <Image src={fontana} alt="ALT_TEXT" className="h-full w-full object-cover" />
      </div>

      <div className="w-full md:w-5/12 p-4 md:p-8 min-h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <Image src={logo} alt="ALT_TEXT" className="w-[50%] md:w-[30%] mb-4" />
          <span className="mb-4 text-xl md:text-2xl mb-8">Portal Gestão de Terceiro</span>

          <form onSubmit={handleLogin} className="flex flex-col w-full md:w-2/3 lg:w-1/2">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border rounded-xl w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border rounded-xl w-full"
              />
            </div>
            <button type="submit" className="bg-blue-950 text-white p-2 rounded-md">
              Entrar
            </button>

            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-row relative">

                  {/* Pseudo-elemento para a barra lateral */}
                  <style>
                    {`
                  .modal-content::before {
                    content: '';
                    background-color: #e53e3e; /* Cor vermelha desejada */
                    width: 4px; /* Largura da barra lateral */
                    height: 100%; /* Altura da barra lateral */
                    position: absolute;
                    top: 0;
                    left: 0;
                  }
                `}
                  </style>

                  {/* Adicione o botão de fechamento estilo "X" */}
                  <button className="absolute top-2 right-2 text-red-500 hover:text-gray-700" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>

                  <div className="text-red-500 text-md text-center flex-grow">
                    {popupMessage}
                  </div>
                </div>
              </div>
            )}

            {/* Adicione o link "Esqueceu a senha?" */}
            <div className="mt-4 text-right text-sm">
              <button
                type="button"
                className="text-blue-500 hover:underline focus:outline-none"
                onClick={handleForgotPassword}
              >
                Esqueceu a senha?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
