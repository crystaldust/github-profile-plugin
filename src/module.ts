import { PanelPlugin } from '@grafana/data';
// import { SimpleOptions } from './types';
// import { SimplePanel } from './SimplePanel';
import MyGithubProfilePanel from './MyGithubProfilePanel'
import {GithubProfilePanelOptions} from "./MyGithubProfilePanel";

export const plugin = new PanelPlugin<GithubProfilePanelOptions>(MyGithubProfilePanel).setPanelOptions((builder) => {
  return builder
    .addBooleanSwitch({
      path: 'dark',
      name: 'Panel theme',
      description: 'Theme of the panel(dark or light)',
      defaultValue: true,
    });
});
