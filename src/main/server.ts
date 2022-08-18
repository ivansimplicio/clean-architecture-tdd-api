import source from '@infra/db/mysql/config/data-source';
import app from './setup-app';

source.initialize().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`App is running`);
  });
});
