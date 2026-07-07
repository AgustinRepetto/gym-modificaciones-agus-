const API_URL = 'http://localhost:8091/api';

async function requestLogin(email, password){
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password})
});
//si la respuesta no es ok, significa que hubo un error en la autenticación, por lo que se lanza una excepción con el mensaje de error recibido del servidor
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la autenticación');
    }
    const data = await response.json();
    return data;
}

// (Para Google)
async function requestGoogleLogin(code) {
    // Endpoint híbrido pasándole el parámetro en la URL
    const response = await fetch(`${API_URL}/v1/auth/google/callback?code=${code}`, {
        method: 'GET' 
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la autenticación con Google');
    }
    return await response.json(); 
}

export const loginService = {
    requestLogin,
    requestGoogleLogin 
};
