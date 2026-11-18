import antfu from '@antfu/eslint-config'

export default antfu({
  files: ['pnpm-workspace.yaml'],
  rules: {
    'pnpm/yaml-enforce-settings': 'off'
  }
})
