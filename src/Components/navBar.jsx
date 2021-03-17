import React, { Component } from 'react';
import { Link } from "react-router-dom"

class NavBar extends Component {
    state = {}
    render() {
        return (
            <div class="navbar-nav">
                <Link class="nav-link active" aria-current="page" to="">Home</Link>
                <Link class="nav-link" to="">Features</Link>
                <Link class="nav-link" to="">Pricing</Link>
                <Link class="nav-link disabled" to="" tabindex="-1" aria-disabled="true">Disabled</Link>
            </div>
        );
    }
}

export default NavBar;