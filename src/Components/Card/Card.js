import React from 'react';
import styles from './Card.module.css'

const Card = (props) => {

    return (
        <div className={styles.Card}>
            <button><img src={props.imageUrl} alt={props.name}/></button>
        </div>
    );
};

export default Card;