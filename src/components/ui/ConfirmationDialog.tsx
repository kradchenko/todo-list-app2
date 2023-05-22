import { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';

interface ConfirmationDialogProps {
    title: string | ReactNode;
    description: string | ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmationDialog = ({
    title,
    description,
    isOpen,
    onClose,
    onConfirm,
}: ConfirmationDialogProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-gray-800 w-full max-w-lg rounded-lg p-5">
                    <Dialog.Title className="text-2xl mb-5">{title}</Dialog.Title>
                    <Dialog.Description className="mb-10 leading-7">
                        {description}
                    </Dialog.Description>

                    <div className="flex justify-end">
                        <button type="button" className="btn btn-success" onClick={onConfirm}>
                            Confirm
                        </button>
                        <button type="button" className="btn btn-error ml-5" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
