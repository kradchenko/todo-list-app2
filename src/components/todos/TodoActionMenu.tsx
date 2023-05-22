import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ReactComponent as ThreeDotIcon } from 'assets/three-dot.svg';

interface ToDoActionMenuProps {
    onMark: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onInfo: () => void;
}

export const ToDoActionMenu = ({ onInfo, onMark, onEdit, onDelete }: ToDoActionMenuProps) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:text-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <ThreeDotIcon className="w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={`${
                                        active ? 'bg-violet-500' : ''
                                    } group text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={onInfo}
                                >
                                    Info
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={`${
                                        active ? 'bg-violet-500' : ''
                                    } group text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={onMark}
                                >
                                    Mark as Active/Done
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={`${
                                        active ? 'bg-violet-500' : ''
                                    } group text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={onEdit}
                                >
                                    Edit
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={`${
                                        active ? 'bg-violet-500' : ''
                                    } group text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={onDelete}
                                >
                                    Delete
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
