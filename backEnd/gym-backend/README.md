# 🏋️‍♂️ Gym Backend - Configuración de Seguridad

Este repositorio es actualmente **privado** para facilitar el desarrollo en equipo. 
Sin embargo, contiene credenciales en texto plano que deben ser protegidas antes de pasar a un entorno público o de producción.

## ⚠️ Nota de Seguridad Importante

En el archivo `application.properties`, los datos sensibles como las claves de Google OAuth2 y la firma de los tokens JWT se encuentran expuestos directamente.

* **El riesgo:** 
* Si este repositorio se vuelve público, bots automatizados (scrapers) pueden robar estas credenciales en segundos,
* comprometiendo la cuenta de Google Cloud o permitiendo la falsificación de accesos mediante JWT.
* **La solución en producción:** Se deben abstraer estas claves utilizando la sintaxis de variables de entorno de Spring Boot (`${VARIABLE}`).

## 🛠️ Variables Críticas a Proteger

Si decidís migrar el proyecto a una configuración segura con variables de entorno, estas son las llaves que se deben ocultar:

1. `GOOGLE_CLIENT_ID`: ID de cliente generado en Google Cloud Console para la autenticación.
2. `GOOGLE_CLIENT_SECRET`: Clave secreta del cliente de Google (la que bloquea GitHub automáticamente si se expone).
3. `JWT_SECRET`: La firma secreta utilizada por la aplicación para validar la autenticidad de los tokens de sesión.
4. `DB_PASSWORD`: Contraseña de tu instancia local de MySQL.

## 🚀 Cómo configurar las Variables de Entorno en IntelliJ

Para correr el proyecto localmente sin dejar las claves escritas en el código:
1. Ir a la barra superior de IntelliJ y seleccionar **Edit Configurations...** en el menú de ejecución.
2. En el campo **Environment variables**, hacer clic en el icono del documento e ingresar las claves con el formato: `KEY=valor` (separadas por punto y coma).