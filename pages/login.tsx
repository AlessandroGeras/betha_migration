import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';


export default function Login() {

  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const [loginScreenVisible, setLoginScreenVisible] = useState(true);
  const [loginScreenRecoverVisible, setLoginScreenRecoverVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleForgotPassword = () => {
    setLoginScreenVisible(false);
    setLoginScreenRecoverVisible(true);
  }

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      else {
        //console.log(data.usuario.username);
        router.push('/dashboard');
      }
    } catch (error: any) {
      // Trate o erro, por exemplo, exiba uma mensagem de erro para o usuário
      console.error('Erro ao fazer login:', error.message);
      setPopupMessage(error.message);
      setShowModal(true);
    }
  }


  const handleRecoverPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/send-mail-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      else {
        console.log(data);
      }
    } catch (error: any) {
      // Trate o erro, por exemplo, exiba uma mensagem de erro para o usuário
      console.error('Erro ao enviar e-mail:', error.message);
      setPopupMessage(error.message);
      setShowModal(true);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">

      {loginScreenVisible && (
        <div id='LoginScreen'>
          <div>
            <img src="\img\logo.png" alt="Descrição da imagem" className='w-[150px] mx-auto' />
          </div>
          <div className="flex flex-col justify-center items-center font-poppins">
            <div className="w-80 bg-gray-300/[.06] rounded-3xl shadow-[0px_8px_8px_0px_rgba(0,0,0,0.25)] p-4">
              <h1 className="text-sm font-bold mb-6 text-orange-600 text-center mt-2">Área do Cliente</h1>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700"></label>
                  <input type="text" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700"></label>
                  <input type="password" id="password" name="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none" />
                </div>
                <div className="flex flex-col">
                  <button type="button" className="text-xs font-bold text-gray-800 hover:underline text-center" onClick={handleForgotPassword}>Esqueci a senha</button>
                  <button type="submit" className="w-40 bg-orange-700 text-white px-4 py-2 rounded-md mt-2 hover:bg-orange-600 focus:outline-none mx-auto" onClick={handleLogin}>Entrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {loginScreenRecoverVisible && (
        <div id='LoginScreenRecover'>
          <div>
            <img src="\img\logo.png" alt="Descrição da imagem" className='w-[150px] mx-auto' />
          </div>
          <div className="flex flex-col justify-center items-center font-poppins">
            <div className="w-80 bg-gray-300/[.06] rounded-3xl shadow-[0px_8px_8px_0px_rgba(0,0,0,0.25)] p-4">
              <h1 className="text-sm font-bold mb-6 text-orange-600 text-center mt-2">Área do Cliente</h1>
              <form className="space-y-4">
                <div className='text-center text-[14px] leading-none'>
                  <span>Informe seu email e você receberá instruções para a recuperação da sua senha</span>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700"></label>
                  <input type="text" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col">
                  <button type="button" className="text-xs font-bold text-gray-800 hover:underline text-center invisible">Esqueci a senha</button>
                  <button type="submit" className="w-40 bg-orange-700 text-white px-4 py-2 rounded-md mt-2 hover:bg-orange-600 focus:outline-none focus:bg-blue-600 mx-auto" onClick={handleRecoverPassword}>Recuperar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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

    </div>
  );
}
