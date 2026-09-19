# AgriVision API Documentation

Base URL: `/api/v1`

## Authentication

### 1. Register User
- **Endpoint:** `POST /auth/register`
- **Body:**
  - `name` (string, required)
  - `email` (string, required, unique)
  - `password` (string, required, min: 8)
  - `password_confirmation` (string, required)
  - `role` (string, optional: `farmer`, `agronomist`, `field_officer`)
- **Response:** 201 Created with `access_token`

### 2. Login
- **Endpoint:** `POST /auth/login`
- **Body:**
  - `email` (string, required)
  - `password` (string, required)
- **Response:** 200 OK with `access_token`

### 3. Get Current User
- **Endpoint:** `GET /auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** 200 OK with user object

### 4. Logout
- **Endpoint:** `POST /auth/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** 200 OK

## Farm Management

*Requires Authentication*

### 1. Get User's Farms
- **Endpoint:** `GET /farm`
- **Response:** Array of Farm objects with their blocks

### 2. Update User's Farm
- **Endpoint:** `PUT /farm`
- **Body:** `name`, `location`, `metadata`

### 3. Manage Farm Blocks
- **Endpoint:** `POST /farm/blocks` (Create block)
- **Endpoint:** `GET /farm/blocks/{id}` (View block)
- **Endpoint:** `PUT /farm/blocks/{id}` (Update block)
- **Endpoint:** `DELETE /farm/blocks/{id}` (Delete block)

## Diagnoses

*Requires Authentication*

### 1. Create Diagnosis (Upload Image)
- **Endpoint:** `POST /diagnoses`
- **Headers:** `Content-Type: multipart/form-data`
- **Body:**
  - `image` (file, required, max 5MB)
  - `farm_block_id` (integer, optional)
  - `crop_id` (integer, optional)
- **Response:** 202 Accepted (Starts async AI Job)

### 2. Check Diagnosis Status
- **Endpoint:** `GET /diagnoses/{id}/status`
- **Response:** `pending`, `processing`, `completed`, `failed`

### 3. Get Diagnosis Detail
- **Endpoint:** `GET /diagnoses/{id}`
- **Response:** Includes `image`, `symptoms`, `actions`, `verifications`, and AI result details.

### 4. List Diagnosis History
- **Endpoint:** `GET /diagnoses`
- **Query Params:** `status`, `block_id`, `per_page`
- **Response:** Paginated list of diagnoses.

### 5. Verify/Give Feedback
- **Endpoint:** `POST /diagnoses/{id}/verify`
- **Body:**
  - `status` (string, required: `confirmed`, `uncertain`, `different`)
  - `note` (string, optional)

## Telemetry

*Requires Authentication*

### 1. Get Telemetry List
- **Endpoint:** `GET /telemetry`
- **Query Params:** `block_id` (required), `from`, `to`, `per_page`

### 2. Get Latest Telemetry
- **Endpoint:** `GET /telemetry/latest`
- **Query Params:** `block_id` (required)

## Education

### 1. List Education Modules
- **Endpoint:** `GET /education`

### 2. View Education Module
- **Endpoint:** `GET /education/{module}`

## Dashboard

*Requires Authentication*

### 1. Get Summary
- **Endpoint:** `GET /dashboard`
- **Response:** Statistics on total scans, verified diagnoses, recent diagnoses, and risk summary.
