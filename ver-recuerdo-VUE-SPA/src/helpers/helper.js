module.exports={
        //funcion que maneja las respuestas
        handleResponse(response) {
            console.log("respuesta desde back");
            console.log(response)
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        //logout();
                        localStorage.removeItem('user');
                        console.log("hubo un error,puede que no este autorizado, s edebe redireccionar al login")
                        //que vaya a login
                        //location.reload(true);
                    }
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                console.log("esta data sale si esta bien del hande")
                console.log(data);
                return data;
            });
            },
      
          //extrae la cabecera de autentificacion, en caso este guardado el token 
      authHeader() {
              // return authorization header with jwt token
              let user = JSON.parse(localStorage.getItem('user'));
      
              if (user && user.token) {
                  //si est aguardado
                  console.log(user.token);
                  return { 'Authorization': 'Bearer ' + user.token };
      
              } else {
                  //no esta guardado
                  return {};
              }
           }
}