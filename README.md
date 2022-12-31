# Nata-cli
 Architecture test automation
 
## Table of Contents
- [Getting Started](#getting-started)
- [Configuration](#configuration)
  - [Rules](#rules)

## Getting Started

Install Nata-cli using [`npm`](https://www.npmjs.com/package/nata-cli):

```bash
npm install --save-dev nata-cli
```

Add the following section to your `package.json`:

```json
{
  "scripts": {
    "test:arch": "nata-cli ."
  }
}
```

Before running you must create the configuration file `ata.config.json`:

```json
{
  "rules": []
}
```

Finally, run `npm run test:arch` and Nata-cli will print this message:

```bash
Results:   0 failed, 0 skipped, 0 passed, 0 total.
Exec time: 00:00:00.001
```

## Configuration

### Rules

1. Verify that files in a directory follow specified patterns:

```json
{
    "name": "filename-pattern-in-folder",
    "patterns": ["*.ts"],
    "folder": "source/services"
}
```

To skip a rule use the skip field:

```json
{
    "name": "filename-pattern-in-folder",
    "patterns": ["*.ts"],
    "folder": "source/services"
    "skip": true,
}
```
