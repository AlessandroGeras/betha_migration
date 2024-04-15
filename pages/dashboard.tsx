import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Dashboard = () => {    


   


    return (
        <div className='flex'>
            <Sidebar />
            <Head>
                <title>Dashboard</title>
            </Head>


            <div className="flex-1" id="Dashboard">
                {/* Barra Superior Azul Fixada no Topo */}
                
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
                            {/* Pseudo-elemento para a barra lateral */}
                            <div className="text-blue-500 text-md text-center flex-grow">
                                <div className="flex items-center justify-center h-full text-4xl">
                                    Carregando informações...
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="bg-blue-500 text-white p-2 text-left mb-4 w-full">
                    {/* Conteúdo da Barra Superior, se necessário */}
                    <span className='ml-2'>Página Inicial</span>
                </div>

                <div className="flex items-center justify-center h-5/6 pt-28 px-20">
                    <div className="container mx-auto">
                        {/* Área de Documentos a Vencer */}
                        <div className='items-center '>
                        
                        <div className="flex justify-center mt-[-40px] mb-24 px-26">
                                {/* Três Divs Centralizadas Lado a Lado */}
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                                    <div className="mt-[-15px]">Quantidade de documentos ativos</div>
                                    <div className="mt-2 text-4xl text-gray-600"></div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                                    <div className="mt-[-15px]">Quantidade de terceiros ativos</div>
                                    <div className="mt-2 text-4xl text-gray-600"></div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                                    <div className="mt-[-15px]">Quantidade de colaboradores ativos</div>
                                    <div className="mt-2 text-4xl text-gray-600"></div>
                                </div>
                            </div>

                            <div className="flex justify-center px-32 relative top-[-30px]">
                                {/* Duas Divs Centralizadas Lado a Lado */}
                                <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                                    <div className="mt-[-15px] text-2xl text-gray-600">Documentos a vencer</div>
                                    <div className="mt-2 text-gray-600 text-sm">Documentos com 30 dias ou menos da data de vencimento</div>
                                    <Link href="/documents?due_date=due_date_30">
                                        <div className={`mt-2 flex justify-center mx-auto w-[115px] `}>
                                            <div className="text-gray-600 text-5xl text-white py-2 mt-[-6px]"></div>
                                        </div>
                                    </Link>
                                    <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                                    <div className="mt-[-15px] text-2xl text-gray-600">Documentos vencidos</div>
                                    <div className="mt-2 text-gray-600 text-sm">Documentos com data inferior ao dia atual</div>
                                    <Link href="/documents?due_date=due_date">
                                        <div className={`mt-2 flex justify-center mx-auto w-[115px] `}>
                                            <div className="text-gray-600 text-5xl text-white py-2 mt-[-6px]"></div>
                                        </div>
                                    </Link>
                                    <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
                                </div>
                            </div>
                            <div className="flex justify-center px-32 relative top-[-10px]">
                                {/* Duas Divs Centralizadas Lado a Lado */}
                                <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                                    <div className="mt-[-15px] text-2xl text-gray-600">Documentos pendentes</div>
                                    <div className="mt-2 text-gray-600 text-sm">Documentos solicitados e não enviados</div>
                                    <Link href="/documents?due_date=missing">
                                        <div className={`mt-2 flex justify-center mx-auto w-[115px] `}>
                                            <div className="text-gray-600 text-5xl text-white py-2 mt-[-6px]"></div>
                                        </div>
                                    </Link>
                                    <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                                    <div className="mt-[-15px] text-2xl text-gray-600">Documentos à analisar</div>
                                    <div className="mt-2 text-gray-600 text-sm">Documentos pendentes de análise</div>
                                    <Link href="/documents?due_date=analysis">
                                        <div className={`mt-2 flex justify-center mx-auto w-[115px] `}>
                                            <div className="text-gray-600 text-5xl text-white py-2 mt-[-6px]"></div>
                                        </div>
                                    </Link>
                                    <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    );
};

export default Dashboard;
