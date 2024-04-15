import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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

  /* const resetForm = () => {
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
  }; */

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
        const response = await fetch('/api/store-newpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, token, newPassword }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }
        else {
          setShowModal(true);
          setModalColor('#3f5470');
          setTextColor('#3f5470');
          setPopupMessage('Senha redefinida');

          setShowHome(!showHome);
        }
      }
      catch (error: any) {
        // Trate o erro, por exemplo, exiba uma mensagem de erro para o usuário
        console.error('Erro ao fazer login:', error.message);
        setPopupMessage(error.message);
        setShowModal(true);
        setModalColor('#e53e3e');
        setTextColor('#e53e3e');
      }

    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <div>
        <img src="\img\logo.png" alt="Descrição da imagem" className='w-[150px] mx-auto' />
      </div>
      <div className="flex flex-col justify-center items-center font-poppins">
        <div className="w-80 bg-gray-300/[.06] rounded-3xl shadow-[0px_8px_8px_0px_rgba(0,0,0,0.25)] p-4">
          <h1 className="text-sm font-bold mb-6 text-orange-600 text-center mt-2">Área do Cliente</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700"></label>
              <input type="text" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700"></label>
              <input type="password" id="password" name="password" placeholder="Senha" onChange={(e) => setNewPassword(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
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
            <div>
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-700"></label>
              <input type="password" id="new_password" name="new_password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nova Senha" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
            <div className="flex flex-col">
              <button type="button" className="hidden text-xs font-bold text-gray-800 hover:underline text-center" >Esqueci a senha</button>
              <button type="submit" className="w-40 bg-orange-700 text-white px-4 py-2 rounded-md mt-2 hover:bg-orange-600 focus:outline-none mx-auto">Redefinir senha</button>
            </div>
          </form>
        </div>
      </div>

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
  );
};

export default PasswordResetForm;
