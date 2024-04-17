import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DemoPage from './page';

const Dashboard = () => {

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();

    const options = ['Opção 1', 'Opção 2', 'Opção 3'];
    // Estado para armazenar a opção selecionada
    const [selectedOption, setSelectedOption] = useState(options[0]);
    // Função para lidar com a mudança na seleção
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        console.log('Município selecionado:', selectedValue);
    };

    const anoAtual = new Date().getFullYear();
    const [ano, setAno] = useState<string>(String(anoAtual));
    const handleAnoChange = (event) => {
        const selectedYear = event.target.value;
        setAno(selectedYear);
        console.log('Ano selecionado:', selectedYear);
    };

    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    // Estado para armazenar o mês selecionado
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    // Função para lidar com a mudança no mês selecionado
    const handleMonthSelectChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
        console.log('Mês selecionado:', selectedMonth);
    };

    const [receita, setReceita] = useState(500320);
    const [despesas, setDespesas] = useState(410320);
    const formattedReceita = receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedDespesas = despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedEndividamento = (receita - despesas).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`/api/dashboard`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error);
                }
                {
                    setShowAll(true);
                }

            } catch (error: any) {
                // Trate o erro, por exemplo, exiba uma mensagem de erro para o usuário
                //console.error('Erro:', error.message);
                setPopupMessage(error.message);
                setShowModal(true);
                router.push('/');
            }
            finally {

            }
        };

        fetchData();
    }, []);


    const closeModal = () => {
        setShowModal(false);
    };

    return showAll && (
        <div className='flex'>
            <Sidebar />
            <Head>
                <title>Dashboard</title>
            </Head>


            <div className="flex-1" id="Dashboard">
                {/* Barra Superior Azul Fixada no Topo */}

                <div className="bg-orange-600 text-white p-2 text-left w-full">
                    {/* Conteúdo da Barra Superior, se necessário */}
                    <span className='ml-2'>Página Inicial</span>
                </div>

                <div className="flex items-center justify-center h-5/6 pt-28 px-20 bg-gray-100">
                    <div className="container mx-auto">
                        {/* Área de Documentos a Vencer */}
                        <div className='items-center '>
                            <div className="flex justify-center mt-10 px-26">
                                {/* Três Divs Centralizadas Lado a Lado */}                                
                            </div>

                            
                            <div className="mx-2 my-2 px-0 py-3 text-left text-[#747474] font-lato text-left flex mb-12">
                                <div className='inline'>
                                    <div className="mt-[-15px] text-left mb-2"><span className='text-red-500 font-bold'>*</span>Município</div>
                                    <div>
                                        <select className="pr-44 pl-1 py-1" value={selectedOption} onChange={handleSelectChange}>
                                            {options.map((option, index) => (
                                                <option className="text-left" key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='inline mx-4'>
                                <div className="mt-[-15px] text-left mb-2"><span className='text-red-500 font-bold'>*</span>Ano</div>
                                    <div className=''>
                                        <input
                                            type="number"
                                            className="pl-2 py-0.5"
                                            placeholder="Ano"
                                            value={ano} // Use o valor diretamente como uma string
                                            onChange={handleAnoChange}
                                            min={1000} // Mínimo é 1000 (4 dígitos)
                                            max={anoAtual} // Máximo é o ano atual
                                        />
                                    </div>
                                </div>
                                <div className='inline'>
                                    <div className="mt-[-15px] text-left mb-2"><span className='text-red-500 font-bold'>*</span>Mês</div>
                                    <div>
                                        <select className="pr-0 pl-1 py-1" value={selectedMonth} onChange={handleMonthSelectChange}>
                                            {months.map((month, index) => (
                                                <option className="text-left" key={index} value={month}>{month}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className="flex justify-center mt-[-40px] px-26">
                                {/* Três Divs Centralizadas Lado a Lado */}
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center text-[#747474] font-lato">
                                    <div className="mt-[-15px] text-left">Receita (R$)</div>
                                    <div className="mt-2 text-5xl font-bold">{formattedReceita}</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center text-[#747474] font-lato">
                                    <div className="mt-[-15px] text-left">Despesas (R$)</div>
                                    <div className="mt-2 text-5xl font-bold">{formattedDespesas}</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center text-[#747474] font-lato">
                                    <div className="mt-[-15px] text-left">Endividamento (R$)</div>
                                    <div className="mt-2 text-5xl font-bold">{formattedEndividamento}</div>
                                </div>
                            </div>

                            <DemoPage />                            
                         
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-row relative">

                            {/* Pseudo-elemento para a barra lateral */}
                            <style>
                                {`
                  .modal-content::before {
                    content: '';
                    background-color: #e53e3e; /* Cor vermelha desejada */
                    width: 4px; /* Largura da barra lateral */
                    height: 100%; /* Altura da barra lateral */
                    position: absolute;
                    top: 0;
                    left: 0;
                  }
                `}
                            </style>

                            {/* Adicione o botão de fechamento estilo "X" */}
                            <button className="absolute top-2 right-2 text-red-500 hover:text-gray-700" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>

                            <div className="text-red-500 text-md text-center flex-grow">
                                {popupMessage}
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div >
    );
};

export default Dashboard;
