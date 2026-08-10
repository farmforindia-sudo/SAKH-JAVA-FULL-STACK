# SAKH — किसान ज्ञान मंच

SAKH is a Java full-stack farmer knowledge platform. The original UI has been retained, while the cloud authentication/database layer has been replaced with a local Java Spring Boot REST API and MySQL database.

## Technology stack

- Frontend: React 19 + TypeScript + TanStack Start + Tailwind CSS
- Backend: Java 21 + Spring Boot + Spring Web + Spring Data JPA + Spring Security Crypto
- Database: MySQL 8
- Authentication: Java HTTP session + BCrypt password hashing
- API: REST (`/api/auth/*`, `/api/favorites/*`)

The application uses only the Java/MySQL backend included in this project; no external cloud authentication or database service is required.

## Project structure

```text
sakhi-kheti-gyan-main/
├── backend/                 # Java Spring Boot application
│   ├── pom.xml
│   └── src/main/java/com/sakh/farmer/
├── database/schema.sql      # MySQL database setup
├── src/                     # React/TanStack frontend
├── public/
├── package.json
└── README.md
```

## Requirements

Install:
1. Java 21 or newer
2. Maven 3.9+
3. Node.js 20+ and npm
4. MySQL 8+

## 1. Create the MySQL database

Start MySQL and run:

```sql
SOURCE database/schema.sql;
```

The schema creates the `sakh` database and the `users` and `favorites` tables.

Default local database settings used by the backend:

```text
Host: localhost
Port: 3306
Database: sakh
Username: root
Password: root
```

If your MySQL credentials are different, set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` before starting Spring Boot, or edit `backend/src/main/resources/application.properties`.

## 2. Start the Java backend

Open Terminal 1:

```bash
cd backend
mvn spring-boot:run
```

The Java server starts at:

```text
http://localhost:8080
```

The API base URL is:

```text
http://localhost:8080/api
```

## 3. Start the frontend

Open Terminal 2:

```bash
cd sakhi-kheti-gyan-main
npm install
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:3000
```

The frontend communicates with the Java backend automatically through `VITE_API_URL=http://localhost:8080/api`.

## 4. Test the project

1. Open SAKH in the browser.
2. Open `लॉगिन`.
3. Create a new account.
4. Log in.
5. Open any crop, vegetable, flower, tree or machine card.
6. Use the heart button to save it.
7. Open `पसंदीदा` and confirm the saved item appears.
8. Log out and log back in to confirm the data remains in MySQL.

## Important submission point

For a college demonstration, start both services:

```text
Terminal 1 → Java Spring Boot + MySQL → port 8080
Terminal 2 → React frontend → port 3000
```

This is the Java full-stack architecture:

```text
Browser
   ↓
React / TypeScript frontend
   ↓ REST API
Java Spring Boot backend
   ↓ JPA / Hibernate
MySQL database
```

The Java backend owns authentication and persistent favourites. The frontend is only the presentation/client layer.

## API endpoints

```text
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout

GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/{id}
```

## Notes

- Google OAuth was removed because it depended on the previous cloud/ authentication integration.
- The farmer knowledge content remains in the frontend data files.
- Do not commit real production database passwords. For submission, use the local/demo credentials described above or your college's configured MySQL credentials.
