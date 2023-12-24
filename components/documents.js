import React from 'react';

const Documents = () => {
    
  return (
    <div className="flex-1" id="Dashboard">
      {/* Barra Superior Azul Fixada no Topo */}
      <div className="bg-blue-500 text-white p-2 text-left mb-4 w-full">
        {/* Conteúdo da Barra Superior, se necessário */}
        <span className='ml-2'>Documentos</span>
      </div>
    </div>
  );
};

export default Documents;
