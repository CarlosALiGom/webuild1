# WeBuild Solutions — Landing Page Reorganizada

Este repositorio contiene el código de la landing page corporativa de **WeBuild Solutions** (Local Event Build & Operations Partner en España). 

El proyecto ha sido optimizado para la producción, separando el HTML de los estilos y la interactividad, añadiendo validaciones avanzadas en el formulario, y dejándolo completamente listo para un despliegue gratuito en **Netlify** con **Netlify Forms**.

---

## 📂 Estructura del Proyecto

La estructura final organizada del proyecto es la siguiente:

```
WeBuild/
├── index.html            # Estructura HTML semántica, SEO, Open Graph y a11y.
├── css/
│   └── style.css         # Estilos (CSS Vanilla), variables y microanimaciones de hover.
├── js/
│   └── main.js           # Lógica interactiva, validación del formulario y AJAX para Netlify.
├── assets/
│   ├── images/           # Carpeta para colocar las imágenes y logos del sitio.
│   └── favicons/         # Iconos de favicon para navegadores y dispositivos móviles.
├── netlify.toml          # Cabeceras de seguridad y caché para Netlify.
├── .gitignore            # Archivos excluidos del control de versiones.
└── README.md             # Guía técnica de desarrollo y producción (este archivo).
```

---

## 💻 Desarrollo Local

Para ejecutar el proyecto en tu máquina local y ver los cambios en tiempo real, puedes utilizar cualquiera de las siguientes alternativas sencillas (no requiere instalar dependencias complejas):

### Opción A: Servidor HTTP con Python (Recomendado si ya tienes Python)
Abre la consola en el directorio del proyecto y ejecuta:
```bash
python -m http.server 8000
```
Luego, accede en tu navegador a: `http://localhost:8000/`

### Opción B: Servidor HTTP con Node.js (Si usas npm)
Si tienes Node.js instalado, puedes usar un servidor de desarrollo rápido sin instalarlo de forma permanente:
```bash
npx http-server -p 8000
# o alternativamente con live-reload para recarga automática:
npx live-server
```

*Nota: Cuando ejecutas el proyecto de forma local, el formulario de contacto simulará un envío con éxito tras 1.5 segundos en lugar de fallar, facilitando las pruebas de interfaz.*

---

## 🛠️ Personalización

### 1. Modificar Textos
Todos los textos principales están definidos semánticamente en el archivo [index.html](file:///c:/Users/zazap/Escritorio/WeBuild/index.html). Puedes editar directamente los encabezados (`<h1>`, `<h2>`), párrafos (`<p>`) y las listas (`<ul>`) usando cualquier editor de código (como VS Code).

### 2. Cambiar Imágenes
- **Logo principal:** Reemplaza el archivo `WebuildLOGO.png` en el directorio raíz o muévelo a la carpeta `/assets/images/` y actualiza la ruta del atributo `src` de la etiqueta `<img>` en `index.html` (líneas 49 y 368).
- **Fotografías generales:** Las fotos del Hero y del Photo Strip se cargan desde URLs de Unsplash de alta resolución. Si deseas cambiarlas, simplemente sustituye los atributos `src` por tus propias URLs o guarda tus archivos de imagen en la carpeta `assets/images/` y enlázalos localmente: `<img src="assets/images/tu-imagen.jpg" ... />`.

---

## 🚀 Despliegue en Netlify (Gratuito)

La forma más rápida y profesional de desplegar esta web es a través de **Netlify**, que ofrece hosting gratuito e ilimitado para sitios estáticos e integra la recolección de formularios.

### Paso 1: Subir el proyecto a GitHub
1. Crea un repositorio vacío en tu cuenta de GitHub.
2. Abre la consola en el directorio de este proyecto e inicializa el repositorio:
   ```bash
   git init
   git add .
   git commit -m "feat: reorganizacion y optimizacion del sitio"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

### Paso 2: Conectar con Netlify
1. Inicia sesión en [Netlify](https://www.netlify.com/).
2. Haz clic en **Add new site** > **Import an existing project**.
3. Selecciona **GitHub** y autoriza el acceso a tu cuenta.
4. Elige el repositorio que acabas de subir.
5. Deja los campos por defecto (Build command vacío, Publish directory como `.`).
6. Haz clic en **Deploy site**. ¡Tu sitio estará en línea en pocos segundos!

---

## 📧 Configuración del Formulario (Netlify Forms)

El formulario de esta web está configurado para ser interceptado automáticamente por Netlify mediante los atributos `data-netlify="true"` y `netlify-honeypot="bot-field"`.

Para configurar a qué email deseas recibir los mensajes:

1. Ve al panel de control de tu sitio en Netlify.
2. Selecciona **Site configuration** (Configuración del sitio) en el menú lateral.
3. Ve a la sección **Forms** (Formularios) > **Form notifications** (Notificaciones de formularios).
4. Haz clic en **Add notification** > **Email notification**.
5. Rellena los campos:
   - **Event to listen to:** New form submission (Nueva entrega de formulario).
   - **Email to notify:** Introduce el correo electrónico donde el propietario de la empresa quiere recibir las consultas (ej. `carlosgliz.work@gmail.com`).
   - **Form name:** Selecciona `contact` (que es el nombre asignado en el HTML).
6. Guarda la configuración. ¡A partir de ese momento, cada envío que se realice a través de la web llegará de inmediato a tu buzón de correo!

---

## 🛡️ Características Incorporadas

- **Anti-Spam (Honeypot):** Se incluye un campo oculto `bot-field`. Los bots automatizados lo rellenarán al escanear la página, lo que permite que el cliente descarte el envío de forma silenciosa e impida recibir spam en el correo.
- **Validaciones en Cliente:** Si algún campo obligatorio está vacío o el formato de email es incorrecto, el campo se marca visualmente en rojo y se indica el error de forma accesible, evitando envíos incompletos.
- **Interactividad Dinámica:** El botón cambia de estado e indica un spinner de carga (`Sending...`) mientras se realiza el envío mediante AJAX, impidiendo clics repetidos. El éxito o fallo se notifica mediante un mensaje inline sin recargar la página.
