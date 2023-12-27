import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';

const AddOutsourced = () => {
  const [formData, setFormData] = useState({
    status: 'Ativo',
    observacoes: '',
    cnpj: '',
    nomeTerceiro: '',
    usuario: '',
    sobrenome: '',
    endereco: '',
    cidade: '',
    email: '',
    telefone: '',
    uf: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [modalColor, setModalColor] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#e53e3e');
  const router = useRouter();

  const closeModal = () => {
    // Limpar os valores do formulário
    setFormData({
      status: 'Ativo',
      observacoes: '',
      cnpj: '',
      nomeTerceiro: '',
      usuario: '',
      sobrenome: '',
      endereco: '',
      cidade: '',
      email: '',
      telefone: '',
      uf: '',
    });

    // Fechar o modal
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Formatar o CNPJ enquanto o usuário digita
    if (name === 'cnpj') {
      const formattedCNPJ = value
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

      setFormData({ ...formData, [name]: formattedCNPJ });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitSucess = async (e) => {
    e.preventDefault();

    try {
      // Enviar dados para a API usando fetch
      const response = await fetch('/api/store-outsourced', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setPopupMessage('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
        setShowModal(true);
        setModalColor('#e53e3e');
        setTextColor('#e53e3e');
        throw new Error('Não foi possível criar o usuário. Verifique se os dados estão preenchidos.');
      }

      const responseData = await response.json();

      // Lógica adicional após o envio bem-sucedido, se necessário
      console.log('Usuário criado com sucesso!', responseData);
      setPopupMessage('Usuário criado com sucesso!');
      setShowModal(true);
      setModalColor('#3f5470');
      setTextColor('#3f5470');
    } catch (error) {
      console.error('Erro ao contatar o servidor:', error);
    }
  };

  const handleSubmitCancel = () => {
    router.push('/outsourced');
}   


  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <Sidebar />

      {/* Tabela principal */}
      <div className="flex-1 items-center justify-center bg-gray-50">
        <div className="bg-blue-500 text-white p-2 text-left mb-28 w-full">
          {/* Conteúdo da Barra Superior, se necessário */}
          <span className="ml-2">Adicionar Terceiro</span>
        </div>
        <div className="grid grid-cols-7 gap-4 w-3/4 mx-auto">
          {/* Linha 1 */}
          <div className="col-span-3">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <div className="col-span-4 row-span-2">
            <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
              Obs. Status
            </label>
            <textarea
              name="observacoes"
              id="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 pb-[20px]"
            />
          </div>

          {/* Linha 2 */}
          <div className="col-span-3">
            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
              CNPJ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cnpj"
              id="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
              placeholder="00.000.000/0000-00"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              maxLength="18"
              required
            />
          </div>

          {/* Linha 3 */}
          <div className="col-span-3">
            <label htmlFor="nomeTerceiro" className="block text-sm font-medium text-gray-700">
              Nome Terceiro <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nomeTerceiro"
              id="nomeTerceiro"
              value={formData.nomeTerceiro}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="col-span-2">
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

          <div className="col-span-2">
            <label htmlFor="sobrenome" className="block text-sm font-medium text-gray-700">
              Sobrenome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sobrenome"
              id="sobrenome"
              required
              value={formData.sobrenome}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
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
              UF
            </label>
            <input
              type="text"
              name="uf"
              id="uf"
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

          {/* Linha 6 (Botão Cadastrar) */}
          <div className="col-span-5 flex justify-center">
            <button
              type="submit"
              onClick={handleSubmitCancel}
              className="bg-red-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmitSucess}
              className="bg-blue-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              Salvar
            </button>
          </div>
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
