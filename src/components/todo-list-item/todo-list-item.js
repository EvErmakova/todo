import React, {PureComponent} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            done: false,
            important: false
        };
    }

    get itemClasses() {
        const { done, important } = this.state;

        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important';
        }

        return classNames;
    }

    onLabelClick = () => {
        this.setState((prevState) => ({
            done: !prevState.done
        }));
    }

    onMarkImportantClick = () => {
        this.setState((prevState) => ({
            important: !prevState.important
        }));
    }

    render() {
        const { label, onDeleted } = this.props;

        return (
            <span className={this.itemClasses}>
                <span
                    className="todo-list-item-label"
                    onClick={ this.onLabelClick }
                >
                    {label}
                </span>

                <button type="button" className="btn btn-outline-success btn-sm float-right"
                        onClick={ this.onMarkImportantClick }
                >
                    <i className="fa fa-exclamation" />
                </button>

                <button type="button" className="btn btn-outline-danger btn-sm float-right"
                        onClick={ onDeleted }
                >
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        );
    }
}
