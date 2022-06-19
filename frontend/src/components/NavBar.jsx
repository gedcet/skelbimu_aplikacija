import "./NavBar.css"
const NavBar = ({ set_state_current_view }) =>
{
    return (
        <div className="NavBar">

            <span>logo</span>

            <span></span>

            <button onClick={() => { set_state_current_view("SignUp") }}>SignUp</button>

            <button onClick={() => { set_state_current_view("SignIn") }}>SignIn</button>

        </div>
    )
}

export default NavBar