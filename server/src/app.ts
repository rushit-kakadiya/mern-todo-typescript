import express, { Express } from "express";
import cors from "cors";

import routes from "./routes";

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use("/api/v1", routes);

const PORT: string | number = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running`));
