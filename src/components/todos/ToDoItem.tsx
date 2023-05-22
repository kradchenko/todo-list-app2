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
            <td className="w-[10%]">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isChecked}
                    onChange={handleItemSelect}
                />
            </td>
            <td className="w-[40%]">{todo.name}</td>
            <td className="w-[20%]">
                {todo.deadline
                    ? format(parseISO(todo.deadline), 'HH:mm dd/MM/yyyy')
                    : 'No deadline'}
            </td>
            <td className="w-[20%]">{todo.completed ? '✅' : '❌'}</td>
            <td>
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
