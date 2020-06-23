# Como levantar su backend
- Primero debe configurar sus variables de entorno .env . Debe apuntar a su BD mongo local o en la nube.
    - IMPORTANTE!!!!
        - Este proyecto usa Cloudinary como repositorio de archivos y fotos , debe de crearse su cuenta (Es gratis) para generar sus credenciales y poder subir los archivos. Luego de crearse su cuenta tendra sus credenciales y debera configurarlo con las variables de entorno. Si lo usa sin las variables de Cloudinary no podra ver ni subir fotos
    KEY_SECRET es la semilla para firmar los tokens
    PORT es el puerto donde se ejecutara el servidor
    MONGODB_URI es la ruta de la bd
    ```bash
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_CLOUD_NAME=
    KEY_SECRET=tukeysecret
    MONGODB_URI=<tu_ruta_DE_BD>
    PORT:4000
    ```
- Una vez listos las la variables de entorno podra ejecutar el servidor con el comando en la consola abierta en la carpeta raiz del Back:
    ```bash
    npm run dev
    ```
- Aparecera un mensaje que se levanto en le puerto 4000 y que se conecto con la bd correctamente. Entonces el front ya puede consumir los servicios del back