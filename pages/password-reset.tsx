import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/img/logo.png';
import fontana from '../public/img/fontana.png';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState<string | null>('');
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [modalColor, setModalColor] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#e53e3e'); // Add a state for text color
  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const newToken = new URLSearchParams(window.location.search).get('token');
    setToken(newToken);
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      console.log("As senhas não conferem.");
      setPopupMessage('As senhas não conferem');
      setShowModal(true);
      setModalColor('#e53e3e');
      setTextColor('#e53e3e');
      return;
    }

    try {
      const response = await fetch('/api/validate-newpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
          token: token,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Se a validação for bem-sucedida, você pode redirecionar para uma página de sucesso ou fazer outras ações necessárias
        console.log("Senha redefinida");
        setPopupMessage('Senha redefinida');
        setShowModal(true);
        setModalColor('#3f5470');
        setTextColor('#3f5470');
      } else {
        if (response.status === 400) {
        console.log("Email ou token inválidos. Não é possível redefinir a senha");
        setPopupMessage('Email ou token inválidos. Não é possível redefinir a senha');
        setShowModal(true);
        setModalColor('#e53e3e');
        setTextColor('#e53e3e');
        }
        if (response.status === 500) {
          console.log("Erro ao enviar o email. Verifique sua conexão ou contate o administrador.");
          setPopupMessage('Erro ao contatar o servidor. Verifique sua conexão ou contate o administrador');
          setShowModal(true);
          setModalColor('#e53e3e');
          setTextColor('#e53e3e');
          }
      }
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
    }
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

          <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-2/3 lg:w-1/2">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border rounded-xl w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                Nova Senha:
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 p-2 border rounded-xl w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                Confirmar Senha:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 border rounded-xl w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-950 text-white p-2 rounded-md">
              Redefinir Senha
            </button>
          </form>
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

                {/* Adicione o botão de fechamento estilo "X" */}
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
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
