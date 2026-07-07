import { newsService } from "../../services/newsService"
import { useNews } from "./useNews"
import styles from "./News.module.css"

export function News(){

    const {
        news, 
        loading, 
        error, 
        activeTab, 
        changeTab,
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
        } = useNews(newsService, 50);


    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return(
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div>
                    <p className={styles.sectionEye}>Panel</p>
                    <h2 className={styles.sectionTitle}>Gestionar Noticias</h2>
                    <button className={styles.createMainBtn}
                    onClick={showForm ? handleCancel : () => setShowForm(true)}>
                        {showForm ? "Cancelar" : "+ Nueva Noticia"}
                    </button>
                </div>
            </div>

            {showForm && (
                    <form 
                    onSubmit={handleSubmit}
                    className={styles.createForm}>
                        <h3>{editingNewsId ? `Editando noticia #${editingNewsId}` : "Crear Nueva Noticia" } </h3>
                        <div className={styles.formGroup}>
                            <label>Descripcion:</label>
                            <textarea 
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            required
                            />
                        </div>
                        <div className={styles.formGrid}>
                            <div 
                            className={styles.formGroup}>
                                <label>
                                    Fecha y hora de publicacion:
                                </label>
                                <input 
                                type="datetime-local"
                                value={publicationDate}
                                onChange={(e) => setPublicationDate(e.target.value)}/>
                                <small>Dejar vacio para publicar automaticamente</small>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Dias de duracion:</label>
                                <select value={daysToLive}
                                onChange={(e)=> setDaysToLive(e.target.value)}>
                                    <option value={1}>1 Dia</option>   
                                    <option value={7}>7 Dias</option>
                                    <option value={15}>15 Dias</option>
                                    <option value={30}>30 Dias</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit"
                         className={styles.submitBtn}>
                        {editingNewsId ? "Guardar cambios y publicar" : "Publicar Noticia"}
                        </button>
                    </form>
                )
            }
            <div className={styles.tabButtons}>
                <button 
                className={activeTab === "active" ? styles.activeBtn : styles.tabBtn}
                onClick={() => changeTab("active")}
                >
                    Activas
                </button>
                <button 
                className={activeTab === "scheduled" ? styles.activeBtn : styles.tabBtn}
                onClick={() => changeTab("scheduled")}
                >
                    Programadas
                </button>
                <button
                className={activeTab == "expired" ? styles.activeBtn : styles.tabBtn}
                onClick={()=> changeTab("expired")}
                >
                    Expiradas
                </button>
            </div>

            {loading ? (
                <div className={styles.skeletons}>
                    {[1, 2].map((i) => 
                    <div key={i} className={`${styles.skeleton} ${styles.skeletonTall}`}/>)}
                </div>
            ) : error ? (
            <p className={styles.empty}>Error al cargar listado</p>
            ) : news.length === 0 ? (
                <p className={styles.empty}>No hay Noticias disponibles</p>
            ) : (
                <div className={styles.newsGrid}>
                    {news.map((item) => (
                        <article key={item.id} className={styles.newsCard}>
                            <div className={styles.newsBody}>
                                <div className={styles.newsMeta}>
                                    <span>Creada: {formatDate(item.createdAt)}</span>

                                    {activeTab === "active" && item.expirationDate && (
                                        <span className={styles.newsDateExp}>Expira: {formatDate(item.expirationDate)}</span>
                                    )}
                                
                                    {activeTab === "scheduled" && item.publicationDate && (
                                        <span className={styles.newsDatePub}>Se publica: {formatDate(item.publicationDate)}</span>
                                    )}
                                    </div>

                                <h3 className={styles.newsTitle}>
                                    Noticia #{item.id}</h3>
                                    <p className={styles.newsText}>
                                        {item.description}
                                    </p>
                                    <div className={styles.actions}>
                                        {/* ACTIVAS */}
                                        {activeTab === "active" && (
                                           <>
                                           <button onClick={() => handleEditClick(item)} className={styles.editBtn}>Editar Noticia</button>
                                           <button onClick={() => handleAddDaysFast(item.id, item, 7)}>+7 Dias</button>
                                           <button onClick={() => handleAddDaysFast(item.id, item, 30)}>+30 dias</button>
                                           </> 
                                        )}
                                        {/* PROGRAMADAS */}
                                        {activeTab === "scheduled" && (
                                            <button 
                                            onClick={() => handleEditClick(item)}className={styles.editBtn}>
                                                Editar Publicacion
                                            </button>
                                        )}
                                        {/* EXPIRADAS */}
                                        {activeTab === "expired" && (
                                            <button className={styles.resubmitBtn}
                                            onClick={() => handleEditClick(item)}>
                                                Editar y Re-Subir
                                            </button>
                                        )}

                                        <button onClick={() => handleDeleteNews(item.id)} className={styles.deleteBtn}>Borrar</button>
                                    </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

        </section>
    )
}