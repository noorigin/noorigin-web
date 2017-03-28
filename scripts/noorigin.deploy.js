/* eslint-disable no-console */

const Promise = require('bluebird')
const path = require('path')
const FTP = require('promise-ftp')
const chalk = require('chalk')
const slash = require('slash')
const { Spinner } = require('cli-spinner')
const readdir = Promise.promisify(require('recursive-readdir'))
const { pipe, map, zip } = require('lodash/fp')

const log = console.log.bind(console)
const localRoot = path.resolve(__dirname, '../dist')
const {
  user,
  password,
  host,
  port,
  remoteRoot,
} = require(path.resolve(__dirname, '../.deploy.config'))

const uploadFile = async (client, [local, remote]) => {
  try {
    await client.put(local, remote)
    log(`${chalk.green('✔')} ${remote}`)
  } catch (error) {
    log(chalk.red(`✘ ${remote}`))
    throw error
  }
}

const deploy = async () => {
  const client = new FTP()
  const spinner = new Spinner('%s ')
  const files = await readdir(localRoot)
  // Assumes server is a nix environment, normalises path to nix style
  const localPath = pipe(path.relative.bind(path, localRoot), slash)
  const names = zip(files, map(localPath, files))
  const end = () => {
    spinner.stop(true)
    client.end()
  }

  log('\n')
  log(chalk.blue.bold(`Deploying to ${host}`))
  log(`${chalk.dim('port')} ${port}`)
  log(`${chalk.dim('root')} ${remoteRoot}`)
  log(`${chalk.dim('user')} ${user}`)
  log(`${chalk.dim('pass')} ${password.split('').map(() => '*').join('')}`)
  log('\n')

  spinner.setSpinnerString(18)
  spinner.start()

  try {
    await client.connect({ host, port, password, user })
    await client.cwd(remoteRoot)
    await Promise.all(map(uploadFile.bind(null, client), names))

    return end()
  } catch (error) {
    end()
    throw error
  }
}

deploy().then(() => {
  log(chalk.bold.green('\n✔ Deployment complete\n'))
})
