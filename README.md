# SAKH – Kisan Gyan Manch

SAKH (किसान ज्ञान मंच) is a full-stack agriculture knowledge platform designed to provide farmers with useful information about crops, vegetables, flowers, trees, agricultural machinery, weather, farming basics and government schemes.

The application supports Hindi and English content and provides user authentication and favourites functionality.

---

## Project Overview

SAKH is implemented as a full-stack web application using:

- React + TypeScript for the frontend
- Java 21 + Spring Boot for the backend
- MySQL for database management
- Spring Data JPA and Hibernate for database interaction
- BCrypt for secure password hashing
- REST APIs for frontend-backend communication

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- HTML5
- CSS3

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Maven
- REST API
- BCrypt password hashing

### Database

- MySQL
- Database name: `sakh`

---

## System Architecture

```text
                    SAKH Web Application
                           |
                           |
                    React Frontend
                 React + TypeScript
                           |
                           | REST API
                           |
                    Spring Boot Backend
                         Java 21
                           |
                    Spring Data JPA
                       Hibernate
                           |
                           |
                         MySQL
                      Database: sakh
                           |
                 ---------------------
                 |                   |
               users             favorites
Main Features
Agriculture Knowledge
The application provides information about:
Grains and crops
Vegetables
Flowers
Trees
Agricultural machinery
Farming basics
Weather and crop advice
Government schemes
Agricultural sources
User Authentication
Users can:
Register an account
Log in
Maintain an authenticated session
Passwords are stored using BCrypt hashing rather than plain-text passwords.
Favourite Content
Authenticated users can save and manage favourite agricultural content.
Bilingual Interface
The platform provides agricultural information in:
Hindi
English
Project Structure
SAKH-JAVA-FULL-STACK/
│
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/sakh/farmer/
│           │       ├── config/
│           │       ├── controller/
│           │       ├── dto/
│           │       ├── model/
│           │       ├── repository/
│           │       └── SakhApplication.java
│           │
│           └── resources/
│               └── application.properties
│
├── database/
│   └── schema.sql
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── routes/
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
How to Run the Project
Prerequisites
Install the following:
Java 21
Maven
MySQL
Node.js
npm
Check the installations:
java -version
mvn -version
mysql --version
node -v
npm -v
1. Clone the Repository
git clone https://github.com/farmforindia-sudo/SAKH-JAVA-FULL-STACK.git
Move into the project:
cd SAKH-JAVA-FULL-STACK
2. Configure MySQL
Start MySQL.
Create the database:

CREATE DATABASE sakh;
Import the database schema:
mysql -u root sakh < database/schema.sql
The application currently uses the following database:
Database: sakh
Username: root
Host: localhost
Port: 3306
3. Configure the Java Backend
Go into the backend directory:
cd backend
The backend configuration is located at:
backend/src/main/resources/application.properties
The Spring Boot application runs on:
http://localhost:8080
Start the backend using Maven:
mvn spring-boot:run
A successful startup should show:
Tomcat started on port 8080
Keep this Terminal running.
4. Start the Frontend
Open another Terminal window.
Go to the project root:

cd ~/Downloads/SAKH-JAVA-FULL-STACK
Install frontend dependencies:
npm install
Start the development server:
npm run dev
The frontend will normally be available at:
http://localhost:3000
Open that address in your browser.
Frontend–Backend Communication
The frontend communicates with the Java Spring Boot backend through REST APIs.
The backend API base URL is:

http://localhost:8080/api
The frontend uses this API to perform operations such as:
User registration
User login
Authentication
Favourite management
Database
The MySQL database is named:
sakh
Main tables include:
users
favorites
The users table stores registered users and their BCrypt password hashes.
The favorites table stores the favourite content associated with users.

Security
User passwords are not stored as plain text.
The backend uses BCrypt password hashing before storing passwords in the database.

Example stored password format:

$2a$10$...
Database credentials and local environment configuration are not committed to the Git repository.
API Backend Structure
The Java backend follows a layered structure:
Controller
    |
    ↓
Repository
    |
    ↓
Entity / Model
    |
    ↓
MySQL Database
Controllers
AuthController
FavoriteController
Models
User
Favorite
Repositories
UserRepository
FavoriteRepository
DTOs
AuthRequest
FavoriteRequest
FavoriteResponse
UserResponse
Running the Complete Application
Two processes need to be running.
Terminal 1 – Java Backend
cd backend
mvn spring-boot:run
Backend:
http://localhost:8080
Terminal 2 – React Frontend
cd SAKH-JAVA-FULL-STACK
npm install
npm run dev
Frontend:
http://localhost:3000
Then open:
http://localhost:3000
Testing the Application
The following functionality can be tested:
Open the SAKH website.
Open the Login page.
Register a new user.
Log in using the registered account.
Verify that the account is stored in MySQL.
Test favourite functionality.
Navigate through the agriculture knowledge sections.
Project Objective
The objective of SAKH is to provide a simple and accessible digital platform where farmers can find agriculture-related knowledge in their preferred language.
The project demonstrates the implementation of a complete full-stack architecture using a modern web frontend, Java Spring Boot backend, REST APIs and a relational MySQL database.

Technologies Summary
Layer	Technology
Frontend	React
Frontend Language	TypeScript
Build Tool	Vite
Styling	Tailwind CSS
Backend	Java 21
Framework	Spring Boot
API	REST
ORM	Hibernate / JPA
Build Tool	Maven
Database	MySQL
Authentication	BCrypt
Version Control	Git / GitHub

Author
Virat 
SAKH – Kisan Gyan Manch



