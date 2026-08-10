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
