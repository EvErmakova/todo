import React, {PureComponent} from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends PureComponent {
    buttons = [
        this.createButton('all', 'All'),
        this.createButton('active', 'Active'),
        this.createButton('done', 'Done')
    ];

    createButton(type, label) {
        return { type, label };
    }

    render() {
        const { filter, onFilterChange } = this.props;

        const buttons = this.buttons.map(({ type, label }) => {
            const isActive = type === filter;

            return (
                <button
                    type="button"
                    key={`btn-${type}`}
                    className={`btn ${isActive ? 'btn-info' : 'btn-outline-secondary'}`}
                    onClick={ () => onFilterChange(type) }
                >
                    {label}
                </button>
            );
        });

        return (
            <div className="btn-group">
                { buttons }
            </div>
        );
    }
};
