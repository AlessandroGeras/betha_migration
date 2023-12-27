import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/img/logo.png';
import fontana from '../public/img/fontana.png';
import Link from 'next/link';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState<string | null>('');
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [modalColor, setModalColor] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#e53e3e');
  const [showHome, setShowHome] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const newToken = new URLSearchParams(window.location.search).get('token');
    setToken(newToken);
  }, []);

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

  const resetForm = () => {
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordValidation.hasUpperCase) {
      setShowModal(true);
      setModalColor('#e53e3e');
      setTextColor('#e53e3e');
      setPopupMessage('A senha deve conter pelo menos uma letra maiúscula');
    } else if (!passwordValidation.hasLowerCase) {
      setShowModal(true);
      setModalColor('#e53e3e');
      setTextColor('#e53e3e');
      setPopupMessage('A senha deve conter pelo menos uma letra minúscula');
    } else if (!passwordValidation.hasNumber) {
      setShowModal(true);
      setModalColor('#e53e3e');
      setTextColor('#e53e3e');
      setPopupMessage('A senha deve conter pelo menos um número');
    } else if (!passwordValidation.hasSpecialChar) {
      setShowModal(true);
      setModalColor('#e53e3e');
      setTextColor('#e53e3e');
      setPopupMessage('A senha deve conter pelo menos um caractere especial');
    } else if (!passwordValidation.hasMinimumLength) {
      setShowModal(true);
      setModalColor('#e53e3e');
      setTextColor('#e53e3e');
      setPopupMessage('A senha deve ter no mínimo 8 caracteres');
    } else if (newPassword !== confirmPassword) {
      setShowModal(true);
      setModalColor('#e53e3e');
      setTextColor('#e53e3e');
      setPopupMessage('As senhas não conferem');
    } else {
      try {
        // Validação no lado do servidor (API)
        const validateResponse = await fetch('/api/store-newpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, token, newPassword }),
        });

        if (validateResponse.ok) {
          setShowModal(true);
          setModalColor('#3f5470');
          setTextColor('#3f5470');
          setPopupMessage('Senha redefinida');

          setShowHome(!showHome);
        }
        else {

          if (validateResponse.status === 400) {
            // Lógica para lidar com falha na redefinição da senha
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            setPopupMessage('Email ou token inválidos. Não é possível redefinir a senha');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar email e token:', error);
      }
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
              {newPassword && (
                <div className="text-sm mt-1">
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
            <button
              type="submit"
              className={`bg-blue-950 text-white p-2 rounded-md`}>
              Redefinir Senha
            </button>
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
                    .close-button {
                      color: ${textColor};
                    }
                    .close-button.success {
                      color: #3f5470; /* cor azul para sucesso */
                    }
                  `}
                </style>
                <button
                  className={`absolute top-2 right-2 close-button ${textColor === '#e53e3e' ? 'text-red-500' : ''} ${textColor === '#3f5470' ? 'success' : ''}`}
                  onClick={closeModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <div className="flex flex-col space-y-4 text-md text-center flex-grow" style={{ color: textColor }}>
                  <div className={`text-md text-center flex-grow`} style={{ color: textColor }}>
                    {popupMessage}
                  </div>
                  {showHome && (
                    <div className="mx-auto">
                      <Link href="/"> {/* Coloque o caminho desejado para a página principal dentro de href */}
                        <a className="bg-blue-950 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                          Clique aqui para fazer login
                        </a>
                      </Link>
                    </div>
                  )}
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
