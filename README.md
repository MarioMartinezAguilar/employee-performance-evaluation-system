#  Sistema Web para la Evaluación del Desempeño Laboral

Sistema full stack desarrollado con React, Django REST Framework y SQLite para la gestión y análisis de evaluaciones de desempeño laboral, incorporando autenticación JWT, dashboard administrativo, reportes PDF y exportación de datos a Excel.

## Descripción Del Proyecto

El Sistema Web para la Evaluación del Desempeño Laboral es una aplicación desarrollada para facilitar la recopilación, gestión y análisis de información relacionada con el desempeño de los empleados dentro de una organización.

La plataforma permite registrar empleados, aplicar evaluaciones de desempeño y almacenar las respuestas de manera segura en una base de datos centralizada. A través de un panel administrativo, los usuarios autorizados pueden consultar métricas, estadísticas y gráficos generados a partir de los resultados obtenidos, facilitando el análisis del rendimiento laboral y la toma de decisiones.

El sistema incorpora funcionalidades para la generación de reportes en formato PDF y la exportación de información a archivos Excel, permitiendo un mejor seguimiento de las evaluaciones realizadas. Asimismo, cuenta con un sistema de autenticación basado en JSON Web Tokens (JWT), garantizando que únicamente los usuarios autorizados puedan acceder al panel administrativo y a la información del sistema.

Este proyecto fue desarrollado utilizando una arquitectura cliente-servidor, empleando React para el frontend y Django REST Framework para el backend, con el objetivo de ofrecer una solución moderna, segura y fácil de utilizar para la gestión de evaluaciones de desempeño laboral.

## Características Del Proyecto

- Registro y gestión de empleados.
- Aplicación de evaluaciones de desempeño laboral.
- Validación de formularios en tiempo real.
- Almacenamiento seguro de la información en base de datos.
- Dashboard administrativo para consulta de resultados.
- Visualización de estadísticas mediante gráficas interactivas.
- Generación de reportes en formato PDF.
- Exportación de información a archivos Excel.
- Sistema de autenticación basado en JWT.
- Protección de rutas para usuarios autenticados.
- Cierre de sesión seguro.
- Diseño responsivo para diferentes dispositivos.
- Experiencia de usuario(Spinner,modales,efectos,animaciones,barra de progreso,notificaciones,etc)

## Tecnologías utilizadas para el desarrollo del proyecto

### Frontend
- React
- React Router DOM
- Axios
- React Hook Form
- Recharts
- React Hot Toast
- Tailwind CSS
- Lucide React

### Backend
- Django
- Django REST Framework
- Simple JWT
- Django-cors-headers
- Drf-spectacular

### Base de datos y Lenguajes de programación
- SQLite
- JavaScript
- Python

### Herramientas y librerías adicionales
- OpenPyXL (Exportación a Excel)
- ReportLab (Generación de PDF)
- jsPDF (Generación de documentos PDF)
- Matplotlib (Generación de gráficas)
- Git
- GitHub

### Entorno de desarrollo
- Node.js(v20.11.1)
- npm(v10.2.4)
- Python(v3.14.4)

## Arquitectura del sistema

El sistema fue desarrollado siguiendo una arquitectura cliente-servidor, donde el frontend consume los servicios expuestos por una API REST desarrollada en Django REST Framework.
```text

    ┌────────────────┐
    │      React     │
    │    Frontend    │
    └───────┬────────┘
            │
            │ Axios
            ▼
    ┌────────────────┐
    │ Django REST API│
    │ JWT Auth       │
    │ Dashboard      │
    │ Reportes       │
    └───────┬────────┘
            │
            ▼
    ┌─────────────────┐
    │     SQLite      │
    │   Base de Datos │
    └─────────────────┘
```
## Proyecto Web Funcionando

### Inicio de sesión
**Vista previa de el inicio de sesión de la parte del dashboard administrativo**

![Login](capturas/login.png)

### Registro de empleados
**Formulario de registro para los empleados que participan en la evaluación**

![Registro de empleados](capturas/formulario.png)
![Registro de empleados](capturas/formulario2.png)

### Evaluación de desempeño laboral
**Encuesta para evaluar el desempeño laboral**

