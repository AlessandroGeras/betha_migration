// components/PasswordResetForm.js
import { useState } from 'react';
import Image from 'next/image';
import logo from '../public/img/logo.png';
import fontana from '../public/img/fontana.png';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Adicione a lógica para enviar os dados para o servidor e processar a redefinição de senha
    console.log('Email:', email);
    console.log('Nova Senha:', newPassword);
    console.log('Confirmar Senha:', confirmPassword);

    // Adicione a lógica de chamada API ou roteamento necessário para processar a recuperação de senha
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-7/12 h-full flex items-center justify-center">
        {/* Imagem grande à esquerda */}
        <Image src={fontana} alt="ALT_TEXT" className="h-full w-full object-cover" />
      </div>

      <div className="w-full md:w-5/12 p-4 md:p-8 min-h-screen">
        {/* Conteúdo à direita */}
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
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
