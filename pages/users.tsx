import React, { useEffect, useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';

const Users = () => {
  const [documents, setDocuments] = useState({ success: false, docs: { rows: [], count: 0, outsourcedCount: 0 }, });
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
  const [filteredData, setFilteredData] = useState([]);
  const [isTokenVerified, setTokenVerified] = useState(false);
  const [getAll, setGetAll] = useState(false);

  const columnWidths = {
    'ID_USUARIO': '300px',
    'NM_USUARIO': '400px',
    'ST_EMAIL': '500px',
    'ID_USUARIO_MEGA': '200px',
    'ID_ADM_RESERVA_SALA': '200px',
    'ID_ADM_VENDA': '200px',
    'ID_ADM_CONTRATO': '200px',
    'ID_GER_VENDA': '200px',
    'ID_CAD_PRODUTO': '200px',
    'ID_CAD_ORCAMENTO': '200px',
    'ID_ADM_SALA': '200px',
    'ID_ADM_BENS_TERCEIRO': '200px',
    'ID_CON_BENS_TERCEIRO': '200px',
    'ID_RECEBE_MATERIAL_OBRA': '250px',
    'ID_VISUALIZAR_NOTAS': '200px',
    'ID_CON_GESTAO_TERCEIROS': '250px',
    'ID_ADM_GESTAO_TERCEIROS': '250px',
  };

  const columnLabels = {
    'ID_USUARIO': 'ID_USUARIO',
    'NM_USUARIO': 'NM_USUARIO',
    'ST_EMAIL': 'ST_EMAIL',
    'ID_USUARIO_MEGA': 'ID_USUARIO_MEGA',
    'ID_ADM_RESERVA_SALA': 'ID_ADM_RESERVA_SALA',
    'ID_ADM_VENDA': 'ID_ADM_VENDA',
    'ID_ADM_CONTRATO': 'ID_ADM_CONTRATO',
    'ID_GER_VENDA': 'ID_GER_VENDA',
    'ID_CAD_PRODUTO': 'ID_CAD_PRODUTO',
    'ID_CAD_ORCAMENTO': 'ID_CAD_ORCAMENTO',
    'ID_ADM_SALA': 'ID_ADM_SALA',
    'ID_ADM_BENS_TERCEIRO': 'ID_ADM_BENS_TERCEIRO',
    'ID_CON_BENS_TERCEIRO': 'ID_CON_BENS_TERCEIRO',
    'ID_RECEBE_MATERIAL_OBRA': 'ID_RECEBE_MATERIAL_OBRA',
    'ID_VISUALIZAR_NOTAS': 'ID_VISUALIZAR_NOTAS',
    'ID_CON_GESTAO_TERCEIROS': 'ID_CON_GESTAO_TERCEIROS',
    'ID_ADM_GESTAO_TERCEIROS': 'ID_ADM_GESTAO_TERCEIROS',
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
      if (getAll && documents.docs.count > 100) {
        setLoading(true);
      }

      const token = localStorage.getItem('Token');

      if (!token) {
        // Se o token não estiver presente, redirecione para a página de login
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/users?page=${currentPage}&pageSize=${pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, getAll }),
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
      //setLoading(false);
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

    const availableValues: Array<string> = handleFilterValue(column);

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
        const response = await fetch(`/api/users?page=${currentPage}&pageSize=${pageSize}`, {
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
        if (getAll && documents.docs.count > 100) {
          setLoading(true);
        }
        const token = localStorage.getItem('Token');
        const id = localStorage.getItem('FontanaUser');

        if (!token) {
          // Se o token não estiver presente, redirecione para a página de login
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/users?page=${currentPage}&pageSize=${pageSize}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, getAll, id }),
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
  }, [getAll, appliedFilterValue, currentPage, pageSize, sortColumn, sortOrder]);

  const { success, docs } = documents;


  return (
    <div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
            <div className="text-blue-500 text-md text-center flex-grow">
              <div className="flex items-center justify-center h-full text-4xl">
                Carregando lista de Usuários...
              </div>
            </div>
          </div>
        </div>
      )}

      {documents.success && (<div>
        <div className='flex'>
          <Sidebar />

          <div className="flex-1" id="Dashboard">
            <div className="bg-blue-500 text-white p-2 text-left w-full">
              <span className='ml-2'>Usuários</span>
            </div>


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
              </div>

              <div className="flex flex-col h-[550px] w-[1440px] overflow-x-scroll overflow-y-auto">
                {/* Cabeçalho */}
                <div className="flex text-gray-500 bg-white w-[4150px]">
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
                  <div className={`flex text-gray-500 w-[4150px]`}>
                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '300px' }}>
                      <select
                        value={selectedFilterValue['ID_USUARIO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_USUARIO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_USUARIO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_USUARIO', selectedFilterValue['ID_USUARIO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '400px' }}>
                      <select
                        value={selectedFilterValue['NM_USUARIO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'NM_USUARIO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('NM_USUARIO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('NM_USUARIO', selectedFilterValue['NM_USUARIO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>



                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '500px' }}>
                      <select
                        value={selectedFilterValue['ST_EMAIL']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ST_EMAIL': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ST_EMAIL').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ST_EMAIL', selectedFilterValue['ST_EMAIL'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_USUARIO_MEGA']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_USUARIO_MEGA': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_USUARIO_MEGA').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_USUARIO_MEGA', selectedFilterValue['ID_USUARIO_MEGA'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_ADM_RESERVA_SALA']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_ADM_RESERVA_SALA': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_ADM_RESERVA_SALA').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_ADM_RESERVA_SALA', selectedFilterValue['ID_ADM_RESERVA_SALA'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_ADM_VENDA']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_ADM_VENDA': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_ADM_VENDA').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_ADM_VENDA', selectedFilterValue['ID_ADM_VENDA'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_ADM_CONTRATO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_ADM_CONTRATO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_ADM_CONTRATO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_ADM_CONTRATO', selectedFilterValue['ID_ADM_CONTRATO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_GER_VENDA']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_GER_VENDA': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_GER_VENDA').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_GER_VENDA', selectedFilterValue['ID_GER_VENDA'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_CAD_PRODUTO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_CAD_PRODUTO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_CAD_PRODUTO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_CAD_PRODUTO', selectedFilterValue['ID_CAD_PRODUTO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_CAD_ORCAMENTO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_CAD_ORCAMENTO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_CAD_ORCAMENTO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_CAD_ORCAMENTO', selectedFilterValue['ID_CAD_ORCAMENTO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_ADM_SALA']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_ADM_SALA': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_ADM_SALA').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_ADM_SALA', selectedFilterValue['ID_ADM_SALA'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_ADM_BENS_TERCEIRO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_ADM_BENS_TERCEIRO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_ADM_BENS_TERCEIRO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_ADM_BENS_TERCEIRO', selectedFilterValue['ID_ADM_BENS_TERCEIRO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_CON_BENS_TERCEIRO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_CON_BENS_TERCEIRO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_CON_BENS_TERCEIRO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_CON_BENS_TERCEIRO', selectedFilterValue['ID_CON_BENS_TERCEIRO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '250px' }}>
                      <select
                        value={selectedFilterValue['ID_RECEBE_MATERIAL_OBRA']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_RECEBE_MATERIAL_OBRA': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_RECEBE_MATERIAL_OBRA').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_RECEBE_MATERIAL_OBRA', selectedFilterValue['ID_RECEBE_MATERIAL_OBRA'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ID_VISUALIZAR_NOTAS']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_VISUALIZAR_NOTAS': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_VISUALIZAR_NOTAS').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_VISUALIZAR_NOTAS', selectedFilterValue['ID_VISUALIZAR_NOTAS'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '250px' }}>
                      <select
                        value={selectedFilterValue['ID_CON_GESTAO_TERCEIROS']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_CON_GESTAO_TERCEIROS': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_CON_GESTAO_TERCEIROS').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_CON_GESTAO_TERCEIROS', selectedFilterValue['ID_CON_GESTAO_TERCEIROS'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '250px' }}>
                      <select
                        value={selectedFilterValue['ID_ADM_GESTAO_TERCEIROS']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ID_ADM_GESTAO_TERCEIROS': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ID_ADM_GESTAO_TERCEIROS').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ID_ADM_GESTAO_TERCEIROS', selectedFilterValue['ID_ADM_GESTAO_TERCEIROS'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>



                  </div>
                )}

                {documents.docs.rows.map((document:any, index) => (
                  /* Tamanho total tabela registros */
                  <div className='w-[1440px]'>
                    <div
                      className={`flex text-gray-700 whitespace-nowrap w-[4150px] overflow-x-auto  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                      key={document.id || Math.random().toString()}
                    >
                      {Object.keys(columnWidths).map((column) => (
                        <div
                          key={column}
                          className={`column-cell border border-gray-300 py-2`}
                          style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                        >
                          {column === '' ? (<div className='flex justify-center'></div>
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


            <div className="flex mt-4 justify-between border-t border-gray-300 items-center mt-4 w-[1440px]">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`border border-gray-200 px-4 py-2 rounded bg-blue-600 text-white ${currentPage === 1 || getAll ? 'invisible' : ''}`}
              >
                Página Anterior
              </button>
              <div className="flex items-center">
                <span className="mr-2">Registros por página:</span>
                <button
                  onClick={() => { setGetAll(false); handlePageSizeChange(10) }}
                  className={`border border-gray-200 px-2 py-1 rounded bg-blue-500 text-white mr-2 ${pageSize === 10 && getAll == false ? 'bg-blue-700' : ''}`}
                >
                  10
                </button>
                <button
                  onClick={() => { setGetAll(false); handlePageSizeChange(25) }}
                  className={`border border-gray-200 px-2 py-1 rounded bg-blue-500 text-white mr-2 ${pageSize === 25 && getAll == false ? 'bg-blue-700' : ''}`}
                >
                  25
                </button>
                <button
                  onClick={() => { setGetAll(false); handlePageSizeChange(50) }}
                  className={`border border-gray-200 px-2 py-1 rounded bg-blue-500 text-white mr-2 ${pageSize === 50 && getAll == false ? 'bg-blue-700' : ''}`}
                >
                  50
                </button>
                <button
                  onClick={() => { setGetAll(false); handlePageSizeChange(100) }}
                  className={`border border-gray-200 px-2 py-1 rounded bg-blue-500 text-white mr-2 ${pageSize === 100 && getAll == false ? 'bg-blue-700' : ''}`}
                >
                  100
                </button>
                <button
                  className={`border border-gray-300 pl-1 pr-2 py-1 rounded bg-blue-500 text-white ml-auto flex ${getAll == true ? 'bg-blue-700' : ''}`}
                  onClick={() => {
                    setLoading(true);
                    setGetAll(true);
                    fetchData(); // Execute a função fetchData após definir getAll como true
                  }}
                >
                  Todos
                </button>
              </div>
              {!getAll ? (
                <span className="px-4 py-2 rounded text-gray-500">
                  Página {currentPage} de {totalPages}
                </span>
              ) : (
                <span className="px-4 py-2 rounded text-gray-500">
                  Página 1 de 1
                </span>
              )}
              <button
                onClick={goToNextPage}
                className={`border border-gray-200 px-4 py-2 rounded bg-blue-600 text-white ${currentPage * pageSize >= documents.docs.outsourcedCount || getAll ? 'invisible' : ''}`}
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

export default Users;