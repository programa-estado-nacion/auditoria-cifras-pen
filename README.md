# Auditoría de Cifras PEN

Complemento de Microsoft Word del Programa Estado de la Nación para contrastar cifras
con documentos fuente, registrar la revisión y exportar resultados. El avance se guarda
dentro del `.docx` y cada registro puede dejar un comentario nativo de Word.

Los documentos auditados se procesan localmente y no se envían al sitio publicado.

## Uso

- [Manifiesto público](https://programa-estado-nacion.github.io/auditoria-cifras-pen/manifest.xml)
- [Interfaz publicada](https://programa-estado-nacion.github.io/auditoria-cifras-pen/taskpane.html)
- Requisito: Microsoft Word con WordApi 1.4

GitHub Pages publica automáticamente la interfaz y el manifiesto con cada cambio en
`main`. La distribución al equipo se explica en
[`deploy/GUIA-DESPLIEGUE.md`](deploy/GUIA-DESPLIEGUE.md).

## Desarrollo

```bash
npm install
npm start
```

El servidor local usa `https://localhost:3000`; para probar el complemento se carga
`manifest.dev.xml` en Word. `manifest.xml` siempre apunta a producción. La aplicación
está en `src/taskpane.html` y no requiere build.
