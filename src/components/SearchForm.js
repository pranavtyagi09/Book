import React, { useState, useEffect, useRef } from 'react';
import BookCard from './BookCard'
import axios from 'axios';
import './style.css'


const SearchForm = () => {

    const [ bookUrl, setBookUrl ] = useState();
    const [ bookRes, setBookRes ] = useState();
    const [ bookList, setBookList ] = useState();
    const bookInput = useRef();

    useEffect(()=>{
        if (bookUrl){
        axios.get(`http://openlibrary.org/search.json?q=${bookUrl}`)
        .then((res)=>{setBookRes(res.data.docs[0])})
        .catch((err)=>{console.log(err)});
    }
    },[bookUrl])

    useEffect(()=>{
        axios.get(`http://openlibrary.org/search.json?author=tolkien`)
        .then((res)=>{setBookList(res.data.docs)})
        .catch((err)=>{console.log(err)});
    },[])

    const bookSearch = (e) => {
        e.preventDefault();
        setBookUrl(formatBookName(bookInput.current.value));
    }

    const formatBookName = (name) => {
        return name.split(' ').join('+');
    }

    return (
        <div className="search-box" >
            <h1>Book Search App</h1>
            <form id="searchForm">
                <label for="bookSearch">Please enter the book name</label>
                <input type="text" name="bookSearch" id="bookSearch" ref={bookInput} />
                <button type="submit" onClick={bookSearch} >Search</button>
                {/* <BookCard data={bookRes} /> */}
                <div className="book-card-container">
                {bookList && bookList.map((item, key) => {
                    return (
                        <BookCard key={key} data={item} />
                    )
                })}
                </div>
                {console.log(bookList)}
            </form>
        </div>
    );
}

export default SearchForm;