# 🟢 Online YouTube Album con Vue3 - Composition API

Esta aplicación es un álbum online de videos de YouTube construido con Vue 3, utilizando Google Cloud y Composition API.

Permite a los usuarios pegar enlaces de videos de YouTube y ver una colección de videos guardados. La aplicación muestra miniaturas de los videos, junto con información adicional, y ofrece funcionalidades para reproducir en YouTube y eliminar videos.

![Home-page-app](https://i.postimg.cc/VNrbcZv1/home-online-yt-app.png)

![add-new-video](https://i.postimg.cc/BQpF51RW/add-Video-online-yt-app.png)

![description-video](https://i.postimg.cc/MpGQ9p8n/description-Video-online-yt-app.png)

## 🎬 Puedes ver la aplicación desplegada [aquí](https://filmfinder-page.vercel.app/)

---

## 🚨Prerrequisitos

Antes de comenzar, asegúrese de tener instalado lo siguiente en su computadora:

- Node.js (versión 12 o posterior): https://nodejs.org

---

## 🏁 Instalación Local

Para empezar con la aplicación, sigue estos pasos:

1. Clona el repositorio en tu máquina local utilizando el siguiente comando:

```bash
git clone git@github.com:johnazt/OnlineYouTubeAlbum.git
```

2. En el directorio del proyecto instala las dependencias utilizando el siguiente comando:

```bash
npm install
```

3. Copia el archivo `.env.example`, cambia el nombre del archivo a `.env` e ingresa los datos necesarios.

4. Agrega las siguientes variables de entorno en el archivo:

```bash
VITE_API_KEY_YT=<tu API key de YT Google cloud>
# Estos datos se obtiene de firebaseConfig al crear tu proyecto en firebase
VITE_API_KEY_FIREBASE=<tu SDK de Firebase>
```

5. Reemplaza `<tu API key de YT Google Cloud>` con tu API key real obtenida de Google Cloud. No compartas esta API key en público.

- Crea tu cuenta y obtén la API key de YT [aquí](https://console.cloud.google.com)

6. Luego inicia la aplicación ingresando en la terminal:

```bash
npm run dev
```

7. Abre tu navegador web y navega a `http://localhost:5173` para utilizar la aplicación de Vue3.

## 📌Funcionalidades

- Pega y guarda tus enlaces de videos favoritos de YouTube en el álbum.
- Muestra miniaturas e información de los videos agregados.
- Redirige a YouTube para reproducir los videos.
- Elimina videos del álbum.

## ⭐️Tecnologías Utilizadas

- Vue 3 con Composition API
- API de YouTube en Google Cloud
- Firebase
- VueFire

## Créditos

Esta aplicación fue desarrollada por [John Asto](https://github.com/johnazt).

## Contacto

Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto conmigo en [john.azt.dev@gmail.com](mailto:tu-correo@ejemplo.com).

---

## Portafolio 💻

Puedes ver algunos de mis otros proyectos [aquí](https://johnasto.netlify.app/).
