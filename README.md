# Sistema de Soporte UMG — Cliente

Interfaz de usuario del sistema de gestión de tickets de soporte para estudiantes y catedráticos de la Universidad Mariano Gálvez. Construida con React y Vite.

---

## Equipo

| Nombre | Carné |
|---|---|
| Sergio Alejandro Gomar Barrios | 9989-23-11043 |
| Claudia Azucena de León Noriega | 9989-22-14431 |
| Angie Dayana Jacinto Soyos | 9989-23-9752 |
| Fabiola Sarahí Hipólito Muralles | 9989-23-11491 |

---

## Tecnologías

- **Framework:** React 18
- **Bundler:** Vite
- **Routing:** React Router DOM
- **HTTP:** Axios
- **Lenguaje:** JavaScript (JSX)

---

## Requisitos previos

- [Node.js 18+](https://nodejs.org/)
- El servidor Express corriendo en `http://localhost:3000`
- Git

---

## Guía de instalación

### 1. Clonar el repositorio y navegar al cliente

```bash
git clone https://github.com/serigio04/umg-proyecto-soporte.git
cd umg-proyecto-soporte/client
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Correr el cliente

```bash
npm run dev
```

El cliente estará disponible en `http://localhost:5173`.

> **Importante:** El servidor Express debe estar corriendo antes de usar el cliente. Sin el servidor, el login y todas las funciones que consumen la API no funcionarán.

---

## Estructura del proyecto

```
client/
├── src/
│   ├── pages/                        # Vistas principales
│   │   ├── Login.jsx                 # Pantalla de inicio de sesión
│   │   └── DashboardEstudiante.jsx   # Dashboard del estudiante
│   ├── components/                   # Componentes reutilizables
│   ├── services/
│   │   └── api.js                    # Configuración de Axios + token JWT
│   ├── context/                      # Contextos de React (estado global)
│   ├── App.jsx                       # Rutas principales
│   └── main.jsx                      # Punto de entrada
├── index.html
└── package.json
```

---

## Rutas disponibles

| Ruta | Componente | Descripción | Auth |
|---|---|---|---|
| `/login` | `Login.jsx` | Inicio de sesión | No |
| `/estudiante/dashboard` | `DashboardEstudiante.jsx` | Panel del estudiante | Estudiante |

---

## Páginas implementadas

### Login
Formulario de inicio de sesión que consume el endpoint `POST /api/auth/login`. Al autenticarse correctamente guarda el token JWT y los datos del usuario en `localStorage` y redirige según el rol:
- **Estudiante** → `/estudiante/dashboard`

### Dashboard Estudiante
Panel principal dividido en dos secciones:
- **Acciones rápidas** — botones para crear ticket, ver historial y preguntas frecuentes
- **Mi perfil** — datos del estudiante con botón de editar
- **Último ticket abierto** — resumen del ticket más reciente con estado y prioridad

---

## Problemas comunes

**Pantalla en blanco al abrir el navegador**
→ Verifica que Vite esté corriendo con `npm run dev` y abre `http://localhost:5173`.

**Error de red al hacer login (Network Error)**
→ El servidor Express no está corriendo. Navega a la carpeta `server/` y corre `npm run dev`.

**CORS bloqueado en el navegador**
→ Verifica que en el servidor `index.js` el origen permitido sea `http://localhost:5173` exactamente, sin barra al final.

**Token expirado — redirige al login inesperadamente**
→ El token JWT dura 8 horas. Cierra sesión y vuelve a entrar. Si el problema persiste, limpia el `localStorage` desde las DevTools del navegador (`Application → Local Storage → Clear All`).

**Los datos del dashboard no cargan**
→ Abre las DevTools del navegador (`F12 → Console`) y revisa si hay errores de red. Verifica que el servidor esté corriendo y que el token en `localStorage` sea válido.
