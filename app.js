const express = require("express");
const app = express();
const connectDB = require("./DB/connection");
const port = 3000;
const indexRouter = require("./modules/index.route");
app.use(express.json());
connectDB();
app.use("/api/v1/user", indexRouter.userRouter);

// for wrong links 
app.use("*", (req, res) => {
  res.json({ message: "page not found " });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