![Encuesta](capturas/encuesta.png)
![Encuesta](capturas/encuesta2.png)
![Encuesta](capturas/encuesta3.png)

### Página de agradecimiento
**Página de agradecimiento cuando el usuario termina de contestar la encuesta utilizando el efecto glass**

![Página de agradecimiento](capturas/gracias.png)

### Interactividad con el usuario
**Mejorando la experiencia del usuario utilizando spinner los botones de la encuesta**

![Spinner](capturas/spinner.png)

**Experiencia de usuario con una barra de progreso**

![Barra-Progreso](capturas/barra-progreso.png)

**Diseño agradable de la encuesta para el usuario**

![encuesta](capturas/radio.png)

**Spinner en la encuesta cuando se están mandando las respuestas al backend**

![encuesta](capturas/radio-spinner.png)

**Efecto de cristal esmerilado(glassmorphism) cuando el empleado desea cancelar se aplica una ventana modal con este efecto**

![cristal-esmerilado](capturas/glassmorphism.png)

**Manejo de notificaciones cuando el usuario inicia sesión correctamente, el empleado se registra o cuando se cierra sesión correctamente**

![exitoso](capturas/notif-session-exitoso.png)
![empleado-registrado](capturas/notif-empleado.png)
![empleado-registrado](capturas/notif-session.png)

### Dashboard administrativo y análisis
**El dashboard administrativo cuenta con tres secciones principales:**

**sección 1 se encuentra el dashboard principal donde contiene toda la información de la encuesta**

![Dashboard](capturas/dashboard.png)

**sección 2 es donde se encuentra las estadísticas de los empleados por sexo**

![Dashboard](capturas/dashboard2.png)

**sección 3 hace referencia a los reportes en formato PDF o Excel**

![Dashboard](capturas/dashboard3.png)

### API REST - Empleados
**Aquí se muestra el endpoint de la API donde están los empleados registrados**

![API-empleados](capturas/rest-empleados.png)

### Preguntas de la encuesta que se encuentran en el backend para realizar la evaluación

![preguntas](capturas/preguntas.png)

### API REST - Estadísticas
**Aquí se muestran los resultados de toda la encuesta en la parte del backend**

![result](capturas/results.png)

### Autenticación JWT
**Vista previa de nuestro Json Web Token generado en Django REST Framework**

![token](capturas/token.png)

### Reportes PDF
**Reportes generados tanto como en el backend como en el frontend**

![reportes](capturas/pdf.png)
![reportes](capturas/pdf2.png)

**Gráficos en formato PDF de los resultados de la evaluación de desempeño laboral**

![reportes](capturas/pdf3.png)

**Resumen de los resultados en el PDF**

![reportes](capturas/pdf-resumen.png)

### Exportación de datos a Excel
**Registro de empleados que participaron en la evaluación en formato Excel**

![Excel](capturas/excel.png)

### Base de Datos
**Se puede ver la persistencia de datos en la base de datos SQLite con la tabla de empleados registrado**

![sqlite](capturas/empleados-sqlite.png)

**Por otro lado se muestra en la base de datos como esta estructurada las opciones de respuesta de cada pregunta de la evaluación**

![sqlite](capturas/opciones.png)

### Documentación de la API (Swagger)
La API REST se encuentra documentada mediante Swagger/OpenAPI utilizando **drf-spectacular**, permitiendo visualizar y probar los endpoints principales del sistema de forma interactiva.

### Endpoints documentados

* Gestión de empleados.
* Gestión de preguntas.
* Gestión de respuestas.
* Autenticación JWT.
* Renovación de tokens (Refresh Token).

### Acceso a la documentación
```text
    /api/docs/
```

### Tecnologías utilizadas para la documentación de la API

* Django REST Framework
* drf-spectacular
* Swagger UI
* OpenAPI 3.0

**Nota:** Las vistas auxiliares utilizadas por el dashboard administrativo para estadísticas, generación de reportes y exportación de archivos se implementaron mediante vistas tradicionales de Django y no forman parte de la documentación OpenAPI.

Documentación interactiva generada automáticamente mediante drf-spectacular y OpenAPI 3.0.

![Swagger](capturas/swagger.png)

## Instalación para hacer uso de la aplicación

