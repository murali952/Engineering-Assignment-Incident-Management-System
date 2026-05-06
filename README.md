# Incident Management System (IMS)

## Overview

A simplified Incident Management System designed to process infrastructure failure signals, prevent duplicate incidents, and manage the incident lifecycle from detection to resolution with mandatory Root Cause Analysis (RCA).

The system supports incident ingestion, debouncing, incident workflow tracking, and dashboard monitoring.

---

## Key Features

- Signal ingestion API
- Duplicate incident prevention
- Incident lifecycle management
- Mandatory RCA before closure
- REST API architecture
- Frontend dashboard
- Lightweight backend processing
- Rate limiting support
- Real-time incident updates

---

# Tech Stack

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Node.js
- Express.js

## Tools
- GitHub
- VS Code
- Docker (Optional)

---

# Architecture

```text
Frontend Dashboard
        ↓
REST APIs
        ↓
Express.js Backend
        ↓
In-Memory Incident Store
```

---

# Incident Workflow

```text
OPEN
→ INVESTIGATING
→ RESOLVED
→ CLOSED
```

---

# Deduplication Logic

If multiple signals are received for the same component while an incident is already active, the system prevents duplicate incident creation and updates the existing incident instead.

This reduces alert noise and unnecessary work items.

---

# RCA Validation

Incidents cannot move to CLOSED state unless Root Cause Analysis (RCA) details are submitted.

Required RCA fields:
- Root Cause
- Fix Applied
- Prevention Steps

---

# Project Structure

```bash
IMS-PROJECT/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
└── README.md
```

---

# API Endpoints

## 1. Create Signal

### Endpoint

```http
POST /signal
```

### Request

```json
{
  "component": "DATABASE_SERVER",
  "error": "Database Down"
}
```

### Response

```json
{
  "message": "Incident Created"
}
```

---

## 2. Get Incidents

### Endpoint

```http
GET /incidents
```

---

## 3. Update Incident Status

### Endpoint

```http
PUT /incident/:id/status
```

---

# Setup Instructions

## Prerequisites

- Node.js installed
- VS Code
- Git

---

# Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

Open:

```bash
frontend/index.html
```

using:

- Live Server extension
OR
- browser directly

---

# Sample Test Request

```json
{
  "component": "CACHE_CLUSTER_01",
  "error": "Connection Timeout"
}
```

---

# Backpressure Handling

The system uses lightweight in-memory processing to handle bursts of incoming signals.

Basic protections include:
- duplicate incident prevention
- request validation
- efficient incident lookup
- reduced unnecessary incident creation

---

# Future Improvements

- MongoDB integration
- Docker Compose support
- RabbitMQ async queue
- Real-time notifications
- Authentication
- Kubernetes deployment
- AWS cloud deployment
- Monitoring dashboard

---

# Performance Goals

| Feature | Status |
|---|---|
| Incident Creation | ✅ Implemented |
| Deduplication | ✅ Implemented |
| Incident Workflow | ✅ Implemented |
| RCA Validation | ✅ Implemented |
| Frontend Dashboard | ✅ Implemented |
| REST APIs | ✅ Implemented |

---

# Assignment Submission

This project was developed as part of the Infrastructure / SRE Intern Engineering Assignment.

---

# GitHub Repository

Add your GitHub repository link here.

Example:

```bash
https://github.com/murali952/Engineering-Assignment-Incident-Management-System
```

---

# Author

Murali Balakrishna
