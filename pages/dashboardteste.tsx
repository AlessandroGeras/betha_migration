import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [documents, setDocuments] = useState({ success: false, docs: { rows: [], count: 0 } });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Defina o tamanho da página aqui

  useEffect(() => {
    // Função assíncrona para fazer a chamada API
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/documents?page=${currentPage}&pageSize=${pageSize}`);
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Erro ao obter documentos:', error);
      }
    };

    // Chamar a função de busca de dados
    fetchData();
  }, [currentPage]); // Atualizar quando a página atual mudar

  const { success, docs } = documents;

  // Calcular o número total de páginas
  const totalPages = Math.ceil(docs.count / pageSize);

  // Função para ir para a página anterior
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Função para ir para a próxima página
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex-1" id="Dashboard">
      {/* Barra Superior Azul Fixada no Topo */}
      <div className="bg-blue-500 text-white p-2 text-left mb-4 w-full">
        {/* Conteúdo da Barra Superior, se necessário */}
        <span className='ml-2'>Dashboard Teste</span>
      </div>

      <div className="flex items-center justify-center h-5/6 pt-28 px-20">
        <div className="container mx-auto">
          {/* Área de Documentos a Vencer */}
          <div className='items-center '>
            {/* Mapeando e exibindo todos os documentos */}
            {success ? (
              docs.rows.map((document, index) => (
                <div key={index} className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                  <div className="mt-[-15px]">{`Documento #${(currentPage - 1) * pageSize + index + 1}`}</div>
                  <div className="mt-2 text-gray-600">{`Status: ${document.STATUS}`}</div>
                  <div className="mt-2 text-gray-600">{`Tipo: ${document.TIPO_DOCUMENTO}`}</div>
                  <div className="mt-2 text-gray-600">{`Terceiro: ${document.TERCEIRO}`}</div>
                  <div className="mt-2 text-gray-600">{`Colaborador: ${document.COLABORADOR}`}</div>
                  {/* Adicione mais campos conforme necessário */}
                </div>
              ))
            ) : (
              // Exibir uma mensagem de erro se a solicitação falhar
              <div className="text-red-500">Erro ao obter documentos. Verifique a API.</div>
            )}

            {/* Adicione botões de paginação */}
            {success && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Anterior
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
                >
                  Próxima
                </button>
              </div>
            )}
          </div>          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
