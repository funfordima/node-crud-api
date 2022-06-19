import 'dotenv/config';
import { Application } from './framework/application.js';
import userRouter from './routes/user-router.js';
import { jsonParser } from './utils/parse-json.util.js';
import { parseUrl } from './utils/parse-url.util.js';

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(jsonParser);
app.use(parseUrl(`http://localhost:${PORT}`));

app.addRouter(userRouter);

app.listen(PORT, () => console.warn(`Server started on port ${PORT}`));
