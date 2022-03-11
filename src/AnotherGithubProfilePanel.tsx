import React from 'react';
import {PanelProps} from '@grafana/data';
import {Button, Card} from '@grafana/ui';
import './styles/_iconInformation.scss';
import './styles/_cardInformation.scss';
import './styles/GithubProfilePanel.scss';
import './styles/custom.scss';
import {IconCompany, IconLocation, IconTwitter, IconWebsite} from "./Icons";

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
let joined = (profile: GithubProfileProps) => {
    if (!profile.created_at) {
        return 'Undefined';
    }
    const date = new Date(profile.created_at);
    const d = date.toString().split(' ');
    return `Joined ${d[2]} ${d[1]} ${d[3]}`;
};
console.log(joined)

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
        return state.unavailable
    }

    return (
        <a href={profile.blog} target="_blank">
            {profile.blog}
        </a>
    )

}

let twitterAddress = (profile: GithubProfileProps) => {
    // {profile.twitter_username ? profile.twitter_username : state.unavailable}
    if (!profile.twitter_username) {
        return state.unavailable
    }
    return (
        <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank">
            {profile.twitter_username}
        </a>
    )
}

let companyAddress = (profile: GithubProfileProps) => {
    // {profile.company ? profile.company : state.unavailable}
    if (!profile.company) {
        return state.unavailable
    }
    return (
        <a href={`https://github.com/${company(profile)}`} target="_blank">
            {profile.company}
        </a>
    )
}


let state = {
    unavailable: 'Not Available',
};

let defaultProfile: GithubProfileProps = {
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


export const AnotherGithubProfilePanel: React.FC<PanelProps> = (props) => {

    let profile: GithubProfileProps = defaultProfile
    try {
        const frame = props.data.series[0]
        profile = frame.meta?.custom?.data
    } catch (e) {
        console.log('Failed to assign profile:', e)
    }

    return (
        <div>
            <Card heading={name(profile)} className="headLineCard">
                <Card.Figure>
                    <a href={`https://github.com/${profile.login}`}>
                        <img src={profile.avatar_url} alt="Avatar" className="cardAvatar"/>
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
                    <a href={`https://github.com/${profile.login}?tab=repositories`} target="_blank">
                        <Button fill="text" size="md">
                            {profile.public_repos ? profile.public_repos : '0'} Repos
                        </Button>
                    </a>

                    <a href={`https://github.com/${profile.login}?tab=followers`} target="_blank">
                        <Button fill="text" size="md">
                            {profile.followers ? profile.followers : '0'} Followers
                        </Button>
                    </a>

                    <a href={`https://github.com/${profile.login}?tab=followings`} target="_blank">
                        <Button fill="text" size="md">
                            {profile.following ? profile.following : '0'} Followings
                        </Button>
                    </a>
                </Card.Actions>
            </Card>

            <Card className="headLineCard tailingLineCard">
                <Card.Actions>

                    <span className="iconLink">
                        <IconLocation/>
                        <span className="iconLinkText">{profile.location ? profile.location : state.unavailable}</span>
                    </span>

                    <span className="iconLink">
                        <IconWebsite/>
                        <span className="iconLinkText">
                            {blogAddress(profile)}
                        </span>
                    </span>


                    {/*<a target="_blank" rel="noreferrer" href={`https://twitter.com/${profile.twitter_username}`}*/}
                    {/*    className={`${profile.twitter_username ? '' : 'opasity'}`}>*/}
                    <span className={`iconLink ${profile.twitter_username ? '' : 'opasity'}`}>
                            <IconTwitter/>
                            <span className="iconLinkText">
                                {twitterAddress(profile)}
                            </span>
                        </span>
                    {/*</a>*/}

                    {/*<a target="_blank" rel="noreferrer" href={`https://github.com/${company(profile)}`}*/}
                    {/*    className={`${profile.company ? '' : 'opasity'}`}>*/}
                    <span className="iconLink">
                            <IconCompany/>
                            <span className="iconLinkText">
                                {companyAddress(profile)}
                            </span>
                        </span>
                    {/*</a>*/}

                </Card.Actions>
            </Card>


        </div>

    );
};

export default AnotherGithubProfilePanel;
