import React, {PureComponent} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends PureComponent {
    itemClasses(done, important)  {
        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important';
        }

        return classNames;
    }

    render() {
        const { label, important, done,
                onDeleted, onToggleImportant, onToggleDone } = this.props;

        const classNames = this.itemClasses(done, important);

        return (
            <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick={ onToggleDone }
                >
                    {label}
                </span>

                <button type="button" className="btn btn-outline-success btn-sm float-right"
                        onClick={ onToggleImportant }
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
