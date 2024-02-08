import React, { useEffect, useState, useCallback } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { IoMdAdd, IoIosSearch } from 'react-icons/io';
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Link from 'next/link';

const CategoryOutsourced = () => {
  const [originalData, setOriginalData] = useState([]);
  const [documents, setDocuments] = useState<{ success: boolean; docs: { rows: Document[]; count: number; outsourcedCount: number } }>({
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
  const [selectedFilterValue, setSelectedFilterValue] = useState({});
  const router = useRouter();
  const [appliedFilterValue, setAppliedFilterValue] = useState({});
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [isTokenVerified, setTokenVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [modalColor, setModalColor] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#e53e3e');

  const closeModal = () => {
    setShowModal(false);
  };

  interface Document {
    CATEGORIA: string;
  }

  interface Item {
    CATEGORIA: string; // Adicione outras propriedades, se houver
  }


  const adicionarTerceiroClick = () => {
    router.push('/add-category-outsourced');
  };

  const deleteCategoria = async (categoria) => {
    try {
      const token = localStorage.getItem('Token');

      if (!token) {
        // Se o token não estiver presente, redirecione para a página de login
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/delete-category-outsourced?page=${currentPage}&pageSize=${pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, categoria }),
      });

      const data = await response.json();
      if (response.status === 401) {
        router.push('/login');
      }
      else {
        setTokenVerified(true);

        // Se a exclusão for bem-sucedida, atualize o estado local
        if (data.success) {
          // Remova a categoria excluída de documents.docs.rows
          const updatedRows = documents.docs.rows.filter(row => row.CATEGORIA !== categoria);

          setDocuments(prevDocuments => ({
            ...prevDocuments,
            docs: {
              ...prevDocuments.docs,
              rows: updatedRows,
              count: updatedRows.length,
            },
          }));

          // Se estiver usando filtros, atualize também o estado de filteredData
          if (filteredData.length > 0) {
            const updatedFilteredData = filteredData.filter(row => row.CATEGORIA !== categoria);
            setFilteredData(updatedFilteredData);
          }
        }

        setModalColor('#3f5470');
        setTextColor('#3f5470');
        setPopupMessage(data.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erro ao excluir a categoria:', error);
    }
  };



  const columnWidths = {
    '': '59px',
    'CATEGORIA': '500px',
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
      const token = localStorage.getItem('Token');

      if (!token) {
        // Se o token não estiver presente, redirecione para a página de login
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/category-outsourced?page=${currentPage}&pageSize=${pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (response.status === 401) {
        router.push('/login');
      }
      else {
        setTokenVerified(true);
      }



      // Se houver um filtro aplicado, filtre os dados usando o filtro
      const filteredRows = Object.keys(appliedFilterValue).reduce((filteredData, column) => {
        const filterValue = appliedFilterValue[column];
        return filteredData.filter((document) =>
          document[column].toString().toLowerCase().includes(filterValue.toLowerCase())
        );
      }, data.docs.rows);

      const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);

      // Atualize o estado filteredData
      setFilteredData(sortedRows);

      // Atualize os documentos com os dados filtrados
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

    }
  };



  const applyFilters = (data, filters) => {
    return data.filter((document) => {
      // Verificar se todos os filtros são atendidos
      return Object.entries(filters).every(([column, filterValue]) => {
        const documentValue = document[column];

        // Verificar se o valor da coluna não é nulo antes de chamar toString()
        if (documentValue !== null && documentValue !== undefined) {
          // Verificar se filterValue é do tipo string
          if (typeof filterValue === 'string') {
            return documentValue.toString().toLowerCase().includes(filterValue.toLowerCase());
          }
        }

        return false; // Se for nulo, indefinido ou não uma string, não incluir no resultado
      });
    });
  };



  const handleSearchByFilter = async (column, value) => {
    setFilterOpen(false);
    setCurrentPage(1);

    const availableValues = handleFilterValue(column);

    if (value === "") {
      value = 'TODOS';
    }

    if (!availableValues.includes(value)) {
      value = 'TODOS';
    }

    if (availableValues.includes(value) || value === 'TODOS') {
      setAppliedFilterValue((prevFilters) => {
        const updatedFilters = { ...prevFilters, [column]: value };
        return updatedFilters;
      });

      setSelectedFilterValue((prevSelectedFilters) => {
        const updatedSelectedFilters = { ...prevSelectedFilters, [column]: value };
        return updatedSelectedFilters;
      });

      // Atualize o estado filteredData com os dados filtrados
      const filteredRows = applyFilters(documents.docs.rows, appliedFilterValue);
      const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);
      setFilteredData(sortedRows);

      // Atualize os documentos com os dados filtrados
      setDocuments({
        success: true,
        docs: {
          rows: sortedRows,
          count: sortedRows.length,
          outsourcedCount: documents.docs.outsourcedCount,
        },
      });
    } else {
      setAppliedFilterValue((prevFilters) => {
        const updatedFilters = { ...prevFilters, [column]: '' };
        return updatedFilters;
      });

      setSelectedFilterValue((prevSelectedFilters) => {
        const updatedSelectedFilters = { ...prevSelectedFilters, [column]: '' };
        return updatedSelectedFilters;
      });

      try {
        const token = localStorage.getItem('Token');

        if (!token) {
          // Se o token não estiver presente, redirecione para a página de login
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/category-outsourced?page=${currentPage}&pageSize=${pageSize}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.status === 401) {
          router.push('/login');
        }
        else {
          setTokenVerified(true);
        }

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

        // Atualize o estado filteredData com os dados filtrados
        setFilteredData(sortedRows);

        // Atualize os documentos com os dados filtrados
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

  const handleSearch = useCallback(() => {
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
  }, [searchTerm, documents, sortColumn, sortOrder, fetchData]);


  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterOpen(false);

    setAppliedFilterValue({});
    setSelectedFilterValue({});

    setDocuments({
      success: true,
      docs: {
        rows: filteredData, // Use filteredData em vez de originalData
        count: filteredData.length,
        outsourcedCount: documents.docs.outsourcedCount,
      },
    });
  };


  const totalPages = Math.ceil(documents.docs.outsourcedCount / pageSize) || 1;

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, totalPages);
      return nextPage;
    });
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
    const fetchDataWithFilter = async () => {
      try {
        //setLoading(true);
        const token = localStorage.getItem('Token');
        const id = localStorage.getItem('FontanaUser');

        if (!token) {
          // Se o token não estiver presente, redirecione para a página de login
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/category-outsourced?page=${currentPage}&pageSize=${pageSize}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, id }),
        });

        const data = await response.json();
        if (response.status === 401) {
          router.push('/login');
        }
        else if (response.status === 403) {
          router.push('/403');
        }
        else {
          setTokenVerified(true);
        }

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
        setLoading(false);
      }
    };

    fetchDataWithFilter();
  }, [router, appliedFilterValue, currentPage, pageSize, sortColumn, sortOrder]);

  const { success, docs } = documents;

  return (
    <div>

      {isTokenVerified && (<div>
        <div className='flex'>
          <Sidebar />

          <div className="flex-1" id="Dashboard">
            <div className="bg-blue-500 text-white p-2 text-left w-full">
              <span className='ml-2'>Categoria de Terceiros</span>
            </div>

            {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
                  <div className="text-blue-500 text-md text-center flex-grow">
                    <div className="flex items-center justify-center h-full text-4xl">
                      Carregando lista de Categoria de Terceiros...
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                    className="border border-gray-300 pl-1 pr-2 py-1 rounded bg-blue-500 text-white ml-auto flex"
                    onClick={adicionarTerceiroClick}
                  >
                    <IoMdAdd className='text-xl mt-0.5' /> Nova Categoria
                  </button>
                </div>

                <div className="flex flex-col h-[550px] w-[1440px] overflow-x-scroll overflow-y-auto">
                  {/* Cabeçalho */}
                  <div className="flex text-gray-500 bg-white w-[500px]">
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
                    <div className={`flex text-gray-500 w-[500px]`}>
                      <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '59px' }}>
                        <div className="flex items-center">
                        </div>
                      </div>
                      <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '500px' }}>
                        <select
                          value={selectedFilterValue['CATEGORIA']}
                          onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CATEGORIA': e.target.value })}
                          className="border border-gray-300 px-2 py-1 rounded"
                        >
                          <option value="">Todos</option>
                          {handleFilterValue('CATEGORIA').map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleSearchByFilter('CATEGORIA', selectedFilterValue['CATEGORIA'])}
                          className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                        >
                          Aplicar
                        </button>
                      </div>



                    </div>
                  )}

                  {documents.docs.rows.map((document: any, index) => (
                    <div className='w-[1440px]' key={document.id || index}>
                      <div
                        className={`flex text-gray-700 whitespace-nowrap w-[500px] overflow-x-auto  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                      >
                        {Object.keys(columnWidths).map((column) => (
                          <div
                            key={column}
                            className={`column-cell border border-gray-300 py-2`}
                            style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                          >
                            {column === '' ? (<div className='flex justify-center'><Link href={{ pathname: '/find-category-outsourced', query: { id: document.CATEGORIA } }}>
                              <IoIosSearch className='text-xl mt-0.5 mx-0.5' />
                            </Link>
                              <button onClick={() => deleteCategoria(document.CATEGORIA)}>
                                <FaTrashAlt className='text-xl mt-0.5 w-[12px] text-red-500 mx-0.5' />
                              </button></div>
                            ) : (
                              document[column]
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
              <span className="px-4 py-2  rounded text-gray-500">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                className={`border border-gray-200 px-4 py-2 rounded bg-blue-500 text-white ${currentPage * pageSize >= documents.docs.outsourcedCount ? 'invisible' : ''}`}
              >
                Próxima Página
              </button>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default CategoryOutsourced;