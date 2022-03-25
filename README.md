# Overview
Action History is a VS Code plugin that displays the actions an engineer has taken within their workspace.

It is intended to help engineers context switch more effectively. It helps engineers remember what stage in a task they had been interrupted at.

# Usage
This extension adds an extra button to the activity bar that the user can click on to open the history panel. In the history panel, the user can view the list of actions they've taken.

The user can also open Action History in the command pallete via *Action History: Show History*.

# Contributing
Contributions are encouraged. Please consult the VS Code documentation for general information on their extension API: https://code.visualstudio.com/api/extension-guides/overview

## Building
- Git 2.32.0
- Built with NodeJS 6.14.7
- Run `npm install` prior to the first build.

# Tentative Roadmap
- [ ] Improve label legibility.
- [ ] Add a test suite.
- [ ] Persist workspace history to disk.
- [ ] Ability to clear history.
- [ ] Undo/redo support
- [ ] Add user-defined filters (action name, type) for searching through history.
- [ ] Make extension logo retrievable via HTTPS repository.
- [ ] Track history across multiple devices.
- [ ] Track history outside of workspaces.