import React from 'react';
import {Link} from 'react-router-dom';
import Nav from "./Nav";

const Home = props => {
  
  return (
      <div className="Home">
          <Nav />
          <h1>Lambda Eats</h1>
        <Link to = {`/pizza`}>
            <button>Order Now!</button>
        </Link>
    </div>


  );
}

export default Home;