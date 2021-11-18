import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as routes from "./routes/index";
import * as path from 'path';

const log = console.log;

// create and setup express app
const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1", routes.tiendasRouter);
app.use("/api/v1", routes.usersRouter);
app.use("/api/v1", routes.productosRouter);
app.use("/api/v1", routes.categoriasRouter);

// start express server
app.listen(4000, () => {
  log("Server up on localhost:4000");
});
