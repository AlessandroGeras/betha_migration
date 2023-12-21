import React from 'react';

const Dashboard = () => {
    
  return (
    <div className="flex-1" id="Dashboard">
      {/* Barra Superior Azul Fixada no Topo */}
      <div className="bg-blue-500 text-white p-2 text-left mb-4 w-full">
        {/* Conteúdo da Barra Superior, se necessário */}
        <span className='ml-2'>Página inicial</span>
      </div>

      <div className="flex items-center justify-center h-5/6 pt-28 px-20">
        <div className="container mx-auto">
          {/* Área de Documentos a Vencer */}
          <div className='items-center '>
            <div className="flex justify-center mt-[-40px] mb-24 px-26">
              {/* Três Divs Centralizadas Lado a Lado */}
              <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                <div className="mt-[-15px]">Quantidade de documentos ativos</div>
                <div className="mt-2 text-4xl text-gray-600">41</div>
              </div>
              <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                <div className="mt-[-15px]">Quantidade de terceiros ativos</div>
                <div className="mt-2 text-4xl text-gray-600">34</div>
              </div>
              <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                <div className="mt-[-15px]">Quantidade de colaboradores ativos</div>
                <div className="mt-2 text-4xl text-gray-600">647</div>
              </div>
            </div>

            <div className="flex justify-center px-32 relative top-[-30px]">
              {/* Duas Divs Centralizadas Lado a Lado */}
              <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                <div className="mt-[-15px] text-2xl text-gray-600">Documentos a vencer</div>
                <div className="mt-2 text-gray-600 text-sm">Documentos com 30 dias ou menos da data de vencimento</div>
                <div className='flex justify-center'>
                  <div className='px-10'></div>
                  <div className="mt-2 text-gray-600 text-5xl bg-yellow-500 px-4 py-2 text-white">127</div>
                  <div className='px-10'></div>
                </div>
                <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
              </div>
              <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                <div className="mt-[-15px] text-2xl text-gray-600">Documentos vencidos</div>
                <div className="mt-2 text-gray-600 text-sm">Documentos com data inferior ao dia atual</div>
                <div className='flex justify-center'>
                  <div className='px-10'></div>
                  <div className="mt-2 text-gray-600 text-5xl bg-red-700 px-[50px] py-2 text-white">3</div>
                  <div className='px-10'></div>
                </div>
                <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
              </div>
            </div>

            <div className="flex justify-center px-32 relative top-[-10px]">
              {/* Duas Divs Centralizadas Lado a Lado */}
              <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                <div className="mt-[-15px] text-2xl text-gray-600">Documentos faltantes</div>
                <div className="mt-2 text-gray-600 text-sm">Documentos solicitados e não enviados</div>
                <div className='flex justify-center'>
                  <div className='px-10'></div>
                  <div className="mt-2 text-gray-600 text-5xl bg-yellow-500 px-8 py-2 text-white">10</div>
                  <div className='px-10'></div>
                </div>
                <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
              </div>
              <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                <div className="mt-[-15px] text-2xl text-gray-600">Documentos à analisar</div>
                <div className="mt-2 text-gray-600 text-sm">Documentos pendentes de análise</div>
                <div className='flex justify-center'>
                  <div className='px-10'></div>
                  <div className="mt-2 text-gray-600 text-5xl bg-yellow-500 px-[50px] py-2 text-white">3</div>
                  <div className='px-10'></div>
                </div>
                <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
