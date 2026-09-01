# Guía de despliegue — Auditoría de Cifras PEN (para otras personas)

Objetivo: que tus colegas usen el complemento **sin instalar Node ni correr ningún
servidor**. Se hospedan los archivos una sola vez y se reparte por **carpeta compartida**.
Cada persona lo instala una vez con unos clics y le queda el botón en Word.

Resumen del flujo:
`Hospedar en Netlify (1 vez)` → `Generar manifiesto con la URL` → `Poner el manifiesto en una carpeta compartida` → `Cada persona agrega el catálogo (1 vez)`.

---

## Parte A — Hospedar los archivos en Netlify (una vez, lo haces tú)

1. Crea una cuenta gratuita en https://www.netlify.com (recomendado, para que la URL sea estable).
2. Entra a **https://app.netlify.com/drop**.
3. Arrastra a esa página la carpeta **`src`** del proyecto
   (`pen-auditoria-addin/src`). Netlify sube los archivos y te da una URL como
   `https://nombre-aleatorio.netlify.app`.
4. (Opcional) En *Site settings → Change site name* ponle un nombre claro, por ejemplo
   `auditoria-cifras-pen`, y la URL será `https://auditoria-cifras-pen.netlify.app`.
5. Comprueba que funciona abriendo en el navegador:
   `https://TU-SITIO.netlify.app/taskpane.html` (debe cargar el panel).

> Privacidad: en Netlify solo viven los archivos de la interfaz (HTML/JS/CSS). Los
> documentos que se auditan **nunca salen de la computadora** de cada usuario; el
> procesamiento es local dentro de Word.

---

## Parte B — Generar el manifiesto con tu URL

En la carpeta `deploy/`, abre PowerShell y ejecuta (pon tu URL real):

```
.\configurar-url.ps1 -Url "https://TU-SITIO.netlify.app"
```

Esto crea **`manifest-produccion.xml`** ya apuntando a tu sitio. Ese es el archivo que
repartirás (NO el `manifest.xml`, que es solo para tu desarrollo local con localhost).

---

## Parte C — Carpeta compartida (una vez, lo haces tú)

1. Crea una carpeta en un recurso de red accesible por tus colegas, por ejemplo
   `\\servidor\complementos\AuditoriaPEN` (o una carpeta compartida de OneDrive/SharePoint
   mapeada como unidad de red).
2. Copia ahí **`manifest-produccion.xml`**.
3. Dales permiso de **lectura** a las personas que lo usarán.

---

## Parte D — Cómo lo instala cada persona (una vez, ~2 minutos)

Cada colega, en su Word:

1. **Archivo → Opciones → Centro de confianza → Configuración del Centro de confianza…
   → Catálogos de complementos de confianza.**
2. En *Dirección URL del catálogo* pega la ruta de la carpeta compartida
   (`\\servidor\complementos\AuditoriaPEN`), pulsa **Agregar catálogo**, marca
   **Mostrar en el menú** y **Aceptar**.
3. Cierra y vuelve a abrir Word.
4. **Inicio → Complementos** (o *Insertar → Mis complementos*) → pestaña **CARPETA
   COMPARTIDA** → selecciona **Auditoría de Cifras PEN** → **Agregar**.

Listo: aparece el botón **Auditoría de cifras** y el panel funciona, sin consola.

---

## Actualizaciones futuras

Cuando mejores el complemento (por ejemplo, la tolerancia de redondeo), solo vuelves a
**arrastrar la carpeta `src` a Netlify** (o *Deploys → Drag and drop* en tu sitio). Los
usuarios reciben la versión nueva automáticamente al reabrir Word; **no reinstalan nada**.
Solo tendrías que repartir un manifiesto nuevo si cambias la URL o agregas botones.

---

## Nota institucional (cuando lo quieras "de verdad" en el PEN)

- **Servidor del CONARE en vez de Netlify:** hospeda el contenido de `src/` en un servidor
  HTTPS interno y vuelve a generar el manifiesto con esa URL (Parte B). Todo lo demás igual.
- **Despliegue centralizado:** si consigues un administrador de Microsoft 365, puede subir
  `manifest-produccion.xml` en *Centro de administración → Aplicaciones integradas* y
  asignarlo a grupos; entonces a la gente le **aparece solo**, sin la Parte D. Es el paso
  natural para un uso masivo y estable.
