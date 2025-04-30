# ♟️ Chess Tournament Platform

Plataforma web para gestionar torneos de ajedrez. Permite a los usuarios registrarse, crear torneos, inscribirse como participantes, emparejar partidas automáticamente y visualizar detalles.

---

## 🛠️ Tecnologías

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Django + Django REST Framework
- **Autenticación**: JWT (Simple JWT)
- **Base de datos**: SQLite / PostgreSQL
- **Otros**: Axios, Postman.

---

## 🚀 Funcionalidades principales

### 👤 Usuario

- Registro de cuenta
- Login con token JWT
- Aceptación de términos y condiciones

### 🏆 Torneos

- Crear torneos con nombre, descripción, fecha, hora, modo, jugadores máximos y premio
- Listar torneos disponibles
- Visualizar detalle de cada torneo

### 🎯 Participación

- Inscripción de usuarios a torneos
- Validación para evitar inscripciones duplicadas

### ⚔ Partidas

- Generación automática de partidas por pares
- Estado de cada match (`pending`, `in_progress`, `finished`)
- Control de jugadores "bye" (impares)

### 📊 Visualización

- Tablas de participantes (con ELO y puntos)
- Encuentros en progreso
- Contador para el inicio del torneo

---

## 🧪 Endpoints principales (API)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/register/` | Registro de usuario |
| `POST` | `/api/token/` | Login (token JWT) |
| `GET` | `/api/tournaments/` | Listar torneos |
| `POST` | `/api/tournaments/create/` | Crear nuevo torneo |
| `POST` | `/api/tournaments/<id>/register/` | Inscribirse a torneo |
| `GET` | `/api/tournaments/<id>/participants/` | Ver participantes |
| `POST` | `/api/tournaments/<id>/generate_matches/` | Generar partidas |
| `GET` | `/api/tournaments/<id>/matches/` | Ver partidas |
| `GET` | `/api/tournaments/<id>/full/` | Detalle completo del torneo |

---

## 🧰 Instalación

### Backend

```bash
git clone <repo>
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### Frontend

cd frontend
npm install
npm run dev
