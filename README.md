# Student Management System

A full-stack web application developed to manage student, faculty, and academic information efficiently. The system provides role-based access for Admin, Faculty, and Students, enabling smooth academic operations and digital record management.

---

## 📌 Features

### 👨‍💼 Admin Module

* Add, update, and delete student records
* Add and manage faculty details
* Assign subjects and departments
* Manage system users
* View complete system data

### 👨‍🏫 Faculty Module

* View assigned students
* Update student marks and grades
* Manage attendance records
* Monitor academic performance

### 👨‍🎓 Student Module

* View personal profile
* Check marks and grades
* View attendance details
* Access academic information

---

## 🛠️ Tech Stack

### Backend

* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

### Frontend

* ReactJS
* Axios
* React Router
* Bootstrap / CSS

### Database

* MySQL

---

## 📂 Project Structure

```bash
Student-Management-System/
│
├── backend/
│   ├── src/main/java
│   ├── src/main/resources
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

* Java 17+
* Node.js & npm
* MySQL
* Maven

---

## 🚀 Backend Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/student-management-system.git
```

2. Navigate to backend folder

```bash
cd backend
```

3. Configure MySQL database in `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

4. Run the Spring Boot application

```bash
mvn spring-boot:run
```

Backend server runs on:

```bash
http://localhost:8080
```

---

## 💻 Frontend Setup

1. Navigate to frontend folder

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the React application

```bash
npm start
```

Frontend server runs on:

```bash
http://localhost:3000
```

---

## 🔗 API Communication

The frontend communicates with backend services using **Axios** and REST APIs.

Example API:

```http
GET /api/students
POST /api/students
PUT /api/students/{id}
DELETE /api/students/{id}
```

---

## 🗄️ Database

MySQL database stores:

* Student details
* Faculty information
* Attendance records
* Marks and grades
* Department and subject details

---

## 📸 Future Enhancements

* Authentication & Authorization (JWT)
* Email Notifications
* Timetable Management
* Online Examination Module
* File Upload Support
* Dashboard Analytics

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

---

## 📄 License

This project is developed for educational purposes.

---

## 👨‍💻 Author

Developed by Vutla Dhanush
