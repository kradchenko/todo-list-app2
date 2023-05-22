import { Route, Routes } from 'react-router';

import { Layout } from 'components/Layout';
import { NoToDoList } from 'components/todos/NoToDoList';
import { ToDoList } from 'components/todos/ToDoList';
import { ToDoListSelectorProvider } from 'context/ToDoListSelectorContext';

export const Home = () => {
    return (
        <ToDoListSelectorProvider>
            <Layout>
                <Routes>
                    <Route index element={<NoToDoList />} />
                    <Route path=":id" element={<ToDoList />} />
                </Routes>
            </Layout>
        </ToDoListSelectorProvider>
    );
};
