/* eslint-disable no-console */

const path = require('path')
const Bluebird = require('bluebird')
const readdir = Bluebird.promisify(require('recursive-readdir'))
const FTP = require('promise-ftp')
const { map, zip } = require('lodash/fp')

const localRoot = path.resolve(__dirname, '../dist')
const {
  user,
  password,
  host,
  port,
  remoteRoot,
} = require(path.resolve(__dirname, '../.deploy.config'))

const toLocalNames = map(name => name.replace(`${localRoot}/`, ''))

const uploadFile = async (client, local, remote) => {
  const result = await client.put(local, remote)
  console.log(`Uploaded ${remote}`)
  return result
}

const deploy = async () => {
  const client = new FTP()
  const files = await readdir(localRoot)
  const nameMap = zip(files, toLocalNames(files))

  console.log(`Connecting to ${host}:${port} with ${user}:${password}`)

  try {
    await client.connect({ host, port, password, user })
    await client.cwd(remoteRoot)

    await Bluebird.all(map(args => uploadFile(client, ...args), nameMap))
      .catch(error => { throw error })

    return client.end()
  } catch (error) {
    client.end()
    throw error
  }
}

deploy().then(() => console.log('Deployment complete'))
