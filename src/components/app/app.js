import React, {PureComponent} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import './app.css';

export default class App extends PureComponent {
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a Lunch'),
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    }

    findIndex(arr, id) {
        return arr.findIndex((el) => el.id === id);
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = this.findIndex(todoData, id);

            return {
                todoData: [
                    ...todoData.slice(0, idx),
                    ...todoData.slice(idx + 1)
                ]
            };
        });
    }

    addItem = (label) => {
        this.setState(({ todoData }) => {
            const newItem = this.createTodoItem(label);

            return {
                todoData: [
                    ...todoData,
                    newItem
                ]
            };
        });
    }

    toggleProperty = (id, propName) => {
        this.setState(({ todoData }) => {
            const idx = this.findIndex(todoData, id);

            const item = {
                ...todoData[idx],
                [propName]: !todoData[idx][propName]
            };

            return {
                todoData: [
                    ...todoData.slice(0, idx),
                    item,
                    ...todoData.slice(idx + 1)
                ]
            };
        });
    }

    onToggleImportant = (id) => {
        this.toggleProperty(id, 'important');
    }

    onToggleDone = (id) => {
        this.toggleProperty(id, 'done');
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase()
                .includes(term.toLowerCase());
        });
    }

    onSearchChange = (term) => {
        this.setState({ term });
    }

    filter(items, filter) {
        if (filter === 'all') {
            return items;
        }

        return items.filter((item) => {
            switch (filter) {
                case 'active':
                    return !item.done;
                case 'done':
                    return item.done;
                default:
                    return item;
            }
        });
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    }

    render () {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader todo={ todoCount } done={ doneCount }/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={ this.onSearchChange } />
                    <ItemStatusFilter filter={ filter } onFilterChange={ this.onFilterChange } />
                </div>
                <TodoList
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />
                <ItemAddForm
                    onItemAdded={ this.addItem }
                />
            </div>
        );
    }
};
