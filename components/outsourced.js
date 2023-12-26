import React, { useEffect, useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';

const Outsourced = ({ finishedLoading }) => {
  const [documents, setDocuments] = useState({
    success: false,
    docs: { rows: [], count: 0, outsourcedCount: 0 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('NM_USUARIO');

  const columnWidths = {
    'NM_USUARIO': '350px',
    'CNPJ': '200px',
    'ENDEREÇO': '350px',
    'CIDADE': '350px',
    'UF': '50px',
    'TELEFONE': '150px',
  };

  const sortRows = (rows, column, order) => {
    return rows.slice().sort((a, b) => {
      const valueA = a[column].toUpperCase();
      const valueB = b[column].toUpperCase();

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

  useEffect(() => {
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
        finishedLoading();
      }
    };
    fetchData();
  }, [currentPage, sortColumn, sortOrder]);

  const totalPages = Math.ceil((documents.docs && documents.docs.count) / pageSize) || 1;

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex-1" id="Dashboard">
      <div className="bg-blue-500 text-white p-2 text-left w-full">
        <span className='ml-2'>Terceiros</span>
      </div>

      {documents.success && (
        <div className="flex flex-col bg-gray-50">
          <div className="flex text-gray-500">
            {Object.keys(columnWidths).map((column) => (
              <div
                key={column}
                className={`header-cell border border-gray-200 py-1 pl-1 cursor-pointer flex`}
                style={{ width: columnWidths[column] }}
                onClick={() => handleSort(column)}>
                {column}
                <div className='ml-auto flex'>
                {sortColumn === column && (
                  sortOrder === 'asc' ? <span className="text-xl mt-[-3px]">↑</span> : <span className="text-xl mt-[-3px]">↓</span>
                )}
                <PiFunnelLight className='text-xl mt-0.5'/>
                </div>
              </div>
            ))}
          </div>

          {documents.docs.rows.map((document) => (
            <div className='flex text-gray-700' key={document.id || Math.random().toString()}>
              {Object.keys(columnWidths).map((column) => (
                <div key={column} className={`column-cell border border-gray-200 py-2 pl-1`} style={{ width: columnWidths[column] }}>
                  {document[column]}
                </div>
              ))}
            </div>
          ))}

          <div className="flex mt-4 justify-between border-t border-gray-200 pt-4">
            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="border border-gray-200 px-4 py-2 rounded">
              Página Anterior
            </button>
            <span>Página {currentPage}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="border border-gray-200 px-4 py-2 rounded">
              Próxima Página
            </button>
          </div>
        </div>
      )}

      {!documents.success && <p>Não foi possível obter os usuários terceirizados.</p>}
    </div>
  );
};

export default Outsourced;
