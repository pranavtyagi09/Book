import React, { useState, useEffect, useRef } from 'react';
import BookResults from './BookResults'
import axios from 'axios';
import './style.css'


const SearchForm = () => {

    const [ bookList, setBookList ] = useState();
    const [ filterList, setFilterList ] = useState();
    const bookInput = useRef();

    useEffect(()=>{
        pullData();
    },[])

    const pullData = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?author=tolkien`)
        .then((res)=>{
                        setBookList(res.data.docs)
                        setFilterList(res.data.docs)
                    })
        .catch((err)=>{console.log(err)});
    }

    const compare = ( a, b ) => {
        if ( a.title < b.title ){
          return -1;
        }
        if ( a.title > b.title ){
          return 1;
        }
        return 0;
      }

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

    const handleSort = (e) => {
        if (e.target.value === "title"){
            let newList = filterList.sort(compare);
            setFilterList([...newList]);
        }
        else if (e.target.value === "date"){
            let newList = filterList.sort((a,b)=>{ return (new Date(a.publish_date[0]) - new Date(b.publish_date[0]))})
            setFilterList([...newList]);
        }
    }

    return (
        <div className="search-box" >
            <h1>Book Search App</h1>
                <form id="searchForm" className="search-form">
                    <label for="bookSearch">Please enter the book name</label>
                    <input type="text" name="bookSearch" id="bookSearch" onChange={handleSearch} ref={bookInput} disabled={!bookList} />
                </form>
                <div className="sort-by">
                    <label for="order">Sort Booklist by:</label>
                    <select name="order" id="order" onChange={handleSort} disabled={!bookList} >
                        <option value="" disabled selected>Please select</option>
                        <option value="title">Title</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            {filterList && filterList[0] && <BookResults key={filterList[0].title} data={filterList} />}
        </div>
    );
}

export default SearchForm;