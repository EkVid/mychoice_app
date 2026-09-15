# MyChoice Item Management App

A full stack item management application built with:

- **Frontend:** React, TypeScript, Vite, Chakra UI
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL

The application allows users to create, view, update, and delete items and assign them to either the **Primary** (`P`) or **Secondary** (`S`) group with an enforced unique constraint on `(name, group)`

---

## Quick Start with Docker (If needed)

Run the entire application (PostgreSQL, Django Backend, and React Frontend) with a single command using Docker Compose:

### 1. Start the Containers

```bash
docker compose up --build -d
```

### 2. Access the Application

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8000/items/](http://localhost:8000/items/)

To stop the containers:

```bash
docker compose down
```

---

## Manual Setup

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18+) & **npm**
- **Python** (v3.10+)
- **PostgreSQL** server running locally
- **Git**

Verify your installations:

```bash
node --version
npm --version
python3 --version
psql --version
```

---

### Database Setup

1. Start your PostgreSQL service.
2. Create a user and database with ownership assigned to the user:

```sql
CREATE USER mychoice_user WITH PASSWORD 'your_password';
CREATE DATABASE mychoice_app OWNER mychoice_user;
```

---

### Environment Setup

1. Copy `.env.clonable` to `.env` inside the `backend/` directory:

```bash
cp backend/.env.clonable backend/.env
```

2. Update `backend/.env` with your database credentials:

```env
POSTGRES_DB=mychoice_app
POSTGRES_USER=mychoice_user
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

---

### Backend Setup

1. **Create and activate a Python virtual environment:**

```bash
# From project root
python3 -m venv venv

# Activate (macOS/Linux):
source venv/bin/activate
# Activate (Windows):
# venv\Scripts\activate
```

2. **Install dependencies:**

```bash
pip install -r backend/requirements.txt
```

3. **Run database migrations:**

```bash
python backend/manage.py migrate
```

4. **Start the Django development server:**

```bash
python backend/manage.py runserver
```

The backend server will run at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

### Frontend Setup

1. **Navigate to the frontend directory and install dependencies:**

```bash
cd frontend
npm install
```

2. **Start the Vite development server:**

```bash
npm run dev
```

The frontend application will run at [http://localhost:5173/](http://localhost:5173/).

---

## API Endpoints

| Method   | Endpoint       | Description                 | Payload Example                            |
| -------- | -------------- | --------------------------- | ------------------------------------------ |
| `GET`    | `/items/`      | List all items              | N/A                                        |
| `POST`   | `/items/`      | Create a new item           | `{"name": "Item", "group": "P"}`         |
| `GET`    | `/items/<id>/` | Retrieve details of an item | N/A                                        |
| `PATCH`  | `/items/<id>/` | Update an item              | `{"name": "Updated Item", "group": "S"}` |
| `DELETE` | `/items/<id>/` | Delete an item              | N/A                                        |

### Data Model Rules

- **Groups:** `"P"` (Primary) or `"S"` (Secondary).
- **Constraints:** `(name, group)` unique constraint enforced at the database level.

### Future Improvements

Potential enhancements for future iterations include:

- Vitest for FE
- Pytest for BE
- Redux state management once the app scales
