import React from 'react';

const Dashboard = ({ activeDocumentsCount, activeDueDateCount,activePastDueDateCount,missingDocumentsCount,analiseDocumentsCount,employeesCount,outsourcedCount  }) => {

  const backgroundClass = activePastDueDateCount > 0 ? 'bg-red-500' : 'bg-green-500';

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
                <div className="mt-2 text-4xl text-gray-600">{activeDocumentsCount}</div>
              </div>
              <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                <div className="mt-[-15px]">Quantidade de terceiros ativos</div>
                <div className="mt-2 text-4xl text-gray-600">{outsourcedCount}</div>
              </div>
              <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                <div className="mt-[-15px]">Quantidade de colaboradores ativos</div>
                <div className="mt-2 text-4xl text-gray-600">{employeesCount}</div>
              </div>
            </div>

            <div className="flex justify-center px-32 relative top-[-30px]">
              {/* Duas Divs Centralizadas Lado a Lado */}
              <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                <div className="mt-[-15px] text-2xl text-gray-600">Documentos a vencer</div>
                <div className="mt-2 text-gray-600 text-sm">Documentos com 30 dias ou menos da data de vencimento</div>
                <div className='mt-2 flex justify-center bg-yellow-500 mx-auto w-[115px]'>
                  <div className="text-gray-600 text-5xl text-white py-2">{activeDueDateCount}</div>
                </div>
                <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
              </div>
              <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                <div className="mt-[-15px] text-2xl text-gray-600">Documentos vencidos</div>
                <div className="mt-2 text-gray-600 text-sm">Documentos com data inferior ao dia atual</div>
                <div className={`mt-2 flex justify-center mx-auto w-[115px] ${backgroundClass}`}>
                  <div className="text-gray-600 text-5xl text-white py-2">{activePastDueDateCount}</div>
                </div>
                <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
              </div>            
            </div>
            <div className="flex justify-center px-32 relative top-[-10px]">
              {/* Duas Divs Centralizadas Lado a Lado */}              
              <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                <div className="mt-[-15px] text-2xl text-gray-600">Documentos faltantes</div>
                <div className="mt-2 text-gray-600 text-sm">Documentos solicitados e não enviados</div>
                <div className="mt-2 flex justify-center mx-auto w-[115px] bg-yellow-500">
                  <div className="text-gray-600 text-5xl text-white py-2">{missingDocumentsCount}</div>
                </div>
                <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
              </div>
              <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                <div className="mt-[-15px] text-2xl text-gray-600">Documentos à analisar</div>
                <div className="mt-2 text-gray-600 text-sm">Documentos pendentes de análise</div>
                <div className="mt-2 flex justify-center mx-auto w-[115px] bg-yellow-500">
                  <div className="text-gray-600 text-5xl text-white py-2">{analiseDocumentsCount}</div>
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
