import React from 'react';


const BookCard = ({data}) => {

    return (

        (data) ?
        (<div className="book-card">
            <h1>{data.title}</h1>
            {/* <img src={`https://covers.openlibrary.org/b/isbn/${data.isbn[0]}.jpg`} alt={`${data.title} cover`} /> */}
            {data.author_name[0] ? <p>Author: <b>{data.author_name[0]}</b></p> : <p>Author not found</p>}
            {data.publish_date[0] ? <p>Publish Date: <b>{data.publish_date[0]}</b></p> : <p>Publish Date not found</p>}
        </div>) : null
    );
}

export default BookCard;