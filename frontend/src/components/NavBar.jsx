import "./NavBar.css"

const NavBar = ({ set_state_current_view, state_vartotojas }) =>
{
    return (
        <div className="NavBar">

            <span>logo</span>

            <span></span>

            <span>{state_vartotojas.vardas}</span>

            <span>{state_vartotojas.tipas}</span>

            <button onClick={() => { set_state_current_view("SignUp") }}>SignUp</button>

            <button onClick={() => { set_state_current_view("SignIn") }}>SignIn</button>

        </div>
    )
}

export default NavBar