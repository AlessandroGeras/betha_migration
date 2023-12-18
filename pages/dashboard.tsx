import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../public/img/logo2.png';

const Home = () => {
    return (
        <div className="absolute top-[80px] left-[80px] bg-white px-8 py-[9.5px] shadow-md hover:bg-blue-500 hover:text-white">
            <p>Tela Inicial</p>
            {/* Adicione mais opções de submenu, se necessário */}
        </div>
    );
};

const Prestadores = () => {
    return (
        <div className="absolute top-[123px] left-[80px] bg-white px-8 py-[9.5px] shadow-md hover:bg-blue-500 hover:text-white">
            <p>Prestadores</p>
            {/* Adicione mais opções de submenu, se necessário */}
        </div>
    );
};

const Cadastros = () => {
    return (
        <div className="absolute top-[166px] left-[80px] bg-white shadow-md">
            <p className='hover:bg-blue-500 hover:text-white px-8 py-[9.5px]'>Categorias</p>
            <p className='hover:bg-blue-500 hover:text-white px-8 py-[9.5px]'>Funções</p>
            <p className='hover:bg-blue-500 hover:text-white px-8 py-[9.5px]'>Tipos de doc</p>
            {/* Adicione mais opções de submenu, se necessário */}
        </div>
    );
};

const Documentos = () => {
    return (
        <div className="absolute top-[209px] left-[80px] bg-white px-8 py-[9.5px] shadow-md hover:bg-blue-500 hover:text-white">
            <p>Lista Documentos</p>
            {/* Adicione mais opções de submenu, se necessário */}
        </div>
    );
};

const Financeiro = () => {
    return (
        <div className="absolute top-[252px] left-[80px] bg-white px-8 py-[9.5px] shadow-md hover:bg-blue-500 hover:text-white">
            <p>Financeiro</p>
            {/* Adicione mais opções de submenu, se necessário */}
        </div>
    );
};

const Conta = () => {
    return (
        <div className="absolute top-[589.5px] left-[80px] bg-white px-8 py-[9.5px] shadow-md hover:bg-blue-500 hover:text-white">
            <p>Minha Conta</p>
            {/* Adicione mais opções de submenu, se necessário */}
        </div>
    );
};

const Menu = () => {
    return (
        <div className="absolute top-[689px] left-[80px] bg-white px-8 py-[8px] shadow-md hover:bg-blue-500 hover:text-white">
            <p>Abrir Menu</p>
            {/* Adicione mais opções de submenu, se necessário */}
        </div>
    );
};

