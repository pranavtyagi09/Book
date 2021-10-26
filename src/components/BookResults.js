import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

const BookResults = ({data}) => {

    return (
    <div className="book-card-container">
        {data && data.map((item, key) => {
            return (
                <BookCard key={key} data={item} />
            )
        })}
    </div>
    );
}

export default BookResults;