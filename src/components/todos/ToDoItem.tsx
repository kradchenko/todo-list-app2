import { ChangeEvent } from 'react';
import { format, parseISO } from 'date-fns';

import { ToDo } from 'schema';

import { ToDoActionMenu } from './TodoActionMenu';

interface ToDoItemProps {
    todo: ToDo;
    isChecked: boolean;
    onItemSelect: () => void;
    onEdit: () => void;
    onMark: () => void;
    onDelete: () => void;
    onInfo: () => void;
}

export const ToDoItem = ({
    todo,
    onItemSelect,
    isChecked,
    onEdit,
    onMark,
    onDelete,
    onInfo,
}: ToDoItemProps) => {
    const handleItemSelect = (e: ChangeEvent) => {
        e.stopPropagation();
        onItemSelect();
    };

    return (
        <tr className="h-16 hover:bg-gray-600 rounded-lg cursor-pointer">
            <td className="w-[5%] md:w-[10%]">
                <input
                    type="checkbox"
                    className="checkbox checkbox-xs sm:checkbox-sm md:checkbox-md"
                    checked={isChecked}
                    onChange={handleItemSelect}
                />
            </td>
            <td className="w-[45%] md:w-[40%] text-xs sm:text-sm md:text-base text-center">
                {todo.name}
            </td>
            <td className="w-[35%] md:w-[30%] text-xs sm:text-sm md:text-base text-center">
                {todo.deadline
                    ? format(parseISO(todo.deadline), 'HH:mm dd/MM/yyyy')
                    : 'No deadline'}
            </td>
            <td className="w-[10%] md:w-[10%] text-xs sm:text-sm md:text-base text-center">
                {todo.completed ? '✅' : '❌'}
            </td>
            <td className="w-[5%] md:w-[10%]">
                <ToDoActionMenu
                    onEdit={onEdit}
                    onMark={onMark}
                    onDelete={onDelete}
                    onInfo={onInfo}
                />
            </td>
        </tr>
    );
};
