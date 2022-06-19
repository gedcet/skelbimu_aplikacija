import "./Status.css"
const Status = ({ state_status_text }) =>
{
    return (
        <div className="Status">
            <span>{state_status_text}</span>
        </div>
    )
}

export default Status