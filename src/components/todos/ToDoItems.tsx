import { useState } from 'react';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as PlusIcon } from 'assets/plus.svg';

import { ToDo } from 'schema';
import { api } from 'utils/api';

import { ToDoFormModal } from './ToDoFormModal';
import { ToDoInfoModal } from './ToDoInfoModal';
import { ToDoItem } from './ToDoItem';
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

        toast.success(
            <div>
                Successfully deleted <span className="text-purple-500">marked TODOs</span>
            </div>,
        );

        setSelectedTodos([]);
    };

    const handleTosDoMark = async () => {
        for (const todo of selectedTodos) {
            await api.put(`/todo-list/${toDoListId}/todo/${todo}`, {
                completed: markType === 'completed' ? true : false,
            });
        }

        toast.success(
            <div>
                Successfully marked TODOs as{' '}
                <span className="text-purple-500">
                    {markType === 'completed' ? 'completed' : 'not completed yet'}
                </span>
            </div>,
        );

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
        const { data } = await api.put<ToDo>(`/todo-list/${toDoListId}/todo/${todoId}`, {
            completed: status ? false : true,
        });

        toast.success(
            <div>
                Successfully marked <span className="text-purple-500">{data.name}</span> as{' '}
                <span className="text-purple-500">
                    {markType === 'completed' ? 'completed' : 'not completed yet'}
                </span>
            </div>,
        );

        refetch();
    };

    const handleToDoDelete = async (todoId: number) => {
        const { data } = await api.delete<ToDo>(`/todo-list/${toDoListId}/todo/${todoId}`);

        toast.success(
            <div>
                Successfully deleted TODO <span className="text-purple-500">{data.name}</span>
            </div>,
        );

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
                            <th className="w-[5%] sm:w-[10%]"></th>
                            <th className="w-[45%] sm:w-[40%] text-center text-xs sm:text-base">
                                Name
                            </th>
                            <th className="w-[35%] sm:w-[30%] text-center text-xs sm:text-base">
                                Deadline
                            </th>
                            <th className="w-[10%] sm:w-[10%] text-center text-xs sm:text-base">
                                Status
                            </th>
                            <th className="w-[5%] sm:w-[10%]"></th>
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
                    You don't have any TODO 🤷🏻‍♂️? Create one by clicking on this icon{' '}
                    <button
                        className="mx-5  hover:text-purple-500 transition-all duration-200 ease-in-out"
                        onClick={handleCreateModal}
                    >
                        <PlusIcon width={24} height={24} />
                    </button>
                    or the one in the corner.
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
