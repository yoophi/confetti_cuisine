const port = 3000,
  express = require("express"),
  app = express();

app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(
    `The express.js server has started and is listening on port number: ${port}`
  );
});
