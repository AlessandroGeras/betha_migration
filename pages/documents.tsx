import React, { useEffect, useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import { IoMdAdd, IoIosSearch } from 'react-icons/io';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';

const Documents = () => {
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
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#e53e3e');
  const [forceEmail, setForceEmail] = useState(false);

  const router = useRouter();

  const addDocPendenteClick = () => {
    router.push('/add-pending-document');
};

  const columnWidths = {
    '': '30px',
    'STATUS': '100px',
    'TIPO_DOCUMENTO': '300px',
    'TERCEIRO': '345px',
    'COLABORADOR': '340px',
    'VENCIMENTO': '320px',
  };

  const columnLabels = {
    '': '',
    'STATUS': 'STATUS',
    'TIPO_DOCUMENTO': 'TIPO_DOCUMENTO',
    'CNPJ': 'CNPJ',
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
      const response = await fetch(`/api/documents?page=${currentPage}&pageSize=${pageSize}`);
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

  const fetchData2 = async () => {
    try {
      const response = await fetch(`/api/scheduler`);
      const data = await response.json();

    } catch (error) {
      console.error('Erro ao iniciar o serviço de cobrança automática:', error);
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
    fetchData2();
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

  const formatBrDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, 'dd/MM/yyyy');
  };


  const cobrarDocumentosClick = async () => {

    try {
      const response = await fetch('http://localhost:3000/api/scheduler', {
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

  const enviarCobrançaClick = async () => {

    closeModal();

    try {
      const response = await fetch('http://localhost:3000/api/send-mail-documents', {
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
    setForceEmail(false);
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
                  Carregando documentos...
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
              <div className='flex ml-auto'>
                <button
                  className="border border-gray-300 px-2 py-1 rounded bg-blue-500 text-white flex"

                >
                  <span className=''> Imprimir doc(s) </span>
                </button>
                <button
                  className="border border-gray-300 px-2 py-1 rounded bg-blue-500 text-white flex mx-2"
                  onClick={addDocPendenteClick}
                >
                  <IoMdAdd className='text-xl mt-0.5' />Incluir pendências de documento
                </button>
                <button
                  className="border border-gray-300 px-2 py-1 rounded bg-blue-500 text-white ml-auto flex"
                  onClick={cobrarDocumentosClick}
                >
                  <span className=''> Cobrar documentos </span>
                </button>
              </div>
            </div>
            <div className="flex flex-col  h-[550px] overflow-x-scroll overflow-y-auto">
              <div className="flex text-gray-500 bg-white ">
                {Object.keys(columnWidths).map((column) => (
                  <div
                    key={column}
                    className={`header-cell border border-gray-300 py-1 pl-1 cursor-pointer flex`}
                    style={{ width: column === 'CIDADE' ? (pageSize === 10 ? '310px' : '290px') : columnWidths[column] }}
                    onClick={() => handleSort(column)}
                  >
                    {columnLabels[column]}
                    <div className='ml-auto flex'>
                      {column !== '' && (
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
                  className={`flex text-gray-700 whitespace-nowrap w-[1435px]  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
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
        {!documents.success && <p>Não foi possível obter os documentos.</p>}
      </div>
    </div>
  );
};

export default Documents;
