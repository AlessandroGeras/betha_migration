import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DemoPage from './documentos-table/data';

const Dashboard = () => {

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error);
                } else {
                    setShowAll(true);
                }
            } catch (error) {
                setPopupMessage(error.message);
                setShowModal(true);
                router.push('/');
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
                <title>Documentos</title>
            </Head>

            <div className="flex-1 bg-white" id="Dashboard">
                <div className="bg-orange-600 text-white p-2 text-left w-full">
                    <span className='ml-2'>Documentos</span>
                </div>

                <div className="flex items-center justify-center px-10 mt-[-25px] ">
                    <div className="container mx-auto">
                        <div className='items-center '>
                           
                            <DemoPage />

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
        </div >
    );
};

export default Dashboard;
