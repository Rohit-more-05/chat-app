# 💬 Chat App – Real-Time Messaging Application

Chat App is a full-stack real-time messaging application built with a **separate frontend and backend architecture**.  
It demonstrates modern web development practices using React on the frontend and Spring Boot with WebSockets on the backend.

This repository follows a **mono-repo structure**, keeping frontend and backend in a single GitHub repository for easier management and deployment.

---

## 🚀 Features

- 🔴 Real-time messaging using WebSockets
- 🏠 Create or join chat rooms
- 💬 Live message broadcasting within rooms
- 🌐 REST APIs for room management
- ⚡ Fast and responsive UI
- 🧩 Clean separation of frontend and backend

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Java
- Spring Boot
- Spring WebSocket
- Maven

---

## 📁 Project Structure

```
chat-app/
│
├── chat-app-frontend/        # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── chat-app-backend/         # Backend (Spring Boot)
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## ▶️ How to Run the Project

### ✅ Prerequisites
- Node.js (v18+ recommended)
- Java JDK 17+
- Maven
- Git

---

## 🖥️ Run Backend (Spring Boot)

1. Open terminal inside:
```
chat-app-backend/
```

2. Run:
```bash
./mvnw spring-boot:run
```
(or `mvn spring-boot:run` on Windows)

3. Backend will start on:
```
http://localhost:8080
```

---

## 🌐 Run Frontend (React)

1. Open a new terminal inside:
```
chat-app-frontend/
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser:
```
http://localhost:5173
```

---

## 🔁 Application Flow (High Level)

1. User opens frontend and creates/joins a room
2. Frontend communicates with backend using REST APIs
3. Messages are exchanged in real-time using WebSockets
4. Backend broadcasts messages to all users in the same room

---

## ❗ Important Notes

- Docker and YAML configuration files are **not required** to run this project
- The application is intentionally kept simple for learning and demonstration
- Frontend and backend can be run independently

---

## 🔮 Future Enhancements

- User authentication
- Message persistence (database)
- Typing indicators
- Online/offline user status
- UI/UX improvements

---

## 👨‍💻 Author

**Rohit More**  
Backend Developer (Aspiring)  
Java | Spring Boot | WebSockets | React
