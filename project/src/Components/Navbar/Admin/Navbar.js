import  { Component } from 'react';
import "../NavbarStyle.css";
import { AdminMenuItems } from "../NavbarMenuItems";
import { Link } from 'react-router-dom';

class Navbar extends Component{


    state = { clicked: false };
    handleClick = () =>{
        this.setState({ clicked: !this.state.clicked})
    }

    render(){
        const { tokenData } = this.props;
        return(
            <nav className='navbarIteams'>

                <h1 className='navbar-logo'>ERC 20 Token Exchange</h1>

                <div className='menu-icons' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
                </div>

                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {AdminMenuItems.map((item, index) => {

                        return(
                            // <li key={index}>
                            //     <Link className={`${item.className} ${this.props.currentPage === item.url ? 'active-link' : ''}`} to={item.url}>
                            //         <i className={item.icon}></i>{item.title}
                            //     </Link>
                            // </li>

                            <li key={index}>
                                {item.url === "/admindashboard/viewtoken" && !tokenData.balance ? (
                                    <span className="nav-disabled-link">
                                        <i className={item.icon}></i>{item.title}
                                    </span>
                                ) : (
                                    <Link className={`${item.className} ${this.props.currentPage === item.url ? 'active-link' : ''}`} to={item.url}>
                                        <i className={item.icon}></i>{item.title}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
                
            </nav>
        )
    }
}

export default Navbar