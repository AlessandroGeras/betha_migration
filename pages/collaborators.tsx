import React, { useEffect, useState, useCallback } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { IoMdAdd, IoIosSearch, IoMdPrint } from 'react-icons/io';
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Link from 'next/link';
import jsPDF from 'jspdf';

const Collaborators = () => {
  const [originalData, setOriginalData] = useState([]);
  const [documents, setDocuments] = useState({ success: false, docs: { rows: [] as User[], count: 0, outsourcedCount: 0 } });
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
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [isTokenVerified, setTokenVerified] = useState(false);
  const [userID, setUserID] = useState({ ID_USUARIO: '' });
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [modalColor, setModalColor] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#e53e3e');
  const [getAll, setGetAll] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');

  useEffect(() => {
    const userPermission = localStorage.getItem('permission');

    if (userPermission == 'read') {
      setIsAdmin('read');
    }

    if (userPermission == 'outsourcedRead') {
      setIsAdmin('outsourcedRead');
    }
  }, []);

  interface User {
    ID_USUARIO: string;
    NM_USUARIO: string;
    ST_EMAIL: string | null;
    FUNCAO: string;
    CPF: string; // Adicionando o campo CPF
    STATUS: string; // Adicionando o campo STATUS
    // outros campos...
  }

  const PDFPage = () => {
     // Criar um novo documento PDF
  const doc = new jsPDF();

  // Definir a posição inicial para adicionar o conteúdo da tabela
  let yPos = 10;
  doc.setFontSize(12);

  // Iterar sobre os documentos e adicionar cada linha da tabela ao PDF
  docs.rows.forEach((document, index) => {
    const rowData = `${document.NM_USUARIO} - CPF: ${document.CPF} - Função: ${document.FUNCAO} - Status: ${document.STATUS}`
    doc.text(rowData, 10, yPos);
    yPos += 10; // Ajustar a posição Y para a próxima linha
  });

  // Salvar o documento como um arquivo PDF
  doc.save("lista_de_colaboradores.pdf");
  };


  const adicionarColaboradorClick = () => {
    router.push('/add-collaborator');
  };

  const deleteAccountClick = (document) => {
    setPopupMessage('Tem certeza que deseja excluir a conta <span style="color: red;">' + document.NM_USUARIO + '</span>?');
    setShowModal(true);
    setShowModal2(true);
    setModalColor('#3f5470');
    setTextColor('#3f5470');
    setUserID(document);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
  };


  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem('Token');

      if (!token) {
        // Se o token não estiver presente, redirecione para a página de login
        router.push('/login');
        return;
      }

      const usuario = userID.ID_USUARIO;

      const response = await fetch(`/api/delete-collaborator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, usuario }),
      });

      const data = await response.json();
      if (response.status === 401) {
        router.push('/login');
      } else {
        setTokenVerified(true);

        // Atualize o estado após excluir com sucesso
        const updatedDocs = {
          success: true,
          docs: {
            rows: documents.docs.rows.filter((user) => user.ID_USUARIO !== usuario),
            count: documents.docs.count - 1,
            outsourcedCount: documents.docs.outsourcedCount,
          },
        };

        setDocuments(updatedDocs);

        // Atualize também o estado filteredData
        setFilteredData(updatedDocs.docs.rows);

        setPopupMessage('Conta excluída');
        setShowModal(true);
        setShowModal2(false);
        setModalColor('#3f5470');
        setTextColor('#3f5470');
      }
    } catch (error) {
      console.error('Erro ao excluir a conta:', error);
    } finally {

    }
  };

  const columnWidths = {
    '': '59px',
    'STATUS': '200px',
    'NM_USUARIO': '400px',
    'NOME_TERCEIRO': '500px',
    'CPF': '300px',
    'ST_EMAIL': '500px',
    'FUNCAO': '350px',
    'ID_USUARIO': '350px',
  };

  const columnLabels = {
    '': '',
    'STATUS': 'STATUS',
    'NM_USUARIO': 'USUARIO',
    'NOME_TERCEIRO': 'NOME_TERCEIRO',
    'CPF': 'CPF',
    'ST_EMAIL': 'E-MAIL',
    'FUNCAO': 'FUNCAO',
    'ID_USUARIO': 'ID_USUARIO',

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
      const id = localStorage.getItem('FontanaUser');
      const role = localStorage.getItem('role');

      if (!token) {
        // Se o token não estiver presente, redirecione para a página de login
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/collaborators?page=${currentPage}&pageSize=${pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, getAll, id, role }),
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
        const id = localStorage.getItem('FontanaUser');
        const role = localStorage.getItem('role');

        if (!token) {
          // Se o token não estiver presente, redirecione para a página de login
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/collaborators?page=${currentPage}&pageSize=${pageSize}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, id, role }),
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
        if (getAll && documents.docs.count > 100) {
          setLoading(true);
        }

        const token = localStorage.getItem('Token');
        const id = localStorage.getItem('FontanaUser');
        const role = localStorage.getItem('role');

        if (!token) {
          // Se o token não estiver presente, redirecione para a página de login
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/collaborators?page=${currentPage}&pageSize=${pageSize}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, getAll, id, role }),
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
  }, [getAll, appliedFilterValue, currentPage, pageSize, sortColumn, sortOrder, documents.docs.count, router]);


  const { success, docs } = documents;

  return (
    <div className='flex'>
      <Sidebar />

      <div className="flex-1" id="Dashboard">
        <div className="bg-blue-500 text-white p-2 text-left w-full">
          <span className='ml-2'>Colaboradores</span>
        </div>

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
              <div className="text-blue-500 text-md text-center flex-grow">
                <div className="flex items-center justify-center h-full text-4xl">
                  Carregando lista de Colaboradores...
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
                onClick={closeModal}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className={`text-md text-center flex-grow`} style={{ color: textColor }}>
                <div dangerouslySetInnerHTML={{ __html: popupMessage }} />

                {showModal2 && (
                  <div className='flex'>
                    <button className="mx-auto mt-4 w-[300px]" onClick={deleteAccount}>
                      <span className="bg-blue-950 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                        Sim, excluir a conta
                      </span>
                    </button>
                    <button className="mx-auto mt-4 w-[300px]" onClick={closeModal} id="Cobrança">
                      <span className="bg-red-700 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                        Não, cancelar e sair
                      </span>
                    </button>
                  </div>)}


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
                className="border border-gray-300 pl-1 pr-2 py-1 rounded bg-blue-500 text-white ml-auto flex"
                onClick={PDFPage}
              >
                <IoMdPrint className='text-xl mt-0.5' /> <span className='ml-1'>Imprimir PDF</span>
              </button>
              {isAdmin !== "read" && isAdmin !== "outsourcedRead" && (
                <button
                  className="border border-gray-300 pl-1 pr-2 py-1 rounded bg-blue-500 text-white ml-2 flex"
                  onClick={adicionarColaboradorClick}
                >
                  <IoMdAdd className='text-xl mt-0.5' /> Adicionar Colaborador
                </button>
              )}
            </div>

            <div className="flex flex-col h-[550px] w-[1440px] overflow-x-scroll overflow-y-auto">
              {/* Cabeçalho */}
              <div className="flex text-gray-500 bg-white w-[3101px]">
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
                <div className={`flex text-gray-500 w-[3101px]`}>
                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '59px' }}>
                    <div className="flex items-center">
                    </div>
                  </div>
                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '200px' }}>
                    <select
                      value={selectedFilterValue['STATUS']}
                      onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'STATUS': e.target.value })}
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
                      onClick={() => handleSearchByFilter('STATUS', selectedFilterValue['STATUS'])}
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
                      value={selectedFilterValue['NOME_TERCEIRO']}
                      onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'NOME_TERCEIRO': e.target.value })}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('NOME_TERCEIRO').map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSearchByFilter('NOME_TERCEIRO', selectedFilterValue['NOME_TERCEIRO'])}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '300px' }}>
                    <select
                      value={selectedFilterValue['CNPJ']}
                      onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CNPJ': e.target.value })}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('CNPJ').map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSearchByFilter('CNPJ', selectedFilterValue['CNPJ'])}
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
                  

                 

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '350px' }}>
                    <select
                      value={selectedFilterValue['CATEGORIA_PRINCIPAL']}
                      onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'CATEGORIA_PRINCIPAL': e.target.value })}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('CATEGORIA_PRINCIPAL').map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleSearchByFilter('CATEGORIA_PRINCIPAL', selectedFilterValue['CATEGORIA_PRINCIPAL'])}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '350px' }}>
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






                </div>
              )}

              {documents.docs.rows.map((document: any, index) => (
                /* Tamanho total tabela registros */
                <div className='w-[1440px]' key={document.id || index}>
                  <div
                    className={`flex text-gray-700 whitespace-nowrap w-[2801px] overflow-x-auto  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                    key={document.id || Math.random().toString()}
                  >
                    {Object.keys(columnWidths).map((column) => (
                      <div
                        key={column}
                        className={`column-cell border border-gray-300 py-2`}
                        style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                      >
                        {column === '' ? (
                          <div className='flex justify-center'>
                            {isAdmin != "outsourcedRead" && (
                              <Link href={{ pathname: '/find-collaborator', query: { id: document.ID_USUARIO } }}>
                                <IoIosSearch className='text-xl mt-0.5 mx-0.5' />
                              </Link>
                            )}
                            {/* <button onClick={() => deleteAccountClick(document)}>
                                <FaTrashAlt className='text-xl mt-0.5 w-[12px] text-red-500 mx-0.5' />
                            </button> */}
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
        )}

        <div className="flex mt-4 justify-between border-t border-gray-300 items-center mt-4 w-[1440px]">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`border border-gray-200 px-4 py-2 rounded bg-blue-500 text-white ${currentPage === 1 || getAll ? 'invisible' : ''}`}
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
            className={`border border-gray-200 px-4 py-2 rounded bg-blue-500 text-white ${currentPage * pageSize >= documents.docs.outsourcedCount || getAll ? 'invisible' : ''}`}
          >
            Próxima Página
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;