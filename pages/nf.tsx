import React, { useEffect, useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import { format } from 'date-fns';

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
  const [appliedFilterValue, setAppliedFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isTokenVerified, setTokenVerified] = useState(false);
  const [getAll, setGetAll] = useState(false);

  const columnWidths = {
    'ORG_IN_CODIGO': '200px',
    'FIL_IN_CODIGO': '200px',
    'CTO_IN_CODIGO': '200px',
    'CTO_CH_STATUS': '200px',
    'CTO_DT_INICIO': '200px',
    'CTO_DT_FINAL': '200px',
    'AGN_IN_CODIGO': '200px',
    'AGN_ST_NOME': '500px',
    'AGN_ST_CGC': '300px',
    'PRO_IN_REDUZIDO': '200px',
    'PRO_ST_DESCRICAO': '400px',
    'CTO_VL_CONTRATO': '400px',
    'CTO_VL_SALDO_CONTRATO': '400px',
    'CTO_BO_LIBERADOAPPROVO': '300px',
    'MED_IN_CODIGO': '200px',
    'MED_IN_NROFORMULARIO': '300px',
    'MED_DT_MEDICAO': '200px',
    'MED_DT_PAGAMENTO': '200px',
    'MED_CH_SITUACAO': '200px',
    'NF_ST_NOTA': '300px',
    'NF_ST_SERIE': '200px',
    'NF_DT_EMISSAO': '200px',
    'NF_DT_ENTRADA': '200px',
    'NF_RE_VALOR': '200px',
    'SITUACAO': '200px',

  };

  const columnLabels = {
    'ORG_IN_CODIGO': 'ORG_IN_CODIGO',
    'FIL_IN_CODIGO': 'FIL_IN_CODIGO',
    'CTO_IN_CODIGO': 'CTO_IN_CODIGO',
    'CTO_CH_STATUS': 'CTO_CH_STATUS',
    'CTO_DT_INICIO': 'CTO_DT_INICIO',
    'CTO_DT_FINAL': 'CTO_DT_FINAL',
    'AGN_IN_CODIGO': 'AGN_IN_CODIGO',
    'AGN_ST_NOME': 'AGN_ST_NOME',
    'AGN_ST_CGC': 'AGN_ST_CGC',
    'PRO_IN_REDUZIDO': 'PRO_IN_REDUZIDO',
    'PRO_ST_DESCRICAO': 'PRO_ST_DESCRICAO',
    'CTO_VL_CONTRATO': 'CTO_VL_CONTRATO',
    'CTO_VL_SALDO_CONTRATO': 'CTO_VL_SALDO_CONTRATO',
    'CTO_BO_LIBERADOAPPROVO': 'CTO_BO_LIBERADOAPPROVO',
    'MED_IN_CODIGO': 'MED_IN_CODIGO',
    'MED_IN_NROFORMULARIO': 'MED_IN_NROFORMULARIO',
    'MED_DT_MEDICAO': 'MED_DT_MEDICAO',
    'MED_DT_PAGAMENTO': 'MED_DT_PAGAMENTO',
    'MED_CH_SITUACAO': 'MED_CH_SITUACAO',
    'NF_ST_NOTA': 'NF_ST_NOTA',
    'NF_ST_SERIE': 'NF_ST_SERIE',
    'NF_DT_EMISSAO': 'NF_DT_EMISSAO',
    'NF_DT_ENTRADA': 'NF_DT_ENTRADA',
    'NF_RE_VALOR': 'NF_RE_VALOR',
    'SITUACAO': 'SITUACAO',
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

      const response = await fetch(`/api/nf?page=${currentPage}&pageSize=${pageSize}`, {
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
          return documentValue.toString().toLowerCase().includes(filterValue.toLowerCase());
        }

        return false; // Se for nulo ou indefinido, não incluir no resultado
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
        const response = await fetch(`/api/nf?page=${currentPage}&pageSize=${pageSize}`, {
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

        const response = await fetch(`/api/nf?page=${currentPage}&pageSize=${pageSize}`, {
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

  const formatBrDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, 'dd/MM/yyyy');
  };

  const formatarNumero = (numero) => {
    const numeroFormatado = parseFloat(numero).toFixed(16);
    return numeroFormatado.replace(/\.?0+$/, '');  // Remover zeros à direita
  };


  return (
    <div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
            <div className="text-blue-500 text-md text-center flex-grow">
              <div className="flex items-center justify-center h-full text-4xl">
                Carregando nota fiscal - medições...
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
              <span className='ml-2'>Nota Fiscal - Medições</span>
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
                <div className="flex text-gray-500 bg-white w-[9000px]">
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
                  <div className={`flex text-gray-500 w-[9000px]`}>
                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['ORG_IN_CODIGO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'ORG_IN_CODIGO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('ORG_IN_CODIGO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('ORG_IN_CODIGO', selectedFilterValue['ORG_IN_CODIGO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['FIL_IN_CODIGO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'FIL_IN_CODIGO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('FIL_IN_CODIGO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('FIL_IN_CODIGO', selectedFilterValue['FIL_IN_CODIGO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>



                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['CTO_IN_CODIGO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CTO_IN_CODIGO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('CTO_IN_CODIGO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('CTO_IN_CODIGO', selectedFilterValue['CTO_IN_CODIGO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['CTO_CH_STATUS']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CTO_CH_STATUS': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('CTO_CH_STATUS').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('CTO_CH_STATUS', selectedFilterValue['CTO_CH_STATUS'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['CTO_DT_INICIO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CTO_DT_INICIO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('CTO_DT_INICIO').map((value) => (
                          <option key={value} value={value}>
                            {formatBrDate(value)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('CTO_DT_INICIO', selectedFilterValue['CTO_DT_INICIO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['CTO_DT_FINAL']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CTO_DT_FINAL': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('CTO_DT_FINAL').map((value) => (
                          <option key={value} value={value}>
                            {formatBrDate(value)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('CTO_DT_FINAL', selectedFilterValue['CTO_DT_FINAL'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['AGN_IN_CODIGO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'AGN_IN_CODIGO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('AGN_IN_CODIGO').map((value) => (
                          <option key={value} value={value}>
                             {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('AGN_IN_CODIGO', selectedFilterValue['AGN_IN_CODIGO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '500px' }}>
                      <select
                        value={selectedFilterValue['AGN_ST_NOME']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'AGN_ST_NOME': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('AGN_ST_NOME').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('AGN_ST_NOME', selectedFilterValue['AGN_ST_NOME'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '300px' }}>
                      <select
                        value={selectedFilterValue['AGN_ST_CGC']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'AGN_ST_CGC': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('AGN_ST_CGC').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('AGN_ST_CGC', selectedFilterValue['AGN_ST_CGC'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['PRO_IN_REDUZIDO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'PRO_IN_REDUZIDO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('PRO_IN_REDUZIDO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('PRO_IN_REDUZIDO', selectedFilterValue['PRO_IN_REDUZIDO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '400px' }}>
                      <select
                        value={selectedFilterValue['PRO_ST_DESCRICAO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'PRO_ST_DESCRICAO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('PRO_ST_DESCRICAO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('PRO_ST_DESCRICAO', selectedFilterValue['PRO_ST_DESCRICAO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '400px' }}>
                      <select
                        value={selectedFilterValue['CTO_VL_CONTRATO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CTO_VL_CONTRATO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('CTO_VL_CONTRATO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('CTO_VL_CONTRATO', selectedFilterValue['CTO_VL_CONTRATO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '400px' }}>
                      <select
                        value={formatarNumero(selectedFilterValue['CTO_VL_SALDO_CONTRATO'])}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CTO_VL_SALDO_CONTRATO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('CTO_VL_SALDO_CONTRATO').map((value) => (
                          <option key={value} value={value}>
                            {formatarNumero(value)}  {/* Aplicando a formatação ao valor da opção */}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('CTO_VL_SALDO_CONTRATO', formatarNumero(selectedFilterValue['CTO_VL_SALDO_CONTRATO']))}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '300px' }}>
                      <select
                        value={selectedFilterValue['CTO_BO_LIBERADOAPPROVO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CTO_BO_LIBERADOAPPROVO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('CTO_BO_LIBERADOAPPROVO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('CTO_BO_LIBERADOAPPROVO', selectedFilterValue['CTO_BO_LIBERADOAPPROVO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['MED_IN_CODIGO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'MED_IN_CODIGO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('MED_IN_CODIGO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('MED_IN_CODIGO', selectedFilterValue['MED_IN_CODIGO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '300px' }}>
                      <select
                        value={selectedFilterValue['MED_IN_NROFORMULARIO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'MED_IN_NROFORMULARIO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('MED_IN_NROFORMULARIO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('MED_IN_NROFORMULARIO', selectedFilterValue['MED_IN_NROFORMULARIO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['MED_DT_MEDICAO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'MED_DT_MEDICAO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('MED_DT_MEDICAO').map((value) => (
                          <option key={value} value={value}>
                            {formatBrDate(value)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('MED_DT_MEDICAO', selectedFilterValue['MED_DT_MEDICAO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['MED_DT_PAGAMENTO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'MED_DT_PAGAMENTO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('MED_DT_PAGAMENTO').map((value) => (
                          <option key={value} value={value}>
                            {formatBrDate(value)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('MED_DT_PAGAMENTO', selectedFilterValue['MED_DT_PAGAMENTO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['MED_CH_SITUACAO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'MED_CH_SITUACAO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('MED_CH_SITUACAO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('MED_CH_SITUACAO', selectedFilterValue['MED_CH_SITUACAO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '300px' }}>
                      <select
                        value={selectedFilterValue['NF_ST_NOTA']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'NF_ST_NOTA': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('NF_ST_NOTA').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('NF_ST_NOTA', selectedFilterValue['NF_ST_NOTA'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['NF_ST_SERIE']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'NF_ST_SERIE': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('NF_ST_SERIE').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('NF_ST_SERIE', selectedFilterValue['NF_ST_SERIE'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['NF_DT_EMISSAO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'NF_DT_EMISSAO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('NF_DT_EMISSAO').map((value) => (
                          <option key={value} value={value}>
                            {formatBrDate(value)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('NF_DT_EMISSAO', selectedFilterValue['NF_DT_EMISSAO'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['NF_DT_ENTRADA']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'NF_DT_ENTRADA': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('NF_DT_ENTRADA').map((value) => (
                          <option key={value} value={value}>
                            {formatBrDate(value)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('NF_DT_ENTRADA', selectedFilterValue['NF_DT_ENTRADA'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['NF_RE_VALOR']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'NF_RE_VALOR': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('NF_RE_VALOR').map((value) => (
                          <option key={value} value={value}>
                             {parseFloat(value).toFixed(2)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('NF_RE_VALOR', selectedFilterValue['NF_RE_VALOR'])}
                        className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                      <select
                        value={selectedFilterValue['SITUACAO']}
                        onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'SITUACAO': e.target.value })}
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="">Todos</option>
                        {handleFilterValue('SITUACAO').map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSearchByFilter('SITUACAO', selectedFilterValue['SITUACAO'])}
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
                      className={`flex text-gray-700 whitespace-nowrap w-[9000px] overflow-x-auto  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                      key={document.id || Math.random().toString()}
                    >
                      {Object.keys(columnWidths).map((column) => (
                        <div
                          key={column}
                          className={`column-cell border border-gray-300 py-2`}
                          style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                        >
                          {column === 'CTO_DT_INICIO' || column === 'CTO_DT_FINAL' || column === 'MED_DT_MEDICAO' || column === 'MED_DT_PAGAMENTO' || column === 'NF_DT_EMISSAO' || column === 'NF_DT_ENTRADA' ? (
                            <div className=''>
                              {formatBrDate(document[column])}
                            </div>
                          ) : column === 'CTO_VL_SALDO_CONTRATO' || column === 'CTO_VL_CONTRATO' ? (
                            <div className=''>
                              {formatarNumero(document[column])}
                            </div>
                          ) : column === 'NF_RE_VALOR' ? (
                            <div className=''>
                              {parseFloat(document[column]).toFixed(2)} {/* Garante 3 casas decimais */}
                            </div>
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
                {/* <button
                  className={`border border-gray-300 pl-1 pr-2 py-1 rounded bg-blue-500 text-white ml-auto flex ${getAll == true ? 'bg-blue-700' : ''}`}
                  onClick={() => {
                    setLoading(true);
                    setGetAll(true);
                    fetchData(); // Execute a função fetchData após definir getAll como true
                  }}
                >
                  Todos
                </button> */}
              </div>
              {!getAll ? (
                <span className="px-4 py-2 rounded text-gray-500 text-center">
                  Página {currentPage} de {totalPages}
                  <p>Total de registros: {docs.outsourcedCount}</p>
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