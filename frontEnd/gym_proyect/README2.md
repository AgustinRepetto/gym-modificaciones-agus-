# ⚛️ Gym Frontend - Configuración de Seguridad

Módulo del cliente desarrollado en React. Al igual que el backend, este sector maneja configuraciones del cliente de Google que deben ser aisladas del código fuente.

## ⚠️ Nota de Seguridad Importante

Tener constantes de configuración con el `clientId` de Google hardcodeado en los componentes o servicios expone la infraestructura del proyecto de manera innecesaria. Aunque el código del frontend es visible para el navegador del usuario final, las definiciones no deben quedar grabadas en el historial de Git de un repositorio público.

* **La solución estándar:** Utilizar un archivo local `.env` que interactúe con el empaquetador (Vite / Create React App) y agregar dicho archivo al `.gitignore`.

