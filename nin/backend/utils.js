const chalk = require('chalk');
const fs = require('fs');
const path = require('path');


function findProjectRoot(currentPath) {
  let up = '';
  let base = '';
  do {
    base = path.join(currentPath, up);
    const manifest = path.join(base, 'nin.json');

    if (fs.existsSync(manifest)) {
      return base.replace(/\/$/, '');
    }
    up += '../';
  } while (base != path.sep);
}

function findProjectRootOrExit(currentPath) {
  const base = findProjectRoot(currentPath);
  if(base) {
    console.log(chalk.grey('Found nin.json in project root (' + base + ')'));
    return base;
  } else {
    console.error(chalk.red('Could not find project root containing nin.json (looked from ' + currentPath + ')'));
    process.exit(1);
  }
}

// Authored by CMS at
// http://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case/2970667#2970667
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function mergeOptions(input, defaults) {
  let output = {};
  for (const key in defaults) {
    output[key] = defaults[key];
  }
  for (const key in input) {
    output[key] = input[key];
  }
  return output;
}

function colorizeCommanderHelpText(txt) {
  /* eslint-disable */
  return (txt.replace(/(\[[^\]]*\])/g, chalk.grey('$1'))
             .replace(/Usage: (\w+)/g, 'Usage: ' + chalk.green('$1'))
             .replace(/(\n  \w+ [^\n]*)/g, chalk.cyan('$1'))
             .replace(/(\n   ( -+[\w,-]+)+)/g, chalk.green('$1'))
             .replace(/(\n    \w+)/g, chalk.green('$1'))
             .replace(/(\n  \w+:)/g, chalk.yellow('$1')));
  /* eslint-enable */
}

function unsafeHTMLEscape(txt) {
  return txt.replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&#039')
            .replace(/\&/g, '&amp');
}

module.exports = {
  findProjectRootOrExit: findProjectRootOrExit,
  findProjectRoot: findProjectRoot,
  camelize: camelize,
  mergeOptions: mergeOptions,
  colorizeCommanderHelpText: colorizeCommanderHelpText,
  unsafeHTMLEscape: unsafeHTMLEscape
};
