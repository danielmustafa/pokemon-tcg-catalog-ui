import React from 'react';
import styles from './Filters.module.css'

const Filters = ({ filters, onFilterSelected }) => {

    const generateFilterCheckboxes = () => {
        let filterArr = []
        console.log('filters - render')
        console.log(filters)
        for (var filter of Object.keys(filters)) {
            filterArr.push(
                <div>
                    <label className={styles.filterType}>{filter}: </label>
                    {filters[filter].map(filterValue => {
                        return <label className={styles.filterValue}><input filtertype={filter} key={filterValue.key} type="checkbox" name={filterValue.key} checked={filterValue.selected} onChange={ onFilterSelected }></input>{filterValue.key}</label>
                    })}
                </div>
            )
        }
        return filterArr
    }

    return (
        <div>
            <div><h4>Filter by:</h4></div>
            <div>

                {generateFilterCheckboxes()}
            </div>
        </div>
    );
};

export default Filters;