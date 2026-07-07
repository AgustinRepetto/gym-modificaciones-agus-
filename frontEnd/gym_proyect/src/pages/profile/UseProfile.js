import { useState, useEffect } from "react";
import { userService } from "../../services/userService";

export function useProfile() {
    const [userData, setUserData] = useState(null); 
    const [loading, setLoading] = useState(true);   
    
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [showBanner, setShowBanner] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editUsername, setEditUsername] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            setLoading(false);
            return;
        }

        userService.getUserProfile(userId)
            .then(data => {
                setUserData(data);
                setEditUsername(data.username || "");
                setShowBanner(!data.hasPassword);
            })
            .catch(err => {
                console.error("Error al obtener perfil:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        
        const userId = userData?.id;
        const username = userData?.username;

        if (!userId) {
            alert("No se pudo obtener el identificador de tu usuario.");
            return;
        }

        if (!password || password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        setIsSubmitting(true);
        try {
            await userService.updatePassword(userId, username, password);
            alert("¡Contraseña configurada con éxito!");
            setPassword("");
            setShowForm(false);  
            setShowBanner(false); 
            setUserData(prev => ({ ...prev, hasPassword: true }));
        } catch (error) {
            console.error(error);
            alert(error.message || "Hubo un error al procesar la actualización.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteAccount = async () => {
        const userId = userData?.id;
        if (!userId) return;

        const confirmFirst = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")
        if(!confirmFirst) return;

        const confirmSecond = window.confirm("Se borrarán todos tus datos permanentemente")
        if (!confirmSecond) return;

        setIsDeleting(true);
        try{
            await userService.deleteAccount(userId);
            alert("Tu cuenta ha sido eliminada correctamente");

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            window.location.href = "/auth/login";
        } catch (error){
            console.error(error);
            alert(error.message || "Hubo un error al intentar eliminar tu cuenta")
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        
        if(e && typeof e.preventDefault === 'function'){
            e.preventDefault();
        }

        const userId = userData?.id;
        if(!userId) return;
        

        if(editUsername.length < 5 || editUsername.length > 20){
            alert("El nombre debe tener entre 5 y 20 caracteres.");
            return;
        }
        if(editPassword && editPassword.length < 8){
            alert("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        setIsUpdating(true);

        try{
            const updateData = await userService.updateProfile(userId, editUsername, editPassword || null);

            const freshUserData = updateData?.data || updateData;

            setUserData(freshUserData);
            setEditPassword("");
            setIsEditing(false);

            setTimeout(()=>{
                alert("¡Datos actualizados correctamente!");
            }, 50);

        } catch (error){
            console.error(error);
            alert(error.message || "Hubo un error al actualizar el perfil.");
        } finally {
            setIsUpdating(false);
        }
    }; 

    const handleCancelEdit = () => {
        setEditUsername(userData?.username || "");
        setEditPassword("");
        setIsEditing(false);
    };

    return {
        userData,
        loading,
        password,
        setPassword,
        isSubmitting,
        showBanner,
        setShowBanner,
        showForm,
        setShowForm,
        handleSave,
        isDeleting,
        handleDeleteAccount,
        isEditing,
        setIsEditing,
        editUsername,
        setEditUsername,
        editPassword,
        setEditPassword,
        isUpdating,
        handleUpdateProfile,
        handleCancelEdit
    };
} 