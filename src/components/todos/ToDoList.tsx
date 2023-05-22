import { useContext, useMemo } from 'react';
import { Navigate, useParams } from 'react-router';

import { ToDoListSelectorContext } from 'context/ToDoListSelectorContext';

import { ToDoListTitleContainer } from './ToDoListTitleContainer';
import { ToDosContainer } from './ToDosContainer';

export const ToDoList = () => {
    const { todoLists, isLoading } = useContext(ToDoListSelectorContext);

    const { id: todoCode } = useParams<{ id: string }>();

    const todoList = useMemo(() => {
        const res = todoLists.find((el) => el.code === todoCode);
        return res;
    }, [todoCode, todoLists]);

    if (isLoading) {
        return <div className="p-5 sm:p-10">Loading...</div>;
    }

    if (!isLoading && todoLists.length === 0) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="p-5 sm:p-10">
            {todoList ? (
                <>
                    <ToDoListTitleContainer
                        key={`todolist-title-input-${todoList.code}`}
                        title={todoList.title}
                        toDoListId={todoList.id}
                    />
                    <ToDosContainer
                        key={`todos-container-${todoList.id}`}
                        toDoListId={todoList.id}
                    />
                </>
            ) : (
                <div>Problem occured while fetching ToDo List</div>
            )}
        </div>
    );
};
