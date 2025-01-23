const { exec } = require("child_process");

exec('copyfiles -u 1 "src/favicon.ico" dist', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error copying files: ${stderr}`);
    process.exit(1);
  }
  console.log(stdout);
});
