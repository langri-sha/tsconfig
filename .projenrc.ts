import { Project } from '@langri-sha/projen-project'

const project = new Project({
  name: '@langri-sha/tsconfig',
  package: {
    authorEmail: 'filip.dupanovic@gmail.com',
    authorName: 'Filip Dupanović',
    authorOrganization: false,
    authorUrl: 'https://langri-sha.com',
    bugsUrl: 'https://github.com/langri-sha/tsconfig/issues',
    copyrightYear: '2024',
    description:
      'A set of TypeScript configuration files, focused on type-checking all your TypeScript and JavaScript modules',
    entrypoint: 'base.json',
    homepage: 'https://github.com/langri-sha/tsconfig#readme',
    keywords: ['tsconfig', 'typescript', 'typescript-config'],
    license: 'MIT',
    licensed: true,
    minNodeVersion: '24.16.0',
    peerDependencyOptions: {
      pinnedDevDependency: false,
    },
    repository: 'git+https://github.com/langri-sha/tsconfig.git',
    type: 'module',

    devDeps: [
      '@langri-sha/eslint-config@0.9.19',
      '@langri-sha/lint-staged@0.9.10',
      '@langri-sha/prettier@0.4.11',
      '@langri-sha/projen-project@*',
    ],
    peerDeps: ['typescript@^5.5.0 || ^6.0.0 || ^7.0.0'],
  },
  beachball: {
    config: {
      // The package is the repository root, so these would otherwise demand a
      // release for changes that never reach the tarball.
      ignorePatterns: [
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.prettierignore',
        '.projenrc.ts',
        'AGENTS.md',
        'CODEOWNERS',
        'beachball.config.cjs',
        'eslint.config.js',
        'lint-staged.config.js',
        'pnpm-lock.yaml',
        'pnpm-workspace.yaml',
        'prettier.config.js',
        'renovate.json5',
        'tsconfig.json',
      ],
    },
  },
  codeowners: {
    '*': '@langri-sha',
  },
  editorConfig: {},
  eslint: {},
  husky: {
    'pre-commit': 'lint-staged',
  },
  lintStaged: {},
  lintSynthesized: {},
  npmIgnore: {
    ignorePatterns: [
      '*.test.*',
      '__snapshots__/',
      '/*.config.*',
      '/*.json5',
      '/*.yaml',
      '/AGENTS.md',
      '/CODEOWNERS',
      '/change/',
      // Nothing here is built; `tsc --build` only leaves its build info behind.
      '/dist/',
    ],
  },
  pnpmWorkspace: {
    minimumReleaseAgeExclude: ['@langri-sha/*'],
  },
  prettier: {},
  readme: {
    filename: 'readme.md',
  },
  renovate: {
    packageRules: [
      {
        description: 'Update our own packages together',
        groupName: 'langri-sha projen toolchain',
        groupSlug: 'langri-sha-projen',
        matchPackageNames: ['@langri-sha/**'],
      },
      {
        description: 'Install our own packages without waiting them out',
        matchPackageNames: ['@langri-sha/**'],
        minimumReleaseAge: null,
      },
      {
        description:
          'Install our own GitHub Actions and Terraform modules without waiting them out',
        matchPackageNames: ['langri-sha/**'],
        minimumReleaseAge: null,
      },
      {
        description:
          'Widen the supported TypeScript range instead of replacing it',
        matchPackageNames: ['typescript'],
        rangeStrategy: 'widen',
      },
    ],
  },
  typeScriptConfig: {
    config: {
      // Type-check with the working tree rather than the last release, so a
      // change to `base.json` applies to the repository in the same pull
      // request.
      extends: './base.json',
      compilerOptions: {
        noEmit: true,
      },
      include: ['src'],
    },
  },
})

project.package?.addField('packageManager', 'pnpm@12.9.1')
project.package?.addField('publishConfig', {
  access: 'public',
})

// TypeScript only resolves a bare package-name `extends` target via this field
// (or a `tsconfig.json` at the package root, which we deliberately don't
// publish) — it does not fall back to `main`.
project.package?.addField('tsconfig', 'base.json')

// Published from the root, so `engines` would bind every consumer to the Node.js
// release this repository is developed on. `actions/setup-node` reads the same
// version from `devEngines`, which the registry leaves to the maintainers.
project.package?.file.addDeletionOverride('engines')
project.package?.addField('devEngines', {
  runtime: {
    name: 'node',
    version: `>= ${project.package.minNodeVersion}`,
  },
})

project.synth()
