import React, { useEffect, useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { IoMdAdd, IoIosSearch } from 'react-icons/io';
import { FaTrashAlt } from "react-icons/fa";
import { HiPrinter } from "react-icons/hi2";
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Link from 'next/link';
import { format } from 'date-fns';


const Users = () => {
  const [originalData, setOriginalData] = useState([]);
  const [userID, setUserID] = useState<User>({ ID_DOCUMENTO: '' });
  const [documents, setDocuments] = useState({ success: false, docs: { rows: [] as Document[], count: 0, outsourcedCount: 0 } });
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
  const [filteredData, setFilteredData] = useState<Document[]>([]);
  const [isTokenVerified, setTokenVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [popupMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#e53e3e');
  const [getAll, setGetAll] = useState(false);
  const [forceEmail, setForceEmail] = useState(false);
  const { due_date } = router.query;
  //const [dueDateFetchCompleted, setDueDateFetchCompleted] = useState(false);
  const [viewAll, setViewAll] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [fileUrl, setFileUrl] = useState('');


  interface Document {
    ID_DOCUMENTO: string;
    ID_USUARIO: string;
    id: string;
    STATUS: string;
  }

  interface User {
    ID_DOCUMENTO: string;
  }


  const printClick = async (id) => {

    try {

      if (!id) {
        return
      }

      const token = localStorage.getItem('Token');

      if (!token) {
        router.push('/login');
        return;
      }

      const getAll = true;

      const response = await fetch(`/api/find-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, id }),
      });

      const data = await response.json();

      if (response.status === 401) {
        setModalMessage('Não foi possível obter o documento para impressão.');
        setShowModal(true);
        setModalColor('#e53e3e');
        setTextColor('#e53e3e');
      } else {



        try {
          if (data.docs.ANEXO) {
            const apiUrl = `/api/upload?filename=${data.docs.ANEXO}`;

            const pegardoc = await fetch(apiUrl);

            if (!pegardoc.ok) {
              throw new Error('Erro ao buscar anexo');
            }

            window.open(pegardoc.url, '_blank');
          }
        } catch (error: any) {
          console.error('Error:', error.message);
        }

        setTokenVerified(true);
        setLoading(false);

      }
    } catch (error) {
      console.error('Erro ao obter opções de documento:', error);
    }
  };




  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const userPermission = localStorage.getItem('permission');
    if (userRole == 'internal') {
      setViewAll(true);
    }
    else {
      setViewAll(false);
    }

    if (userPermission == 'read') {
      setIsAdmin(false);
    }
  }, []);

  const addDocPendenteClick = () => {
    router.push('/add-pending-document');
  };

  const addDocPendenteCollaboratorClick = () => {
    router.push('/add-pending-document-collaborator');
  };

  const deleteAccountClick = (document) => {
    setModalMessage('Tem certeza que deseja excluir o documento <span style="color: red;">' + document.TIPO_DOCUMENTO + '</span>?');
    setShowModal(true);
    setShowModal2(true);
    setModalColor('#3f5470');
    setTextColor('#3f5470');
    setUserID(document);
  };


  const deletarDocumento = async () => {
    try {
      const token = localStorage.getItem('Token');

      if (!token) {
        // Se o token não estiver presente, redirecione para a página de login
        router.push('/login');
        return;
      }

      const usuario = userID.ID_DOCUMENTO;

      const response = await fetch(`/api/delete-document`, {
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
            rows: documents.docs.rows.filter((user) => user.ID_DOCUMENTO !== usuario),
            count: documents.docs.count - 1,
            outsourcedCount: documents.docs.outsourcedCount,
          },
        };

        setDocuments(updatedDocs);

        // Atualize também o estado filteredData
        setFilteredData(updatedDocs.docs.rows);

        setModalMessage('Documento excluido');
        setShowModal(true);
        setShowModal2(false);
        setModalColor('#3f5470');
        setTextColor('#3f5470');
      }
    } catch (error) {
      console.error('Erro ao excluir o documento:', error);
    } finally {

    }
  };



  const columnWidths = {
    '': '69px',
    'STATUS': '200px',
    'TIPO_DOCUMENTO': '2000px',
    'TERCEIRO': '350px',
    'COLABORADOR': '260px',
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
      /* if (getAll && documents.docs.count > 100) {
        setLoading(true);
      } */
      setLoading(true);

      const token = localStorage.getItem('Token');
      const id = localStorage.getItem('FontanaUser');
      const role = localStorage.getItem('role');

      if (!token) {
        // Se o token não estiver presente, redirecione para a página de login
        router.push('/login');
        return;
      }

      let endpoint;
      switch (due_date) {
        case 'due_date_30':
          endpoint = `/api/documents-due_date_30?page=${currentPage}&pageSize=${pageSize}`;
          break;
        case 'due_date':
          endpoint = `/api/documents-due_date?page=${currentPage}&pageSize=${pageSize}`;
          break;
        case 'due_date':
          endpoint = `/api/documents-missing?page=${currentPage}&pageSize=${pageSize}`;
          break;
        case 'analysis':
          endpoint = `/api/documents-analysis?page=${currentPage}&pageSize=${pageSize}`;
          break;
        default:
          endpoint = `/api/documents?page=${currentPage}&pageSize=${pageSize}`;
          break;
      }

      const response = await fetch(endpoint, {
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
        setUserID(data.user.ID_USUARIO);
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

    const availableValues = handleFilterValue(column);

    if (value === "Próximos 30 dias") {
      router.query.due_date = "due_date_30";
      return
    }

    if (value === "Vencidos") {
      router.query.due_date = "due_date";
      return
    }

    if (value === "Pendentes") {
      router.query.due_date = "missing";
      return
    }

    if (value === "Em Análise") {
      router.query.due_date = "analysis";
      return
    }


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
        setLoading(true);

        const token = localStorage.getItem('Token');
        const id = localStorage.getItem('FontanaUser');
        const role = localStorage.getItem('role');

        if (!token) {
          // Se o token não estiver presente, redirecione para a página de login
          router.push('/login');
          return;
        }

        let endpoint;
        switch (due_date) {
          case 'due_date_30':
            endpoint = `/api/documents-due_date_30?page=${currentPage}&pageSize=${pageSize}`;
            break;
          case 'due_date':
            endpoint = `/api/documents-due_date?page=${currentPage}&pageSize=${pageSize}`;
            break;
          case 'missing':
            endpoint = `/api/documents-missing?page=${currentPage}&pageSize=${pageSize}`;
            break;
          case 'analysis':
            endpoint = `/api/documents-analysis?page=${currentPage}&pageSize=${pageSize}`;
            break;
          default:
            endpoint = `/api/documents?page=${currentPage}&pageSize=${pageSize}`;
            break;
        }

        const response = await fetch(endpoint, {
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
  };


  const handleClearSearch = () => {
    router.query.due_date = '';

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

    if (due_date == "due_date_30" || due_date == "due_date" || due_date == "missing" || due_date == "analysis") {
      if (column === 'VENCIMENTO') {
        return [...uniqueValues];
      }
    }

    else {
      if (column === 'VENCIMENTO') {
        return ['Próximos 30 dias', "Vencidos", "Pendentes", "Em Análise", ...uniqueValues];
      }
      return [...uniqueValues];
    }

    return uniqueValues;
  };

  useEffect(() => {
    const fetchDataWithFilter = async () => {
      try {
        setLoading(true);
        /* if (getAll && documents.docs.count > 100) {
          setLoading(true);
        } */

        const token = localStorage.getItem('Token');
        const id = localStorage.getItem('FontanaUser');
        const role = localStorage.getItem('role');

        if (!token) {
          // Se o token não estiver presente, redirecione para a página de login
          router.push('/login');
          return;
        }

        let endpoint;

        if (due_date) {
          switch (due_date) {
            case 'due_date_30':
              endpoint = `/api/documents-due_date_30?page=${currentPage}&pageSize=${pageSize}`;
              break;
            case 'due_date':
              endpoint = `/api/documents-due_date?page=${currentPage}&pageSize=${pageSize}`;
              break;
            case 'missing':
              endpoint = `/api/documents-missing?page=${currentPage}&pageSize=${pageSize}`;
              break;
            case 'analysis':
              endpoint = `/api/documents-analysis?page=${currentPage}&pageSize=${pageSize}`;
              break;
            default:
              endpoint = `/api/documents?page=${currentPage}&pageSize=${pageSize}`;
              break;
          }

          const responseDueDate = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, getAll, id, role }),
          });

          const dataDueDate = await responseDueDate.json();

          const filteredRowsDueDate = Object.keys(appliedFilterValue).reduce((filteredData, filterColumn) => {
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
          }, dataDueDate.docs.rows);

          const sortedRowsDueDate = sortRows(filteredRowsDueDate, sortColumn, sortOrder);

          setDocuments({
            success: dataDueDate.success,
            docs: {
              rows: sortedRowsDueDate,
              count: sortedRowsDueDate.length,
              outsourcedCount: dataDueDate.docs.outsourcedCount,
            },
          });

          //setDueDateFetchCompleted(true);
        } else {


          // Restante do código permanece o mesmo, mas agora é executado apenas na ausência de due_date
          endpoint = `/api/documents?page=${currentPage}&pageSize=${pageSize}`;
        }

        const response = await fetch(endpoint, {
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

  }, [router.query.due_date, getAll, appliedFilterValue, currentPage, pageSize, sortColumn, sortOrder, router, due_date]);



  const { success, docs } = documents;

  const formatBrDate = (isoDate) => {
    // Lógica especial para 'Todos' e 'Próximos 30 dias'
    if (isoDate === 'TODOS' || isoDate === 'Próximos 30 dias' || isoDate === 'Vencidos' || isoDate === 'Pendentes' || isoDate === 'Em Análise') {
      return isoDate;
    }

    try {
      // Tenta criar uma instância de Date
      const date = new Date(isoDate);

      // Verifica se a data é válida
      if (isNaN(date.getTime())) {
        console.error('Data inválida:', isoDate);
        throw new Error('Data inválida');
      }

      // Se a data for válida, formata como desejado
      return format(date, 'dd/MM/yyyy');
    } catch (error) {
      console.error('Erro ao formatar a data:', error);
      return 'Data inválida';
    }
  };


  const cobrarDocumentosClick = async () => {

    try {
      const response = await fetch('/api/scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setForceEmail(true);
        const messageWithLineBreaks = data.message.replace(/\n/g, '<br />');
        setModalColor('#3f5470');
        setTextColor('#3f5470');
        setModalMessage(messageWithLineBreaks);
        setShowModal(true);
        setShowModal2(false);

      } else {
        setModalColor('#3f5470');
        setTextColor('#3f5470');
        setModalMessage(data.message);
        setShowModal(true);
        setShowModal2(false);
      }
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
    }
  };

  const enviarCobrançaClick = async () => {

    closeModal();

    try {
      const response = await fetch('/api/send-mail-documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setModalColor('#3f5470');
        setTextColor('#3f5470');
        setModalMessage(data.message);
        setShowModal(true);

      } else {
        setModalColor('#3f5470');
        setTextColor('#3f5470');
        setModalMessage(data.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setForceEmail(false);
  };



  return (
    <div className='flex'>
      <Sidebar />

      <div className="flex-1" id="Dashboard">
        <div className="bg-blue-500 text-white p-2 text-left w-full">
          {due_date === "due_date_30" ? (
            <span className='ml-2'>Documentos A Vencer - View Dinâmica</span>
          ) : due_date === "due_date" ? (
            <span className='ml-2'>Documentos Vencidos - View Dinâmica</span>
          ) : due_date === "missing" ? (
            <span className='ml-2'>Documentos Pendentes - View Dinâmica</span>
          ) : due_date === "analysis" ? (
            <span className='ml-2'>Documentos Em Análise - View Dinâmica</span>
          ) : (
            <span className='ml-2'>Documentos</span>
          )}

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className={`text-md text-center flex-grow`} style={{ color: textColor }}>
                <div dangerouslySetInnerHTML={{ __html: popupMessage }} />

                {forceEmail && (<div className='flex'>
                  <button className="mx-auto mt-4 w-[300px]" onClick={enviarCobrançaClick}>
                    <span className="bg-blue-950 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                      Forçar cobrança automática agora
                    </span>
                  </button>
                  <button className="mx-auto mt-4 w-[300px]" onClick={closeModal} id="Cobrança">
                    <span className="bg-red-700 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                      Fechar e permitir a cobrança às 18:00
                    </span>
                  </button>
                </div>)}

                {showModal2 && (<div className='flex'>
                  <button className="mx-auto mt-4 w-[300px]" onClick={deletarDocumento}>
                    <span className="bg-blue-950 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                      Excluir documento
                    </span>
                  </button>
                  <button className="mx-auto mt-4 w-[300px]" onClick={closeModal} id="Cobrança">
                    <span className="bg-red-700 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                      Cancelar e fechar
                    </span>
                  </button>
                </div>)}


              </div>
            </div>
          </div>
        )}

      {/* LARGURA DAS OPÇÕES DE CAIXA RÁPIDA E OUTROS MENUS */}
        {documents.success && (
          <div className='w-[1440px]'>
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
              {viewAll && isAdmin && (<div className='flex ml-auto'>
                <button
                  className="border border-gray-300 px-2 py-1 rounded bg-blue-500 text-white flex"
                  onClick={addDocPendenteClick}
                >
                  <IoMdAdd className='text-xl mt-0.5' />Incluir pendências de Terceiro
                </button>
                <button
                  className="border border-gray-300 px-2 py-1 rounded bg-blue-500 text-white flex mx-2"
                  onClick={addDocPendenteCollaboratorClick}
                >
                  <IoMdAdd className='text-xl mt-0.5' />Incluir pendências de Colaborador
                </button>
                <button
                  className="border border-gray-300 px-2 py-1 rounded bg-blue-500 text-white ml-auto flex"
                  onClick={cobrarDocumentosClick}
                >
                  <span className=''> Cobrar documentos </span>
                </button>
              </div>)}
            </div>

          {/* LARGURA DA LISTA PRINCIPAL */}
            <div className="flex flex-col h-[550px] w-[3140px] overflow-y-auto text-ellipsis overflow-hidden">
              {/* LARGURA DOS FILTROS DA LISTA - ACOMPANHA A LARGURA DA LISTA PRINCIPAL */}
              <div className="flex text-gray-500 bg-white w-[3140px]">
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

            {/* LARGURA DOS CAMPOS DE FILTRO INTERNOS */} 
              {filterOpen && (
                <div className={`flex text-gray-500 w-[3140px]`}>
                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '69px' }}>
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

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '2000px' }}>
                    <select
                      value={selectedFilterValue['TIPO_DOCUMENTO']}
                      onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'TIPO_DOCUMENTO': e.target.value })}
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
                      onClick={() => handleSearchByFilter('TIPO_DOCUMENTO', selectedFilterValue['TIPO_DOCUMENTO'])}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>



                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '350px' }}>
                    <select
                      value={selectedFilterValue['TERCEIRO']}
                      onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'TERCEIRO': e.target.value })}
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
                      onClick={() => handleSearchByFilter('TERCEIRO', selectedFilterValue['TERCEIRO'])}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>

                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '260px' }}>
                    <select
                      value={selectedFilterValue['COLABORADOR']}
                      onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'COLABORADOR': e.target.value })}
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
                      onClick={() => handleSearchByFilter('COLABORADOR', selectedFilterValue['COLABORADOR'])}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>


                  <div className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`} style={{ width: '260px' }}>
                    <select
                      value={selectedFilterValue['VENCIMENTO']}
                      onChange={(e) => setSelectedFilterValue({ ...selectedFilterValue, 'VENCIMENTO': e.target.value })}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="">Todos</option>
                      {handleFilterValue('VENCIMENTO').map((value, index) => (
                        <option
                          key={value}
                          value={value}
                          className={index >= 0 && index <= 3 && !(due_date === "due_date_30" || due_date === "due_date" || due_date === "missing" || due_date === "analysis") ? 'bg-blue-100' : ''}
                        >
                          {formatBrDate(value)}
                        </option>
                      ))}


                    </select>
                    <button
                      onClick={() => handleSearchByFilter('VENCIMENTO', selectedFilterValue['VENCIMENTO'])}
                      className="border border-gray-300 px-2 py-1 ml-2 rounded bg-blue-500 text-white"
                    >
                      Aplicar
                    </button>
                  </div>





                </div>
              )}

              {documents.docs.rows.map((document, index) => (
                <div className='w-[8140px] bg-red-500' key={document.id || Math.random().toString()}>
                  <div
                    className={`flex text-red-700 whitespace-nowrap w-[8140px] text-ellipsis overflow-hidden bg-red-500  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                  >
                    {Object.keys(columnWidths).map((column) => (
                      <div
                        key={column}
                        className={`column-cell border border-gray-300 py-2`}
                        style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                      >
                        {column === 'VENCIMENTO' || column === 'NOTIFICACAO' ? (
                          document[column] !== null ? formatBrDate(document[column]) : ''
                        ) : (
                          column === '' ? (
                            <div className='flex justify-center'>
                              {((!viewAll && (document.STATUS == 'Pendente' || document.STATUS == 'Reprovado')) || (viewAll && document.STATUS != 'Pendente') || document.STATUS == 'Ativo') && (
                                <Link href={{ pathname: '/find-document', query: { id: document.ID_DOCUMENTO } }}>
                                  <IoIosSearch className='text-xl mt-0.5 mx-0.5' />
                                </Link>
                              )}
                              {(viewAll && document.STATUS != 'Pendente') && (
                                <button onClick={() => printClick(document.ID_DOCUMENTO)}>
                                  <HiPrinter className='mt-0.5 w-[18px] mr-0.5' />
                                </button>
                              )}
                              {viewAll && document.STATUS == 'Pendente' && isAdmin && (
                                <button onClick={() => deleteAccountClick(document)}>
                                  <FaTrashAlt className='mt-0.5 w-[12px] text-red-500 mx-0.5' />
                                </button>
                              )}
                            </div>
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

        {/* LARGURA DO RODAPÉ */}
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
  );
};

export default Users;