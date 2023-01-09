import React from "react";
import {createRoot} from "react-dom/client";

import AppHeader from "./components/app-header/app-header";
import ItemStatusFilter from "./components/item-status-filter/item-status-filter";
import SearchPanel from "./components/search-panel/search-panel";
import TodoList from "./components/todo-list/todo-list";

import './index.css';

const App = () => {
    const todoData = [
        {label: 'DrinkCoffee', important: false, id: 1},
        {label: 'Make Awesome App', important: true, id: 2},
        {label: 'Have a Lunch', important: false, id: 3}
    ];

    return (
        <div className="todo-app">
            <AppHeader todo={1} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
            </div>

            <TodoList todos={todoData} />
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
