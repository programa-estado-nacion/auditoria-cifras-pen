# Guía de despliegue — Auditoría de Cifras PEN (para otras personas)

Objetivo: que tus colegas usen el complemento **sin instalar Node ni correr ningún
servidor**. Se hospedan los archivos una sola vez y se reparte por **carpeta compartida**.
Cada persona lo instala una vez con unos clics y le queda el botón en Word.

Resumen del flujo:
`Hospedar en Netlify (1 vez)` → `Generar manifiesto con la URL` → `Poner el manifiesto en una carpeta compartida` → `Cada persona agrega el catálogo (1 vez)`.

---

## Parte A — Hospedar los archivos (ya está hecho)

La interfaz del complemento se publica sola en **GitHub Pages** desde el repositorio
`programa-estado-nacion/auditoria-cifras-pen`. La URL es:

```
https://programa-estado-nacion.github.io/auditoria-cifras-pen/
```

Cada vez que se sube un cambio a la rama `main`, GitHub vuelve a publicar el contenido de
`src/` automáticamente. No hay que arrastrar carpetas ni hacer nada manual.

Se puede comprobar abriendo en el navegador
`https://programa-estado-nacion.github.io/auditoria-cifras-pen/taskpane.html` (debe cargar el panel).

> Privacidad: en GitHub Pages solo viven los archivos de la interfaz (HTML/JS/CSS). Los
> documentos que se auditan **nunca salen de la computadora** de cada usuario; el
> procesamiento es local dentro de Word.

---

## Parte B — Generar el manifiesto con tu URL

Ya hay uno generado y verificado en `deploy/manifest-produccion.xml`. Solo hace falta
regenerarlo si cambia la URL de hospedaje.

En Windows, desde la carpeta `deploy/` en PowerShell:

```
.\configurar-url.ps1 -Url "https://programa-estado-nacion.github.io/auditoria-cifras-pen"
```

En macOS o Linux:

```
./deploy/configurar-url.sh https://programa-estado-nacion.github.io/auditoria-cifras-pen
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

Cuando mejores el complemento (por ejemplo, la tolerancia de redondeo), edita los
archivos de `src/` y sube el cambio:

```
git add -A && git commit -m "descripción del cambio" && git push
```

GitHub publica la versión nueva en un par de minutos. Los usuarios la reciben
automáticamente al reabrir Word; **no reinstalan nada**. Solo tendrías que repartir un
manifiesto nuevo si cambias la URL o agregas botones.

Como todo queda en el repositorio, siempre se puede ver qué cambió y volver a una versión
anterior.

---

## Nota institucional (cuando lo quieras "de verdad" en el PEN)

- **Dominio propio del PEN:** si se quiere una URL como `auditoria.estadonacion.or.cr`,
  se configura como dominio personalizado en GitHub Pages (un registro CNAME) y se
  regenera el manifiesto con esa URL (Parte B). Todo lo demás igual.
- **Servidor del CONARE en vez de GitHub Pages:** hospeda el contenido de `src/` en un
  servidor HTTPS interno con certificado válido y vuelve a generar el manifiesto con esa
  URL. Ojo: el certificado debe ser de una autoridad en la que Word confíe.
- **Despliegue centralizado:** si consigues un administrador de Microsoft 365, puede subir
  `manifest-produccion.xml` en *Centro de administración → Aplicaciones integradas* y
  asignarlo a grupos; entonces a la gente le **aparece solo**, sin la Parte D. Es el paso
  natural para un uso masivo y estable.
