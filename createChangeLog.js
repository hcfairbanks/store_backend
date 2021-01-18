#!/usr/bin/env node

async function execute(command) {
  const exec = require('child_process').exec
  //var logfile = ""

  await exec(command, (err, stdout, stderr) => {
    //var logfile = stdout;
    //console.log(logfile);
    //process.stdout.write(stdout);
  })

}

execute('git log >> CHANGELOG.md; echo "hello"')

// https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-javascript-action



// git log to json 

// git log --pretty=format:'{%n  "commit": "%H",%n  "abbreviated_commit": "%h",%n  "tree": "%T",%n  "abbreviated_tree": "%t",%n  "parent": "%P",%n  "abbreviated_parent": "%p",%n  "refs": "%D",%n  "encoding": "%e",%n  "subject": "%s",%n  "sanitized_subject_line": "%f",%n  "body": "%b",%n  "commit_notes": "%N",%n  "verification_flag": "%G?",%n  "signer": "%GS",%n  "signer_key": "%GK",%n  "author": {%n    "name": "%aN",%n    "email": "%aE",%n    "date": "%aD"%n  },%n  "commiter": {%n    "name": "%cN",%n    "email": "%cE",%n    "date": "%cD"%n  }%n},'