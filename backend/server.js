const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let incidents = [];
let idCounter = 1;

// 🔥 SIGNAL → CREATE INCIDENT
app.post("/signal", (req, res) => {
  const { component, error } = req.body;

  let incident = incidents.find(
    (i) => i.component === component && i.status !== "CLOSED"
  );

  if (!incident) {
    incident = {
      id: idCounter++,
      component,
      status: "OPEN",
      signals: [],
      start_time: new Date(),
      rca: null,
    };
    incidents.push(incident);
  }

  incident.signals.push({ component, error });

  res.send("Signal processed");
});

// 🔥 GET INCIDENTS
app.get("/incidents", (req, res) => {
  res.json(incidents);
});

// 🔥 INVESTIGATE
app.post("/investigate", (req, res) => {
  const { id } = req.body;
  const incident = incidents.find((i) => i.id === id);

  if (!incident) return res.status(404).send("Not found");

  incident.status = "INVESTIGATING";
  res.send("Investigating");
});

// 🔥 RESOLVE
app.post("/resolve", (req, res) => {
  const { id } = req.body;
  const incident = incidents.find((i) => i.id === id);

  if (!incident) return res.status(404).send("Not found");

  incident.status = "RESOLVED";
  res.send("Resolved");
});

// 🔥 CLOSE (RCA REQUIRED)
app.post("/close", (req, res) => {
  const { id, rca } = req.body;

  const incident = incidents.find((i) => i.id === id);

  if (!incident) return res.status(404).send("Not found");

  if (!rca || rca.trim() === "") {
    return res.status(400).send("RCA is required");
  }

  incident.status = "CLOSED";
  incident.rca = rca;
  incident.end_time = new Date();

  res.send("Closed");
});

// 🔥 HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5000, () => console.log("Server running on port 5000"));