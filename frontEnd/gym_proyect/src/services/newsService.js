const API_URL = "http://localhost:8091/api"

function getHeaders () {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    };
}

async function getPublic(limit = 10){
    const response = await fetch(`${API_URL}/news/active?limit=${limit}`);
    if (!response.ok) throw new Error ("Error al obtener novedades activas");
    return await response.json();
}

async function getScheduled(limit = 10) {
    const response = await fetch(`${API_URL}/news/scheduled?limit=${limit}`,{
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error ("Error al obtener noticias programadas");
    return await response.json();
}

async function getExpired(limit = 10) {
   const response = await fetch (`${API_URL}/news/expired?limit=${limit}`, {
    headers: getHeaders(),
   });
    if (!response.ok) throw new Error ("Error al obtener noticias expiradas");
    return await response.json();
}

async function create(data) {
    const response = await fetch(`${API_URL}/news`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear noticia");
    return await response.json();    
}

async function update(id, data) {   
    const response = await fetch(`${API_URL}/news/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear noticia");
    return await response.json();    
}

async function remove(id) {
    const response = await fetch(`${API_URL}/news/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar noticia");
}

export const newsService = {
    getPublic,
    getScheduled,
    getExpired,
    create,
    update,
    remove
}
