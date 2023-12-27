import React, { useEffect, useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { IoMdAdd, IoIosSearch } from 'react-icons/io';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';


const Outsourced = () => {
  const [documents, setDocuments] = useState({
    success: false,
    docs: { rows: [], count: 0, outsourcedCount: 0 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('NM_USUARIO');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();

  const adicionarTerceirosClick = () => {
    router.push('/add-outsourced');
  }

  const columnWidths = {
    '': '30px', // Nova coluna vazia para a lupa
    'STATUS': '100px',
    'NOME_TERCEIRO': '300px',
    'CNPJ': '200px',
    'ENDEREÇO': '355px',
    'CIDADE': '320px',
    'UF': '60px',
    'TELEFONE': '140px',
    'NM_USUARIO': '350px',
    'ST_EMAIL': '350px',
  };

  const columnLabels = {
    '': '', // Cabeçalho vazio para a nova coluna
    'STATUS': 'STATUS',
    'NOME_TERCEIRO': 'NOME_TERCEIRO',
    'CNPJ': 'CNPJ',
    'ENDEREÇO': 'ENDEREÇO',
    'CIDADE': 'CIDADE',
    'UF': 'UF',
    'TELEFONE': 'TELEFONE',
    'NM_USUARIO': 'USUARIO',
    'ST_EMAIL': 'EMAIL',
  };

  const sortRows = (rows, column, order) => {
    return rows.slice().sort((a, b) => {
      const valueA = String(a[column]).toUpperCase(); // Converta para string
      const valueB = String(b[column]).toUpperCase(); // Converta para string

      return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  };

  const handleSort = (columnName) => {
    if (columnName === sortColumn) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);

    if (searchTerm === '') {
      fetchData();
    } else {
      const filteredRows = documents.docs.rows.filter((document) =>
        Object.values(document).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);

      setDocuments({
        success: true,
        docs: {
          rows: sortedRows,
          count: sortedRows.length,
          outsourcedCount: documents.docs.outsourcedCount,
        },
      });
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/outsourced?page=${currentPage}&pageSize=${pageSize}`);
      const data = await response.json();
      const sortedRows = sortRows(data.docs.rows, sortColumn, sortOrder);

      setDocuments({
        success: data.success,
        docs: {
          rows: sortedRows,
          count: data.docs.count,
          outsourcedCount: data.docs.outsourcedCount,
        },
      });
    } catch (error) {
      console.error('Erro ao obter documentos:', error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setLoading(true); // Ativa o modal apenas na primeira carga
    }
    fetchData();
  }, [currentPage, pageSize, sortColumn, sortOrder]);


  const totalPages = Math.ceil((documents.docs && documents.docs.count) / pageSize) || 1;

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className='flex'>
      <Sidebar />

      <div className="flex-1" id="Dashboard">
        <div className="bg-blue-500 text-white p-2 text-left w-full">
          <span className='ml-2'>Terceiros</span>
        </div>

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
              {/* Pseudo-elemento para a barra lateral */}
              <div className="text-blue-500 text-md text-center flex-grow">
                <div className="flex items-center justify-center h-full text-4xl">
                  Carregando lista de Terceiros...
                </div>
              </div>
            </div>
          </div>
        )}

        {documents.success && (
          <div className=''>
            <div className="flex items-center my-4">
              <input
                placeholder="Pesquisa rápida"
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="border border-gray-300 px-2 py-1"
              />
              <button
                onClick={handleSearch}
                className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
              >
                Pesquisar
              </button>
              <button
                onClick={handleClearSearch}
                className="border border-gray-300 px-2 py-1 ml-2 rounded bg-red-500 text-white"
              >
                Limpar Pesquisa
              </button>
              <button
                className="border border-gray-300 px-2 py-1 rounded bg-blue-500 text-white ml-auto flex"
                onClick={adicionarTerceirosClick}
              >
                <IoMdAdd className='text-xl mt-0.5' /> Novo Terceiro
              </button>
            </div>
            <div className="flex flex-col w-[1450px] h-[550px] overflow-x-scroll overflow-y-auto">


              <div className="flex text-gray-500 bg-white w-[2000px]">
                {Object.keys(columnWidths).map((column) => (
                  <div
                    key={column}
                    className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`}
                    style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                    onClick={() => handleSort(column)}
                  >
                    {columnLabels[column]}
                    <div className='ml-auto flex'>
                      {column !== '' && ( // Adiciona a condição para excluir o ícone na coluna vazia
                        <>
                          {sortColumn === column && (
                            sortOrder === 'asc' ? <span className="text-xl mt-[-3px]">↑</span> : <span className="text-xl mt-[-3px]">↓</span>
                          )}
                          <PiFunnelLight className='text-xl mt-0.5' />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {documents.docs.rows.map((document, index) => (
                <div
                  className={`flex text-gray-700 whitespace-nowrap w-[2000px] ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                  key={document.id || Math.random().toString()}
                >
                  {Object.keys(columnWidths).map((column) => (
                    <div
                      key={column}
                      className={`column-cell border border-gray-300 py-2 pl-1`}
                      style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                    >
                      {column === '' ? ( // Adiciona a condição para exibir a lupa na coluna vazia
                        <IoIosSearch className='text-xl mt-0.5' />
                      ) : (
                        document[column]
                      )}
                    </div>
                  ))}
                </div>
              ))}


            </div>
          </div>
        )}


        <div className="flex mt-4 justify-between border-t border-gray-300 items-center mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`border border-gray-200 px-4 py-2 rounded bg-blue-500 text-white ${currentPage === 1 ? 'invisible' : ''}`}
          >
            Página Anterior
          </button>
          <div className="flex items-center">
            <span className="mr-2">Registros por página:</span>
            {[10, 25, 50, 100].map((size) => (
              <button
                key={size}
                className={`px-2 py-1 border ${size === pageSize ? 'bg-blue-500 text-white' : ''
                  }`}
                onClick={() => handlePageSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <span className=''>Página {currentPage}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`border border-gray-200 px-4 py-2 rounded bg-blue-500 text-white ${currentPage === totalPages ? 'invisible' : ''}`}
          >
            Próxima Página
          </button>
        </div>

        {!documents.success && <p>Não foi possível obter os usuários terceirizados.</p>}
      </div>
    </div>
  );
};

export default Outsourced;
