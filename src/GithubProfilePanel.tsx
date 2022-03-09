import React from 'react';
import { PanelProps } from '@grafana/data';
// interface Props extends PanelProps<SimpleOptions> {}

export interface GithubProfilePanelOptions {
  dark: boolean;
  // profile: object;
}

interface GithubProfileProps<T = any> {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: Boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// interface GithubProfilePanelProps extends PanelProps<GithubProfilePanelOptions> {
//   profile: GithubProfileProps;
// }

// const URL = 'https://api.github.com';

// function getGithubProfile(github_login) {
//   return fetch(`${URL}/users/${github_login}`)
//     .then((res) => res.json())
//     .catch((error) => console.error(error));
// }

import './styles/_iconInformation.scss';
import './styles/_cardInformation.scss';
import './styles/GithubProfilePanel.scss';
import { IconCompany, IconLocation, IconTwitter, IconWebsite } from './Icons';

export const GithubProfilePanel: React.FC<PanelProps> = (props) => {
  let state = {
    unavailable: 'Not Available',
  };

  let github_id = props.data.series
    .map((series) => series.fields.find((field) => field.name === 'github_login'))
    .map((field) => field?.values.get(0));
  console.log(github_id);
  let profile: GithubProfileProps = {
    login: 'crystaldust',
    id: 2040659,
    node_id: 'MDQ6VXNlcjIwNDA2NTk=',
    avatar_url: 'https://avatars.githubusercontent.com/u/2040659?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/crystaldust',
    html_url: 'https://github.com/crystaldust',
    followers_url: 'https://api.github.com/users/crystaldust/followers',
    following_url: 'https://api.github.com/users/crystaldust/following{/other_user}',
    gists_url: 'https://api.github.com/users/crystaldust/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/crystaldust/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/crystaldust/subscriptions',
    organizations_url: 'https://api.github.com/users/crystaldust/orgs',
    repos_url: 'https://api.github.com/users/crystaldust/repos',
    events_url: 'https://api.github.com/users/crystaldust/events{/privacy}',
    received_events_url: 'https://api.github.com/users/crystaldust/received_events',
    type: 'User',
    site_admin: false,
    name: 'Zhen Ju',
    company: 'Huawei',
    blog: '',
    location: 'Beijing, China',
    email: 'juzhenatpku@gmail.com',
    hireable: '',
    bio: 'NodeJS/Golang/Python/now Rust Developer, he/him. Interested in all kinds of computer technologies.',
    twitter_username: 'juzhenatpku',
    public_repos: 145,
    public_gists: 0,
    followers: 32,
    following: 23,
    created_at: '2012-07-25T13:51:16Z',
    updated_at: '2022-02-28T13:16:56Z',
  };

  let joined = () => {
    if (!profile.created_at) {
      return 'Undefined';
    }
    const date = new Date(profile.created_at);
    const d = date.toString().split(' ');
    return `Joined ${d[2]} ${d[1]} ${d[3]}`;
  };

  let name = () => {
    if (profile.name) {
      return String(profile.name).replace(/\b\w/g, (l) => l.toUpperCase());
    } else {
      return String(profile.login).replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  let company = () => {
    const array = String(profile.company).split('');
    if (array[0] === '@') {
      array.splice(0, 1);
    }
    return array.join('');
  };

  return (
    <div className="card dark">
      <div className="information">
        <img className="information__img" src={profile.avatar_url} alt="avatar" />

        <div className="information__container">
          <h2 className="information__name">{name()}</h2>
          <h3 className="information__user">
            <a href={`https://github.com/${profile.login}`}>{`@${profile.login}`}</a>
          </h3>
          <p className="information__joined">{joined()}</p>
        </div>

        <p className={`information__description ${profile.bio ? '' : 'opasity'}`}>
          {profile.bio ? profile.bio : 'This profile has no bio'}
        </p>

        <div className="information__statistic">
          <div className="information__item">
            <a href={`https://github.com/${profile.login}?tab=repositories`} target="_blank" rel="noreferrer">
              <h4 className="information__item--title">Repos</h4>
            </a>
            <p className="information__item--content">{profile.public_repos ? profile.public_repos : '0'}</p>
          </div>

          <div className="information__item">
            <a href={`https://github.com/${profile.login}?tab=followers`} target="_blank" rel="noreferrer">
              <h4 className="information__item--title">Followers</h4>
            </a>
            <p className="information__item--content">{profile.followers ? profile.followers : '0'}</p>
          </div>
          <div className="information__item">
            <a href={`https://github.com/${profile.login}?tab=followering`} target="_blank" rel="noreferrer">
              <h4 className="information__item--title">Following</h4>
            </a>
            <p className="information__item--content">{profile.following ? profile.following : '0'}</p>
          </div>
        </div>

        <div className="information__links">
          <p className="information__link location">
            <span className="information__icon">
              <IconLocation />
            </span>
            {profile.location ? profile.location : state.unavailable}
          </p>

          <a href={`profile.blog`} className={`information__link ${profile.blog ? '' : 'opasity'}`}>
            <span className="information__icon">
              <IconWebsite />
            </span>
            {profile.blog === '' || profile.blog === undefined ? state.unavailable : profile.blog}
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/${profile.twitter_username}`}
            className={`information__link ${profile.twitter_username ? '' : 'opasity'}`}
          >
            <span className="information__icon">
              <IconTwitter />
            </span>
            {profile.twitter_username ? profile.twitter_username : state.unavailable}
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href={`https://github.com/${company()}`}
            className={`information__link ${profile.company ? '' : 'opasity'}`}
          >
            <span className="information__icon">
              <IconCompany />
            </span>
            {profile.company ? profile.company : state.unavailable}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GithubProfilePanel;
