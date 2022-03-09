import React from "react"
import {PanelProps} from '@grafana/data';

// interface Props extends PanelProps<SimpleOptions> {}

export interface GithubProfilePanelOptions {
    dark: boolean
}

import "./styles/_iconInformation.scss"
import './styles/_cardInformation.scss'
import './styles/GithubProfilePanel.scss'
import {IconCompany, IconLocation, IconTwitter, IconWebsite} from "./Icons"


export const MyGithubProfilePanel: React.FC<PanelProps<GithubProfilePanelOptions>> = (props) => {
    let state = {
        unavailable: 'Not Available'
    }
    const profile = props.profile

    let joined = () => {
        if (!profile.created_at) {
            return 'Undefined'
        }
        const date = new Date(profile.created_at);
        const d = date.toString().split(" ");
        return `Joined ${d[2]} ${d[1]} ${d[3]}`;
    }

    let name = () => {
        if (profile.name) {
            return String(profile.name).replace(/\b\w/g, (l) => l.toUpperCase());
        } else {
            return String(profile.login).replace(/\b\w/g, (l) => l.toUpperCase());
        }
    }

    let company = () => {
        const array = String(profile.company).split("");
        if (array[0] === "@") {
            array.splice(0, 1);
        }
        return array.join("");
    }

    return (
        <div className="card">
            <div className="information">
                <img className="information__img" src={profile.avatar_url} alt="avatar"/>

                <div className="information__container">
                    <h2 className="information__name">{name()}</h2>
                    <h3 className="information__user">
                        <a href={`https://github.com/${profile.login}`}>
                            {`@${profile.login}`}
                        </a>
                    </h3>
                    <p className="information__joined">{joined()}</p>
                </div>

                <p className={`information__description ${profile.bio ? '' : 'opasity'}`}>
                    {profile.bio ? profile.bio : "This profile has no bio"}
                </p>

                <div className="information__statistic">

                    <div className="information__item">
                        <a href={`https://github.com/${profile.login}?tab=repositories`} target="_blank"
                           rel="noreferrer">
                            <h4 className="information__item--title">Repos</h4>
                        </a>
                        <p className="information__item--content">{profile.public_repos ? profile.public_repos : '0'}</p>
                    </div>

                    <div className="information__item">
                        <a href={`https://github.com/${profile.login}?tab=followers`} target="_blank"
                           rel="noreferrer">
                            <h4 className="information__item--title">Followers</h4>
                        </a>
                        <p className="information__item--content">{profile.followers ? profile.followers : '0'}</p>
                    </div>
                    <div className="information__item">
                        <a href={`https://github.com/${profile.login}?tab=followering`} target="_blank"
                           rel="noreferrer">
                            <h4 className="information__item--title">Following</h4>
                        </a>
                        <p className="information__item--content">{profile.following ? profile.following : '0'}</p>
                    </div>
                </div>

                <div className="information__links">
                    <p className="information__link location">
                        <span className="information__icon"><IconLocation/></span>
                        {profile.location ? profile.location : state.unavailable}
                    </p>

                    <a
                        href={`profile.blog`}
                        className={`information__link ${profile.blog ? '' : 'opasity'}`}>
                        <span className="information__icon"><IconWebsite/></span>
                        {profile.blog === "" || profile.blog === undefined ? state.unavailable : profile.blog}
                    </a>


                    <a target="_blank" rel="noreferrer" href={`https://twitter.com/${profile.twitter_username}`}
                       className={`information__link ${profile.twitter_username ? '' : 'opasity'}`}>
                        <span className="information__icon"><IconTwitter/></span>
                        {profile.twitter_username ? profile.twitter_username : state.unavailable}
                    </a>

                    <a target="_blank" rel="noreferrer" href={`https://github.com/${company()}`}
                       className={`information__link ${profile.company ? '' : 'opasity'}`}>
                        <span className="information__icon"><IconCompany/></span>
                        {profile.company ? profile.company : state.unavailable}
                    </a>

                </div>
            </div>
        </div>
    );
};

export default MyGithubProfilePanel