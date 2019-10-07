import Koa from 'koa';
import KoaRouter from 'koa-router';
import Arango from 'pb-service-utils/arango';

const app = new Koa();

const router = new KoaRouter();

router.get('/', async ctx => {
  ctx.body = 'HELLO FROM KOA';
});

router.get('/arango', async ctx => {
  const arangoSettings = {
    hosts: 'http://localhost:8529',
    user: '',
    password: '',
    useCache: true,
    cacheStdTTL: 60
  };

  try {
    //Singleton
    await Arango.connect(arangoSettings);
    const dbName = 'Customer1_db';
    await Arango.ensureDatabase(dbName);
    await Arango.ensureCollection(dbName,'users');
    const users = await Arango.find(dbName,`FOR c IN users RETURN c`);
    ctx.body = JSON.stringify(users, null, 2);
  } catch (err) {
    ctx.body = err.stack;
  }
});

app.use(router.routes());

app.listen(3000);

