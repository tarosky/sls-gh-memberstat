# Serverless GitHub Member Stat

This is a stack of GitHub member statistics functions built with [Serverless](https://serverless.com/) Framework.
Once deployed, notifications on GitHub Organization members would be delivered to a slack channel.

## Prerequisite

- (recommended) Install `direnv` to inject environmental variables

## Deploy

```shell
$ git clone git@github.com:tarosky/sls-gh-memberstat.git
$ cd sls-gh-memberstat
$ yarn # or npm install
$ cp .envrc.sample .envrc # Please fill the values
$ vi .envrc
$ npm run deploy
```

## Customization

See `.envrc.sample` and `serverless.yml`.

## Run Locally

```shell
$ npx ts-node ./src/stat.ts --exec
```
