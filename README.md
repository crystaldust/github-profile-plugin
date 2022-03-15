# Simple GitHub Profile Panel

![profile_panel](imgs/profile_panel.png)

## What is GitHub Profile Panel Plugin?

A simple panel plugin to display developer's GitHub profile. Set up a variable to monitor on github login, then the panel will display developer's login, name, joined date, bio and other basic info.

Parts of the code and figures are yanked from [Rondoo - GitHub user search app ](https://github.com/Javiersalcedoj/GitHub-User-Search-App), since it's published without a LICENSE, this project will be modified according to any of the original project's license update.

## Getting started

- Set up the `GitHub login variable name` in the panel's option, and update the variable anywhere you want the profile panel to display the according developer profile.
- Set up the GitHub token(a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)) which is used to call [GitHub API](https://docs.github.com/en/rest). You can leave it blank for testing, but the rate limit would be very low(see more details [here](https://docs.github.com/en/developers/apps/building-github-apps/rate-limits-for-github-apps))

![setup_monitor_var](imgs/setup_confs.png)
