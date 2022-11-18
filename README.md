# @janghood/lint

极客江湖lint库

## Document

Janghood lint library,

dependence on `eslint` and `commitlint`+`husky`.

### Usage

You should install dependency first.

#### Eslint

```bash
pnpm add -D eslint eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

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

#### Commitlint

```bash
pnpm add -D husky @commitlint/cli
```

In `package.json`:

```json
{
  "scripts": {
    "prepare": "jhlint install"
  }
}
```

run prepare:

```bash
pnpm run prepare
```

```typescript
// janghood.config.ts
export default defineJhConfig({
  lint: {
    commitlint: true
  }
})
```
