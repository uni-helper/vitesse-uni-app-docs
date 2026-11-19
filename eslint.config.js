import antfu from '@antfu/eslint-config'

// `files` and `rules` belong to a config object, not to the global options.
export default antfu({}, {
  files: ['pnpm-workspace.yaml'],
  rules: {
    'pnpm/yaml-enforce-settings': 'off',
  },
})
