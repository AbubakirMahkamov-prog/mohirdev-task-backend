import express from 'express';
import config from './config/config';
import startup from './startup/startup';
const app = express();

startup(app)

app.listen(config.PORT, () => console.log(`Server running on ${config.PORT} 🚀`))
