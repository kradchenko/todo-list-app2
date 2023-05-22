import { useContext } from 'react';

import { ToDoListSelectorContext } from './ToDoListSelectorContext';

export const useTodoListSelector = () => useContext(ToDoListSelectorContext);
