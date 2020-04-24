import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Home = props => {
  
  return (
      <div className="Home">
          <h1>Lambda Eats</h1>
        <Link to = {`/pizza`}>
            <button>Order Now!</button>
        </ Link>
    </div>


  );
}

export default Home;