const Dashboard = () => {
    const [isSubMenuOpenHome, setIsSubMenuOpenHome] = useState(false);
    const [isSubMenuOpenPrestadores, setIsSubMenuOpenPrestadores] = useState(false);
    const [isSubMenuOpenCadastros, setIsSubMenuOpenCadastros] = useState(false);
    const [isSubMenuOpenDocumentos, setIsSubMenuOpenDocumentos] = useState(false);
    const [isSubMenuOpenFinanceiro, setIsSubMenuOpenFinanceiro] = useState(false);
    const [isSubMenuOpenConta, setIsSubMenuOpenConta] = useState(false);
    const [isSubMenuOpenMenu, setIsSubMenuOpenMenu] = useState(false);
    const router = useRouter();
    const { userData } = router.query;
    const parsedUserData = Array.isArray(userData) ? null : JSON.parse(userData || "{}");

    const toggleSubMenuHome = () => {
        setIsSubMenuOpenHome(!isSubMenuOpenHome);
    };

    const toggleSubMenuPrestadores = () => {
        setIsSubMenuOpenPrestadores(!isSubMenuOpenPrestadores);
    };

    const toggleSubMenuCadastros = () => {
        setIsSubMenuOpenCadastros(!isSubMenuOpenCadastros);
    };

    const toggleSubMenuDocumentos = () => {
        setIsSubMenuOpenDocumentos(!isSubMenuOpenDocumentos);
    };

    const toggleSubMenuFinanceiro = () => {
        setIsSubMenuOpenFinanceiro(!isSubMenuOpenFinanceiro);
    };

    const toggleSubMenuConta = () => {
        setIsSubMenuOpenConta(!isSubMenuOpenConta);
    };

    const toggleSubMenuMenu = () => {
        setIsSubMenuOpenMenu(!isSubMenuOpenMenu);
    };



    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Barra Lateral */}
            <div className="bg-white flex flex-col items-center">
                {/* Ícones na parte de cima */}
                <div className="mb-8 w-full">
                    <div className="p-4 cursor-pointer">
                        <Image src={logo} alt="ALT_TEXT" className="" />
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500" onMouseEnter={toggleSubMenuHome} onMouseLeave={toggleSubMenuHome}>
                        <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#747474] group-hover:fill-white">
                            <path d="M20.9141 7.96875L18.875 6.28125V2.90625C18.875 2.76562 18.7344 2.625 18.5938 2.625H17.4688C17.293 2.66016 17.1875 2.76562 17.1875 2.90625V4.91016L12.2305 0.832031C11.9492 0.585938 11.3867 0.410156 11 0.410156C10.5781 0.410156 10.0156 0.585938 9.73438 0.832031L1.05078 7.96875C0.945312 8.07422 0.875 8.25 0.875 8.39062C0.875 8.49609 0.910156 8.67188 0.980469 8.74219L1.36719 9.19922C1.4375 9.30469 1.64844 9.375 1.78906 9.375C1.89453 9.375 2.07031 9.33984 2.14062 9.26953L3.125 8.46094V15C3.125 15.6328 3.61719 16.125 4.25 16.125H8.75C9.34766 16.125 9.83984 15.6328 9.875 15V11.3438H12.125V15C12.125 15.6328 12.6172 16.125 13.25 16.125H17.75C18.3477 16.125 18.8398 15.6328 18.875 15.0352V8.46094L19.8242 9.26953C19.8945 9.33984 20.0703 9.41016 20.1758 9.41016C20.3164 9.41016 20.5273 9.30469 20.6328 9.19922L20.9844 8.74219C21.0547 8.67188 21.125 8.49609 21.125 8.39062C21.125 8.25 21.0195 8.07422 20.9141 7.96875ZM17.1523 14.4375H13.8125V10.7812C13.7773 10.1836 13.2852 9.69141 12.6875 9.65625H9.3125C8.67969 9.69141 8.1875 10.1836 8.1875 10.7812V14.4375H4.8125V7.08984L11 1.99219L17.1875 7.08984L17.1523 14.4375Z" />
                        </svg>
                        {isSubMenuOpenHome && <Home />}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500" onMouseEnter={toggleSubMenuPrestadores} onMouseLeave={toggleSubMenuPrestadores}>
                        <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#747474] group-hover:fill-white">
                            <path d="M7.875 4.66016V6.34766L8.89453 7.40234C8.64844 6.17188 9.03516 4.94141 9.91406 4.0625C10.6172 3.32422 11.5664 2.97266 12.5508 2.97266H12.5859L10.582 4.97656L11.1094 8.14062L14.2734 8.66797L16.3125 6.66406C16.3125 7.64844 15.9258 8.63281 15.1875 9.33594C14.8711 9.6875 14.4844 9.93359 14.0977 10.1094C14.1328 10.1445 14.2031 10.2148 14.2734 10.25L15.3633 11.3398C15.7148 11.1289 16.0664 10.8477 16.3828 10.5312C17.7188 9.19531 18.2812 7.22656 17.8242 5.39844C17.7188 4.94141 17.4023 4.625 16.9805 4.48438C16.5234 4.37891 16.0664 4.51953 15.7852 4.80078L13.7109 6.875L12.5508 6.69922L12.375 5.53906L14.4492 3.5C14.7656 3.18359 14.8711 2.72656 14.7656 2.30469C14.625 1.88281 14.3086 1.53125 13.8516 1.42578C11.9883 0.96875 10.0547 1.49609 8.71875 2.86719C8.36719 3.21875 8.05078 3.60547 7.80469 4.0625H7.875V4.66016ZM3.72656 17.2109C3.26953 17.668 2.46094 17.668 2.00391 17.2109C1.79297 17 1.65234 16.6836 1.65234 16.3672C1.65234 16.0508 1.79297 15.7695 2.00391 15.5234L6.75 10.8125L5.55469 9.61719L0.84375 14.3281C0.28125 14.8906 0 15.6289 0 16.3672C0 17.1406 0.28125 17.8789 0.84375 18.4062C1.37109 18.9688 2.10938 19.25 2.88281 19.25C3.62109 19.25 4.35938 18.9688 4.92188 18.4062L8.4375 14.8906C8.12109 14.3281 7.91016 13.6953 7.91016 13.0273L3.72656 17.2109ZM17.6133 15.1719L13.5 11.0586C12.6562 10.25 11.4609 10.0742 10.4766 10.5664L6.75 6.83984V4.625L2.25 1.25L0 3.5L3.375 8H5.55469L9.28125 11.7617C8.82422 12.7461 8.96484 13.9414 9.77344 14.75L13.8867 18.8984C14.4141 19.3906 15.2227 19.3906 15.75 18.8984L17.6133 17.0352C18.1055 16.5078 18.1055 15.6992 17.6133 15.1719Z" />
                        </svg>
                        {isSubMenuOpenPrestadores && <Prestadores />}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500" onMouseEnter={toggleSubMenuCadastros} onMouseLeave={toggleSubMenuCadastros}>
                        <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#747474] group-hover:fill-white">
                            <path d="M8.37891 17.0898C9.1875 17.0898 9.82031 16.9492 10.3828 16.8086C10.7695 16.7383 11.0156 16.3867 11.0156 16V14.875C11.3672 14.7344 11.6836 14.5586 11.9648 14.3477L12.9141 14.875C13.2305 15.0859 13.6875 15.0156 13.9336 14.7344C14.918 13.7148 15.6562 12.625 15.9375 11.1836C16.0078 10.8672 15.8672 10.5156 15.5508 10.3047L14.6367 9.74219C14.6719 9.35547 14.6719 9.00391 14.6367 8.65234L15.5508 8.05469C15.8672 7.87891 16.0078 7.52734 15.9375 7.17578C15.6562 5.69922 14.8477 4.64453 13.9336 3.66016C13.6875 3.37891 13.2305 3.30859 12.9141 3.48438L11.9648 4.04688C11.6836 3.83594 11.3672 3.66016 11.0156 3.48438V2.42969C11.0156 2.04297 10.7695 1.69141 10.3828 1.62109C8.80078 1.23438 7.92188 1.23438 6.33984 1.62109C5.98828 1.69141 5.70703 2.04297 5.70703 2.42969V3.48438C5.39062 3.625 5.07422 3.83594 4.75781 4.04688L3.80859 3.48438C3.49219 3.30859 3.07031 3.34375 2.78906 3.66016C1.55859 4.96094 1.24219 5.69922 0.785156 7.10547C0.644531 7.49219 0.820312 7.91406 1.17188 8.08984L2.12109 8.65234C2.08594 9.00391 2.08594 9.35547 2.12109 9.74219L1.17188 10.2695C0.820312 10.4453 0.644531 10.8672 0.785156 11.2539C1.24219 12.6602 1.55859 13.3984 2.78906 14.7344C3.07031 15.0156 3.49219 15.0508 3.80859 14.875L4.75781 14.3125C5.07422 14.5234 5.39062 14.7344 5.70703 14.875V16C5.70703 16.3867 5.98828 16.7031 6.33984 16.8086C6.90234 16.9492 7.53516 17.0898 8.37891 17.0898ZM7.39453 15.2969V13.7148L6.83203 13.5039C6.30469 13.3281 5.8125 13.0469 5.39062 12.6953L4.93359 12.3086L3.5625 13.082C3.14062 12.5898 2.82422 11.9922 2.57812 11.3945L3.94922 10.6211L3.84375 10.0234C3.73828 9.46094 3.73828 8.89844 3.84375 8.33594L3.94922 7.77344L2.57812 6.96484C2.82422 6.36719 3.14062 5.80469 3.5625 5.27734L4.93359 6.08594L5.39062 5.69922C5.8125 5.3125 6.30469 5.03125 6.83203 4.85547L7.39453 4.64453V3.0625C8.02734 2.99219 8.69531 2.99219 9.32812 3.0625V4.64453L9.89062 4.85547C10.418 5.03125 10.9102 5.3125 11.332 5.69922L11.7891 6.08594L13.1602 5.27734C13.582 5.80469 13.8984 6.36719 14.1445 6.96484L12.7734 7.73828L12.8789 8.33594C12.9844 8.89844 12.9844 9.46094 12.8789 10.0234L12.7734 10.6211L14.1445 11.3945C13.8984 11.9922 13.582 12.5547 13.1602 13.082L11.7891 12.2734L11.332 12.6602C10.9102 13.0469 10.418 13.3281 9.89062 13.5039L9.32812 13.7148V15.2969C8.69531 15.4023 8.02734 15.4023 7.39453 15.2969ZM8.34375 12.3086C9.15234 12.3086 9.92578 11.9922 10.5586 11.3945C11.7539 10.1992 11.7539 8.23047 10.5586 7C9.32812 5.80469 7.35938 5.80469 6.16406 7C4.93359 8.23047 4.93359 10.1992 6.16406 11.3945C6.76172 11.9922 7.57031 12.3086 8.34375 12.3086ZM8.34375 7.77344C8.69531 7.77344 9.08203 7.91406 9.36328 8.19531C9.89062 8.75781 9.89062 9.63672 9.36328 10.1992C8.80078 10.7617 7.88672 10.7617 7.35938 10.1992C6.79688 9.63672 6.79688 8.75781 7.35938 8.19531C7.64062 7.91406 7.99219 7.77344 8.34375 7.77344ZM23.1797 3.23828C23.1445 3.0625 22.9688 2.88672 22.7578 2.88672H22.1953C22.0898 2.57031 21.8789 2.21875 21.668 1.97266L21.9492 1.48047C22.0195 1.30469 21.9844 1.05859 21.8438 0.917969C21.5273 0.671875 21.1406 0.460938 20.7539 0.285156C20.543 0.214844 20.332 0.285156 20.2266 0.496094L19.9453 0.953125C19.5938 0.917969 19.207 0.917969 18.8555 0.953125L18.5742 0.496094C18.4688 0.285156 18.2578 0.214844 18.0469 0.285156C17.6602 0.460938 17.2734 0.671875 16.957 0.917969C16.7812 1.05859 16.7461 1.30469 16.8516 1.48047L17.1328 1.97266C16.8867 2.21875 16.7109 2.57031 16.6055 2.88672H16.043C15.832 2.88672 15.6562 3.0625 15.6211 3.27344C15.5508 3.69531 15.5508 4.11719 15.6211 4.53906C15.6562 4.75 15.832 4.89062 16.043 4.89062H16.6055C16.7109 5.24219 16.8867 5.55859 17.1328 5.83984L16.8516 6.33203C16.7461 6.50781 16.7812 6.71875 16.957 6.85938C17.2734 7.14062 17.6602 7.35156 18.0469 7.49219C18.2578 7.5625 18.4688 7.49219 18.5742 7.31641L18.8555 6.82422C19.207 6.89453 19.5938 6.89453 19.9453 6.82422L20.2266 7.31641C20.332 7.49219 20.543 7.5625 20.7539 7.49219C21.1406 7.35156 21.5273 7.14062 21.8438 6.85938C21.9844 6.71875 22.0547 6.50781 21.9492 6.33203L21.668 5.83984C21.8789 5.55859 22.0898 5.24219 22.1953 4.89062H22.7578C22.9688 4.89062 23.1445 4.75 23.1797 4.53906C23.25 4.08203 23.25 3.66016 23.1797 3.23828ZM19.3828 5.03125C18.7852 5.03125 18.2578 4.50391 18.2578 3.90625C18.2578 3.27344 18.7852 2.78125 19.3828 2.78125C20.0156 2.78125 20.5078 3.27344 20.5078 3.90625C20.5078 4.50391 20.0156 5.03125 19.3828 5.03125ZM23.1797 13.9961C23.1445 13.7852 22.9688 13.6445 22.7578 13.6445H22.1953C22.0898 13.293 21.8789 12.9766 21.668 12.6953L21.9492 12.2031C22.0195 12.0273 21.9844 11.8164 21.8438 11.6758C21.5273 11.3945 21.1406 11.1836 20.7188 11.043C20.543 10.9727 20.332 11.043 20.2266 11.2188L19.9453 11.7109C19.5938 11.6406 19.207 11.6406 18.8555 11.7109L18.5742 11.2188C18.4688 11.043 18.2578 10.9727 18.0469 11.043C17.6602 11.1836 17.2734 11.3945 16.957 11.6758C16.7812 11.8164 16.7461 12.0273 16.8516 12.2031L17.1328 12.6953C16.8867 12.9766 16.7109 13.293 16.6055 13.6445H16.0078C15.832 13.6445 15.6211 13.7852 15.6211 13.9961C15.5508 14.418 15.5508 14.875 15.6211 15.2617C15.6562 15.4727 15.832 15.6133 16.0078 15.6133H16.6055C16.7109 15.9648 16.8867 16.2812 17.1328 16.5625L16.8516 17.0547C16.7461 17.2305 16.7812 17.4766 16.957 17.582C17.2734 17.8633 17.6602 18.0742 18.0469 18.25C18.2578 18.3203 18.4688 18.25 18.5742 18.0391L18.8555 17.5469C19.207 17.6172 19.5938 17.6172 19.9453 17.5469L20.2266 18.0391C20.332 18.2148 20.543 18.3203 20.7188 18.25C21.1406 18.0742 21.5273 17.8633 21.8438 17.582C21.9844 17.4766 22.0547 17.2305 21.9492 17.0547L21.668 16.5625C21.8789 16.2812 22.0898 15.9648 22.1953 15.6133H22.7578C22.9688 15.6133 23.1445 15.4727 23.1797 15.2617C23.25 14.8398 23.25 14.418 23.1797 13.9961ZM19.3828 15.7539C18.7852 15.7539 18.2578 15.2617 18.2578 14.6289C18.2578 14.0312 18.7852 13.5039 19.3828 13.5039C20.0156 13.5039 20.5078 14.0312 20.5078 14.6289C20.5078 15.2617 20.0156 15.7539 19.3828 15.7539Z" />
                        </svg>
                        {isSubMenuOpenCadastros && <Cadastros />}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500" onMouseEnter={toggleSubMenuDocumentos} onMouseLeave={toggleSubMenuDocumentos}>
                        <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#747474] group-hover:fill-white">
                            <path d="M14.9375 11.5H12.6875C12.0547 11.5 11.5625 12.0273 11.5625 12.625V17.125C11.5625 17.7578 12.0547 18.25 12.6875 18.25H14.9375C15.5352 18.25 16.0625 17.7578 16.0625 17.125V12.625C16.0625 12.0273 15.5352 11.5 14.9375 11.5ZM14.375 16.5625H13.25V13.1875H14.375V16.5625ZM20.5625 7H18.3125C17.6797 7 17.1875 7.52734 17.1875 8.125V17.125C17.1875 17.7578 17.6797 18.25 18.3125 18.25H20.5625C21.1602 18.25 21.6875 17.7578 21.6875 17.125V8.125C21.6875 7.52734 21.1602 7 20.5625 7ZM20 16.5625H18.875V8.6875H20V16.5625ZM9.3125 7H7.0625C6.42969 7 5.9375 7.52734 5.9375 8.125V17.125C5.9375 17.7578 6.42969 18.25 7.0625 18.25H9.3125C9.91016 18.25 10.4375 17.7578 10.4375 17.125V8.125C10.4375 7.52734 9.91016 7 9.3125 7ZM8.75 16.5625H7.625V8.6875H8.75V16.5625ZM3.6875 12.625H1.4375C0.804688 12.625 0.3125 13.1523 0.3125 13.75V17.125C0.3125 17.7578 0.804688 18.25 1.4375 18.25H3.6875C4.28516 18.25 4.8125 17.7578 4.8125 17.125V13.75C4.8125 13.1523 4.28516 12.625 3.6875 12.625ZM3.125 16.5625H2V14.3125H3.125V16.5625ZM2.5625 9.25C3.47656 9.25 4.25 8.51172 4.25 7.5625C4.25 7.42188 4.21484 7.28125 4.17969 7.14062L7.73047 3.58984C7.87109 3.625 8.01172 3.625 8.1875 3.625C8.39844 3.625 8.57422 3.58984 8.78516 3.51953L12.125 6.19141C12.125 6.29688 12.125 6.36719 12.125 6.4375C12.125 7.38672 12.8633 8.125 13.8125 8.125C14.7266 8.125 15.5 7.38672 15.5 6.4375C15.5 6.36719 15.4648 6.29688 15.4648 6.19141L18.8047 3.51953C19.0156 3.58984 19.1914 3.625 19.4375 3.625C20.3516 3.625 21.125 2.88672 21.125 1.9375C21.125 1.02344 20.3516 0.25 19.4375 0.25C18.4883 0.25 17.75 1.02344 17.75 1.9375C17.75 2.04297 17.75 2.11328 17.75 2.21875L14.4102 4.89062C14.1992 4.82031 14.0234 4.75 13.7773 4.75C13.5664 4.75 13.3906 4.82031 13.1797 4.89062L9.83984 2.21875C9.83984 2.11328 9.875 2.04297 9.875 1.9375C9.875 1.02344 9.10156 0.25 8.1875 0.25C7.23828 0.25 6.5 1.02344 6.5 1.9375C6.5 2.11328 6.5 2.25391 6.53516 2.39453L2.98438 5.94531C2.84375 5.91016 2.70312 5.875 2.5625 5.875C1.61328 5.875 0.875 6.64844 0.875 7.5625C0.875 8.51172 1.61328 9.25 2.5625 9.25Z" />
                        </svg>
                        {isSubMenuOpenDocumentos && <Documentos />}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group hover:bg-blue-500" onMouseEnter={toggleSubMenuFinanceiro} onMouseLeave={toggleSubMenuFinanceiro}>
                        <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#747474] group-hover:fill-white">
                            <path d="M14.9375 11.5H12.6875C12.0547 11.5 11.5625 12.0273 11.5625 12.625V17.125C11.5625 17.7578 12.0547 18.25 12.6875 18.25H14.9375C15.5352 18.25 16.0625 17.7578 16.0625 17.125V12.625C16.0625 12.0273 15.5352 11.5 14.9375 11.5ZM14.375 16.5625H13.25V13.1875H14.375V16.5625ZM20.5625 7H18.3125C17.6797 7 17.1875 7.52734 17.1875 8.125V17.125C17.1875 17.7578 17.6797 18.25 18.3125 18.25H20.5625C21.1602 18.25 21.6875 17.7578 21.6875 17.125V8.125C21.6875 7.52734 21.1602 7 20.5625 7ZM20 16.5625H18.875V8.6875H20V16.5625ZM9.3125 7H7.0625C6.42969 7 5.9375 7.52734 5.9375 8.125V17.125C5.9375 17.7578 6.42969 18.25 7.0625 18.25H9.3125C9.91016 18.25 10.4375 17.7578 10.4375 17.125V8.125C10.4375 7.52734 9.91016 7 9.3125 7ZM8.75 16.5625H7.625V8.6875H8.75V16.5625ZM3.6875 12.625H1.4375C0.804688 12.625 0.3125 13.1523 0.3125 13.75V17.125C0.3125 17.7578 0.804688 18.25 1.4375 18.25H3.6875C4.28516 18.25 4.8125 17.7578 4.8125 17.125V13.75C4.8125 13.1523 4.28516 12.625 3.6875 12.625ZM3.125 16.5625H2V14.3125H3.125V16.5625ZM2.5625 9.25C3.47656 9.25 4.25 8.51172 4.25 7.5625C4.25 7.42188 4.21484 7.28125 4.17969 7.14062L7.73047 3.58984C7.87109 3.625 8.01172 3.625 8.1875 3.625C8.39844 3.625 8.57422 3.58984 8.78516 3.51953L12.125 6.19141C12.125 6.29688 12.125 6.36719 12.125 6.4375C12.125 7.38672 12.8633 8.125 13.8125 8.125C14.7266 8.125 15.5 7.38672 15.5 6.4375C15.5 6.36719 15.4648 6.29688 15.4648 6.19141L18.8047 3.51953C19.0156 3.58984 19.1914 3.625 19.4375 3.625C20.3516 3.625 21.125 2.88672 21.125 1.9375C21.125 1.02344 20.3516 0.25 19.4375 0.25C18.4883 0.25 17.75 1.02344 17.75 1.9375C17.75 2.04297 17.75 2.11328 17.75 2.21875L14.4102 4.89062C14.1992 4.82031 14.0234 4.75 13.7773 4.75C13.5664 4.75 13.3906 4.82031 13.1797 4.89062L9.83984 2.21875C9.83984 2.11328 9.875 2.04297 9.875 1.9375C9.875 1.02344 9.10156 0.25 8.1875 0.25C7.23828 0.25 6.5 1.02344 6.5 1.9375C6.5 2.11328 6.5 2.25391 6.53516 2.39453L2.98438 5.94531C2.84375 5.91016 2.70312 5.875 2.5625 5.875C1.61328 5.875 0.875 6.64844 0.875 7.5625C0.875 8.51172 1.61328 9.25 2.5625 9.25Z" />
                        </svg>
                        {isSubMenuOpenFinanceiro && <Financeiro />}
                    </div>
                </div>

                {/* Ícones na parte de baixo */}
                <div className='mt-auto'>
                    <div className="pl-[32.5px] pr-2 py-3 cursor-pointer group hover:bg-blue-500" onMouseEnter={toggleSubMenuConta} onMouseLeave={toggleSubMenuConta}>
                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#747474] group-hover:fill-white">
                            <path d="M11.375 12.625H11.1992C10.7773 12.625 10.3555 12.7305 9.93359 12.8711C9.40625 13.0469 8.52734 13.2227 7.96484 13.2227C7.4375 13.2227 6.55859 13.0469 6.03125 12.8711C5.60938 12.7305 5.1875 12.6602 4.76562 12.6602H4.625C2.12891 12.6602 0.125 14.6641 0.125 17.125C0.125 17.7578 0.617188 18.25 1.25 18.25H14.75C15.3477 18.25 15.875 17.7578 15.875 17.125C15.875 14.6641 13.8359 12.625 11.375 12.625ZM1.84766 16.5625C2.09375 15.332 3.32422 14.3477 4.625 14.3125H4.76562C4.94141 14.3125 5.1875 14.3828 5.46875 14.4883C6.13672 14.6992 7.26172 14.875 7.96484 14.875C8.70312 14.875 9.82812 14.6992 10.4961 14.4883C10.7773 14.3828 11.0234 14.3125 11.1992 14.3125H11.375C12.6406 14.3477 13.8711 15.332 14.1172 16.5625H1.84766ZM2.05859 8.125C2.51562 8.125 2.86719 7.77344 2.86719 7.31641V7C2.86719 4.1875 5.15234 1.90234 8 1.90234C10.8125 1.90234 13.0977 4.1875 13.0977 7V7.45703C13.0977 8.79297 12.0078 9.88281 10.6719 9.88281H9.86328C9.72266 9.28516 9.125 8.79297 8.52734 8.79297H7.4375C6.66406 8.79297 6.06641 9.39062 6.06641 10.1641C6.06641 10.9023 6.66406 11.5352 7.4375 11.5352C7.4375 11.5352 7.4375 11.5352 7.4375 11.5H10.6719C12.9219 11.5 14.7148 9.70703 14.75 7.45703V7C14.75 3.30859 11.6914 0.25 8 0.25C4.27344 0.25 1.25 3.30859 1.25 7V7.31641C1.25 7.77344 1.60156 8.125 2.05859 8.125ZM8 4.75C9.23047 4.78516 10.2148 5.76953 10.25 7C10.2148 7.35156 10.1094 7.84375 9.93359 8.125C10.1797 8.30078 10.3906 8.51172 10.5664 8.75781H10.6719C11.1289 8.75781 11.5156 8.51172 11.7266 8.16016C11.832 7.80859 11.9375 7.42188 11.9375 7C11.9375 4.85547 10.1445 3.0625 8 3.0625C5.82031 3.0625 4.0625 4.85547 4.0625 7C4.0625 8.01953 4.41406 8.89844 5.04688 9.60156C5.15234 9.07422 5.60938 8.40625 6.03125 8.125C5.85547 7.84375 5.75 7.35156 5.75 7C5.75 5.76953 6.73438 4.78516 8 4.75Z" />
                        </svg>
                        {isSubMenuOpenConta && <Conta />}
                    </div>
                    <div className="px-6 py-3 py-2 cursor-pointer group">
                        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="fill-white">
                            <circle cx="16" cy="16" r="16" className="fill-gray-500 group-hover:fill-blue-500" />
                            <path d="M9.00969 15.96H9.38769C9.53969 15.96 9.66569 15.94 9.76569 15.9C9.86569 15.856 9.95169 15.788 10.0237 15.696L12.4177 12.666C12.5177 12.538 12.6217 12.45 12.7297 12.402C12.8417 12.35 12.9817 12.324 13.1497 12.324H14.5417L11.6197 15.93C11.4477 16.15 11.2697 16.306 11.0857 16.398C11.2177 16.446 11.3357 16.514 11.4397 16.602C11.5477 16.686 11.6497 16.798 11.7457 16.938L14.7577 21H13.3357C13.1437 21 12.9997 20.974 12.9037 20.922C12.8117 20.866 12.7337 20.786 12.6697 20.682L10.2157 17.478C10.1397 17.37 10.0517 17.294 9.95169 17.25C9.85169 17.206 9.70769 17.184 9.51969 17.184H9.00969V21H7.39569V12.324H9.00969V15.96ZM25.0303 12.324V21H23.6083V15.396C23.6083 15.172 23.6203 14.93 23.6443 14.67L21.0223 19.596C20.8983 19.832 20.7083 19.95 20.4523 19.95H20.2243C19.9683 19.95 19.7783 19.832 19.6543 19.596L17.0023 14.652C17.0143 14.784 17.0243 14.914 17.0323 15.042C17.0403 15.17 17.0443 15.288 17.0443 15.396V21H15.6223V12.324H16.8403C16.9123 12.324 16.9743 12.326 17.0263 12.33C17.0783 12.334 17.1243 12.344 17.1643 12.36C17.2083 12.376 17.2463 12.402 17.2783 12.438C17.3143 12.474 17.3483 12.522 17.3803 12.582L19.9783 17.4C20.0463 17.528 20.1083 17.66 20.1643 17.796C20.2243 17.932 20.2823 18.072 20.3383 18.216C20.3943 18.068 20.4523 17.926 20.5123 17.79C20.5723 17.65 20.6363 17.516 20.7043 17.388L23.2663 12.582C23.2983 12.522 23.3323 12.474 23.3683 12.438C23.4043 12.402 23.4423 12.376 23.4823 12.36C23.5263 12.344 23.5743 12.334 23.6263 12.33C23.6783 12.326 23.7403 12.324 23.8123 12.324H25.0303Z" />
                        </svg>
                    </div>
                    <div className="pl-[36px] pr-2 py-3 cursor-pointer group hover:bg-blue-500" onMouseEnter={toggleSubMenuMenu} onMouseLeave={toggleSubMenuMenu}>
                        <svg width="10" height="17" viewBox="0 0 10 17" xmlns="http://www.w3.org/2000/svg" className="fill-gray-500 group-hover:fill-white">
                            <path d="M1.34375 0.621094L0.640625 1.28906C0.5 1.46484 0.5 1.74609 0.640625 1.88672L7.00391 8.25L0.640625 14.6484C0.5 14.7891 0.5 15.0703 0.640625 15.2461L1.34375 15.9141C1.51953 16.0898 1.76562 16.0898 1.94141 15.9141L9.32422 8.56641C9.46484 8.39062 9.46484 8.14453 9.32422 7.96875L1.94141 0.621094C1.76562 0.445312 1.51953 0.445312 1.34375 0.621094Z" />
                        </svg>
                        {isSubMenuOpenMenu && <Menu />}
                    </div>
                </div>
            </div>

            {/* Conteúdo da Dashboard */}
            <div></div>
            <div className="flex-1">
                {/* Barra Superior Azul Fixada no Topo */}
                <div className="bg-blue-500 text-white p-2 text-left mb-4 w-full">
                    {/* Conteúdo da Barra Superior, se necessário */}
                    <span className='ml-2'>Página inicial</span>
                </div>

                <div className="flex items-center justify-center h-5/6 pt-28 px-20">
                    <div className="container mx-auto">
                        {/* Área de Documentos a Vencer */}
                        <div className='items-center '>
                            <div className="flex justify-center mt-[-40px] mb-24 px-26">
                                {/* Três Divs Centralizadas Lado a Lado */}
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                                    <div className="mt-[-15px]">Quantidade de documentos ativos</div>
                                    <div className="mt-2 text-4xl text-gray-600">41</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                                    <div className="mt-[-15px]">Quantidade de terceiros ativos</div>
                                    <div className="mt-2 text-4xl text-gray-600">34</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-3 py-3 rounded shadow text-center">
                                    <div className="mt-[-15px]">Quantidade de colaboradores ativos</div>
                                    <div className="mt-2 text-4xl text-gray-600">647</div>
                                </div>
                            </div>

                            <div className="flex justify-center px-32 relative top-[-30px]">
                                {/* Duas Divs Centralizadas Lado a Lado */}
                                <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                                    <div className="mt-[-15px] text-2xl text-gray-600">Documentos a vencer</div>
                                    <div className="mt-2 text-gray-600 text-sm">Documentos com 30 dias ou menos da data de vencimento</div>
                                    <div className='flex justify-center'>
                                        <div className='px-10'></div>
                                        <div className="mt-2 text-gray-600 text-5xl bg-yellow-500 px-4 py-2 text-white">127</div>
                                        <div className='px-10'></div>
                                    </div>
                                    <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                                    <div className="mt-[-15px] text-2xl text-gray-600">Documentos vencidos</div>
                                    <div className="mt-2 text-gray-600 text-sm">Documentos com data inferior ao dia atual</div>
                                    <div className='flex justify-center'>
                                        <div className='px-10'></div>
                                        <div className="mt-2 text-gray-600 text-5xl bg-red-700 px-[50px] py-2 text-white">3</div>
                                        <div className='px-10'></div>
                                    </div>
                                    <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
                                </div>
                            </div>

                            <div className="flex justify-center px-32 relative top-[-10px]">
                                {/* Duas Divs Centralizadas Lado a Lado */}
                                <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                                    <div className="mt-[-15px] text-2xl text-gray-600">Documentos faltantes</div>
                                    <div className="mt-2 text-gray-600 text-sm">Documentos solicitados e não enviados</div>
                                    <div className='flex justify-center'>
                                        <div className='px-10'></div>
                                        <div className="mt-2 text-gray-600 text-5xl bg-yellow-500 px-8 py-2 text-white">10</div>
                                        <div className='px-10'></div>
                                    </div>
                                    <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
                                </div>
                                <div className="mx-2 my-2 flex-1 bg-white px-14 py-3 mx-4 rounded shadow text-center">
                                    <div className="mt-[-15px] text-2xl text-gray-600">Documentos à analisar</div>
                                    <div className="mt-2 text-gray-600 text-sm">Documentos pendentes de análise</div>
                                    <div className='flex justify-center'>
                                        <div className='px-10'></div>
                                        <div className="mt-2 text-gray-600 text-5xl bg-yellow-500 px-[50px] py-2 text-white">3</div>
                                        <div className='px-10'></div>
                                    </div>
                                    <div className='text-xs mt-2 text-gray-600'>Clique no número para listar os documentos</div>
                                </div>
                            </div>


                        </div>

                        {/* Outros componentes da Dashboard */}
                        {parsedUserData && (
                            <div className="bg-white px-6 py-2 rounded shadow text-center mt-8 hidden">
                                <p className="text-lg font-semibold">Informações do Usuário:</p>
                                <div className="mt-2">
                                    <p>
                                        <span className="font-semibold">Nome:</span> {parsedUserData.nomeUsuario}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Username:</span> {parsedUserData.username}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Email:</span> {parsedUserData.email}
                                    </p>
                                    {/* Adicione outras informações conforme necessário */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
