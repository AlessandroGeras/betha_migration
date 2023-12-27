import React from 'react';

const Documents = () => {
  // Dados de exemplo
  const tableData = [
    { col1: ' dgfg fgf fgf gfgdfd dsfd sfdsgf fdgfd fdgfsdg sdggdffdsf sdfdsf fdf df', col2: ' dsfdfdsfds dsfds dfd dfds dsf sdsfdsf dsfdsf sdfds dsfds dsfds dsfds ds df', col3: ' dsfdfdsfds dsfds dfd dfds dsf sdsfdsf dsfdsf sdfds dsfds dsfds dsfds ds df' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },
    { col1: 'Dado 4', col2: 'Dado 5', col3: 'Dado 6' },

    // Adicione mais linhas de dados conforme necessário
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sua Página</h1>
      <div className="min-w-screen h-[400px] overflow-x-scroll overflow-y-scroll">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b whitespace-nowrap">Coluna 1</th>
              <th className="py-2 px-4 border-b whitespace-nowrap">Coluna 2</th>
              <th className="py-2 px-4 border-b whitespace-nowrap">Coluna 3</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b whitespace-nowrap">{row.col1}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap">{row.col2}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap">{row.col3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
