# interview-ionic-senior

Marketplace App
El ejercicio consta de varios puntos en los cuales se evaluará, patrones de diseño, conocimiento en git-flow, angular, ionic y scss.

Se debe crear una aplicación de ionic utilizando la última versión estable que hay en el mercado (Ionic 5). 
1. La app debe tener un módulo de login, registro y cambio de contraseña usando Firebase.
  - El registro debe tener los siguientes campos requeridos, nombre, apellido, genero, teléfono, contraseña y confirmación de contraseña. (Se tendrá en cuenta como bonus validaciones)
  - El login debe realizarse usando correo y contraseña (Bonus: login usando número telefónico y verificación de numero)
3. Una vez el usuario se pueda loguear o pueda acceder a usando sus credenciales registradas en firebase, se debe redirigir al usuario a la página principal home, si el usuario no está logeado no debe ver la página de home con el listado de productos.
4. La página del home debe listar los productos asociados y registrados por el usuario.
5. La página home debe mostrar un botón flotante que permita añadir nuevos productos a su cuenta en base de datos (Firebase), es decir, debe mostrar un modal que le permita al usuario ingresar los siguientes campos (librerías y validaciones en los inputs se contaran como bonus):
  - Nombre producto (input, requerido, máximo de 300 caracteres)
  - Precio (input numérico, requerido, min 0 - máximo 245.000 y con mask de dinero)
  - Cantidad en stock (input numérico, requerido, máximo de 30)
  - descripción (Textarea, opcional, máximo de 300 caracteres)

Una vez finalizado el registro debe regresar a la página de home y mostrar el nuevo producto añadido al listado de productos.

5. Cada ítem del listado de producto debe dar la posibilidad de actualizar el producto y a su vez, poderlo eliminar de la base de datos y del listado de productos.
6. Cada vez que se cree o se elimine un producto se debe mostrar en la parte superior contadores con su respectivo valor.
7. La aplicación debe mostrar un menú lateral izquierdo en el cual muestre el nombre del usuario que se registró/logueo y un botón que le permita cerrar sesión y regresar a la página de login.


Ejercicios bonus:
(código) La app debe permitir actualizar el título de la pantalla de home de "Home" a "Inicio Soy Quipu" usando el servicio de Firebase Remote Config
(bug) loguearse con distintos usuarios en la misma ventana del browser genera conflictos de usuarios, para no permitir ver información de otro usuario.
(Estilos) La app debe tener una apariencia limpia usando patrones de UI/UX.
(Pruebas unitarias) Las 3 páginas (registro, login, home) a diseñar deben tener cada una, mínimo 3 pruebas diseñadas y funcionales.

Entregable:
-Se debe subir el código usando los principios y buenas técnicas de git a este repositorio público.
-Se debe poder generar un apk y enviarlo al siguiente correo acordoba@quipumarket.com con el siguiente título, [Prueba técnica] <nombre_completo> - Desarrollador Fullstack Quipu Market
- Tiempo máximo de entrega 1 día, a partir del momento que se envía la prueba.


Nota: si la base de datos firebase te genera problemas de permisos, conectarla a una propia vacía.

Para instalar, en el directorio principal correr:

npm i -f
npm start
