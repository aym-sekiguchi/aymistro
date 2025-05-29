import path from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative('.', f))
    .join(' --file ')}`

export default {
  '**/*.{js,jsx,ts,tsx}': [
    buildEslintCommand,
    () => 'tsc --noEmit -p ./tsconfig.json',
  ],
  '**/*.{json,md,yml,yaml}': ['prettier --write'],
}
