# Guía Oficial para Traductores de WeekBox

¡Hola! Si estás leyendo esto, significa que quieres ayudarnos a traducir WeekBox a tu idioma natal o a un nuevo idioma. ¡Muchísimas gracias por tu contribución!

Esta guía te enseñará paso a paso cómo clonar el proyecto, instalar las herramientas necesarias, ejecutar la página web en tu propia computadora, y probar tus traducciones en tiempo real.

---

## 1. Requisitos Previos

Antes de empezar a traducir, necesitas instalar un par de herramientas en tu PC si aún no las tienes:

1. **Git**: Lo usamos para descargar (clonar) el código fuente. [Descárgalo aquí](https://git-scm.com/downloads).
2. **Node.js**: Es el motor que hace funcionar la página web. [Descárgalo aquí](https://nodejs.org/en/download/) (descarga la versión LTS).
3. **Un Editor de Código**: Te recomendamos [Visual Studio Code (VSCode)](https://code.visualstudio.com/) ya que es el mejor para editar archivos `.json`.

---

## 2. Clonar el Proyecto y Prepararlo

Abre tu terminal (Símbolo del sistema, PowerShell o la terminal integrada de VSCode) y sigue estos pasos:

1. **Clona el repositorio** en tu computadora:
   ```bash
   git clone https://github.com/Crew-Awesome/Weekbox.git
   ```

2. **Entra a la carpeta** del proyecto web:
   ```bash
   cd weekbox.site
   ```

3. **Instala las dependencias y librerías** necesarias para que el sitio funcione:
   ```bash
   npm install
   ```
   *(Este paso puede tardar un par de minutos dependiendo de tu conexión a internet).*

---

## 3. Ejecutar la Página Web Localmente

Una vez que todo se instaló correctamente, es hora de encender el servidor local para ver la página:

```bash
npm run dev
```

Te aparecerá un mensaje en la terminal diciendo que el servidor está corriendo en `http://localhost:3000`. 
Abre tu navegador de internet (Chrome, Firefox, Opera GX) y entra a ese enlace. ¡Deberías ver la página de WeekBox funcionando en tu propia PC!

---

## 4. ¿Cómo Traducir?

El sistema de idiomas ya está preconfigurado para varios idiomas (Inglés, Español, Francés, Chino, Turco, Italiano, Portugués, Alemán, Indonesio). 

Todos los textos de la página viven dentro de la carpeta:
`public/locales/`

### Pasos para traducir:

1. Ve a la carpeta `public/locales/` y entra a la carpeta del idioma que quieres traducir. Por ejemplo, `fr` para Francés, `pt` para Portugués.
2. Abre el archivo `translation.json`.
3. Verás que todos los textos actualmente están en **Inglés** (porque usamos el inglés como plantilla base).
4. Tu trabajo es cambiar **solamente el texto que está a la derecha de los dos puntos**, manteniendo las comillas.

**Ejemplo Original:**
```json
"downloadNow": "Download Now"
```

**Tu Traducción (Ej. Francés):**
```json
"downloadNow": "Télécharger Maintenant"
```

> **¡IMPORTANTE!** No cambies ni traduzcas las palabras de la izquierda (como `downloadNow` o `browseTitle`), ya que esas son las "llaves" que usa el código para encontrar tu texto.

### Probando tu Traducción

Lo mejor de todo esto es que **no necesitas reiniciar el servidor**. 
Conforme vayas guardando tus cambios en el archivo `translation.json` (presionando `Ctrl + S`), simplemente ve a tu navegador (`http://localhost:3000`), usa el menú de idiomas para seleccionar tu idioma, ¡y verás tus textos cambiar en tiempo real!

---

## 5. La Palabra "PLAY!" Mágica de Colores

Al final de la página principal hay un texto que dice "Nothing else to see, let's PLAY!". La palabra "PLAY" tiene los colores de las flechas de FNF.
En tu archivo `translation.json` encontrarás:
```json
"finalCta": "Nothing else to see, let's ",
"finalCtaWord": "PLAY"
```
Asegúrate de traducir el `finalCtaWord` como una sola palabra en mayúsculas (por ejemplo, "JUGAR" en Español, "JOUER" en Francés). El código se encargará automáticamente de pintar cada letra de esa palabra de un color diferente sin importar cuántas letras tenga. ¡Mágico!

---

## 6. Enviar tus Cambios

Una vez que hayas terminado tu traducción, puedes subir tus cambios a GitHub haciendo un *Pull Request* o enviándole el archivo `translation.json` directamente a los administradores del proyecto de Crew-Awesome.

¡Gracias por ayudar a que WeekBox llegue a todo el mundo!
