import { customerService } from "../../services/customerService";
import { useEffect, useState } from "react";


const EMPTY_FORM = {
    fullName: "",
    dni: "",
    phone: "",
    birthDate: "",
    registrationDate: "",
    active: true,
};

export function useCustomers(){
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const size = 10;
    const [sortConfig, setSortConfig] = useState({field: "fullName", direction: "asc"});
 
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            loadCustomers();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [page, searchTerm, sortConfig]);

    const loadCustomers = async () => {

        if (customers.length === 0){
            setLoading(true);
        }

        try{

            const data = await customerService.getAll(
                page, size,
                searchTerm,
                sortConfig.field,
                sortConfig.direction);

            if (data && data.content){
                setCustomers(data.content);
                setTotalPages(data.totalPages);
            }else{
                setCustomers(data ?? []);
                setTotalPages(0);
            }
            
        } catch (error){
            console.error("Error al cargar clientes:" ,error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(0);
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!form.fullName.trim() || !form.dni.trim()) {
            alert("El nombre y DNI son obligatorios.");
            return;
        }

        setIsSubmitting(true);

        try {
            if (editId){
               const updateRequest = {
                fullName: form.fullName, 
                dni: form.dni,
                phone: form.phone || null,
                active: form.active
               };

               await customerService.update(editId, updateRequest);
               alert ("¡Cliente actualizado con exito!");
            }else {
                await customerService.create(form);
                alert("¡Cliente registrado con exito!");
            }
            handleCancel();
            await loadCustomers();
        } catch (error) {
            console.error(error);
            alert(error.message || "Hubo un error al procesar la solicitud");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (customer) =>{
        setEditId(customer.id);
        setForm({
            fullName: customer.fullName,
            dni: customer.dni,
            phone: customer.phone || "",
            birthDate: customer.birthDate,
            registrationDate: customer.registrationDate,
            active: customer.active,
        });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estas seguro de que deseas eliminar el cliente?");
        if (!confirmDelete) return;

        try {
            await customerService.remove(id);
            alert("Cliente eliminado correctamente.");
            await loadCustomers();
        } catch (error) {
            console.error(error);
            alert(error.message || "Error al intentar eliminar el cliente.");
        }
        
    };

    const handleCancel = () => {
        setForm(EMPTY_FORM);
        setEditId(null);
    };

    const handleSortChange = (field, direction) => {
        setSortConfig({
             field: field.trim(),
             direction: direction.trim()
             });
        setPage(0);
    };

    return {
        customers,
        form, 
        editId,
        loading,
        isSubmitting,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleCancel,
        handleSearchChange,
        searchTerm,
        page,
        totalPages,
        setPage,
        sortConfig,
        handleSortChange
    };
    
}