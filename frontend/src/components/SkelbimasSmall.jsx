import "./SkelbimasSmall.css"
const SkelbimasSmall = ({ skelbimas }) =>
{
    return (
        <div className="SkelbimasSmall">
            <span>{skelbimas.pavadinimas}</span>
            <span>{skelbimas.aprasas}</span>
            <span>{skelbimas.kaina} EUR</span>
            <span>{skelbimas.autorius}</span>
            <img src={skelbimas.nuotrauka_base64}/>
        </div>
    )
}

export default SkelbimasSmall