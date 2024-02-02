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
