# @langri-sha/tsconfig

Shared [TypeScript] configurations that type-check TypeScript and JavaScript
alike, with variants for monorepos, [React] and [Emotion].

## Usage

Install the necessary dependencies:

```sh
npm install -D typescript @langri-sha/tsconfig
```

Then extend the base configuration:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@langri-sha/tsconfig"
}
```

To combine configurations, list them in this order — later entries win:

1. A base: `@langri-sha/tsconfig`, `@langri-sha/tsconfig/project.json` for a
   package inside a monorepo, or `@langri-sha/tsconfig/build.json` for a library
   that emits, React or Emotion ones included.
2. `@langri-sha/tsconfig/react.json` for React.
3. `@langri-sha/tsconfig/emotion.json` for Emotion, which also needs
   `react.json`.

For example, an Emotion app inside a monorepo:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": [
    "@langri-sha/tsconfig/project.json",
    "@langri-sha/tsconfig/react.json",
    "@langri-sha/tsconfig/emotion.json"
  ]
}
```

The monorepo's root `tsconfig.json` extends the base and lists each package as a
[project reference][composite projects]:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@langri-sha/tsconfig",
  "references": [{ "path": "./packages/app" }]
}
```

## Strictness and module options

TypeScript 6 or 7 is required. On top of their defaults, which include `strict`,
the base sets, among others:

- `verbatimModuleSyntax`: import types with a `type` modifier. An import whose
  every named binding is an inline `type`, as in
  `import { type Name } from 'module'`, still leaves `import {} from 'module'`
  in the output; `import type { Name } from 'module'` drops it.
- `erasableSyntaxOnly`: no enums, namespaces with values, parameter properties
  or angle-bracket type assertions. Set it to `false` in a package that needs
  them.
- `noImplicitReturns` and `moduleDetection: "force"`.
- `lib: ["ES2025"]`, which doesn't declare APIs Node 24 lacks, such as
  `Temporal`.

## Emitting

The base only type-checks. It doesn't set `rootDir`, which TypeScript 6 no
longer infers, so a project that emits through it fails with TS5011 when its
sources sit in a subdirectory such as `src`. A project that emits JavaScript or
declarations extends `@langri-sha/tsconfig/build.json` instead, which sets
`rootDir` to `src`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@langri-sha/tsconfig/build.json",
  "include": ["src"]
}
```

## See

- [`@moonrepo/tsconfig`]

## Contributing

See [CONTRIBUTING.md] in `langri-sha/github`.

[`@moonrepo/tsconfig`]:
  https://github.com/moonrepo/dev/tree/master/packages/tsconfig
[composite projects]:
  https://www.typescriptlang.org/docs/handbook/project-references.html
[contributing.md]:
  https://github.com/langri-sha/github/blob/main/CONTRIBUTING.md
[emotion]: https://emotion.sh/docs/typescript
[react]: https://react.dev/learn/installation
[typescript]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
