# Needs Crash Report Action

_Stefan Arentz, January 2020_

This is a GitHub Action that will add a label of your choice to issues that have been labeled as a crash, but do not contain a link to a crash report.

## Inputs

### `crash-label`

**Required** The name of the label on which to trigger this action. Default `crash`.

### `crash-reporter`

**Required** The (partial) URL of the crash reporter that is used for this project.

### `needs-crash-report-label`

**Required** The name of the label that will be added if there is no link to a crash report in the issue body. Default `needs-crash-report`.

## Example usage

```
on:
  issues:
    types: [labeled]

jobs:
  needs-crash-report:
    name: This job keeps an eye on crash reports without a link to Sentry.
    runs-on: ubuntu-latest
    steps:
      - id: needs_crash_report
        uses: st3fan/needs-crash-report-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          crash-label: "crash"
          needs-crash-report-label: "needs-crash-report"
          crash-reporter: "https://sentry.prod.mozaws.net/"
```
