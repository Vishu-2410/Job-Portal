import React from 'react';
import { Link } from 'react-router-dom';
import img404i from "../images/img404i.jpg";
import './NotFound.css';
const NotFound = () => {
  return (
    <>
      <section className='page notfound'>
        <div className="content">
          <img src={img404i} alt="notfound" />
          <Link to={'/'}>RETURN TO HOME PAGE</Link>
        </div>
      </section>
    </>
  )
}

export default NotFound;