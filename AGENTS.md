# Agents orientation — `langri-sha/tsconfig`

`@langri-sha/tsconfig` is the shared TypeScript configuration: `base.json` is
the complete configuration, `project.json` adapts it for composite projects in a
monorepo, `build.json` for emitting declarations, and `react.json` and
`emotion.json` are aspects layered on top. The package is the repository root
and ships JSON only.

## Who owns which file

Projen writes `package.json` and every file listed in `.projen/files.json`; they
are read-only. Change them in `.projenrc.ts`, then run `pnpm exec projen`.
Beachball owns `CHANGELOG.md`, `CHANGELOG.json` and the `version` field.
Everything else — the JSON configurations, `src/`, `readme.md`,
`.github/workflows/`, this file — is edited by hand. Repository settings, branch
protection and the Actions secrets are managed by `langri-sha/github-repos`.

## Common tasks

```sh
pnpm install
pnpm projen                             # re-synthesize from .projenrc.ts
pnpm tsc --build .                      # typecheck
pnpm eslint . && pnpm prettier --check .
pnpm change                             # write a change file
```

There are no tests.

## Type-checking with the working tree

`tsconfig.json` extends `./base.json` rather than the published package, so the
repository is type-checked with the configuration it is about to release, and
the package never depends on itself. ESLint, Prettier and lint-staged come from
npm, pinned. `typescript` is a peer, so the configuration runs on its consumer's
compiler; the preset supplies it here as a devDependency.

## Release

Beachball versions the package and the Release workflow publishes it through npm
trusted publishing. Anything that reaches the tarball — the JSON configurations,
`src/`, `readme.md`, `package.json` — needs a change file in the same pull
request. Root tooling does not: `beachball.config.cjs` lists what is exempt, so
lock file maintenance never cuts a release.

The Release workflow calls the shared Packages workflow with
`tag-template: v{version}`, which tags each published version, e.g. `v1.0.1`,
and `github-releases: true`, which creates a GitHub release with generated notes
for it. Beachball's own `gitTags` stays off, since it would name the tags
`@langri-sha/tsconfig_v1.0.1`. A tag that already has a release is skipped, so
the workflow is safe to rerun.

Nothing is built. `main` and the `tsconfig` field both point at `base.json`:
TypeScript resolves a bare `"extends": "@langri-sha/tsconfig"` through the
`tsconfig` field, never `main`, and subpaths such as
`@langri-sha/tsconfig/project` resolve to the files themselves. `tsconfig*.json`
is npm-ignored, so this repository's own configuration never ships. So is
`dist/`, where `tsc --build` leaves its build info even without emitting.
`src/index.ts` is an empty module.

The package is declared an ES module so the synthesized configs keep the fleet's
file names; it ships no JavaScript, so consumers see no difference.

There is deliberately no `engines` field. Published from the root, it would bind
consumers to the Node.js release this repository is developed on, so that lives
in `devEngines`, where `actions/setup-node` reads it.
