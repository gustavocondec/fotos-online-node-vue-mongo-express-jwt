# Como levantar el front
- Primero escribir su archivo ".env" configurando su variable de entorno donde apunte al backend local, por ejemplo (si es que el backend esta levantado en el puerto 4000)
```bash
VUE_APP_URL=http://localhost:4000
```
- Abrir la consola en esta carpeta, ejecutar el comando:
```bash
npm install
```
- Se instalara correctamente y dara ok, luego ejecutar 
```bash
npm run serve
```
- Si se levanto correctamente estara el front en http://localhost:8080 y podra ingresar desde su navegador