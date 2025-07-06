#  Expenses API

API para gestionar gastos personales con autenticación JWT. Permite a los usuarios registrar, filtrar y visualizar sus gastos por categoría.

---

##  Tecnologías utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **PostgreSQL**
- **Sequelize (ORM)**
- **JWT (Autenticación)**

---

##  Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/miguelpg9/expenses-backend.git
cd expenses-backend
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expenses_db
DB_USER=postgres
DB_PASSWORD=tu_clave
JWT_SECRET=una_clave_segura
```

### 4. Crea la base de datos

Asegúrate de tener PostgreSQL corriendo y crea la base de datos con el esquema adjuntado a la documentación


### 5. Inicia el servidor

```bash
npm run dev
```

El servidor estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## Autenticación

Esta API usa JWT. Para acceder a los endpoints protegidos debes enviar el token en el header:

```
Authorization: Bearer TU_TOKEN
```

---

## Endpoints principales

| Método | Ruta               | Descripción                        |
|--------|--------------------|------------------------------------|
| POST   | /auth/register     | Crear un nuevo usuario             |
| POST   | /auth/login        | Iniciar sesión                     |
| GET    | /categories        | Listar categorías                  |
| POST   | /categories        | Crear nueva categoría              |
| PUT    | /categories/:id    | Editar una categoría               |
| DELETE | /categories/:id    | Eliminar una categoría             |
| GET    | /expenses          | Listar gastos con filtros          |
| POST   | /expenses          | Crear gasto                        |
| GET    | /expenses/:id      | Ver detalle de un gasto            |
| PUT    | /expenses/:id      | Editar gasto                       |
| DELETE | /expenses/:id      | Eliminar gasto                     |
| GET    | /summary           | Resumen de gastos por categoría    |

---

