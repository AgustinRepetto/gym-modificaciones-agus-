const API_URL = 'http://localhost:8091/api';

function getHeaders() {
    const token = localStorage.getItem("token");
    return{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

async function getAll(page = 0, size = 10, search = "", sortBy = "fullName", direction = "asc" ) {

    const params = new URLSearchParams({
        page: page,
        size: size,
        sort: `${sortBy},${direction}`
    });

    if (search && search.trim() !== ""){
        params.append("search", search.trim());
    }

    const response = await fetch(`${API_URL}/customers?${params.toString()}`,{
        method: "GET",
        headers: getHeaders()
    });
    if(!response.ok) throw new Error("Error al obtener los clientes");
    return await response.json();
}

async function create(customerData) {
    const response = await fetch(`${API_URL}/customers`,{
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(customerData)
    });
    if(!response.ok) throw new Error ("Error al crear el cliente");
    return await response.json();
}

async function update(id, customerData) {
    const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(customerData)
    });
    if (!response.ok) throw new Error("Error al actualizar el cliente");
    return await response.json();
}

async function remove(id) {
    const response = await fetch(`${API_URL}/customers/${id}`,{
        method: "DELETE",
        headers: getHeaders()
    });
    if(!response.ok) throw new Error("Error al eliminar el cliente");
    return response.status !==204 ? await response.json() : null;
}

export const customerService = {
    getAll,
    create,
    update,
    remove
};