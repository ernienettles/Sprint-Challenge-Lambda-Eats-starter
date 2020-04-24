import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

export default function Nav() {


    return (
        <nav>
            <Link to={`/`}>
                <button>Home</button>
            </Link>
        </nav>

    )
}
