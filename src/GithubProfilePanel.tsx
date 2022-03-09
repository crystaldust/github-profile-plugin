import React from "react"
// import "./styles/_cardInformation.scss"
import "./styles/_iconInformation.scss"
import './styles/_cardInformation.scss'
import './styles/GithubProfilePanel.scss'
import {IconCompany, IconLocation, IconTwitter, IconWebsite} from './Icons'


class GithubProfilePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            unavailable: 'Not Available'
        }
    }

    joined() {
        let profile = this.props.profile
        if (!profile.created_at) {
            return 'Undefined'
        }
        const date = new Date(profile.created_at);
        const d = date.toString().split(" ");
        return `Joined ${d[2]} ${d[1]} ${d[3]}`;
    }

    name() {
        const profile = this.props.profile
        if (profile.name) {
            return String(profile.name).replace(/\b\w/g, (l) => l.toUpperCase());
        } else {
            return String(profile.login).replace(/\b\w/g, (l) => l.toUpperCase());
        }
    }

    company() {
        let profile = this.props.profile
        const array = String(profile.company).split("");
        if (array[0] === "@") {
            array.splice(0, 1);
        }
        return array.join("");
    }

    render() {
        return (
            <div className="card">
                <div className="information">
                    <img className="information__img" src={this.props.profile.avatar_url} alt="avatar"/>

                    <div className="information__container">
                        <h2 className="information__name">{this.name()}</h2>
                        <h3 className="information__user">
                            <a href={`https://github.com/${this.props.profile.login}`}>
                                {`@${this.props.profile.login}`}
                            </a>
                        </h3>
                        <p className="information__joined">{this.joined()}</p>
                    </div>

                    <p className={`information__description ${this.props.profile.bio ? '' : 'opasity'}`}>
                        {this.props.profile.bio ? this.props.profile.bio : "This profile has no bio"}
                    </p>

                    <div className="information__statistic">

                        <div className="information__item">
                            <a href={`https://github.com/${this.props.profile.login}?tab=repositories`} target="_blank" rel="noreferrer">
                                <h4 className="information__item--title">Repos</h4>
                            </a>
                            <p className="information__item--content">{this.props.profile.public_repos ? this.props.profile.public_repos : '0'}</p>
                        </div>

                        <div className="information__item">
                            <a href={`https://github.com/${this.props.profile.login}?tab=followers`} target="_blank" rel="noreferrer">
                                <h4 className="information__item--title">Followers</h4>
                            </a>
                            <p className="information__item--content">{this.props.profile.followers ? this.props.profile.followers : '0'}</p>
                        </div>
                        <div className="information__item">
                            <a href={`https://github.com/${this.props.profile.login}?tab=followering`} target="_blank" rel="noreferrer">
                                <h4 className="information__item--title">Following</h4>
                            </a>
                            <p className="information__item--content">{this.props.profile.following ? this.props.profile.following : '0'}</p>
                        </div>
                    </div>

                    <div className="information__links">
                        <p className="information__link location">
                            <span class="information__icon"><IconLocation/></span>
                            {this.props.profile.location ? this.props.profile.location : this.state.unavailable}
                        </p>

                        <a
                            href={`this.props.profile.blog`}
                            class={`information__link ${this.props.profile.blog ? '' : 'opasity'}`}>
                            <span class="information__icon"><IconWebsite/></span>
                            {this.props.profile.blog === "" || this.props.profile.blog === undefined ? this.state.unavailable : this.props.profile.blog}
                        </a>


                        <a target="_blank" rel="noreferrer" href={`https://twitter.com/${this.props.profile.twitter_username}`}
                           class={`information__link ${this.props.profile.twitter_username ? '' : 'opasity'}`}>
                            <span class="information__icon"><IconTwitter/></span>
                            {this.props.profile.twitter_username ? this.props.profile.twitter_username : this.state.unavailable}
                        </a>

                        <a target="_blank" rel="noreferrer" href={`https://github.com/${this.company()}`}
                           className={`information__link ${this.props.profile.company ? '' : 'opasity'}`}>
                            <span class="information__icon"><IconCompany/></span>
                            {this.props.profile.company ? this.props.profile.company : this.state.unavailable}
                        </a>

                    </div>
                </div>
            </div>
        )
    }
}

export default GithubProfilePanel