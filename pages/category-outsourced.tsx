import React, { useEffect, useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { IoMdAdd, IoIosSearch } from 'react-icons/io';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';

const CatergoyOutsourced = () => {
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
  const [filterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const adicionarCategoriaClick = () => {
    router.push('/add-category-outsourced');
  };

  const columnWidths = {
    '': '30px',
    'CATEGORIA': '355px',
  };

  const columnLabels = {
    '': '',
    'CATEGORIA': 'CATEGORIA',
  };

  const sortRows = (rows, column, order) => {
    return rows.slice().sort((a, b) => {
      const valueA = String(a[column]).toUpperCase();
      const valueB = String(b[column]).toUpperCase();

      return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  };

  const handleSort = (columnName, event) => {
    const isFilterIconClicked = event.target.classList.contains('filter-icon');

    if (!isFilterIconClicked) {
      if (columnName === sortColumn) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortColumn(columnName);
        setSortOrder('asc');
      }
    } else {
      setFilterOpen((prevFilterOpen) => !prevFilterOpen);
    }
  };

  const handleSearchByFilter = (column, value) => {
    setSearchTerm(value);
    setFilterOpen(false);
    setCurrentPage(1);
    fetchData(); // Chame a função fetchData para aplicar o filtro imediatamente
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchByFilter('CATEGORIA', searchTerm);
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
        Object.values(document).some((value) => {
          if (value === null || value === undefined) {
            return false;
          }
          return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
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
      const response = await fetch(`/api/category-outsourced?page=${currentPage}&pageSize=${pageSize}`);
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
      console.error('Erro ao obter as categorias de terceiros:', error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setLoading(true);
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterValue = (column) => {
    const allColumnValues = documents.docs.rows.map((row) => row[column]);
    const uniqueValues = Array.from(new Set(allColumnValues)).filter(Boolean);
    return uniqueValues;
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    // Adiciona um ouvinte de evento de tecla ao nível do documento
    document.addEventListener('keypress', handleKeyPress);

    // Remove o ouvinte de evento quando o componente é desmontado
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleSearch]);

  return (
    <div className='flex'>
      <Sidebar />

      <div className="flex-1" id="Dashboard">
        <div className="bg-blue-500 text-white p-2 text-left w-full">
          <span className='ml-2'>Categorias de Terceiros</span>
        </div>

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
              <div className="text-blue-500 text-md text-center flex-grow">
                <div className="flex items-center justify-center h-full text-4xl">
                  Carregando lista de categorias de Terceiros...
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
                onKeyPress={handleKeyPress}
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
                onClick={adicionarCategoriaClick}
              >
                <IoMdAdd className='text-xl mt-0.5' /> Nova Categoria
              </button>
            </div>

            <div className="flex flex-col h-[550px] overflow-x-scroll overflow-y-auto">
              <div className="flex text-gray-500 bg-white ">
                {Object.keys(columnWidths).map((column) => (
                  <div
                    key={column}
                    className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`}
                    style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                    onClick={(event) => handleSort(column, event)}
                  >
                    {columnLabels[column]}
                    <div className='ml-auto flex'>
                      {column !== '' && (
                        <>
                          {sortColumn === column && (
                            sortOrder === 'asc' ? <span className="text-xl mt-[-3px]">↑</span> : <span className="text-xl mt-[-3px]">↓</span>
                          )}
                          <PiFunnelLight
                            className={`text-xl mt-0.5 filter-icon ${filterOpen ? 'text-blue-500' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSort(column, e);
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filterOpen && (
                <div className={`flex text-gray-500 bg-white`}>
                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '30px' }}></div>
                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer`} style={{ width: '355px' }}>
                    <div className="flex flex-col">
                      {handleFilterValue('CATEGORIA').map((value) => (
                        <div
                          key={value}
                          className="cursor-pointer py-1 px-2 hover:bg-gray-200"
                          onClick={() => handleSearchByFilter('CATEGORIA', value)}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {documents.docs.rows.map((document, index) => (
                <div
                  className={`flex text-gray-700 whitespace-nowrap w-[385px] ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                  key={document.id || Math.random().toString()}
                >
                  {Object.keys(columnWidths).map((column) => (
                    <div
                      key={column}
                      className={`column-cell border border-gray-300 py-2 pl-1`}
                      style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                    >
                      {column === '' ? (
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

        {!documents.success && <p>Não foi possível obter as categorias de Terceiros.</p>}
      </div>
    </div>
  );
};

export default CatergoyOutsourced;
