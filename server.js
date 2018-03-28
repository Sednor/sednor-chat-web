const express = require('express');
const path = require('path');
const compression = require('compression');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  }
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
