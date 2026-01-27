import { main } from './migrate'

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
