import React, { useState, useEffect, useRef } from 'react';
import BookCard from './BookCard'
import axios from 'axios';
import './style.css'


const SearchForm = () => {

    const [ bookList, setBookList ] = useState();
    const [ filterList, setFilterList ] = useState();
    const bookInput = useRef();

    useEffect(()=>{
        axios.get(`http://openlibrary.org/search.json?author=tolkien`)
        .then((res)=>{setBookList(res.data.docs)
                        setFilterList(res.data.docs)})
        .catch((err)=>{console.log(err)});
    },[])

    const handleSearch = (e) => {
        if(bookInput.current.value){
            let newList = bookList.filter((data)=>{
                return Object.values(data)
                .join(" ")
                .toLowerCase()
                .includes(bookInput.current.value.toLowerCase())
            })
            setFilterList(newList);
        }
    }

    return (
        <div className="search-box" >
            <h1>Book Search App</h1>
            <form id="searchForm">
                <label for="bookSearch">Please enter the book name</label>
                <input type="text" name="bookSearch" id="bookSearch" onChange={handleSearch} ref={bookInput} />
                {/* <BookCard data={bookRes} /> */}
                <div className="book-card-container">
                {filterList && filterList.map((item, key) => {
                    return (
                        <BookCard key={key} data={item} />
                    )
                })}
                </div>
                {console.log(filterList)}
            </form>
        </div>
    );
}

export default SearchForm;