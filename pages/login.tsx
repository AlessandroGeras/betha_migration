import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import fontana from '../public/img/fontana.png';
import logo from '../public/img/logo.png';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.0.224:5051/api/teste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {        
        const data = await response.json();
        setPopupMessage(data.report); // Exibe o relatório de teste do Oracle Instant Client
        setShowModal(true);
      } else {
        console.error('Falha no teste do Oracle Instant Client');
        setPopupMessage('Erro ao testar o Oracle Instant Client. Por favor, tente novamente mais tarde.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
      setPopupMessage('Erro durante a solicitação. Por favor, tente novamente mais tarde.');
      setShowModal(true);
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
            <button type="submit" className="bg-blue-950 text-white p-2 rounded-md">
              Testar Oracle Instant Client
            </button>
          </form>
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-row relative">

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
};

export default Login;
