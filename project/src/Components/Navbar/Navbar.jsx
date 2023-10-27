import  { Component } from 'react';
import "./NavbarStyle.css";
import { MenuItems } from "./NavbarMenuItems";

class Navbar extends Component{

    state = { clicked: false };
    handleClick = () =>{
        this.setState({ clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className='navbarIteams'>
            <h1 className='navbar-logo'>ERC 20 Token Exchange</h1>
            <div className='menu-icons' onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
            </div>
            <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return(
                        <li key={index}>
                            <a className={item.className} href='/'>
                                <i className={item.icon}></i>{item.title}
                            </a>
                        </li>
                    )
                })}
                <button>Login</button>
                <button>Sign Up</button>
            </ul>
        </nav>
        )
    }
}

export default Navbar