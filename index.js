import Koa from 'koa';
import KoaRouter from 'koa-router';

const app = new Koa();

const router = new KoaRouter();
router.get('/', async ctx => {
  ctx.body = 'HELLO FROM KOA';
});
app.use(router.routes());

app.listen(3000);

