import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactComponent as RemoveIcon } from 'assets/bin.svg';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { z } from 'zod';

import { ToDoListSelectorContext } from 'context/ToDoListSelectorContext';

import { ConfirmationDialog } from '../ui/ConfirmationDialog';

interface ToDoListTitleContainerProps {
    toDoListId: number;
    title: string;
}

const TitleInputSchema = z.object({
    title: z.string().min(3).max(30),
});

export type TitleInputForm = z.infer<typeof TitleInputSchema>;

export const ToDoListTitleContainer = ({ toDoListId, title }: ToDoListTitleContainerProps) => {
    const { handleRenameToDoList, handleTodoListRemove } = useContext(ToDoListSelectorContext);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm<TitleInputForm>({
        defaultValues: {
            title: title,
        },
        resolver: zodResolver(TitleInputSchema),
    });

    if (!isEditing) {
        return (
            <div className="flex items-center h-12">
                <span className="text-xl sm:text-2xl md:text-3xl flex-1">{title}</span>
                <button
                    onClick={() => setIsEditing(true)}
                    className="hover:text-purple-400 transition-all duration-200 ease-in-out"
                >
                    <EditIcon className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px]" />
                </button>
                <button
                    className="hover:text-red-500 ml-5 transition-all duration-200 ease-in-out"
                    onClick={() => setIsDelModalOpen(true)}
                >
                    <RemoveIcon className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px]" />
                </button>
                <ConfirmationDialog
                    title={
                        <div>
                            Do you really want to delete{' '}
                            <span className="text-purple-500">{title}</span>?
                        </div>
                    }
                    description=" Are you sure you want to delete this ToDo List? All of your data from this ToDo List
                    will be permanently removed. This action cannot be undone."
                    isOpen={isDelModalOpen}
                    onClose={() => setIsDelModalOpen(false)}
                    onConfirm={() => handleTodoListRemove(toDoListId)}
                />
            </div>
        );
    }

    const handleCancel = () => {
        reset({ title: title });
        setIsEditing(false);
    };

    const onSubmit = async (data: TitleInputForm) => {
        try {
            await handleRenameToDoList(toDoListId, data);

            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error('Error occured while updating TODO List name');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-center">
            <input
                className="text-xl w-full sm:text-2xl md:text-3xl border-b hover:border-purple-400 focus:border-purple-500 outline-none bg-transparent flex-1 text-gray-400 focus:text-white"
                {...register('title')}
            />
            <div className="mt-5 md:mt-0 sm:ml-5 md:ml-10 flex justify-between sm:justify-start w-full sm:w-auto">
                <button
                    type="button"
                    className="btn btn-error btn-sm sm:btn-md"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-success btn-sm sm:btn-md sm:ml-3 md:ml-5"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};
