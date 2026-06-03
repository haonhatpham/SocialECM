import 'dotenv/config.js';
import App from '@/app.js';
import IndexRoute from '@/module/index/index.route.js';

const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();
