import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Button, Card } from '@grafana/ui';
import './styles/_iconInformation.scss';
import './styles/_cardInformation.scss';
import './styles/GithubProfilePanel.scss';
import './styles/custom.scss';
import { IconCompany, IconLocation, IconTwitter, IconWebsite } from './Icons';

export interface GithubProfilePanelOptions {
  githubLoginVariableName: string;
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

let joined = (profile: GithubProfileProps) => {
  if (!profile.created_at) {
    return 'Undefined';
  }
  const date = new Date(profile.created_at);
  const d = date.toString().split(' ');
  return `Joined ${d[2]} ${d[1]} ${d[3]}`;
};

let name = (profile: GithubProfileProps) => {
  if (profile.name) {
    return String(profile.name).replace(/\b\w/g, (l) => l.toUpperCase());
  } else {
    return String(profile.login).replace(/\b\w/g, (l) => l.toUpperCase());
  }
};
let company = (profile: GithubProfileProps) => {
  const array = String(profile.company).split('');
  if (array[0] === '@') {
    array.splice(0, 1);
  }
  return array.join('');
};
let blogAddress = (profile: GithubProfileProps) => {
  if (profile.blog === '' || profile.blog === undefined) {
    return state.unavailable;
  }

  return (
    <a href={profile.blog} target="_blank" rel="noreferrer">
      {profile.blog}
    </a>
  );
};

let twitterAddress = (profile: GithubProfileProps) => {
  if (!profile.twitter_username) {
    return state.unavailable;
  }
  return (
    <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noreferrer">
      {profile.twitter_username}
    </a>
  );
};

let companyAddress = (profile: GithubProfileProps) => {
  if (!profile.company) {
    return state.unavailable;
  }
  return (
    <a href={`https://github.com/${company(profile)}`} target="_blank" rel="noreferrer">
      {profile.company}
    </a>
  );
};

let state = {
  unavailable: 'Not Available',
};

let defaultProfile: GithubProfileProps = {
  login: 'octocat',
  id: 583231,
  node_id: 'MDQ6VXNlcjU4MzIzMQ==',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/octocat',
  html_url: 'https://github.com/octocat',
  followers_url: 'https://api.github.com/users/octocat/followers',
  following_url: 'https://api.github.com/users/octocat/following{/other_user}',
  gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
  organizations_url: 'https://api.github.com/users/octocat/orgs',
  repos_url: 'https://api.github.com/users/octocat/repos',
  events_url: 'https://api.github.com/users/octocat/events{/privacy}',
  received_events_url: 'https://api.github.com/users/octocat/received_events',
  type: 'User',
  site_admin: false,
  name: 'The Octocat',
  company: '@github',
  blog: 'https://github.blog',
  location: 'San Francisco',
  email: '',
  hireable: '',
  bio: '',
  twitter_username: '',
  public_repos: 8,
  public_gists: 8,
  followers: 5207,
  following: 9,
  created_at: '2011-01-25T18:44:36Z',
  updated_at: '2022-02-22T15:07:13Z',
};

async function doGetGithbubProfile(login: String) {
  return await getBackendSrv().datasourceRequest({
    method: 'GET',
    // the link shown below is made up & will not work but a legit http link is used for this
    url: `https://api.github.com/users/${login}`,
    headers: {
      Authorization: 'token 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',
      'Content-Type': 'application/json',
    },
  });
}

type ProfileCache = { [k: string]: GithubProfileProps };
let PROFILE_CACHE: ProfileCache = {};

export const GithubProfilePanel: React.FC<PanelProps> = (props) => {
  const [profile, setProfile] = useState(defaultProfile);
  let varName = (props.options as GithubProfilePanelOptions).githubLoginVariableName;
  if (!varName.startsWith('$')) {
    varName = '$' + varName;
  }
  const currentGithubLogin = props.replaceVariables(varName);

  useEffect(() => {
    if (!currentGithubLogin) {
      return;
    }

    if (PROFILE_CACHE.hasOwnProperty(currentGithubLogin)) {
      setProfile(PROFILE_CACHE[currentGithubLogin]);
    } else {
      doGetGithbubProfile(currentGithubLogin)
        .then((res: any) => {
          setProfile(res.data);
          PROFILE_CACHE[currentGithubLogin] = res.data;
        })
        .catch((e: any) => {});
    }
  }, [currentGithubLogin]);

  return (
    <div>
      <Card heading={name(profile)} className="headLineCard">
        <Card.Figure>
          <a href={`https://github.com/${profile.login}`}>
            <img src={profile.avatar_url} alt="Avatar" className="cardAvatar" />
          </a>
        </Card.Figure>

        <Card.Meta>
          <a href={`https://github.com/${profile.login}`}>@{profile.login}</a>
          <span>{joined(profile)}</span>
        </Card.Meta>
      </Card>

      <Card className="headLineCard tailingLineCard">
        <Card.Meta>{profile.bio}</Card.Meta>

        <Card.Actions>
          <a href={`https://github.com/${profile.login}?tab=repositories`} target="_blank" rel="noreferrer">
            <Button fill="text" size="md">
              {profile.public_repos ? profile.public_repos : '0'} Repos
            </Button>
          </a>

          <a href={`https://github.com/${profile.login}?tab=followers`} target="_blank" rel="noreferrer">
            <Button fill="text" size="md">
              {profile.followers ? profile.followers : '0'} Followers
            </Button>
          </a>

          <a href={`https://github.com/${profile.login}?tab=followings`} target="_blank" rel="noreferrer">
            <Button fill="text" size="md">
              {profile.following ? profile.following : '0'} Followings
            </Button>
          </a>
        </Card.Actions>
      </Card>

      <Card className="headLineCard tailingLineCard">
        <Card.Actions>
          <span className="iconLink">
            <IconLocation />
            <span className="iconLinkText">{profile.location ? profile.location : state.unavailable}</span>
          </span>

          <span className="iconLink">
            <IconWebsite />
            <span className="iconLinkText">{blogAddress(profile)}</span>
          </span>

          {/*<a target="_blank" rel="noreferrer" href={`https://twitter.com/${profile.twitter_username}`}*/}
          {/*    className={`${profile.twitter_username ? '' : 'opasity'}`}>*/}
          <span className={`iconLink ${profile.twitter_username ? '' : 'opasity'}`}>
            <IconTwitter />
            <span className="iconLinkText">{twitterAddress(profile)}</span>
          </span>
          {/*</a>*/}

          {/*<a target="_blank" rel="noreferrer" href={`https://github.com/${company(profile)}`}*/}
          {/*    className={`${profile.company ? '' : 'opasity'}`}>*/}
          <span className="iconLink">
            <IconCompany />
            <span className="iconLinkText">{companyAddress(profile)}</span>
          </span>
          {/*</a>*/}
        </Card.Actions>
      </Card>
    </div>
  );
};

export default GithubProfilePanel;
