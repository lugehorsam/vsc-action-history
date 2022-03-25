# Overview
Action History is a VS Code plugin that displays the actions an engineer has taken within their workspace within a single seession.

It is intended to help engineers context switch more effectively. If an engineer is interrupted and returns to their work, this extensions helps them remember what they were doing.

# Usage
This extension adds an extra button to the activity bar that the user can click on to open the history panel. In the history panel, the user can view the list of actions they've taken.

# Contributing
Contributions are encouraged. Please consult the VS Code documentation for general information on their extension API: https://code.visualstudio.com/api/extension-guides/overview

## Building
- Git 2.32.0
- Built with NodeJS 6.14.7
- Run `npm install` prior to the first build.

To package the extension, run `vsce package` from the repository root.

# Tentative Roadmap
- [ ] Investigate why certain workspace events are not firing.
- [ ] Improve label legibility.
- [ ] Add text deletion support.
- [ ] Add a test suite.
- [ ] Persist workspace history to disk.
- [ ] Ability to clear history.
- [ ] Undo/redo support
- [ ] Add user-defined filters (action name, type) for searching through history.
- [ ] Make extension logo retrievable via HTTPS repository.
- [ ] Track history across multiple devices.
- [ ] Track history outside of workspaces.
