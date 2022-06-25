import "./SkelbimasSmall.css"
const SkelbimasSmall = ({ skelbimas, handle_click }) =>
{
    return (
        <div className="SkelbimasSmall" onClick={handle_click}>
            <span>{skelbimas.pavadinimas}</span>
            <span>{skelbimas.aprasas}</span>
            <span>{skelbimas.kaina} EUR</span>
            <span>{skelbimas.autorius}</span>
            <img src={skelbimas.nuotrauka_base64} />
        </div>
    )
}

export default SkelbimasSmall