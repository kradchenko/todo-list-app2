import { createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { TitleInputForm } from 'components/todos/ToDoListTitleContainer';
import { ToDoList } from 'schema';
import { api } from 'utils/api';

interface ToDoListSelectorContextProps {
    todoLists: ToDoList[];
    isLoading: boolean;
    handleToDoListCreate: () => Promise<void>;
    handleRenameToDoList: (id: number, inputData: TitleInputForm) => Promise<void>;
    handleTodoListRemove: (id: number) => Promise<void>;
}

export const ToDoListSelectorContext = createContext<ToDoListSelectorContextProps>({
    todoLists: [],
    isLoading: false,
    handleToDoListCreate: () => {
        return new Promise((resolve) => {
            console.log('create todo list');
            resolve();
        });
    },
    handleRenameToDoList: (id: number, inputData: TitleInputForm) => {
        return new Promise((resolve) => {
            console.log('rename todo list', id, inputData);
            resolve();
        });
    },
    handleTodoListRemove: (id: number) => {
        return new Promise((resolve) => {
            console.log('remove todo list', id);
            resolve();
        });
    },
});

interface ToDoListSelectorProviderProps {
    children: ReactNode;
}

export const ToDoListSelectorProvider = ({ children }: ToDoListSelectorProviderProps) => {
    const { isLoading, data, refetch } = useQuery<ToDoList[]>({
        queryKey: ['todoListRepo'],
        queryFn: () => api.get('todo-list').then((res) => res.data),
    });

    const navigate = useNavigate();

    const handleToDoListCreate = async () => {
        const { data } = await api.post<ToDoList>('todo-list', {
            title: 'Untitled',
        });

        await refetch();

        toast.success(
            <div>
                Successfully created <span className="text-purple-500">TODO List</span>
            </div>,
        );

        navigate(`/${data.code}`);
    };

    const handleRenameToDoList = async (id: number, putData: { title: string }) => {
        const { data } = await api.put<ToDoList>(`/todo-list/${id}`, putData);

        toast.success(
            <div>
                Successfully renamed TODO List to{' '}
                <span className="text-purple-500">{data.title}</span>
            </div>,
        );

        await refetch();
    };

    const handleTodoListRemove = async (id: number) => {
        const { data: resData } = await api.delete<ToDoList>(`/todo-list/${id}`);

        await refetch();

        toast.success(
            <div>
                Successfully removed TODO List
                <span className="text-purple-500">{resData.title}</span>
            </div>,
        );

        if (data?.length === 0 || !data) {
            navigate('/');
        } else {
            navigate(`/${data[0].code}`);
        }
    };

    return (
        <ToDoListSelectorContext.Provider
            value={{
                todoLists: data ? data : [],
                isLoading: isLoading,
                handleToDoListCreate: handleToDoListCreate,
                handleRenameToDoList: handleRenameToDoList,
                handleTodoListRemove: handleTodoListRemove,
            }}
        >
            {children}
        </ToDoListSelectorContext.Provider>
    );
};
