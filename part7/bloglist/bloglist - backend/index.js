const app = require('./app');
const { PORT } = require('./utils/config');

app.listen(PORT || 8080, () => {
  console.log(`Server running on port ${PORT || 8080}`);
});
