import { main } from './migrator'

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
