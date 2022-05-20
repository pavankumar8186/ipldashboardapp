import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {details} = props
  const {id, name, teamImageUrl} = details
  console.log(details)
  return (
    <Link to={`/team-matches/${id}`} className="team-card-link">
      <li className="team-list-item-container">
        <div>
          <img className="team-image" src={teamImageUrl} alt={name} />
        </div>
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}
export default TeamCard
