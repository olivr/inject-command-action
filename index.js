const core = require('@actions/core')
const injectCommand = require('./injectCommand')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const command = core.getInput('command')
    const target = core.getInput('target')
    const pattern = core.getInput('pattern') || ''
    const force = core.getInput('force') || true

    const [pattern_text, file_changed, debug, debug2] = await injectCommand(
      command,
      target,
      pattern,
      force
    )

    core.setOutput('debug', debug)
    core.setOutput('debug2', debug2)

    console.log(debug)
    console.log('**********************')
    console.log(debug2)

    core.setOutput('pattern', pattern_text)
    console.log(`Pattern used: ${pattern_text}`)

    core.setOutput('file_changed', file_changed)
    console.log(`File changed: ${file_changed || '0'}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
