
# 🏥 Medical Store Management System  
**Built with React.js, Spring Boot, and MySQL**

A complete full-stack web application for managing pharmacy operations including medicine inventory, customer records, and reporting.

---

## 📌 Key Features

- 📦 **Inventory Management**: Add, update, delete medicines, track stock.
- 👥 **Customer Management**: Add/view customer records.
- 🔐 **Authentication**: Secure login for admin/staff (extendable to JWT)
- 📊 **Reporting**: (Optional) Daily sales reports, stock levels

---

## 🧱 Tech Stack

| Layer        | Technology                             |
|--------------|-----------------------------------------|
| Frontend     | React.js, Axios, Bootstrap / Tailwind   |
| Backend      | Spring Boot, Spring MVC, Spring Data JPA|
| Database     | MySQL                                   |
| API          | RESTful APIs                            |
| Dev Tools    | Postman, Swagger, Maven, VS Code        |

---

## 📂 Project Structure

```
medical-store-management/
├── backend/             # Spring Boot Application
│   ├── controllers/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   └── application.properties
├── frontend/            # React Application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
```

---

## ⚙️ Getting Started

### 🚀 Backend Setup (Spring Boot)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/medical-store-management.git
   cd medical-store-management/backend
   ```

2. Configure `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/medical_store
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

3. Run the backend server:
   ```bash
   ./mvnw spring-boot:run
   ```

### 🌐 Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

> Frontend runs on `http://localhost:3000`  
> Backend runs on `http://localhost:8080`

---

## 🔗 REST API Endpoints (Sample)

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | `/api/medicines`      | Fetch all medicines     |
| POST   | `/api/medicines`      | Add new medicine        |
| PUT    | `/api/medicines/{id}` | Update medicine         |
| DELETE | `/api/medicines/{id}` | Delete medicine         |
| POST   | `/api/auth/login`     | User login              |

> Swagger UI: `http://localhost:8080/swagger-ui/` (if enabled)

---

## 🧪 Testing

- Backend: JUnit, Mockito  
- Frontend: React Testing Library (optional)  
- API: Postman collections provided

---

## 🖥️ UI Features (Pages)

- 🔑 Login Page (Admin/Staff)
- 📋 Dashboard with stock overview
- 💊 Medicine Management (CRUD)

---


## 🚧 Future Enhancements

- 🔔 Expiry alerts via email/SMS
- 📉 Sales and stock analytics dashboard
- 🧬 Barcode scanner integration
- 🌐 Multi-role authentication (admin, staff, cashier)
- 📱 Responsive mobile-first UI (PWA)

---

## 🙋‍♂️ Contributing

Contributions are welcome! Please fork the repo and open a pull request with your changes.

---


## 👨‍💻 Author

**Your Name**  
GitHub: [@ereeba](https://github.com/yourusername)  
Email: reebashinju@gmail.com

---



