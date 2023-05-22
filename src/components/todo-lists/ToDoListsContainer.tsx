import { useContext } from 'react';

import { ToDoListSelectorContext } from 'context/ToDoListSelectorContext';

import { NavItem } from '../ui/NavItem';

const ToDoListsHeader = () => (
    <div className="mb-2 flex justify-between items-center">
        <span className="text-lg text-white">ToDo Lists</span>
    </div>
);

export const ToDoListsContainer = () => {
    const { isLoading, todoLists: todosLists } = useContext(ToDoListSelectorContext);

    if (isLoading) {
        return <div className="flex justify-center text-white">Loading...</div>;
    }

    return (
        <>
            <ToDoListsHeader />
            <ul className="flex flex-col overflow-y-auto">
                {todosLists.length > 0 ? (
                    todosLists.map((el) => {
                        return (
                            <NavItem key={`todo-list-${el.code}`} to={el.code} title={el.title} />
                        );
                    })
                ) : (
                    <div className="mt-24 self-center text-gray-100">
                        No <span className="text-purple-400">ToDo List</span> to select 🙅🏻‍♂️
                    </div>
                )}
            </ul>
        </>
    );
};
