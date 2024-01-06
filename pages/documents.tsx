import React, { useEffect, useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { IoMdAdd, IoIosSearch } from 'react-icons/io';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import { format } from 'date-fns';

const Documents = () => {
  const [originalData, setOriginalData] = useState([]);
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState('');
  const router = useRouter();
  const [appliedFilterValue, setAppliedFilterValue] = useState('');



  const adicionarCategoriaClick = () => {
    router.push('/add-category-outsourced');
  };

  const columnWidths = {
    '': '30px',
    'STATUS': '200px',
    'TIPO_DOCUMENTO': '300px',
    'TERCEIRO': '350px',
    'COLABORADOR': '300px',
    'VENCIMENTO': '260px',
  };

  const columnLabels = {
    '': '',
    'STATUS': 'STATUS',
    'TIPO_DOCUMENTO': 'TIPO_DOCUMENTO',
    'TERCEIRO': 'TERCEIRO',
    'COLABORADOR': 'COLABORADOR',
    'VENCIMENTO': 'VENCIMENTO',
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

      const sortedRows = sortRows(documents.docs.rows, columnName, sortOrder);

      setDocuments({
        success: true,
        docs: {
          rows: sortedRows,
          count: sortedRows.length,
          outsourcedCount: documents.docs.outsourcedCount,
        },
      });
    } else {
      setFilterOpen((prevFilterOpen) => !prevFilterOpen);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/documents?page=${currentPage}&pageSize=${pageSize}`);
      const data = await response.json();

      // Se houver um filtro aplicado, filtre os dados usando o filtro
      const filteredRows = Object.keys(appliedFilterValue).reduce((filteredData, column) => {
        const filterValue = appliedFilterValue[column];
        return filteredData.filter((document) =>
          document[column].toString().toLowerCase().includes(filterValue.toLowerCase())
        );
      }, data.docs.rows);

      const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);

      // Armazene os dados originais
      setOriginalData(data.docs.rows);

      setDocuments({
        success: data.success,
        docs: {
          rows: sortedRows,
          count: sortedRows.length,
          outsourcedCount: data.docs.outsourcedCount,
        },
      });
    } catch (error) {
      console.error('Erro ao obter as categorias de terceiros:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("useEffect1");
    fetchData();
  }, []);

  /*   useEffect(() => {
      console.log("useEffect1");
      fetchData();
    }, [sortColumn, sortOrder]); */


  const handleSearchByFilter = async (column, value) => {
    console.log("filter");
    setFilterOpen(false);
    setCurrentPage(1);

    const availableValues = handleFilterValue(column);
    console.log(value);
    console.log(availableValues);
    if (value == "") {
      value = 'TODOS';
    }

    if (!availableValues.includes(value)) {
      value = 'TODOS';
    }

    // Verificar se o valor clicado está entre os valores disponíveis
    if (availableValues.includes(value) || value === 'TODOS') {
      console.log("If1");
      setAppliedFilterValue((prevFilters) => {
        const updatedFilters = { ...prevFilters, [column]: value };
        console.log('Novos Filtros:', updatedFilters); // Adicione esta linha
        return updatedFilters;
      })
    }

    else {
      console.log("Else1");
      setAppliedFilterValue((prevFilters) => {
        const updatedFilters = { ...prevFilters, [column]: '' };
        return updatedFilters;
      })



      try {
        //setLoading(true);

        const response = await fetch(`/api/documents?page=${currentPage}&pageSize=${pageSize}`);
        const data = await response.json();

        // Se houver um filtro aplicado, filtre os dados usando o filtro
        const filteredRows = Object.keys(appliedFilterValue).reduce((filteredData, filterColumn) => {
          const filterColumnValue = appliedFilterValue[filterColumn];
          return filteredData.filter((document) =>
            document[filterColumn].toString().toLowerCase().includes(filterColumnValue.toLowerCase())
          );
        }, data.docs.rows);

        const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);

        // Armazene os dados originais
        setOriginalData(data.docs.rows);

        setDocuments({
          success: data.success,
          docs: {
            rows: sortedRows,
            count: sortedRows.length,
            outsourcedCount: data.docs.outsourcedCount,
          },
        });
      } catch (error) {
        console.error('Erro ao obter as categorias de terceiros:', error);
      } finally {
        //setLoading(false);
      }
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
        Object.entries(document).some(([key, value]) => {
          if (value === null || value === undefined) {
            return false;
          }
          return key !== '' && String(value).toLowerCase() === searchTerm.toLowerCase();
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
    setFilterOpen(false);

    setDocuments({
      success: true,
      docs: {
        rows: originalData,
        count: originalData.length,
        outsourcedCount: documents.docs.outsourcedCount,
      },
    });
  };

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

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleSearch]);


  useEffect(() => {
    console.log("useEffect3");
    const fetchDataWithFilter = async () => {
      try {
        //setLoading(true);

        const response = await fetch(`/api/documents?page=${currentPage}&pageSize=${pageSize}`);
        const data = await response.json();

        // Se houver um filtro aplicado, filtre os dados usando o filtro
        const filteredRows = Object.keys(appliedFilterValue).reduce((filteredData, filterColumn) => {
          const filterColumnValue = appliedFilterValue[filterColumn];
        
          // Verificar se o valor do filtro é 'TODOS'
          if (filterColumnValue === 'TODOS') {
            return filteredData; // Não aplicar filtro se for 'TODOS'
          }
        
          return filteredData.filter((document) => {
            const columnValue = document[filterColumn];
        
            // Verificar se o valor da coluna não é nulo antes de chamar toString()
            if (columnValue !== null && columnValue !== undefined) {
              return columnValue.toString().toLowerCase() === filterColumnValue.toLowerCase();
            }
        
            return false; // Se for nulo ou indefinido, não incluir no resultado
          });
        }, data.docs.rows);

        const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);

        // Armazene os dados originais
        setOriginalData(data.docs.rows);

        setDocuments({
          success: data.success,
          docs: {
            rows: sortedRows,
            count: sortedRows.length,
            outsourcedCount: data.docs.outsourcedCount,
          },
        });
      } catch (error) {
        console.error('Erro ao obter as categorias de terceiros:', error);
      } finally {
        //setLoading(false);
      }
    };

    fetchDataWithFilter();
  }, [appliedFilterValue, currentPage, pageSize, sortColumn, sortOrder]);

  const formatBrDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, 'dd/MM/yyyy');
  };


  return (
    <div className='flex'>
      <Sidebar />

      <div className="flex-1" id="Dashboard">
        <div className="bg-blue-500 text-white p-2 text-left w-full">
          <span className='ml-2'>Documentos</span>
        </div>

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
              <div className="text-blue-500 text-md text-center flex-grow">
                <div className="flex items-center justify-center h-full text-4xl">
                  Carregando lista de Documentos...
                </div>
              </div>
            </div>
          </div>
        )}

        {documents.success && (
          <div className=''>
            <div className="flex items-center my-4 w-[1440px]">
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

            <div className="flex flex-col h-[550px] w-[1440px] overflow-x-scroll overflow-y-auto">
              {/* Cabeçalho */}
              <div className="flex text-gray-500 bg-white w-[1440px]">
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
                <div className={`flex text-gray-500 w-[1440px]`}>
                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '30px' }}>
                    <div className="flex items-center">
                    </div>
                  </div>
                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                    <select
                      value={selectedFilterValue}
                      onChange={(e) => setSelectedFilterValue(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('STATUS').map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSearchByFilter('STATUS', selectedFilterValue)}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '300px' }}>
                    <select
                      value={selectedFilterValue}
                      onChange={(e) => setSelectedFilterValue(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('TIPO_DOCUMENTO').map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSearchByFilter('TIPO_DOCUMENTO', selectedFilterValue)}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '350px' }}>
                    <select
                      value={selectedFilterValue}
                      onChange={(e) => setSelectedFilterValue(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('TERCEIRO').map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSearchByFilter('TERCEIRO', selectedFilterValue)}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '300px' }}>
                    <select
                      value={selectedFilterValue}
                      onChange={(e) => setSelectedFilterValue(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('COLABORADOR').map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSearchByFilter('COLABORADOR', selectedFilterValue)}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '260px' }}>
                    <select
                      value={selectedFilterValue}
                      onChange={(e) => setSelectedFilterValue(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('VENCIMENTO').map((value) => (
                        <option key={value} value={value}>
                           {formatBrDate(value)}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSearchByFilter('VENCIMENTO', selectedFilterValue)}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>
                        



                </div>
              )}

              {documents.docs.rows.map((document, index) => (
                /* Tamanho total tabela registros */
                <div className='w-[1440px]'>
                  <div
                    className={`flex text-gray-700 whitespace-nowrap w-[1440px] overflow-x-auto  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                    key={document.id || Math.random().toString()}
                  >
                    {Object.keys(columnWidths).map((column) => (
                      <div
                        key={column}
                        className={`column-cell border border-gray-300 py-2 pl-1`}
                        style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                      >
                         {column === 'VENCIMENTO' ? formatBrDate(document[column]) : (
                        column === '' ? (
                          <IoIosSearch className='text-xl mt-0.5' />
                        ) : (
                          document[column]
                        )
                      )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex mt-4 justify-between border-t border-gray-300 items-center mt-4 w-[1440px]">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`border border-gray-200 px-4 py-2 rounded bg-blue-500 text-white ${currentPage === 1 ? 'invisible' : ''}`}
          >
            Página Anterior
          </button>
          <div className="flex items-center">
            <span className="mr-2">Registros por página:</span>
            <button
              onClick={() => handlePageSizeChange(10)}
              className={`border border-gray-200 px-2 py-1 rounded bg-blue-500 text-white mr-2 ${pageSize === 10 ? 'bg-blue-700' : ''}`}
            >
              10
            </button>
            <button
              onClick={() => handlePageSizeChange(25)}
              className={`border border-gray-200 px-2 py-1 rounded bg-blue-500 text-white mr-2 ${pageSize === 25 ? 'bg-blue-700' : ''}`}
            >
              25
            </button>
            <button
              onClick={() => handlePageSizeChange(50)}
              className={`border border-gray-200 px-2 py-1 rounded bg-blue-500 text-white mr-2 ${pageSize === 50 ? 'bg-blue-700' : ''}`}
            >
              50
            </button>
            <button
              onClick={() => handlePageSizeChange(100)}
              className={`border border-gray-200 px-2 py-1 rounded bg-blue-500 text-white mr-2 ${pageSize === 100 ? 'bg-blue-700' : ''}`}
            >
              100
            </button>
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`border border-gray-200 px-4 py-2 rounded bg-blue-500 text-white ${currentPage === totalPages ? 'invisible' : ''}`}
          >
            Próxima Página
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documents;