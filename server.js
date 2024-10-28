const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const DatabaseClient = require("./infrastructure/DatabaseClient");
const Logger = require("./infrastructure/Logger");
const { PORT, MONGO_URI } = require("./infrastructure/environmentalVariables");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const employeeRoute = require("./routes/employees");
const settingsRoute = require("./routes/settings");
const location = require("./routes/location");


const dbClient = new DatabaseClient(MONGO_URI);
dbClient.connect();

app.use("/api/employees", employeeRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/locations", location);

app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`);
});
