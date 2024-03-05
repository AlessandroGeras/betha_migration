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
  const [columnWidths, setColumnWidths] = useState({
    '': '59px',
    'CATEGORIA': '200px',
    // Adicione outras colunas e larguras conforme necessário
  });

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
      if (response.status === 400) {
        setModalColor('#e53e3e');
        setTextColor('#e53e3e');
        setPopupMessage(data.message);
        setShowModal(true);
        return
      }
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

  const updateColumnWidth = (column, width) => {
    setColumnWidths(prevWidths => ({
      ...prevWidths,
      [column]: width,
    }));
  };

  const columnLabels = {
    '': '',
    'CATEGORIA': 'CATEGORIA',
    // Adicione rótulos para outras colunas conforme necessário
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

      const filteredRows = Object.keys(appliedFilterValue).reduce((filteredData, column) => {
        const filterValue = appliedFilterValue[column];
        return filteredData.filter((document) =>
          document[column].toString().toLowerCase().includes(filterValue.toLowerCase())
        );
      }, data.docs.rows);

      const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);

      setFilteredData(sortedRows);

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
      return Object.entries(filters).every(([column, filterValue]) => {
        const documentValue = document[column];

        if (documentValue !== null && documentValue !== undefined) {
          if (typeof filterValue === 'string') {
            return documentValue.toString().toLowerCase().includes(filterValue.toLowerCase());
          }
        }

        return false;
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

      const filteredRows = applyFilters(documents.docs.rows, appliedFilterValue);
      const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);
      setFilteredData(sortedRows);

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

        const filteredRows = Object.keys(appliedFilterValue).reduce((filteredData, filterColumn) => {
          const filterColumnValue = appliedFilterValue[filterColumn];

          if (filterColumnValue === 'TODOS') {
            return filteredData;
          }

          return filteredData.filter((document) => {
            const columnValue = document[filterColumn];

            if (columnValue !== null && columnValue !== undefined) {
              return columnValue.toString().toLowerCase() === filterColumnValue.toLowerCase();
            }

            return false;
          });
        }, data.docs.rows);

        const sortedRows = sortRows(filteredRows, sortColumn, sortOrder);

        setFilteredData(sortedRows);

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
          return key !== '' && String(value).toLowerCase().includes(searchTerm.toLowerCase());
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
        rows: filteredData,
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
    const allColumnValues = new Set();
    documents.docs.rows.forEach((row) => {
      allColumnValues.add(row[column]);
    });
    return ['TODOS', ...Array.from(allColumnValues)];
  };

  useEffect(() => {    
      fetchData();
  }, [currentPage, pageSize, sortColumn, sortOrder, appliedFilterValue, isTokenVerified]);

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
                  <div className="flex text-gray-500 bg-white w-[2059px]">
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
                    <div className={`flex text-gray-500 w-[2059px]`}>
                      <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '59px' }}>
                        <div className="flex items-center">
                        </div>
                      </div>
                      <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '2000px' }}>
                        <select
                          value={selectedFilterValue['CATEGORIA']}
                          onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CATEGORIA': e.target.value })}
                          className="border border-gray-300 px-2 py-1 rounded"
                        >
                          <option key="todos" value="">Todos</option>
                          {handleFilterValue('CATEGORIA').map((value: string | number, index: number) => (
                            <option key={index} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleSearchByFilter('CATEGORIA', selectedFilterValue['CATEGORIA'])}
                          className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                        >
                          Filtrar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Conteúdo */}
                  {documents.docs.rows.map((document) => (
                    <div key={document.CATEGORIA} className="flex w-[2059px] border-b border-gray-300">
                      <div
                        className={`data-cell border-r border-gray-300 py-1 pl-1 cursor-pointer flex`}
                        style={{ width: '59px' }}
                      >
                        <FaTrashAlt
                          className="text-red-500 text-xl ml-auto"
                          onClick={() => deleteCategoria(document.CATEGORIA)}
                        />
                      </div>
                      <div
                        className={`data-cell border-r border-gray-300 py-1 pl-1 cursor-pointer flex`}
                        style={{ width: '2000px' }}
                      >
                        {document.CATEGORIA}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={goToPreviousPage}
                    className="border border-gray-300 px-2 py-1 rounded mr-2"
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <button
                    onClick={goToNextPage}
                    className="border border-gray-300 px-2 py-1 rounded ml-2"
                    disabled={currentPage === totalPages}
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default CategoryOutsourced;
