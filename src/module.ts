import { PanelPlugin } from '@grafana/data';
import { GithubProfilePanelOptions, GithubProfilePanel } from './GithubProfilePanel';

export const plugin = new PanelPlugin<GithubProfilePanelOptions>(GithubProfilePanel).setPanelOptions((builder) => {
  return builder.addBooleanSwitch({
    path: 'dark',
    name: 'Panel theme',
    description: 'Theme of the panel(dark or light)',
    defaultValue: true,
  });
});
