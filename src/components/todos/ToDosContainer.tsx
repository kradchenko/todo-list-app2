import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';

import { ToDo } from 'schema';
import { api } from 'utils/api';

import { ToDoItems } from './ToDoItems';

interface ToDosContainerProps {
    toDoListId: number;
}

export const ToDosContainer = ({ toDoListId }: ToDosContainerProps) => {
    const { data, refetch } = useQuery<ToDo[]>({
        queryKey: ['todos'],
        queryFn: () => api.get(`/todo-list/${toDoListId}/todo`).then((res) => res.data),
    });

    return (
        <Tab.Group>
            <Tab.List className="mt-10">
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={classNames(
                                'px-5 text-lg rounded-xl border border-purple-500 mr-5',
                                selected ? 'bg-purple-500 text-white' : null,
                            )}
                        >
                            All
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={classNames(
                                'px-5 text-lg rounded-xl border border-purple-500 mr-5',
                                selected ? 'bg-purple-500 text-white' : null,
                            )}
                        >
                            Active
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={classNames(
                                'px-5 text-lg rounded-xl border border-purple-500',
                                selected ? 'bg-purple-500 text-white' : null,
                            )}
                        >
                            Completed
                        </button>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    {data ? (
                        <ToDoItems todos={data} toDoListId={toDoListId} refetch={refetch} />
                    ) : null}
                </Tab.Panel>
                <Tab.Panel>
                    {data ? (
                        <ToDoItems
                            todos={data?.filter((el) => !el.completed)}
                            toDoListId={toDoListId}
                            refetch={refetch}
                        />
                    ) : null}
                </Tab.Panel>
                <Tab.Panel>
                    {data ? (
                        <ToDoItems
                            todos={data?.filter((el) => el.completed)}
                            toDoListId={toDoListId}
                            refetch={refetch}
                        />
                    ) : null}
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};
