import { useState } from 'react';
import { ChangeEvent } from 'react';
import { ReactComponent as PlusIcon } from 'assets/plus.svg';

import { ToDo } from 'schema';
import { api } from 'utils/api';

import { ToDoInfoModal } from './ToDoInfoModal';
import { ToDoItem } from './ToDoItem';
import { ToDoFormModal } from './ToDoModal';
import { ToDosActions } from './ToDosActions';

interface ToDosItemsProps {
    todos: ToDo[];
    toDoListId: number;
    refetch: () => void;
}

export const ToDoItems = ({ todos, toDoListId, refetch }: ToDosItemsProps) => {
    const [search, setSearch] = useState<string>('');
    const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
    const [markType, setMarkType] = useState<'completed' | 'not-completed'>('completed');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
    const [selectedToDo, setSelectedToDo] = useState<ToDo | null>(null);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleItemSelect = (id: number) => {
        if (selectedTodos.length === 0) {
            const found = todos.find((el) => el.id === id);
            if (found && found.completed) {
                setMarkType('not-completed');
            } else {
                setMarkType('completed');
            }
        }

        if (selectedTodos.includes(id)) {
            const newSelectedItems = selectedTodos.filter((el) => el !== id);
            setSelectedTodos(newSelectedItems);
        } else {
            setSelectedTodos([...selectedTodos, id]);
        }
    };

    const handleToDosDelete = async () => {
        for (const todo of selectedTodos) {
            await api.delete(`/todo-list/${toDoListId}/todo/${todo}`);
        }

        refetch();

        setSelectedTodos([]);
    };

    const handleTosDoMark = async () => {
        for (const todo of selectedTodos) {
            await api.put(`/todo-list/${toDoListId}/todo/${todo}`, {
                completed: markType === 'completed' ? true : false,
            });
        }

        refetch();
        setSelectedTodos([]);
    };

    const handleCreateModal = () => {
        setSelectedToDo(null);
        setIsModalOpen(true);
    };

    const handleEditModal = (todo: ToDo) => {
        setSelectedToDo(todo);
        setIsModalOpen(true);
    };

    const handleToDoMark = async (todoId: number, status: boolean) => {
        await api.put(`/todo-list/${toDoListId}/todo/${todoId}`, {
            completed: status ? false : true,
        });

        refetch();
    };

    const handleToDoDelete = async (todoId: number) => {
        await api.delete(`/todo-list/${toDoListId}/todo/${todoId}`);
        refetch();
    };

    const onClose = () => {
        setIsModalOpen(false);
        setIsInfoModalOpen(false);
        setSelectedToDo(null);
    };

    const onSuccess = async () => {
        refetch();
        onClose();
    };

    const handleInfoModal = (todo: ToDo) => {
        setSelectedToDo(todo);
        setIsInfoModalOpen(true);
    };

    return (
        <div className="mt-5">
            <ToDosActions
                markType={markType}
                onSearch={handleSearch}
                disabled={selectedTodos.length === 0}
                onMark={handleTosDoMark}
                onCreate={handleCreateModal}
                onRemove={handleToDosDelete}
            />
            {todos.length > 0 ? (
                <table className="w-full">
                    <thead className="w-full">
                        <tr>
                            <th className="w-[10%]"></th>
                            <th className="w-[40%] text-left">Name</th>
                            <th className="w-[20%] text-left">Deadline</th>
                            <th className="w-[20%] text-left">Status</th>
                            <th className="w-[10%]"></th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {search.length === 0
                            ? todos.map((el) => (
                                  <ToDoItem
                                      key={`todo-item-${el.createdAt}`}
                                      todo={el}
                                      onItemSelect={() => handleItemSelect(el.id)}
                                      isChecked={selectedTodos.includes(el.id)}
                                      onEdit={() => handleEditModal(el)}
                                      onDelete={() => handleToDoDelete(el.id)}
                                      onMark={() => handleToDoMark(el.id, el.completed)}
                                      onInfo={() => handleInfoModal(el)}
                                  />
                              ))
                            : todos
                                  .filter(
                                      (el) =>
                                          el.name.includes(search) ||
                                          el.description.includes(search),
                                  )
                                  .map((el) => (
                                      <ToDoItem
                                          key={`todo-item-${el.id}`}
                                          todo={el}
                                          onItemSelect={() => handleItemSelect(el.id)}
                                          isChecked={selectedTodos.includes(el.id)}
                                          onEdit={() => handleEditModal(el)}
                                          onDelete={() => handleToDoDelete(el.id)}
                                          onMark={() => handleToDoMark(el.id, el.completed)}
                                          onInfo={() => handleInfoModal(el)}
                                      />
                                  ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex justify-center text-xl">
                    You don't have any ToDo 🤷🏻‍♂️? Create one by clicking on this icon{' '}
                    <button
                        className="mx-5  hover:text-purple-500 transition-all duration-200 ease-in-out"
                        onClick={handleCreateModal}
                    >
                        <PlusIcon width={24} height={24} />
                    </button>
                    corner.
                </div>
            )}
            <ToDoFormModal
                key={`todo-modal-${selectedToDo?.id}`}
                initValues={selectedToDo}
                toDoListId={toDoListId}
                isOpen={isModalOpen}
                onClose={onClose}
                onSuccess={onSuccess}
            />
            <ToDoInfoModal
                key={`todo-info-modal-${selectedToDo?.id}`}
                todo={selectedToDo}
                onClose={onSuccess}
                isOpen={isInfoModalOpen}
            />
        </div>
    );
};
