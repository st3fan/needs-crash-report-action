// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const core = require("@actions/core");
const github = require("@actions/github");

const octokit = new github.GitHub(process.env.GITHUB_TOKEN);

async function issueHasCrashReportReference(issue, crashReporterURL) {
  // This can be improved with better matching or maybe even looking for
  // references in all comments instead of just the body.
  return issue.body.includes(crashReporterURL);
}

async function run() {
  try {
    if (github.context.payload.action === "labeled") {
      if (github.context.payload.label.name === core.getInput("crash-label")) {
        if ((await issueHasCrashReportReference(github.context.payload.issue, core.getInput("crash-reporter"))) === false) {
          octokit.issues.addLabels({
            owner: github.context.payload.repository.owner.login,
            repo: github.context.payload.repository.name,
            issue_number: github.context.payload.issue.number,
            labels: [core.getInput("needs-crash-report-label")]
          });
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
