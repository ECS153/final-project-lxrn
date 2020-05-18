# Git/GitHub reference

Copied from previous project

### GitHub flow

  1. Create GitHub issue relating to topic (or find the one you're working on).
     - Title describing purpose and any necessary explanation in comment.
  2. Create branch specific to the issue (or use existing related branch).
  3. Write code.
     - Commit messages should have the title describing general change, body mentioning all changes (what and why stuff was done).
     - At end of body, include "#@@" where '@@' is the number of the issue the commit is related to.
  4. Create pull request to have code reviewed and then merged.
     - In title include "closes #@@" where '@@' is the number of the issue the pull request fixes.  GitHub will link the PR and the issue, and once merged the issue will automatically close.
     - Do a 'rebase merge' on github to clean up the commit history.
  5. After merge, delete branch.

### Git help

- If needed, install git.  Then set up:
    1. Name: `git config --global user.name "Name Here"`
    2. E-mail: `git config --global user.email "email@domain"`
    3. (Opt) Editor: `git config --global core.editor editor`
    4. Check config: `git config -l`
        - `--global` makes changes to default settings, to set up for single repo, cd into the repo and execute config commands without `--global`
- Adding new repo to current directory: `git clone https://github.com/name/repo.git`
- Checking remote repos: `git remote [-v]` **NOTE:** typically will have origin as default
- Add/remove remote repos: `git remote add name url` -OR- `git remote rm name`
- Creating and switching to a branch: `git checkout -b branch-name`
- Delete a branch: `git push origin -d branch-name`
- Checking current status: `git status`
- Including new files: `git add file`
- Commit: `git commit -a -m "Title of commit message (50 chars max)" -m "Description of commit message"`
  - `-a` adds all files to the commit, drop if you want to commit selectively
  - Helpful to use a template message with line width and drop `-m` options
- Pushing committed changes: `git push origin branch-name`
- Getting updates from repo:
    1. (More control) Fetch/merge:
        - Checkout branch to update
        - Fetch changes: `git fetch`
        - Merge into current branch: `git merge origin/branch-name`
            - to update from master use `origin/master`
    2. (More common) Pull changes directly into current branch: `git pull origin branch-name`
- Viewing commit history (newest at top): `git log`
- Rebasing: `git rebase -i HEAD~#`, where # is the number of commits to go back
  - **ONLY** do this if you're confident about what you're doing
  - `-i` does rebase in interactive mode, opens in editor
    - i.e. `git rebase -i HEAD~5` will open editor to rebase the last 5 commits
  - change the command in front of commits as desired
  - commands and effects are shown in editor, typically use:
    - **p**ick: keeps commit, can reorder commits
    - **r**eword: keeps commit, can change message (found after commit ID)
    - **s**quash: combines commit into the commit above, combines messages
    - **f**ixup: combines commit into commit above, discards message (keeps just the above message)

---

[Link to this file](git_read_this.md)
