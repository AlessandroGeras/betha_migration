// pages/recover-password.js
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/img/logo.png';
import fontana from '../public/img/fontana.png';
import { useState } from 'react';

const RecoverPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

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
        console.log('E-mail enviado com sucesso!');
      } else {
        // Lógica para lidar com falhas no envio do e-mail
        console.error('Falha ao enviar o e-mail.');
      }
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
    }
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
