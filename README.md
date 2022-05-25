## What is MonsterJS CLI

The MonsterJS CLI is a command-line interface tool that we can use to create new project, generate MonsterJS files like components, modules, services and others.
It is not required to use CLI in building MonsterJS applications but we can get many advantages in using the CLI.

## Features

* [Initialize a project](https://monster-js.org/docs/cli-create-application)
* [Generate files](https://monster-js.org/docs/cli-generate-commands)
* [Useful commands](https://monster-js.org/docs/cli-useful-commands)

## Installation

MonsterJS cli helps developers to create a working application out of the box.
It has many useful commands like generating files for our MonsterJS app.

To install the cli we just need to run the following command:

```bash
npm install -g @monster-js/cli
```

After installing the cli, we can verify if the installation is successful by running the following command:

```bash
mn --version
```

If the installation is successful it should display the version of the MonsterJS cli installed in your machine.

We can find help with the cli using the `mn --help` command.

After installing the cli, we can now start creating our new MonsterJS project by running this command:

```bash
mn new my-app
```

The syntax of the command above is `mn <command> <project name>` where "new" is the command and "my-app" is the project name.