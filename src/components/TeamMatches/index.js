import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {isLoading: true, latestDetails: {}, matches: [], bannerUrl: ''}

  componentDidMount = () => {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const matchesData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }
    // console.log(data)

    this.setState({
      latestDetails: matchesData.latestMatchDetails,
      matches: matchesData.recentMatches,
      bannerUrl: matchesData.teamBannerUrl,
      isLoading: false,
    })
  }

  renderLatestMatch = () => {
    const {latestDetails} = this.state
    // console.log('latestDetails', latestDetails)
    // console.log(latestDetails)
    return (
      <>
        <p className="matches-heading">Latest Matches</p>
        <div className="latest-matches-container">
          <div className="matches-latest-top-section">
            <div className="matches-latest-top-section-content">
              <p>{latestDetails.competing_team}</p>
              <p>{latestDetails.date}</p>
              <p>{latestDetails.venue}</p>
              <p>{latestDetails.result}</p>
            </div>
            <div className="matches-team-logo-container">
              <img
                className="matches-team-logo"
                src={latestDetails.competing_team_logo}
                alt={`latest match ${latestDetails.competing_team}`}
              />
            </div>
          </div>
          <hr />
          <p>first_innings</p>
          <p>{latestDetails.first_innings}</p>
          <p>second_innings</p>
          <p>{latestDetails.second_innings}</p>
          <p>man_of_the_match</p>
          <p>{latestDetails.man_of_the_match}</p>
          <p>umpires</p>
          <p>{latestDetails.umpires}</p>
        </div>
      </>
    )
  }

  renderMatchesList = () => {
    const {matches} = this.state
    // console.log(matches)
    return (
      <ul className="matches-list-container">
        {matches.map(each => (
          <MatchCard key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderMatchesDetails = () => {
    const {bannerUrl, latestDetails} = this.state
    // console.log(latestDetails)
    // console.log(bannerUrl)
    return (
      <>
        <img className="team-match-image" src={bannerUrl} alt="team banner" />
        {this.renderLatestMatch()}
        {this.renderMatchesList()}
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="team-match-bg-container">
        {isLoading ? (
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        ) : (
          this.renderMatchesDetails()
        )}
      </div>
    )
  }
}
export default TeamMatches
