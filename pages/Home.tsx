// pages/index.js
import { useState } from 'react';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
        Abrir Modal
      </button>

      {modalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2">
            <p>Este é um modal simples criado com Tailwind CSS.</p>
            <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
              Fechar Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
