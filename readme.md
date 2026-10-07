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

1. A base: `@langri-sha/tsconfig`, or `@langri-sha/tsconfig/project.json` for a
   package inside a monorepo.
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

## See

- [`@moonrepo/tsconfig`]

[`@moonrepo/tsconfig`]:
  https://github.com/moonrepo/dev/tree/master/packages/tsconfig
[composite projects]:
  https://www.typescriptlang.org/docs/handbook/project-references.html
[emotion]: https://emotion.sh/docs/typescript
[react]: https://react.dev/learn/installation
[typescript]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
