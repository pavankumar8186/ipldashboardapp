import './index.css'

const MatchCard = props => {
  const {details} = props
  return (
    <li className="matches-list-item">
      <img
        className="matches-item-logo"
        src={details.competing_team_logo}
        alt={`competing team ${details.competing_team}`}
      />
      <p className="matches-item-details">{details.competing_team}</p>
      <p className="matches-item-details">{details.result}</p>
      <p className="matches-item-details">{details.match_status}</p>
    </li>
  )
}
export default MatchCard
