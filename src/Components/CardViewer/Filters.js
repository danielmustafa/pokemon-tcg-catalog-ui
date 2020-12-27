import React from 'react';

const Filters = ({filters, onFilterSelected}) => {

    const generateFilterCheckboxes = () => {
        let typeFilterArr = []
        for (var filter of Object.keys(filters)) {
            typeFilterArr.push(<React.Fragment>
                <input key={filter} type="checkbox" name={filter} checked={filters[filter]} onChange={ onFilterSelected }></input>
                <label key={`lbl-${filter}`}>{filter}</label>
            </React.Fragment>)  
        }
        return typeFilterArr
    }

    return (
        <div>
            <div><h4>Filter by:</h4></div>
            <div>
                <label>Type: </label>
                {  generateFilterCheckboxes() }
            </div>
        </div>
    );
};

export default Filters;