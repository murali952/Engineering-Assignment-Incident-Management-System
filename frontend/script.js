const API = "http://localhost:5000";

function fetchIncidents() {
  fetch(API + "/incidents")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("incidents");
      container.innerHTML = "";

      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
          <h3>${item.component}</h3>
          <p>Status: ${item.status}</p>
          <p>Signals: ${item.signals.length}</p>

          ${item.status === "OPEN" ? 
            `<button onclick="updateStatus(${item.id}, 'investigate')">Investigate</button>` : ""}

          ${item.status === "INVESTIGATING" ? 
            `<button onclick="updateStatus(${item.id}, 'resolve')">Resolve</button>` : ""}

          ${item.status === "RESOLVED" ? 
            `<input id="rca-${item.id}" placeholder="Enter RCA"/>
             <button onclick="closeIncident(${item.id})">Close</button>` : ""}

          ${item.status === "CLOSED" ? 
            `<p>✅ Closed | RCA: ${item.rca}</p>` : ""}
        `;

        container.appendChild(div);
      });
    })
    .catch(() => alert("⚠️ Backend not running"));
}

// 🔥 Create Incident (UPDATED)
function createIncident() {
  fetch(API + "/signal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      component: Math.random() > 0.5 ? "RDBMS" : "API",
      error: "Service Failure"
    })
  }).then(fetchIncidents);
}

// 🔥 Update Status
function updateStatus(id, action) {
  fetch(API + "/" + action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  }).then(fetchIncidents);
}

// 🔥 Close Incident
function closeIncident(id) {
  const rca = document.getElementById("rca-" + id).value;

  fetch(API + "/close", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, rca })
  }).then(fetchIncidents);
}

// Load data on start
fetchIncidents();