import { PanelPlugin } from '@grafana/data';
import { GithubProfilePanelOptions, GithubProfilePanel } from './GithubProfilePanel';

export const plugin = new PanelPlugin<GithubProfilePanelOptions>(GithubProfilePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'githubLoginVariableName',
      name: 'GitHub login variable name',
      description: 'The variable name to track current github login',
      defaultValue: 'github_login',
    })
    .addTextInput({
      path: 'githubToken',
      name: 'GitHub personal access token',
      description: 'The GitHub token to call GitHub API, if not set, the limit of request is super low',
    });
});
