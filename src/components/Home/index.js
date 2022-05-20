import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {async} from 'rxjs'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {matchesList: [], isLoading: true}

  componentDidMount = () => {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const matchDetails = teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({matchesList: matchDetails, isLoading: false})
  }

  renderHome = () => {
    const {matchesList} = this.state
    return (
      <div className="logo-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />
        <h1 className="home-main-heading">IPL Dashboard</h1>
        <ul className="home-list-container">
          {matchesList.map(each => (
            <TeamCard key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderHome()
        )}
      </div>
    )
  }
}
export default Home
