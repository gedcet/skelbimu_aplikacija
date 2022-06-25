import "./Komentaras.css"
const Komentaras = ({ komentaras }) =>
{
    return (
        <div className="Komentaras">

            <span>{komentaras.autorius}:</span>
            <span>{komentaras.tekstas}</span>

        </div>
    )
}

export default Komentaras