const API_URL = 'http://localhost:8091/api';

// Función auxiliar interna para no repetir los headers con el token
function getHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

async function getAllUsers(page = 0, size = 100) {
    const response = await fetch(`${API_URL}/users?page=${page}&size=${size}`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }
    return await response.json();
}

async function getUserProfile(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener el perfil del servidor");
    }
    return await response.json();
}

async function updatePassword(userId, username, password) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el usuario');
    }

    return await response.json();
}

async function updateUserRole(userId, role) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ role })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el rol');
    }

    return await response.json();
}

async function deleteAccount(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`,{
        method: "DELETE",
        headers: getHeaders()
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar la cuenta");
    }
    return response.status !== 204 ? await response.json() : null;
}

async function updateProfile(userId, username, password){
    const response = await fetch (`${API_URL}/users/${userId}`,{
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({username, password})
    });
    if (!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar los datos');
    } 
    return await response.json();
}

export const userService = {
    getAllUsers,
    getUserProfile,
    updatePassword,
    updateUserRole,
    deleteAccount,
    updateProfile
};