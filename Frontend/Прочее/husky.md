
```sh
chmod ug+x .husky/*
```

### post-commit

```bash
git status
```

### post-merge
```bash
cd source && bun i
```

### pre-commit
```bash
cd source && npx lint-staged && npm run typecheck && npm run test
```