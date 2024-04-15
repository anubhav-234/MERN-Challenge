import React, { useEffect, useState } from 'react';
import '../App.css';
import Loader from './loader';
import callApi from '../api/callApi';

export default function ApiForm() {
  const [MemberID1, setMemberID1] = useState("");
  const [MemberID2, setMemberID2] = useState("");
  const [BookID1, setBookID1] = useState("");
  const [BookID2, setBookID2] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    setLoading(true);
    callApi('GET', "bookRequest/allBooks").then((res) => {
      setBooks(res.books);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    })
  }
  
  useEffect(() => {
  fetchBooks()
  }, [])
  
  
  
  const handleCheckoutSubmit = (event) => {
    event.preventDefault();
    callApi("POST", "bookRequest/checkout", {MemberID : MemberID1, BookID: BookID1}).then((res) => {
      alert(`${res.message}`)
    }).catch(error => {
      console.log(error);
    })
  }
    
  const handleReturnSubmit = (event) => {
    event.preventDefault();
    callApi("POST","bookRequest/return", {MemberID : MemberID2, BookID: BookID2} ).then((res) => {
      alert(`${res.message}`)
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <>
    {loading && <Loader type= 'bars' color= '#000000'/> }
     {!loading && (
          <div>
          <h2>Books List</h2>
          <h3>BooksId,    NumberOfCopies</h3>
            <ul>
              {books.map((user) => (
                <li key={user._id}>
                  <ul>{user.BookID},   {user.NumberOfCopies} </ul>
                </li>
              ))}
            </ul>
          </div>
      )}
      <h1>Checkout Form</h1>
    <form onSubmit={handleCheckoutSubmit}>
      <label>Enter MemberID:
        <input 
          type="text" 
          value={MemberID1}
          onChange={(e) => setMemberID1(e.target.value)}
        />
      </label>
      <label>Enter BookID:
        <input 
          type="text" 
          value={BookID1}
          onChange={(e) => setBookID1(e.target.value)}
        />
      </label>
      <input type="submit" />
      </form>
      
      <h1>Return Form</h1>
    <form onSubmit={handleReturnSubmit}>
      <label>Enter MemberID:
        <input 
          type="text" 
          value={MemberID2}
          onChange={(e) => setMemberID2(e.target.value)}
        />
      </label>
      <label>Enter BookID:
        <input 
          type="text" 
          value={BookID2}
          onChange={(e) => setBookID2(e.target.value)}
        />
      </label>
      <input type="submit" />
      </form>
      </>
  )
}