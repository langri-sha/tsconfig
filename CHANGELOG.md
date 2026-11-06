# Change Log - @langri-sha/tsconfig

<!-- This log was last generated on Fri, 06 Nov 2026 22:09:19 GMT and should not be manually modified. -->

<!-- Start content -->

## 3.0.0

Fri, 06 Nov 2026 22:09:19 GMT

### Major changes

- Turn on moduleDetection force: every file is a module, so a file without imports or exports no longer shares its top-level scope with others. It also changes emit: such a file gets export {} and loses its use strict directive, and its unused top-level locals now raise TS6133. Outputs loaded as classic scripts need moduleDetection auto (filip.dupanovic@gmail.com)
- Drop the options TypeScript 6 sets to the same values by default: allowSyntheticDefaultImports, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, removeComments and strict. A config listed before this one in an extends array no longer has its strict, experimentalDecorators or removeComments overridden (filip.dupanovic@gmail.com)
- Turn on verbatimModuleSyntax in place of isolatedModules, which it implies. Imports of types need the type keyword, and an import whose every named binding is an inline type still leaves a runtime import of the module (filip.dupanovic@gmail.com)
- Type the ES2025 library instead of ESNext, so APIs Node 24 lacks, such as Temporal, no longer type-check. react.json takes DOM and ES2025; DOM.Iterable is part of DOM on TypeScript 6 (filip.dupanovic@gmail.com)
- Turn on erasableSyntaxOnly: enums, namespaces with values, parameter properties and angle-bracket type assertions no longer compile; a package can override the option (filip.dupanovic@gmail.com)
- Require TypeScript 6 or 7: the peer dependency is now ^6.0.0 || ^7.0.0 (filip.dupanovic@gmail.com)
- Turn on noImplicitReturns: a function that returns a value on some code paths must return on all of them (filip.dupanovic@gmail.com)

### Patches

- Update dependency @langri-sha/projen-project to v0.49.2
- Update dependency pnpm to v12.17.0

## 2.0.0

Thu, 05 Nov 2026 22:18:17 GMT

### Major changes

- Set rootDir to src in the build config. A build that compiles files outside src sets its own rootDir. (filip.dupanovic@gmail.com)

### Minor changes

- Require Node.js 24.22.1, which fixes CVE-2026-111497 (filip.dupanovic@gmail.com)

### Patches

- fix(deps): update dependency pnpm to v12.11.2
- fix(deps): update dependency pnpm to v12.10.0
- Update dependency pnpm to v12.16.0
- Update dependency @langri-sha/projen-project to v0.44.1
- Update dependency @langri-sha/projen-project to v0.49.1
- fix(deps): update dependency pnpm to v12.10.1
- fix(deps): update dependency pnpm to v12.11.0
- Update dependency @langri-sha/projen-project to v0.42.3
- Update dependency @langri-sha/projen-project to v0.48.3
- Update dependency pnpm to v12.14.0
- Update dependency @langri-sha/projen-project to v0.42.1
- Update dependency @langri-sha/projen-project to v0.48.2
- chore(deps): update langri-sha projen toolchain
- Update dependency @langri-sha/projen-project to v0.46.0
- Update @langri-sha/projen-project to 0.37.0 (filip.dupanovic@gmail.com)
- Update dependency @langri-sha/projen-project to v0.44.1
- chore(deps): update dependency @langri-sha/projen-project to v0.36.0
- Update langri-sha/skills digest to c0cb19c
- Update dependency @langri-sha/projen-project to v0.48.1
- chore(deps): update dependency @langri-sha/projen-project to v0.33.0
- Update dependency pnpm to v12.16.1
- Update dependency @langri-sha/projen-project to v0.39.0
- Update dependency @langri-sha/projen-project to v0.47.0
- chore(deps): update langri-sha projen toolchain
- Update dependency @langri-sha/projen-project to v0.42.0
- Update dependency pnpm to v12.15.0
- Update dependency pnpm to v12.13.0
- Update dependency langri-sha/skills to v1.1.0
- Update dependency @langri-sha/projen-project to v0.43.0
- chore(deps): update langri-sha projen toolchain
- Update dependency @langri-sha/projen-project to v0.40.0
- Update dependency @langri-sha/projen-project to v0.42.4
- fix(deps): update dependency pnpm to v12.11.1

## 1.1.1

Wed, 07 Oct 2026 10:15:47 GMT

### Patches

- fix(deps): update dependency pnpm to v12.8.2
- chore(deps): update langri-sha projen toolchain
- fix(deps): update dependency pnpm to v12.9.1
- fix(deps): update dependency pnpm to v12.9.0
- chore(deps): update dependency @langri-sha/projen-project to v0.32.0

## 1.1.0

Thu, 01 Oct 2026 22:36:20 GMT

### Minor changes

- Support TypeScript 5, 6 and 7

### Patches

- fix(deps): update dependency pnpm to v12.8.1

## 1.0.2

Thu, 01 Oct 2026 20:50:07 GMT

### Patches

- Publish from langri-sha/tsconfig, which now owns this package and its history (filip.dupanovic@gmail.com)
- Declare the package as an ES module (filip.dupanovic@gmail.com)

## 1.0.1

Mon, 27 Jul 2026 11:38:48 GMT

### Patches

- Add tsconfig field so bare package extends resolves (filip.dupanovic@gmail.com)

## 1.0.0

Mon, 27 Jul 2026 11:17:23 GMT

### Major changes

- react.json and emotion.json no longer extend base.json; combine them with a complete configuration via an extends array (filip.dupanovic@gmail.com)

## 0.11.1

Mon, 27 Jul 2026 00:06:02 GMT

### Patches

- Update the synthesis command in generated file headers (filip.dupanovic@gmail.com)

## 0.11.0

Sat, 25 Jul 2026 15:41:25 GMT

### Minor changes

- Switch to Bundler module resolution so exports-only packages (like lint-staged) resolve (filip.dupanovic@gmail.com)

## 0.10.2

Mon, 20 Jul 2026 10:17:52 GMT

### Patches

- chore: publish from langri-sha/projen, which now owns this package and its history (filip.dupanovic@gmail.com)
- chore(deps): update dependency prettier to v3.8.3 (email not defined)

## 0.10.1

Wed, 17 Jul 2024 10:48:15 GMT

### Patches

- fix(workspace): Use correct GitHub directory (filip.dupanovic@gmail.com)

## 0.10.0

Sat, 15 Jun 2024 09:09:05 GMT

### Minor changes

- feat(tsconfig): Manage package with projen (filip.dupanovic@gmail.com)

### Patches

- fix(tsconfig): Apply Prettier changes (filip.dupanovic@gmail.com)

## 0.9.0

Fri, 03 May 2024 10:44:32 GMT

### Minor changes

- feat(tsconfig): Add build config (filip.dupanovic@gmail.com)

### Patches

- fix(workspace): Sync packages (filip.dupanovic@gmail.com)
- fix(workspace): Revise build command (filip.dupanovic@gmail.com)
- fix(workspace): Sync packages (filip.dupanovic@gmail.com)
- fix(tsconfig): Sync package (filip.dupanovic@gmail.com)
- fix(tsconfig): Sync package (filip.dupanovic@gmail.com)

## 0.2.0

Wed, 24 Apr 2024 22:03:36 GMT

### Minor changes

- feat(workspace): Update package metadata (filip.dupanovic@gmail.com)
