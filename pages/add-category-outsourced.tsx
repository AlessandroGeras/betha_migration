import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';

const AddOutsourced = () => {
    const [formData, setFormData] = useState({
        categorias: [] as string[],
        nomeTerceiro: '',
        categoria: '',
        categoria_terceiro: '',
    });

    const [categoriaOptions, setCategoriaOptions] = useState<{ CATEGORIA: string }[]>([]);
    const [categoriaDetails, setCategoriaDetails] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const router = useRouter();
    const [isTokenVerified, setTokenVerified] = useState(false);
    const [enterprises, setEnterprises] = useState([]);
    const { id } = router.query;

    const closeModal = () => {
        setShowModal(false);
    };

    const resetForm = () => {
        setFormData({
            categorias: [],
            nomeTerceiro: '',
            categoria: '',
            categoria_terceiro: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };

    const handleSelectChange = (e) => {
        const selectedCategoria = e.target.value;

        if (formData.categorias.includes(selectedCategoria)) {
            const updatedCategorias = formData.categorias.filter((categoria) => categoria !== selectedCategoria);
            setFormData({ ...formData, categorias: updatedCategorias });
        } else {
            setFormData({ ...formData, categorias: [...formData.categorias, selectedCategoria] });
        }
    };

    const removeCategoria = (removedCategoria) => {
        const updatedCategorias = formData.categorias.filter((categoria) => categoria !== removedCategoria);
        setFormData({ ...formData, categorias: updatedCategorias });
    };

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();

        if (formData.categoria_terceiro === "" || formData.categorias.length === 0) {
            setPopupMessage('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
            setShowModal(true);
            setModalColor('#e53e3e');
            setTextColor('#e53e3e');
            return;
        }

        try {
            const token = localStorage.getItem('Token');

            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch('/api/store-category-outsourced', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData, token
                }),
            });

            if (!response.ok) {
                setPopupMessage('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível criar a categoria. Verifique se os dados estão preenchidos.');
            }

            const responseData = await response.json();

            setPopupMessage('Categoria criada com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
            resetForm();
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    const handleSubmitCancel = () => {
        router.push('/category-outsourced');
    };

    useEffect(() => {
        const fetchCategoriaOptions = async () => {
            try {
                const token = localStorage.getItem('Token');
                const id_user = localStorage.getItem('FontanaUser');

                if (!token) {
                    router.push('/login');
                    return;
                }

                const getAll = true;

                const response = await fetch(`/api/find-category-outsourced`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, getAll, id, id_user }),
                });

                const data = await response.json();

                console.log(data);
                if (response.status === 401) {
                    router.push('/login');
                }
                else if (response.status === 403) {
                    router.push('/403');
                } else {

                    setTokenVerified(true);
                    setEnterprises(data.uniqueEnterprises);

                    const updatedCategoriaDetails = {};

                    data.docs.rows.forEach((categoria) => {
                        updatedCategoriaDetails[categoria.CATEGORIA] = {
                            campo1: categoria.NUMERACAO,
                            campo2: categoria.FORMATO_VENCIMENTO,
                            campo3: categoria.AUDITORIA,
                        };
                    });

                    setCategoriaDetails(updatedCategoriaDetails);

                }
                setCategoriaOptions(data.success ? data.docs.rows : []);
            } catch (error) {
                console.error('Erro ao obter opções de categoria:', error);
            }
        };

        fetchCategoriaOptions();
    }, [router]);

    return (
        <div>

            {isTokenVerified && (<div>
                <div className="flex h-screen">
                    <Sidebar />
                    <Head>
                        <title>Adicionar categoria</title>
                    </Head>

                    <div className="flex-1 items-center justify-center bg-gray-50">
                        <div className="bg-blue-500 text-white p-2 text-left mb-36 w-full">
                            <span className="ml-2">Adicionar categoria de Terceiro</span>
                        </div>
                        <div className="grid grid-cols-7 gap-4 w-[300px] mx-auto">
                            <div className="col-span-7">
                                <label htmlFor="categoria_terceiro" className="block text-sm font-medium text-gray-700">
                                    Categoria de Terceiro <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="categoria_terceiro"
                                    id="categoria_terceiro"
                                    onChange={handleInputChange}
                                    required
                                    value={formData.categoria_terceiro}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>


                            <div className="col-span-7">
                                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                                    Tipo de Documento <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="categoria"
                                    id="categoria"
                                    value={formData.categoria}
                                    onChange={(e) => handleSelectChange(e)}
                                    required
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="" disabled selected>
                                        Selecione um documento
                                    </option>
                                    {categoriaOptions.map((categoria) => (
                                        <option key={categoria.CATEGORIA} value={categoria.CATEGORIA}>
                                            {categoria.CATEGORIA}
                                        </option>
                                    ))}
                                </select>
                                {formData.categorias.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm font-medium text-gray-700">Documentos selecionados:</p>
                                        <ul className="list-disc pl-4">
                                            {formData.categorias.map((selectedCategoria) => (
                                                <li key={selectedCategoria} className="flex items-center justify-between">
                                                    {selectedCategoria}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCategoria(selectedCategoria)}
                                                        className="text-red-500"
                                                    >
                                                        Remover
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>





                            <div className="col-span-7 flex justify-center mt-4">
                                <button
                                    type="submit"
                                    onClick={handleSubmitCancel}
                                    className="bg-red-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmitSuccess}
                                    className="bg-blue-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="modal-content bg-white p-8 mx-auto my-4 rounded-lg w-1/2 relative flex flex-row relative">
                                <style>
                                    {`
                            .modal-content::before {
                                content: '';
                                background-color: ${modalColor};
                                width: 4px;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                            }
                        `}
                                </style>

                                <button
                                    className={`absolute top-2 right-2 text-${textColor === '#3f5470' ? 'blue' : 'red'}-500`}
                                    onClick={closeModal}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>

                                <div className={`text-md text-center flex-grow`} style={{ color: textColor }}>
                                    {popupMessage}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>)}
        </div>
    );
};

export default AddOutsourced;
