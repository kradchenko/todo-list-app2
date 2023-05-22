import { Dialog } from '@headlessui/react';
import { format, parseISO } from 'date-fns';

import { ToDo } from 'schema';

interface ToDoInfoModalProps {
    todo: ToDo | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ToDoInfoModal = ({ todo, isOpen, onClose }: ToDoInfoModalProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-gray-800 w-full max-w-lg rounded-lg py-10 px-5">
                    <Dialog.Title className="text-xl mb-10 flex flex-col">
                        <span className="text-sm text-purple-500 mb-2">Name:</span>
                        {todo?.name}
                    </Dialog.Title>
                    <Dialog.Description className="flex flex-col mb-10 leading-7 ">
                        <span className="text-sm text-purple-500 mb-2">Description:</span>
                        {todo?.description}
                    </Dialog.Description>
                    <Dialog.Description className="mb-10 flex flex-col">
                        <span className="text-sm text-purple-500 mb-2">Deadline:</span>

                        {todo?.deadline
                            ? format(parseISO(todo.deadline), 'HH:mm dd/MM/yyyy')
                            : 'No deadline'}
                    </Dialog.Description>

                    <div className="flex justify-end">
                        <button type="button" className="btn btn-error ml-5" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
