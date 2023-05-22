import { ChangeEvent, useContext, useState } from 'react';

import { ToDoListSelectorContext } from 'context/ToDoListSelectorContext';

import { NavItem } from '../ui/NavItem';

interface ToDoListsHeaderProps {
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ToDoListsHeader = ({ onSearch }: ToDoListsHeaderProps) => (
    <div className="mb-2 flex flex-col">
        <span className="text-xl text-white">TODO Lists</span>
        <input
            type="search"
            className="bg-transparent border-b border-gray-400 focus:border-white hover:border-white text-white outline-none my-5"
            placeholder="Search..."
            onChange={onSearch}
        />
    </div>
);

export const ToDoListsContainer = () => {
    const { isLoading, todoLists: todosLists } = useContext(ToDoListSelectorContext);
    const [search, setSearch] = useState<string>('');

    if (isLoading) {
        return <div className="flex justify-center text-white">Loading...</div>;
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <ToDoListsHeader onSearch={handleSearch} />
            <ul className="flex flex-col overflow-y-auto">
                {todosLists.length > 0 ? (
                    search.length === 0 ? (
                        todosLists.map((el) => {
                            return (
                                <NavItem
                                    key={`todo-list-${el.code}`}
                                    to={el.code}
                                    title={el.title}
                                />
                            );
                        })
                    ) : (
                        todosLists
                            .filter((el) => el.title.includes(search))
                            .map((el) => (
                                <NavItem
                                    key={`todo-list-${el.code}`}
                                    to={el.code}
                                    title={el.title}
                                />
                            ))
                    )
                ) : (
                    <div className="mt-24 self-center text-gray-100">
                        No <span className="text-purple-400">TODO List</span> to select 🙅🏻‍♂️
                    </div>
                )}
            </ul>
        </>
    );
};
