# Auditoría de Cifras PEN

Complemento de Microsoft Word del **Programa Estado de la Nación**. Sirve para verificar
las cifras de un informe contra sus documentos fuente y dejar registro de la revisión.

## Qué hace

1. **Fuentes.** Se cargan los documentos de respaldo arrastrando archivos o carpetas
   completas. Soporta `.docx`, `.pdf`, Excel, HTML y texto plano.
2. **Revisión.** Se indica la cifra a verificar (o se toma de la selección actual en Word)
   y el complemento la busca en todas las fuentes. Reconoce números escritos con palabras
   («dos millones»), porcentajes, proporciones, monedas y escalas, con tolerancia de
   redondeo y puntaje de contexto.
3. **Registro.** Cada cifra se marca con semáforo 🟢 🟡 🔴, se asigna revisor y se aplican
   los cuatro controles de calidad del Manual PEN.
4. **Salida.** Reporte en pantalla y exportación a Excel.

Incluye un visor que muestra la coincidencia resaltada dentro del PDF, Word o Excel
original, con navegación entre coincidencias.

El avance se conserva dentro del propio documento de Word, además de la copia local del
navegador, por lo que acompaña al `.docx` entre sesiones y computadoras. Al registrar una
cifra, el complemento también agrega un comentario nativo de Word con el resultado, la
fuente y la fecha de revisión.

> **Privacidad.** Los documentos que se auditan nunca salen de la computadora: el
> procesamiento ocurre dentro de Word. Lo que se hospeda es solo la interfaz.

## Estructura

| Ruta | Qué es |
|---|---|
| `src/taskpane.html` | La aplicación completa (HTML + CSS + JS, sin build) |
| `src/assets/` | Iconos del complemento |
| `manifest.xml` | Manifiesto de **desarrollo** (apunta a `https://localhost:3000`) |
| `deploy/manifest.prod.xml` | Plantilla del manifiesto de producción, con el marcador `__BASE_URL__` |
| `deploy/configurar-url.sh` / `.ps1` | Generan `manifest-produccion.xml` con la URL real |
| `deploy/GUIA-DESPLIEGUE.md` | Guía de distribución para el equipo |
| `devserver.js` | Servidor HTTPS local para desarrollo |
| `kit-instalacion-por-PC.zip` | Scripts para instalar el catálogo PC por PC (Windows) |

## Desarrollo local

```bash
npm install
npm start          # sirve src/ en https://localhost:3000
```

La primera vez pide autorización para instalar el certificado de desarrollo en el
llavero. Si se cancela, los certificados quedan generados en `~/.office-addin-dev-certs/`
y se puede reintentar con `npx office-addin-dev-certs install`.

Para probarlo dentro de Word, se carga `manifest.xml` (sideload).

La versión 19.1 requiere WordApi 1.4 para insertar comentarios nativos.

## Publicación

El repositorio no ejecuta GitHub Actions ni publica cambios automáticamente. Para una
entrega, se hospeda el contenido de `src/` en el servicio HTTPS elegido.

Para regenerar el manifiesto de producción:

```bash
./deploy/configurar-url.sh https://URL-DEL-SITIO
```

Ese `manifest-produccion.xml` es el archivo que se reparte a los usuarios; no se versiona
porque se regenera a partir de la plantilla. Detalles de distribución en
[`deploy/GUIA-DESPLIEGUE.md`](deploy/GUIA-DESPLIEGUE.md).

Mientras la URL no cambie, basta con volver a publicar el contenido de `src/`; los
usuarios reciben la actualización al reabrir Word. Solo hace falta repartir otro
manifiesto si cambia la URL o se agregan botones.
