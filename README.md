# Xulin

Architecture test automation

[![Continuous integration](https://github.com/luansv1495/xulin/actions/workflows/ci.yml/badge.svg)](https://github.com/luansv1495/xulin/actions/workflows/ci.yml) [![Coverage Status](https://coveralls.io/repos/github/luansv1495/xulin/badge.svg?branch=main)](https://coveralls.io/github/luansv1495/xulin?branch=main)

## Table of Contents

- [Getting Started](#getting-started)
- [Configuration](#configuration)
  - [Rules](#rules)
- [License](#license)

## Getting Started

Install Xulin using [`npm`](https://www.npmjs.com/package/xulin):

```bash
npm install --save-dev xulin
```

Add the following section to your `package.json`:

```json
{
  "scripts": {
    "test:arch": "xulin ."
  }
}
```

Before running you must create the configuration file `xulin.config.json`:

```json
{
  "rules": []
}
```

Finally, run `npm run test:arch` and Xulin will print this message:

```bash
Check Suites: 0 failed, 0 skipped, 0 passed, 0 total.
Checks:       0 failed, 0 passed, 0 total.
Exec time:    00:00:00.001
```

## Configuration

### Rules

1. Check that files in a directory follow specified patterns:

```json
{
  "name": "filename-pattern-in-folder",
  "patterns": ["*.ts"],
  "folder": "source/services"
}
```

2. Check that folder names in a directory follow the specified folder name:

```json
{
  "name": "folder-name-in-folder",
  "names": ["services", "pages", "config"],
  "folder": "source"
}
```

3. Check the maximum amount of files in a directory:

```json
{
  "name": "max-files-in-folder",
  "quantity": 2,
  "folder": "source/services"
}
```

4. Check the maximum amount of folders in a directory:

```json
{
  "name": "max-folders-in-folder",
  "quantity": 2,
  "folder": "source/services"
}
```

5. Check the length of filenames in a directory:

```json
{
  "name": "filename-size-in-folder",
  "min": 3,
  "max": 10,
  "folder": "source"
}
```

6. Check the length of folders names in a directory:

```json
{
  "name": "folder-name-size-in-folder",
  "min": 3,
  "max": 10,
  "folder": "source"
}
```

7. Check if the files in a folder do not have dependencies on the specified directories:

```json
{
  "name": "no-dependencies",
  "folder": "source/configs",
  "folders": ["source/pages"]
}
```

To skip a rule use the skip field:

```json
{
  "name": "filename-pattern-in-folder",
  "patterns": ["*.ts"],
  "folder": "source/services",
  "skip": true
}
```

## License

Xulin is [MIT licensed](./LICENSE).
