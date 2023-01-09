import React, {PureComponent} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import './app.css';

export default class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            todoData: [
                {label: 'DrinkCoffee', important: false, id: 1},
                {label: 'Make Awesome App', important: true, id: 2},
                {label: 'Have a Lunch', important: false, id: 3}
            ]
        };
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

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
            const newItem = {
                label: label, important: false, id: todoData.length + 1
            };

            return {
                todoData: [
                    ...todoData,
                    newItem
                ]
            }
        });
    }

    render () {
        const { todoData } = this.state;

        return (
            <div className="todo-app">
                <AppHeader todo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <TodoList
                    todos={ todoData }
                    onDeleted={ this.deleteItem }
                />
                <ItemAddForm
                    onItemAdded={ this.addItem }
                />
            </div>
        );
    }
};