### Clonar el repositorio
```bash
    git clone https://github.com/MarioMartinezAguilar/employee-performance-evaluation-system
```
```bash
    cd employee-performance-evaluation-system
```
### Configuración del Backend
Crear y activar un entorno virtual:
```bash
    python -m venv venv
```
Windows:
```bash
    venv\Scripts\activate
```
Linux / macOS:

```bash
    source venv/bin/activate
```
Instalar las dependencias:
```bash
    pip install -r requirements.txt
```
Aplicar las migraciones:
```bash
    python manage.py migrate
```
Iniciar el servidor de desarrollo:
```bash
    python manage.py runserver
```
### Configuración del Frontend
Acceder a la carpeta del frontend:
```bash
    cd front-end_react
```
Instalar las dependencias:
```bash
    npm install
```
Iniciar el servidor de desarrollo:
```bash
    npm run dev
```
Una vez iniciados ambos servidores, la aplicación estará disponible en el navegador mediante la URL proporcionada por Vite.

## Configuración
### Base de datos
El proyecto utiliza SQLite como sistema de base de datos por defecto. Al ejecutar las migraciones, Django generará automáticamente el archivo de base de datos necesario para el funcionamiento de la aplicación.
```bash
    python manage.py migrate
```
### Creación de un superusuario
Para acceder al panel de administración de Django, es necesario crear un superusuario:
```bash
    python manage.py createsuperuser
```
Seguir las instrucciones proporcionadas por la terminal para definir el nombre de usuario, correo electrónico y contraseña.

### Configuración de autenticación
La aplicación utiliza JSON Web Tokens (JWT) para la autenticación de usuarios. Los usuarios deben existir previamente en el sistema para poder iniciar sesión y obtener los tokens de acceso correspondientes.

### Configuración de dependencias
Verificar que todas las dependencias del backend y frontend hayan sido instaladas correctamente mediante los archivos:
```text
    requirements.txt
    package.json
```
### Configuración de la aplicación
Una vez iniciados el servidor de Django y el servidor de desarrollo de React, la aplicación estará lista para utilizarse.

### Uso del sistema
1. Iniciar sesión mediante las credenciales de un usuario registrado en el sistema.
2. Acceder al panel de administración de la aplicación.
3. Registro de empleados mediante el formulario correspondiente.
4. Se aplica la evaluación de desempeño laboral a los empleados registrados.
5. Completar el cuestionario de evaluación y enviar las respuestas.
6. Consultar los resultados obtenidos desde el dashboard administrativo.
7. Visualizar estadísticas y gráficas generadas a partir de las evaluaciones realizadas.
8. Generar reportes en formato PDF para el análisis de resultados.
9. Exportar la información a archivos Excel para su almacenamiento o procesamiento adicional.
10. Cerrar sesión de forma segura mediante la funcionalidad de logout.

## Estructura del proyecto

```text
    django-encuesta/
    │
    ├── django_api/              # Configuración principal de Django
    ├── encuesta/                # Aplicación backend y API REST
    ├── front-end_react/         # Aplicación frontend desarrollada con React
    │
    ├── capturas/                # Imágenes utilizadas en el README
    ├── requirements.txt         # Dependencias del backend
    ├── README.md                # Documentación del proyecto
    ├── .gitignore               # Archivos ignorados por Git
    └── db.sqlite3               # Base de datos SQLite (desarrollo)
```
## Funcionalidades futuras
* Implementar Refresh Tokens para mejorar la gestión de sesiones.
* Incorporar recuperación de contraseña.
* Agregar roles y permisos para diferentes tipos de usuarios.
* Implementar filtros avanzados en los reportes.
* Incorporar más métricas y visualizaciones estadísticas.
* Migrar la base de datos a PostgreSQL para entornos de producción.
* Implementar despliegue en la nube.
* Añadir pruebas automatizadas para frontend y backend.

# Autor
Mario Martínez Aguilar

Desarrollador Web Full Stack enfocado en la creación de aplicaciones web modernas, integrando frontend, backend, bases de datos, APIs REST y herramientas de análisis y visualización de datos.

- GitHub: [MarioMartínezAguilar](https://github.com/MarioMartinezAguilar)


























