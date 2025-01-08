// This is a hastily written script which copies my solutions to the lessons from the playground
// to a `solutions` directory where I keep a log of my progress.

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const PLAYGROUND_DIRECTORY = join(__dirname, 'playground')

const isValidProblemId = (path: string) =>
	typeof path === 'string' && path.split('/').length === 2

if (import.meta.main) {
	const problemId = process.argv[2] ?? ''

	if (!isValidProblemId(problemId)) {
		console.error('Invalid problem id: ', problemId)
		console.error('It should look something like 01/02')
		process.exit(1)
	}

	const targetDirectory = join(__dirname, 'solutions', problemId)

	console.log(
		'🚀 Going to copy the playground to the appropriate solutions directory.',
	)

	console.log(`   ./playground/**/* -> ./solutions/${problemId}/**/*`)

	// Make `targetDirectory` if it does not exist
	if (!existsSync(targetDirectory)) {
		mkdirSync(targetDirectory, { recursive: true })
	}

	try {
		// Copy all files, recursively, to the target directory
		execSync(`cp -r ${PLAYGROUND_DIRECTORY}/* ${targetDirectory}`)
		console.log('🎉 Successfully copied playground to solutions directory')
	} catch (e) {
		console.error('Failed to copy playground to solutions directory')
		console.error(e)
		process.exit(1)
	}
}
