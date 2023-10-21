import { Link,useMatch,useResolvedPath } from "react-router-dom"
import logo from './logo.svg';
import TimePicker from './CurrentTime.js';

export default function Navbar(){
    const path = window.location.pathname
    return (
    <nav className="nav">
        <ul>
            <img src={logo} className="App-logo" alt="logo"/>
            <Link to="/" className="site-title">KLDX Token Exchange</Link>
        </ul>
        <ul>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/pricing">Pricing</CustomLink>
            <TimePicker/>
        </ul>
        
    </nav>
    )
}

function CustomLink({to,children,...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path:resolvedPath.pathname,end:true})
    return(
    <li className={isActive ? "active":""}>
        <Link to={to} {...props}>
            {children}
        </Link>
    </li>
    )
}