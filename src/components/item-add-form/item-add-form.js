import React, {PureComponent} from "react";
import './item-add-form.css';

export default class ItemAddForm extends PureComponent {
    render() {
        const { onItemAdded } = this.props;

        return (
            <div className="item-add-form">
                <button
                    className="btn btn-outline-secondary"
                    onClick={ () => onItemAdded('New Item') }
                >
                    Add Item
                </button>
            </div>
        );
    }
}
