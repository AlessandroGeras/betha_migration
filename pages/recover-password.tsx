// pages/recover-password.js
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/img/logo.png';
import fontana from '../public/img/fontana.png';
import { useState } from 'react';

const RecoverPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#e53e3e'); // Add a state for text color

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Adicione lógica para enviar o e-mail para a rota send-mail
    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Lógica para lidar com o sucesso do envio do e-mail
        setModalColor('#3f5470');
        setTextColor('#3f5470');
        setModalMessage('Email Enviado para '+email);
        setShowModal(true);
        console.log('E-mail enviado para ');
      } else {
        console.error('Falha ao enviar o e-mail.');

        if (response.status === 404) {
          // Show modal for 500 status
          setModalColor('#e53e3e');
          setTextColor('#e53e3e');
          setModalMessage('Email não encontrado.');
          setShowModal(true);
        }

        if (response.status === 500) {
          // Show modal for 500 status
          setModalColor('#e53e3e');
          setTextColor('#e53e3e');
          setModalMessage('Erro ao enviar o email. Verifique sua conexão ou contate o administrador');
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Imagem grande à esquerda */}
      <div className="w-full md:w-7/12 h-full flex items-center justify-center">
        <Image src={fontana} alt="ALT_TEXT" className="h-full w-full object-cover" />
      </div>

      {/* Conteúdo à direita */}
      <div className="w-full md:w-5/12 p-4 md:p-8 min-h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <Image src={logo} alt="ALT_TEXT" className="w-[50%] md:w-[30%] mb-4" />
          <span className="mb-4 text-xl md:text-2xl mb-8">Portal Gestão de Terceiro</span>
          <span className="mb-4 text-xl md:text-sm mb-8 px-24 text-center">
            Informe seu e-mail e você receberá instruções para recuperação de sua senha
          </span>

          <form
            className="flex flex-col w-full md:w-2/3 lg:w-1/2"
            onSubmit={handleSubmit} // Adicionando o manipulador de envio do formulário
          >
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 text-center">
                Seu Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                className="mt-1 p-2 border rounded-xl w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="bg-blue-950 text-white p-2 rounded-xl">
              Recuperar
            </button>

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

                  <button className="absolute top-2 right-2 text-red-500 hover:text-gray-700" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>

                  <div className={`text-md text-center flex-grow`} style={{ color: textColor }}>
                    {popupMessage}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
