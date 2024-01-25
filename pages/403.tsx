import Link from 'next/link';

const Custom403 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl text-red-500 font-bold">403 - Acesso Negado</h1>
        <p className="text-gray-600 mt-4">Você não tem permissão para acessar esta página.</p>
        <Link href="/">
          <div className="text-blue-500 hover:underline mt-4 inline-block">Voltar para a Página Inicial</div>
        </Link>
      </div>
    </div>
  );
};

export default Custom403;
