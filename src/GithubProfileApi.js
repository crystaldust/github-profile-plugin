export const URL = "https://api.github.com";

function getGithubProfile(github_login) {
  return fetch(`${URL}/users/${github_login}`)
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

export default getGithubProfile;