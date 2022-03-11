import { PanelPlugin } from '@grafana/data';
import { GithubProfilePanelOptions, AnotherGithubProfilePanel } from './AnotherGithubProfilePanel';
// import { GithubProfilePanelOptions, GithubProfilePanel } from './GithubProfilePanel';

export const plugin = new PanelPlugin<GithubProfilePanelOptions>(AnotherGithubProfilePanel).setPanelOptions(
  (builder) => {
    return builder.addBooleanSwitch({
      path: 'dark',
      name: 'Panel theme',
      description: 'Theme of the panel(dark or light)',
      defaultValue: true,
    });
  }
);
