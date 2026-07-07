import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useNews(newsService, limit=50){
    //NewsService completo
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState("");
    const [editingNewsId, setEditingNewsId] = useState(null);
    const [publicationDate, setPublicationDate] = useState("");
    const [daysToLive, setDaysToLive] = useState(7);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "active";
    
    const changeTab = (tabName) => {
        setSearchParams({tab: tabName});
    };
    
    const refresh = () => setRefreshKey(prev => prev + 1);
    
    useEffect(() => {
        //decide que usar, por defecto 'active'
        const getServiceMethod = () => {
            if (activeTab === "scheduled") return newsService.getScheduled;
            if (activeTab === "expired") return newsService.getExpired;
            return newsService.getPublic;
        }
        
        const method = getServiceMethod();
        if (!method) return;

        async function fetchNews() {
            try{
                setLoading(true);
                const data = await method(limit);
                setNews(data);
                setError(null)
            } catch (err){
                console.error("Error cargando noticias en hook", err);
                setError(err.message || "Error al cargar las noticias");
            } finally {
                setLoading(false);
            }          
        }
        fetchNews();

    }, [activeTab, limit, refreshKey, newsService]
);

const handleAddDays = async (id, item, days) => {
        try{
            await newsService.update(id, {
                description: item.description,
                daysToLive: days,
                publicationDate: item.publicationDate
            });
            refresh();
        } catch (err) {
            console.error("Error al extender dias:", err);
        }
    };

    const handleResubmit = async (id, item) => {
        try{
            const now = new Date().toISOString();
            await newsService.update(id, {
                description: item.description,
                publicationDate: now,
                daysToLive: 7
            });
            refresh();
        } catch (err) {
            console.error("Error al re-subir:", err)
        }
    };

    const handleEditClick = (item) => {
        setEditingNewsId(item.id);
        setDescription(item.description);

        if (item.publicationDate){
            const date = new Date(item.publicationDate);

            const localISO = date.toISOString().slice(0, 16);
            setPublicationDate(localISO);
        } else {
        setPublicationDate("");
    }
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth'});
};

const handleCancel = () => {
    setShowForm(false);
    setEditingNewsId(null);
    setDescription("");
    setPublicationDate("");
    setDaysToLive(7);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = {
            description,
            daysToLive: parseInt(daysToLive),
            publicationDate: publicationDate ? new Date(publicationDate).toISOString() : null
        };

        if(editingNewsId){
            //si hay id entra por put controller
            await newsService.update(editingNewsId, payload);
        } else{
            //si no, post
            await newsService.create(payload);
        }
        handleCancel();
        refresh();
    } catch (err){
        console.error ("Error en la operacion de noticias", err);
    }
};

const handleAddDaysFast = async (id, item, days) => {
    try {
        await newsService.update(id, {
            description: item.description,
            daysToLive: days,
            publicationDate: item.publicationDate
        });
        refresh();
    } catch(err){
        console.error("Error al extender dias:", err);
    }
};

const handleDeleteNews = async (id) =>{
    const confirmation = window.confirm(`¿Estas seguro de que queres elminar la noticia #${id}?`);

    if (!confirmation) return;4

    try{
        setLoading(true);
        await newsService.remove(id);
        refresh();
    } catch (err){
        console.error("Error al eliminar la noticia", err);
        setError(err.message || "No se pudo eliminar la noticia");
    } finally {
        setLoading(false);
    }
};
    return {
        news,
        loading, 
        error, 
        activeTab,
        changeTab,
        refresh,
        handleAddDays,
        handleResubmit,
        handleAddDaysFast,
        handleEditClick, 
        handleCancel,
        handleSubmit,
        showForm,
        setShowForm,
        description,
        setDescription,
        publicationDate,
        setPublicationDate,
        daysToLive,
        setDaysToLive,
        editingNewsId, 
        handleDeleteNews
    };
}
