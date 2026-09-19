# BACKEND INTEGRATION AUDIT

## 1. Current Frontend Architecture
- **Framework**: React 19 + TypeScript + Vite.
- **Routing/Navigation**: State-based navigation via `activeTab` (`beranda`, `scan`, `detail`, `visualisasi`, `edukasi`, `akun`) inside `App.tsx`.
- **Styling**: Tailwind CSS.
- **Components**: Separated into functional components (`Navbar`, `BottomNav`, `HomeScreen`, `ScanScreen`, `DetailScreen`, `DataVisualizationScreen`, `EducationScreen`, `AuthScreen`).
- **State Management**: React `useState` and `useEffect` in `App.tsx`.
- **Data Source**: Currently relying on hardcoded mock data in `src/data/mockData.ts`.

## 2. Current Mock Data
The `src/data/mockData.ts` contains:
- `INITIAL_USER`: Mock user profile (Farmer role, OAuth token, etc).
- `DEFAULT_DIAGNOSIS` / `MOCK_DIAGNOSTICS`: Mock history of AI diagnoses. Contains disease name, confidence, symptoms, recommendations, and heatmap data.
- `INITIAL_TELEMETRIES`: Mock sensor data for the field (moisture, temp, humidity, etc).
- `EDUCATION_MODULES` & `QUIZ_DATA`: Educational articles and a short quiz.
- Asset URLs (Google Cloud Storage / Unsplash).

## 3. Current Entities mapped to Frontend Types
- `UserProfile` -> `users` (id, name, email, avatarUrl, role, location, farmName, oauth details).
- `DiagnosticRecord` -> `diagnoses` (id, block, crop, diseaseName, confidence, accuracyLabel, symptoms, steps, treatmentNotes, feedback/isVerified, image url, heatmap coordinates).
- `SensorTelemetry` -> `sensor_telemetries` (timestamp, timeVal, leafMoisture, ambientTemp, lightIndexLux, airHumidity, lesionRiskScore, activeBlock).
- `EducationModule` -> `education_modules` (id, title, summary, readingTime, image, tag, content array).
- `QuizQuestion` -> `quiz_questions` & `quiz_options` (caseStudy, question, options with text, isCorrect, explanation).

## 4. Current User Flow
- **Authentication**: User logs in (currently mocked in `AuthScreen`).
- **Dashboard/Home**: User sees their profile, latest diagnosis summary, and quick stats.
- **Scanning**: User uploads/takes a photo of a leaf -> gets instant diagnosis result with confidence, symptoms, and treatment.
- **Detail & Verification**: User views detailed diagnosis and provides feedback ("Sesuai", "Ragu", "Beda").
- **Telemetry/Data**: User sees real-time D3 charts of field conditions.
- **Education**: User reads modules and answers quizzes.

## 5. API Requirements
- `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`
- `GET /api/v1/farm`, `GET/POST/PUT/DELETE /api/v1/farm/blocks`
- `POST /api/v1/diagnoses`, `GET /api/v1/diagnoses`, `GET /api/v1/diagnoses/{id}`
- `POST /api/v1/diagnoses/{id}/verify`, `POST /api/v1/diagnoses/{id}/feedback`
- `GET /api/v1/education`, `GET /api/v1/education/{id}`
- `GET /api/v1/telemetry`, `GET /api/v1/telemetry/latest`
- `GET /api/v1/dashboard`

## 6. Authentication Requirements
- **System**: Laravel Sanctum for API token authentication.
- **Tokens**: No tokens should be hardcoded on frontend.
- **Roles**: Manage permissions (`Petani Lapangan`, `Agronomis`, `Petugas PPL`).

## 7. Database Requirements
- PostgreSQL.
- **Tables**: `users`, `farms`, `farm_blocks`, `crops`, `diagnoses`, `diagnosis_images`, `diagnosis_symptoms`, `diagnosis_actions`, `diagnosis_verifications`, `education_modules`, `sensor_telemetries`.
- Must handle JSON columns for things like `heatmapCoords`, `symptoms`, `steps` if we want flexible schemas, or normalize them into separate tables (`diagnosis_symptoms`, `diagnosis_actions`). The prompt requires normalizing (`diagnosis_symptoms`, `diagnosis_actions`, `diagnosis_verifications`).

## 8. AI Requirements
- Abstract the AI interaction using interfaces (`AiDiagnosisServiceInterface`).
- Handle async processing (Laravel Queue) for potentially slow AI responses.
- Output explicit confidence scores and limitations.
- Fallback/Mock mode (`MockAiDiagnosisService`) for development.

## 9. Potential Inconsistencies
- The frontend currently simulates real-time data (`setInterval` in `App.tsx` for telemetries). The backend will provide historical endpoints, so frontend will need to poll `GET /api/v1/telemetry/latest` or use WebSockets/Pusher if real-time is strictly required. For now, standard REST polling or date-range filtering is recommended.
- The `heatmapCoords` in mock data might be difficult for an initial mock AI to generate accurately without a real object detection model. We will mock static coordinates.

## 10. Recommended Backend Architecture
- **Framework**: Laravel 11.
- **Database**: PostgreSQL.
- **Pattern**: Controller -> Service -> Repository (optional) -> Model.
- **Validation**: Form Requests.
- **Response Formatting**: Eloquent API Resources for consistent JSON structures.
- **Background Jobs**: Queues for AI processing (Redis/Database driver).

## 11. Migration Plan from Mock Data to Real API
1. Implement the database schema and mock seeders on the backend.
2. Build the API endpoints and test them.
3. Update frontend to use an `apiClient.ts` to fetch data via `axios` or `fetch`.
4. Integrate `AuthScreen` first to get a real token.
5. Replace `App.tsx` state initializations with API calls.
6. Remove `src/data/mockData.ts` once fully transitioned.
