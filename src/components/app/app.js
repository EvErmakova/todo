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
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
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
            }
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
            }
        });
    }

    onToggleImportant = (id) => {
        this.toggleProperty(id, 'important');
    }

    onToggleDone = (id) => {
        this.toggleProperty(id, 'done');
    }

    render () {
        const { todoData } = this.state;

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader todo={ todoCount } done={ doneCount }/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <TodoList
                    todos={ todoData }
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
