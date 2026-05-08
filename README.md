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

> ⚠️ **Importante:** El servidor Express debe estar corriendo antes de usar el cliente. Sin el servidor, el login y todas las funciones que consumen la API no funcionarán.

---

## Estructura del proyecto

```
client/
├── src/
│   ├── pages/
│   │   ├── Login.jsx                 # Inicio de sesión
│   │   ├── DashboardEstudiante.jsx   # Panel principal del estudiante
│   │   ├── CrearTicket.jsx           # Formulario para crear ticket
│   │   ├── HistorialTickets.jsx      # Historial de tickets del estudiante
│   │   ├── DashboardAgente.jsx       # Panel principal del agente
│   │   └── TicketsAsignados.jsx      # Tickets abiertos asignados al agente
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

| Ruta | Componente | Rol requerido | Descripción |
|---|---|---|---|
| `/login` | `Login.jsx` | Ninguno | Inicio de sesión |
| `/estudiante/dashboard` | `DashboardEstudiante.jsx` | Estudiante | Panel principal del estudiante |
| `/estudiante/tickets` | `HistorialTickets.jsx` | Estudiante | Historial de todos sus tickets |
| `/estudiante/tickets/nuevo` | `CrearTicket.jsx` | Estudiante | Formulario para crear ticket |
| `/agente/dashboard` | `DashboardAgente.jsx` | Agente, Coordinador | Panel principal del agente |
| `/agente/tickets` | `TicketsAsignados.jsx` | Agente, Coordinador | Tickets abiertos asignados |

---

## Páginas implementadas

### Login
Formulario de inicio de sesión que consume `POST /api/auth/login`. Guarda el token JWT y los datos del usuario en `localStorage` y redirige según el rol:
- **Estudiante** → `/estudiante/dashboard`
- **Agente** → `/agente/dashboard`
- **Coordinador** → `/agente/dashboard`

### Dashboard Estudiante
Panel principal dividido en dos secciones:
- **Acciones rápidas** — botones para crear ticket, ver historial y preguntas frecuentes
- **Mi perfil** — nombre, carné, carrera y saldo del estudiante
- **Último ticket abierto** — tipo, fecha, descripción y estado del ticket más reciente

### Crear Ticket
Formulario para abrir una nueva solicitud de soporte:
- Selección de tipología ITIL: Incidente, Solicitud o Cambio
- Indicador visual de prioridad asignada automáticamente (Alta 4h / Media 24h / Baja 48h)
- Campo de descripción con contador de caracteres
- El agente se asigna automáticamente según la tipología al enviarse

### Historial de Tickets
Lista de todos los tickets del estudiante con:
- Filtros por estado: Todos, Abierto, En Proceso, Pendiente, Resuelto, Cerrado
- Contador de tickets según filtro activo
- Card por ticket con tipo, descripción (máx. 2 líneas), estado y fecha

### Dashboard Agente
Panel principal del agente dividido en dos secciones:
- **Acciones rápidas** — ver tickets asignados, historial, crear ticket. Los coordinadores ven además botones para crear estudiante y agente
- **Mi perfil** — nombre, correo, especialidad, sede y nivel de acceso. Badge especial para coordinadores
- **Ticket de mayor prioridad** — el ticket abierto asignado con mayor urgencia, con tipo, fecha, descripción, prioridad y estado

### Tickets Asignados
Lista de tickets abiertos asignados al agente con:
- Contador de tickets activos
- Card por ticket con prioridad (badge de color), tipo, descripción y fecha
- Botón "Ver detalle" por ticket (pendiente de implementar)

---

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Estudiante | `sergio@miumg.edu.gt` | `123456` |
| Agente (Incidente) | `agente@miumg.edu.gt` | `123456` |
| Agente (Solicitud) | `solicitudes@miumg.edu.gt` | `123456` |
| Agente (Cambio) | `cambios@miumg.edu.gt` | `123456` |
| Coordinador | `coordinador@miumg.edu.gt` | `123456` |

---

## ⚠️ Problemas comunes

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

**Failed to resolve import "./pages/NombrePagina"**
→ El archivo JSX no existe o tiene un error tipográfico en el nombre. Verifica que el nombre del archivo coincida exactamente con el import en `App.jsx`, incluyendo mayúsculas.