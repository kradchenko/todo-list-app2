import { ReactNode, useState } from 'react';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import { ReactComponent as HamburgerIcon } from 'assets/hamburger.svg';
import classNames from 'classnames';

import { ToDoListsNavigation } from './todo-lists/ToDoListsNavigation';

const SideBar = () => (
    <div className="w-72 hidden sm:flex flex-col bg-gradient-to-b from-purple-800 via-violet-900 to-purple-800  py-10 px-5">
        <div className="text-2xl md:text-3xl text-center text-white flex-shrink-0">
            TODO List App
        </div>
        <span className="bg-white h-[1px] flex-shrink-0 my-5"></span>
        <ToDoListsNavigation />
    </div>
);

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="sm:hidden w-full flex justify-between items-center pt-10 px-5">
                <span className="text-xl text-center text-white flex-shrink-0">TODO List App</span>
                <button
                    onClick={() => setIsOpen(true)}
                    className="hover:text-purple-500 focus:text-purple-500"
                >
                    <HamburgerIcon width={28} height={28} />
                </button>
            </div>
            <div
                className={classNames(
                    'bg-black/30 absolute top-0 left-0 h-full w-full z-20',
                    isOpen ? '' : 'hidden',
                )}
                onClick={() => setIsOpen(false)}
            ></div>
            <div
                className={classNames(
                    'absolute top-0 left-0 w-[90%] h-full sm:hidden flex-col bg-gradient-to-b from-purple-800 via-violet-900 to-purple-800 py-10 px-5 z-30 transition-all duration-300 ease-in-out',
                    isOpen ? 'translate-x-0' : '-translate-x-[100%]',
                )}
            >
                <div className="flex justify-between items-center mb-10">
                    <span className="text-xl text-center text-white flex-shrink-0">
                        TODO List App
                    </span>
                    <button
                        className="hover:text-white focus:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <CloseIcon className="w-[24px] h-[24px]" />
                    </button>
                </div>

                <span className="bg-white h-[1px] flex-shrink-0 my-5"></span>
                <ToDoListsNavigation />
            </div>
        </>
    );
};

const Footer = () => (
    <footer className="flex flex-col w-full text-xs sm:text-sm mt-5">
        <span className="bg-gray-400 h-[1px] mx-3 sm:mx-10"></span>
        <span className="self-center py-2 text-gray-400">Made with ❤️ by Kirill Radchenko</span>
    </footer>
);

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="h-screen w-full flex flex-col sm:flex-row relative">
            <SideBar />
            <MobileSidebar />
            <div className="flex-1 flex flex-col">
                <div className="flex-1">{children}</div>
                <Footer />
            </div>
        </div>
    );
};
