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
    minNodeVersion: '24.22.1',
    peerDependencyOptions: {
      pinnedDevDependency: false,
    },
    repository: 'git+https://github.com/langri-sha/tsconfig.git',
    type: 'module',

    devDeps: [
      '@emotion/react@11.14.0',
      '@langri-sha/projen-project@*',
      '@types/react@19.3.0',
      'react@19.3.1',
    ],
    peerDeps: ['typescript@^6.0.0 || ^7.0.0'],
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
        'dagger.lock',
        'dagger.toml',
        'eslint.config.js',
        'fixtures/**',
        'lint-staged.config.js',
        'pnpm-lock.yaml',
        'pnpm-workspace.yaml',
        'prettier.config.js',
        'renovate.json5',
        'tsconfig.json',
      ],
    },
  },
  claude: {
    settings: {
      attribution: { commit: '', pr: '', sessionUrl: false },
    },
  },
  codeowners: {
    '*': '@langri-sha',
  },
  dagger: {
    workspace: {
      ignore: ['**/node_modules', '**/dist', '**/*.tsbuildinfo'],
      modules: {
        eslint: {
          source: 'dagger.io/js/eslint',
          settings: {
            packageManager: 'pnpm',
            baseImageAddress: 'node:24-slim',
          },
        },
        prettier: {
          source: 'dagger.io/js/prettier',
          settings: {
            packageManager: 'pnpm',
            baseImageAddress: 'node:24-slim',
          },
        },
        ci: {
          source: 'github.com/langri-sha/dagger/ci@v2.4.1',
          generate: { skip: ['projen'] },
        },
        projen: {
          source: 'github.com/langri-sha/dagger/projen@v2.4.1',
        },
        typescript: {
          source: 'github.com/langri-sha/dagger/typescript@v2.4.1',
          settings: {
            projects: [
              '.',
              'fixtures/base',
              'fixtures/build',
              'fixtures/emotion',
              'fixtures/project',
              'fixtures/react',
            ],
          },
        },
        beachball: {
          source: 'github.com/langri-sha/dagger/beachball@v2.4.1',
        },
      },
    },
  },
  editorConfig: {},
  eslint: {},
  githubTemplates: {},
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
      '/dagger.lock',
      '/dagger.toml',
      '/fixtures/',
      // Nothing here is built; `tsc --build` only leaves its build info behind.
      '/dist/',
    ],
  },
  pnpmWorkspace: {
    minimumReleaseAgeExclude: ['@langri-sha/*', ...Project.presetPackages],
  },
  prettier: {},
  readme: {
    filename: 'readme.md',
  },
  renovate: {
    extends: ['github>langri-sha/renovate-config'],
    packageRules: [
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
  worktrunk: {},
  skills: {
    ignore: false,
    skills: [
      {
        source: 'langri-sha/skills',
        ref: 'v1.1.0',
        skills: ['create-commit', 'create-pr'],
      },
    ],
  },
})

project.package?.addField('packageManager', 'pnpm@12.23.0')
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
