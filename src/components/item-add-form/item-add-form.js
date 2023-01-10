import React, {PureComponent} from "react";
import './item-add-form.css';

export default class ItemAddForm extends PureComponent {
    state = {
        label: ''
    };

    onLabelChange = (evt) => {
        this.setState({
            label: evt.target.value
        });
    };

    onSubmit = (evt) => {
        evt.preventDefault();

        if (this.state.label) {
            this.props.onItemAdded(this.state.label);
            this.setState({
                label: ''
            });
        }
    }

    render() {
        return (
            <form
                className="item-add-form d-flex"
                onSubmit={ this.onSubmit }
            >
                <input
                    className="form-control"
                    type="text"
                    onChange={ this.onLabelChange }
                    value={ this.state.label }
                />
                <button
                    className="btn btn-outline-secondary"
                    type="submit"
                >
                    Add Item
                </button>
            </form>
        );
    }
}
