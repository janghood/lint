# @janghood/lint

极客江湖lint库

## Document

Janghood lint library,

dependence on `eslint` and `commitlint`+`husky`.

### Usage

You should install dependency first.
So when you use `@janghood/lint`:

```bash
pnpm install --shamefully-hoist
```

#### Lint

```typescript
// janghood.config.ts
export default defineJhConfig({
  lint: {
    eslint: {
      include: ['*'],
      exclude: ['node_modules'],
    }
  }
})
```

##### TODO

* [ ] `oxlint` config support

#### Commitlint

In `package.json`:

```json
{
  "scripts": {
    "prepare": "jhlint install"
  }
}
```

this script will automatically create `husky`'s `commit-msg` and `pre-push` git hooks.
and you should provide your own lint script:

```json
{
  "scripts": {
    "lint": "jhlint"
  }
}
```

run prepare:

```bash
pnpm run prepare
```

and set your own `commitlint` config:

```typescript
// janghood.config.ts
export default defineJhConfig({
  lint: {
    commitlint: true
  }
})
```

##### SKIP_BUCKET

change `.husky/commit-msg`, add `SKIP_BUCKET=true` before `npx`:

```bash
SKIP_BUCKET=true npx ...
```
