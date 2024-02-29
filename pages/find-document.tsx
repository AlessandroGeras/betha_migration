import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { useRef } from 'react';


const FindDocument = () => {

    const [showModal, setShowModal] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [modalColor, setModalColor] = useState('#e53e3e');
    const [textColor, setTextColor] = useState('#e53e3e');
    const [isTokenVerified, setTokenVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;
    const [file, setFile] = useState<File>();
    const [isAnalysis, setIsAlalysis] = useState('');
    const [viewAll, setViewAll] = useState(true);
    const [reproveAnalysis, setReproveAnalysis] = useState(false);
    const [aproveAnalysis, setAproveAnalysis] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [canRenew, setCanRenew] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const [isAdmin, setIsAdmin] = useState('');
    const [showReproveButton, setShowReproveButton] = useState(false);
    const [filename, setFilename] = useState('');
    const [minNotification, setMinNotification] = useState(0);

    const [formData, setFormData] = useState({
        documento: '',
        tipo_documento: [],
        vencimento: 'Periodo',
        dataVencimento: new Date().toISOString().split('T')[0],
        diasAntecipacao: '',
        notificacao: minNotification,
        auditoria: 'Não',
        identificacao: '',
        status: '',
        id_documento: '',
        nome_terceiro: '',
        dia: 1,
        arquivo: null,
        usuario_inclusao: '',
        data_inclusao: new Date().toISOString().split('T')[0],
        motivo: '',
        usuario_analise: '',
        data_analise: new Date().toISOString().split('T')[0],
        colaborador: '',
        campos_vencimento:'Não',
    });

    useEffect(() => {
        const userPermission = localStorage.getItem('permission');

        if (userPermission == 'read') {
            setIsAdmin('read');
        }
    }, []);

    const handlePrint = () => {
        if (iframeRef.current !== null && iframeRef.current.contentWindow !== null) {
            const iframeWindow = iframeRef.current.contentWindow;
            iframeWindow.focus();
            iframeWindow.print();
        }
    };

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (userRole == 'internal') {
            setViewAll(true);
        }
        else {
            setViewAll(false);
        }
    }, []);

    useEffect(() => {
        setIsAlalysis(formData.status);
    }, [formData.status]);

    useEffect(() => {
        if (formData.motivo !== "" && formData.motivo !== null) {
            setShowReproveButton(true);
        }
        else {
            setShowReproveButton(false);
        }
    }, [formData.motivo]);


    const closeModal = () => {
        setShowModal(false);
        setReproveAnalysis(false);
        setAproveAnalysis(false);

        if (isFinished) {
            router.push('/documents');
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFile(value);
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            alert('Por favor, selecione uma data atual ou futura.');
            return;
        }

        setFormData({ ...formData, dataVencimento: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, arquivo: file });
    };

    const calculateDaysAntecipation = () => {
        const dataVencimento = new Date(formData.dataVencimento).getTime(); // Convert to milliseconds
        const dataAtual = new Date().getTime(); // Convert to milliseconds
        const diffInMilliseconds = dataVencimento - dataAtual;
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

        setFormData({ ...formData, diasAntecipacao: diffInDays.toString() });
    };

    useEffect(() => {
        if (formData.vencimento === 'Periodo') {
            calculateDaysAntecipation();
        }
    }, [formData.dataVencimento, formData.vencimento, calculateDaysAntecipation]);



    useEffect(() => {
        const fetchCategoriaOptions = async () => {
            try {
                setLoading(true);

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
                    router.push('/login');
                } else {

                    const vencimento = new Date(data.docs.VENCIMENTO).getTime(); // Convert to milliseconds
                    const notificacao = data.docs.NOTIFICACAO ? new Date(data.docs.NOTIFICACAO).getTime() : null; // Convert to milliseconds or null
                    const diffInMilliseconds = notificacao ? vencimento - notificacao : 0;
                    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
                    const notificacaoDias = notificacao ? diffInDays : data.notificacao.NOTIFICACAO;

                    const isNotificationBeforeOrEqualToday = notificacao ? notificacao <= new Date().getTime() : false;
                    setCanRenew(isNotificationBeforeOrEqualToday);

                    setFormData({
                        documento: data.docs.TIPO_DOCUMENTO,
                        tipo_documento: [],
                        vencimento: data.docs.FORMATO_VENCIMENTO ? data.docs.FORMATO_VENCIMENTO : "Fixo",
                        dataVencimento: data.docs.VENCIMENTO ? format(new Date(data.docs.VENCIMENTO), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                        diasAntecipacao: '',
                        notificacao: notificacaoDias,
                        auditoria: data.categoria.AUDITORIA,
                        identificacao: data.docs.DOCUMENTO,
                        status: data.docs.STATUS,
                        id_documento: data.docs.ID_DOCUMENTO,
                        nome_terceiro: data.docs.TERCEIRO,
                        dia: data.docs.VENCIMENTO ? new Date(data.docs.VENCIMENTO).getDate() : 1,
                        usuario_inclusao: data.docs.USUARIO_INCLUSAO,
                        data_inclusao: format(new Date(data.docs.DATA_INCLUSAO), 'yyyy-MM-dd'),
                        motivo: data.docs.MOTIVO,
                        usuario_analise: data.docs.USUARIO_ANALISE,
                        data_analise: data.docs.DATA_ANALISE ? new Date(data.docs.DATA_ANALISE).toISOString().split('T')[0] : '',
                        arquivo: null, // or provide the appropriate value for arquivo here
                        colaborador: data.docs.COLABORADOR ? data.docs.COLABORADOR : '',
                        campos_vencimento: data.docs.COLABORADOR ? data.docs.COLABORADOR : 'Não',
                    });

                    setFilename(data.docs.ANEXO);
                }


                try {
                    if (data.docs.ANEXO) {
                        const apiUrl = `/api/upload?filename=${data.docs.ANEXO}`;

                        const pegardoc = await fetch(apiUrl);

                        if (!pegardoc.ok) {
                            throw new Error('Erro ao buscar anexo');
                        }

                        setFileUrl(pegardoc.url);
                    }
                } catch (error: any) {
                    console.error('Error:', error.message);
                    // Tratar o erro, mostrar uma mensagem ao usuário, etc.
                }

                const resposta = await fetch(`/api/configuration`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });

                const configuration = await resposta.json();

                console.log(configuration);

                if (resposta.status === 401) {
                    router.push('/login');
                } else {
                    setMinNotification(configuration.notificacao.NOTIFICACAO);
                }

                setTokenVerified(true);
                setLoading(false);

            } catch (error) {
                console.error('Erro ao obter opções de documento:', error);
            }
        };

        fetchCategoriaOptions();
    }, [id, router]);

    const handleSubmitSuccess = async (e) => {
        e.preventDefault();


        if (formData.identificacao === "" || formData.vencimento === "Fixo" || (isAnalysis == "Pendente" && !formData.arquivo)) {
            if (formData.dia === 0 || formData.dia > 31 || formData.dia === null || formData.dia === undefined) {
                if (formData.dia === null || formData.dia === undefined || formData.dia < 0) {
                    setPopupMessage('Não foi possível criar a categoria. Verifique se os dados estão corretos e preenchidos.');
                    setShowModal(true);
                    setModalColor('#e53e3e');
                    setTextColor('#e53e3e');
                    return;
                }
            }
        }



        try {
            const token = localStorage.getItem('Token');
            const id = localStorage.getItem('FontanaUser');
            const role = localStorage.getItem('role');
            let sendfile = '';

            if (!token) {
                router.push('/login');
                return;
            }


            const newForm = new FormData();
            if (formData.arquivo) {
                newForm.set('anexo', formData.arquivo);


                const resposta = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                    },
                    body: newForm,
                });

                sendfile = await resposta.json();
            }
            else {
                sendfile = filename;
            }

            const requestBody = {
                token: token,
                formData: formData,
                id: id,
                filename: sendfile,
                role: role,
            };

            const response = await fetch('/api/update-pending-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();


            if (response.status === 401) {
                router.push('/login');
            } else {
                setTokenVerified(true);
            }

            if (!response.ok) {
                setPopupMessage('Não foi possível criar a categoria. Verifique se os dados estão corretos e preenchidos.');
                setShowModal(true);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível criar a categoria. Verifique se os dados estão corretos e preenchidos.');
            }

            setIsAlalysis("Pendente");

            setPopupMessage('Documento atualizado com sucesso!');
            setShowModal(true);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
            setIsFinished(true);
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };

    const handleSubmitCancel = () => {
        router.back();
    };    

    const handleSubmitReprove = () => {
        setPopupMessage('Explique o motivo da reprovação do documento que será enviado ao Terceiro.');
        setShowModal(true);
        setReproveAnalysis(true);
        setModalColor('#3f5470');
        setTextColor('#3f5470');
    };


    const handleSubmitSendAnalysis = async (analysis) => {

        try {
            const token = localStorage.getItem('Token');
            const id = localStorage.getItem('FontanaUser');
            const role = localStorage.getItem('role');

            if (!token) {
                router.push('/login');
                return;
            }


            const requestBody = {
                token: token,
                formData: formData,
                id: id,
                role: role,
                analysis: analysis,
            };

            const response = await fetch('/api/update-pending-document-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();


            if (!response.ok) {
                setPopupMessage('Não foi possível alterar o documento');
                setShowModal(true);
                setReproveAnalysis(false);
                setModalColor('#e53e3e');
                setTextColor('#e53e3e');
                throw new Error('Não foi possível criar a categoria. Verifique se os dados estão corretos e preenchidos.');
            }

            setTokenVerified(true);

            setPopupMessage('Documento atualizado com sucesso!');
            setShowModal(true);
            setReproveAnalysis(false);
            setAproveAnalysis(false);
            setModalColor('#3f5470');
            setTextColor('#3f5470');
            setIsFinished(true);
        } catch (error) {
            console.error('Erro ao contatar o servidor:', error);
        }
    };


    const handleSubmitAprove = () => {
        setPopupMessage('Tem certeza que deseja aprovar a documentação?');
        setShowModal(true);
        setAproveAnalysis(true);
        setModalColor('#3f5470');
        setTextColor('#3f5470');
    };


    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 items-center justify-center bg-gray-50">
                <div className={`text-white p-2 text-left mb-[120px] w-full ${formData.colaborador == "" ? 'bg-blue-500' : 'bg-red-500'}`}>
                    {formData.colaborador === "" ? (
                        <span className="ml-2">Documento Empresa - {formData.documento}</span>
                    ) : (
                        <span className="ml-2">Documento Colaborador - {formData.documento}</span>
                    )}
                </div>


                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="loading-content bg-white p-8 mx-auto my-4 rounded-lg w-full h-full relative flex flex-row relative animate-fadeIn">
                            <div className="text-blue-500 text-md text-center flex-grow">
                                <div className="flex items-center justify-center h-full text-4xl">
                                    Carregando documento...
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-evenly">

                    <div>
                        <div className="">
                            <label htmlFor="nome_terceiro" className="block text-sm font-medium text-gray-700">
                                Terceiro
                            </label>
                            <input
                                type="text"
                                name="nome_terceiro"
                                id="nome_terceiro"
                                onChange={handleInputChange}
                                value={formData.nome_terceiro}
                                disabled
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        {formData.colaborador !== "" && (<div className="">
                            <label htmlFor="colaborador" className="block text-sm font-medium text-gray-700">
                                Colaborador
                            </label>
                            <input
                                type="text"
                                name="colaborador"
                                id="colaborador"
                                onChange={handleInputChange}
                                value={formData.colaborador}
                                disabled
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>)}
                        {isAnalysis != "Pendente" && (<div className="mt-6">
                            <div>
                                <label htmlFor="usuario_inclusao" className="block text-sm font-medium text-gray-700">
                                    Usuario Inclusão<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="usuario_inclusao"
                                    id="usuario_inclusao"
                                    onChange={handleInputChange}
                                    value={formData.usuario_inclusao}
                                    disabled
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mt-6">
                                <label htmlFor="data_inclusao" className="block text-sm font-medium text-gray-700">
                                    Data Inclusao<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="data_inclusao"
                                    id="data_inclusao"
                                    value={formData.data_inclusao}
                                    onChange={handleDateChange}
                                    disabled
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </div>)}


                    </div>


                    <div className="">
                        <div className="flex gap-10">
                            <div className="">
                                <div className="">
                                    <label htmlFor="documento" className="block text-sm font-medium text-gray-700">
                                        Tipo de Documento<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="documento"
                                        id="documento"
                                        onChange={handleInputChange}
                                        value={formData.documento}
                                        disabled
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="status"
                                    id="status"
                                    onChange={handleInputChange}
                                    value={formData.status}
                                    disabled
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="identificacao" className="block text-sm font-medium text-gray-700">
                                Número/Identificação do Documento/Data de Emissão<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="identificacao"
                                id="identificacao"
                                value={formData.identificacao}
                                onChange={handleInputChange}
                                required
                                {...(isAnalysis === "Em análise" || (isAnalysis === "Reprovado" && viewAll) || (isAnalysis === "Ativo" && viewAll) || (isAnalysis === "Ativo" && !canRenew && !viewAll)) ? { disabled: true } : null}

                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        {formData.auditoria == "Não" && formData.campos_vencimento == "Sim" && (<div className="mt-6">
                            <label htmlFor="vencimento" className="block text-sm font-medium text-gray-700">
                                Formato Vencimento<span className="text-red-500">*</span>
                            </label>
                            <select
                                name="vencimento"
                                id="vencimento"
                                value={formData.vencimento}
                                onChange={handleInputChange}
                                required
                                {...(isAnalysis === "Em análise" || (isAnalysis === "Reprovado" && viewAll) || (isAnalysis === "Ativo" && viewAll) || (isAnalysis === "Ativo" && !canRenew && !viewAll)) ? { disabled: true } : null}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="Fixo">Dia fixo</option>
                                <option value="Periodo">Período</option>
                            </select>
                        </div>)}

                        {formData.auditoria == "Sim" && (<div className="mt-6">
                            <label htmlFor="vencimento" className="block text-sm font-medium text-gray-700">
                                Formato Vencimento<span className="text-red-500">*</span>
                            </label>
                            <select
                                name="vencimento"
                                id="vencimento"
                                value={formData.vencimento}
                                onChange={handleInputChange}
                                required
                                {...(isAnalysis === "Em análise" || (isAnalysis === "Reprovado" && viewAll) || (isAnalysis === "Ativo" && viewAll) || (isAnalysis === "Ativo" && !canRenew && !viewAll)) ? { disabled: true } : null}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="Fixo">Dia fixo</option>
                                <option value="Periodo">Período</option>
                            </select>
                        </div>)}

                        {formData.auditoria == "Sim" && (<div className='flex gap-10 mt-6'>
                            <div className="" style={{ display: formData.vencimento === 'Periodo' ? 'none' : 'block' }}>
                                <label htmlFor="dia" className="block text-sm font-medium text-gray-700">
                                    Dia fixo do mês<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={31}
                                    name="dia"
                                    id="dia"
                                    onChange={handleInputChange}
                                    value={formData.dia}
                                    required
                                    {...(isAnalysis === "Em análise" || (isAnalysis === "Reprovado" && viewAll) || (isAnalysis === "Ativo" && viewAll) || (isAnalysis === "Ativo" && !canRenew && !viewAll)) ? { disabled: true } : null}
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            {formData.vencimento === 'Periodo' && (
                                <div className="">
                                    <label htmlFor="dataVencimento" className="block text-sm font-medium text-gray-700">
                                        Data de Vencimento<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dataVencimento"
                                        id="dataVencimento"
                                        value={formData.dataVencimento}
                                        onChange={handleDateChange}
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        {...(isAnalysis === "Em análise" || (isAnalysis === "Reprovado" && viewAll) || (isAnalysis === "Ativo" && viewAll) || (isAnalysis === "Ativo" && !canRenew && !viewAll)) ? { disabled: true } : null}
                                    />
                                </div>
                            )}
                            {formData.vencimento === 'Periodo' && (
                                <div className="">
                                    <label htmlFor="diasAntecipacao" className="block text-sm font-medium text-gray-700">
                                        Quant. dias
                                    </label>
                                    <input
                                        type="text"
                                        name="diasAntecipacao"
                                        id="diasAntecipacao"
                                        value={formData.diasAntecipacao}
                                        readOnly
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            )}
                        </div>)}
                        {formData.auditoria == "Sim" && (<div className="mt-6">
                            <label htmlFor="notificacao" className="block text-sm font-medium text-gray-700">
                                Receber notificação antecipada do vencimento em dias<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="notificacao"
                                id="notificacao"
                                onChange={handleInputChange}
                                value={formData.notificacao}
                                required
                                {...(isAnalysis === "Em análise" || (isAnalysis === "Reprovado" && viewAll) || (isAnalysis === "Ativo" && viewAll) || (isAnalysis === "Ativo" && !canRenew && !viewAll)) ? { disabled: true } : null}
                                min={minNotification}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>)}
                        {(isAnalysis == "Pendente" || isAnalysis == "Reprovado" && !viewAll) && (<div className="mt-6">
                            <label htmlFor="arquivo" className="block text-sm font-medium text-gray-700">
                                Enviar Arquivo<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                name="arquivo"
                                id="arquivo"
                                onChange={handleFileChange}
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>)}
                        {(isAnalysis != "Pendente" && isAnalysis != "Em análise" && isAnalysis != "Ativo") && (<div className="mt-6">
                            <label htmlFor="motivo" className="block text-sm font-medium">
                                Motivo<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="motivo"
                                id="motivo"
                                value={formData.motivo}
                                onChange={handleInputChange}
                                required
                                disabled
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>)}
                    </div>


                    <div className="" style={{ visibility: formData.status !== 'Pendente' && formData.status !== 'Em análise' ? 'visible' : 'hidden' }}>

                        <div className="">
                            <label htmlFor="usuario_analise" className="block text-sm font-medium text-gray-700">
                                Usuario Análise<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="usuario_analise"
                                id="usuario_analise"
                                onChange={handleInputChange}
                                value={formData.usuario_analise}
                                disabled
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div className="mt-6">
                            <label htmlFor="data_analise" className="block text-sm font-medium text-gray-700">
                                Data Análise<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="data_analise"
                                id="data_analise"
                                value={formData.data_analise}
                                onChange={handleDateChange}
                                disabled
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    </div>
                </div>


                <div className="w-full justify-center items-center mt-10">
                    {fileUrl && (
                        <iframe
                            className="mx-auto w-[800px] w-[800px]"
                            ref={iframeRef}
                            title="PDF Viewer"
                            src={fileUrl}
                            width="800px"
                            height="800px"
                        />
                    )}
                </div>


                <div className="col-span-7 flex justify-center mt-10 pb-4">                    
                    <button
                        type="button"
                        onClick={handleSubmitCancel}
                        className="bg-white mx-1 text-red-500 border solid border-red-500 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Fechar
                    </button>
                    {(isAnalysis == "Pendente" || (isAnalysis == "Reprovado" && !viewAll) || (isAnalysis == "Ativo" && canRenew && !viewAll)) && (<button
                        type="button"
                        onClick={handleSubmitSuccess}
                        className="bg-blue-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Salvar
                    </button>)}
                    {(isAnalysis == "Em análise" && viewAll && isAdmin != "read") && (<button
                        type="button"
                        onClick={handleSubmitReprove}
                        className="bg-red-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Rejeitar
                    </button>)}
                    {(isAnalysis == "Em análise" && viewAll && isAdmin != "read") && (<button
                        type="button"
                        onClick={handleSubmitAprove}
                        className="bg-blue-500 mx-1 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Aprovar
                    </button>)}
                    {(viewAll && (fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') || fileUrl.endsWith('.png'))) && (<button
                        type="button"
                        onClick={handlePrint}
                        className="bg-white mx-1 text-blue-500 border solid border-blue-500 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Imprimir
                    </button>)}
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

                            {reproveAnalysis && (<div className="mt-4">
                                <label htmlFor="motivo" className="block text-sm font-medium">
                                    Motivo<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="motivo"
                                    id="motivo"
                                    value={formData.motivo}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>)}

                            {reproveAnalysis && (
                                <div className='flex'>
                                    {showReproveButton == true && (<button className="mx-auto mt-4 w-[300px]" onClick={() => handleSubmitSendAnalysis("Reprovado")}>
                                        <span className="bg-blue-950 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                                            Reprovar o documento
                                        </span>
                                    </button>)}
                                    <button className="mx-auto mt-4 w-[300px]" onClick={closeModal} id="Cobrança">
                                        <span className="bg-red-700 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                                            Cancelar e voltar
                                        </span>
                                    </button>
                                </div>
                            )}

                            {aproveAnalysis && (<div className='flex'>
                                <button className="mx-auto mt-4 w-[300px]" onClick={() => handleSubmitSendAnalysis("Ativo")}>
                                    <span className="bg-blue-950 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                                        Aprovar o documento
                                    </span>
                                </button>
                                <button className="mx-auto mt-4 w-[300px]" onClick={closeModal} id="Cobrança">
                                    <span className="bg-red-700 text-white py-[9.5px] shadow-md w-[300px] p-2 rounded-md block text-center">
                                        Cancelar e voltar
                                    </span>
                                </button>
                            </div>)}


                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default FindDocument;
