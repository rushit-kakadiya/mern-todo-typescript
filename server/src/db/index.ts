import mongoose, { ConnectOptions } from "mongoose";

function makeNewConnection(uri: string) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  db.on("error", function (error) {
    console.log(`MongoDB :: connection ${JSON.stringify(error?.message)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection`)
    );
  });

  db.on("connected", () => {
    mongoose.set("debug", (col, method, query, doc) => {
      console.log(
        `MongoDB :: ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(
          doc
        )})`
      );
    });
    console.log(`MongoDB :: connected`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB :: disconnected`);
  });

  return db;
}

export const db1 = makeNewConnection("mongodb://localhost:27017/todo1");
export const db2 = makeNewConnection("mongodb://localhost:27017/todo2");