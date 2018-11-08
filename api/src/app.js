import path from 'path';
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import schema from "./schema";

const staticPath = path.join(__dirname, "../", 'static');

const app = express();

app.use('/static', express.static(staticPath));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).send({});
  }
  return next();
});
const port = 3000;
app.use(
  "/api",
  bodyParser.json({ type: "application/json" }),
  require("./router").default
);
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.use("*", (_, res) => res.sendFile(path.join(staticPath, "index.html")));

app.listen(port, () => console.log(`Server on ${port}`));
