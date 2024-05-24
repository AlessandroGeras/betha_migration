import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DemoPage from './visualizar-banco-table/data';

const Layouts = () => {
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    const [tamanhoBase, setTamanhoBase] = useState(0); // Assume initial value is in KB
    const [tamanhoMigracao, setTamanhoMigracao] = useState(0);
    const [percentual, setPercentual] = useState(0);
    const [percentualExecutado, setPercentualExecutado] = useState(10);

    const convertKbToGb = (kb) => {
        return parseFloat((kb / (1024 * 1024)).toFixed(2)); // Convert and round to 2 decimal places
    };

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    // Fetching data from /api/auth
                    const authResponse = await fetch(`/api/auth`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const authData = await authResponse.json();

                    if (!authResponse.ok) {
                        throw new Error(authData.error);
                    } else {
                        setShowAll(true);
                    }

                    // Fetching data from /api/visualizar-banco
                    const bancoResponse = await fetch(`/api/visualizar-banco`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id }),
                    });

                    const bancoData = await bancoResponse.json();

                    if (bancoData && bancoData.success) {
                        setTamanhoBase(bancoData.success[0].tamanho);
                    } else {
                        throw new Error('Falha ao obter dados dos parceiros.');
                    }

                    // Fetching data from /api/visualizar-script
                    const scriptResponse = await fetch(`/api/visualizar-script`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id }),
                    });

                    const scriptData = await scriptResponse.json();

                    if (scriptData && scriptData.success) {
                        const totalTamanho = scriptData.success
                            .filter(item => item.status === "Concluído")
                            .reduce((acc, item) => acc + item.tamanho, 0);
                        const totalTamanhoGb = convertKbToGb(totalTamanho);
                        setTamanhoMigracao(totalTamanhoGb);

                        // Set percentual only if tamanhoBase is not zero
                        if (tamanhoBase !== 0) {
                            setPercentual((totalTamanho / tamanhoBase) * 100);
                        } else {
                            setPercentual(0); // or handle this case appropriately
                        }
                    } else {
                        throw new Error('Falha ao obter dados dos parceiros.');
                    }
                } catch (error) {
                    setPopupMessage(error.message);
                    setShowModal(true);
                    router.push('/');
                }
            }
        };

        fetchData();
    }, [id, tamanhoBase]);

    const closeModal = () => {
        setShowModal(false);
    };

    return showAll && (
        <div className='flex'>
            <Sidebar />
            <Head>
                <title>Visualizar banco</title>
            </Head>

            <div className="flex-1 bg-white" id="Dashboard">
                <div className="bg-orange-600 text-white p-2 text-left w-full">
                    <span className='ml-2'>Visualizar banco - {id}</span>
                </div>

                <div className="flex items-center justify-center pt-10 px-20 bg-gray-100">
                    <div className="container mx-auto">
                        <div className='items-center '>
                            <div className="flex justify-center mt-[-50px] mb-10 px-26">
                                <div className="mx-2 my-2 flex-1 px-3 py-3 text-center text-[#747474] font-lato">
                                    <div className="text-2xl font-medium">Dados de origem - CECAM</div>
                                    <img src="/img/database.png" alt="Descrição da imagem" className='w-[75px] mx-auto' />
                                </div>
                                <div className="mx-2 my-2 flex-1 px-3 py-3 text-center text-[#747474] font-lato">
                                    <div className="text-2xl font-medium">Dados de destino - BETHA</div>
                                    <img src="/img/database.png" alt="Descrição da imagem" className='w-[75px] mx-auto' />
                                </div>
                                {/* <div className="mx-2 my-2 flex-1 px-3 py-3 text-center text-[#747474] font-lato">
                                    <div className="text-2xl font-medium">Betha Cloud</div>
                                    <img src="/img/cloud.png" alt="Descrição da imagem" className='w-[75px] mx-auto mt-[20px]' />
                                </div> */}
                            </div>

                            <div className="flex justify-center mt-[-60px] px-26">
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center text-[#747474] font-lato">
                                    <div className="mt-[-15px] text-left">Tamanho da base de dados</div>
                                    <div className="mt-2 text-5xl font-medium">{convertKbToGb(tamanhoBase)} GB</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center text-[#747474] font-lato">
                                    <div className="mt-[-15px] text-left">Porcentagem enviada - Tamanho da base de dados enviada</div>
                                    <div className="mt-2 text-5xl font-medium">{percentual.toFixed(2)}% - {tamanhoMigracao} GB</div>
                                </div>
                                {/* <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center text-[#747474] font-lato">
                                    <div className="mt-[-15px] text-left">Percentual Executado</div>
                                    <div className="mt-2 text-5xl font-medium">{percentualExecutado}%</div>
                                </div> */}
                            </div>

                            {id && <DemoPage id={id as string} />}
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-row relative">
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
        </div>
    );
};

export default Layouts;
