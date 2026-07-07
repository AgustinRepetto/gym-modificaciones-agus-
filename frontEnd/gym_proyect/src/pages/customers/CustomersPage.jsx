import { useCustomers } from "./useCustomers";
import styles from "./Customers.module.css"; 

export function CustomersPage() {
    const {
        customers,
        form,
        editId,
        loading,
        isSubmitting,
        searchTerm,
        page,
        totalPages,
        setPage,
        handleSearchChange,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleCancel,
        handleSortChange
    } = useCustomers();

    if (loading) {
        return <div className={styles.loading}>Cargando listado de clientes...</div>;
    }

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Gestión de Clientes</h2>

            {/* ── FORMULARIO DE REGISTRO / EDICIÓN ───────────────── */}
            <div className={styles.formCard}>
                <h2 className={styles.formTitle}>
                    {editId ? "Editar Datos del Cliente" : "Registrar Nuevo Cliente"}
                </h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>

                        <div className={styles.field}>
                            <label>Nombre Completo:</label>
                            <input 
                                type="text"
                                name="fullName" 
                                value={form.fullName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className={styles.field}>
                            <label>DNI / Documento:</label>
                            <input 
                                type="text"
                                name="dni" 
                                value={form.dni} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Teléfono (Opcional):</label>
                            <input 
                                type="text"
                                name="phone" 
                                value={form.phone} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Fecha de Nacimiento:</label>
                            <input 
                                type="date" 
                                name="birthDate" 
                                value={form.birthDate} 
                                onChange={handleChange} 
                                required 
                                disabled={!!editId}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Fecha de Inscripción:</label>
                            <input 
                                type="date" 
                                name="registrationDate" 
                                value={form.registrationDate} 
                                onChange={handleChange} 
                                required 
                                disabled={!!editId}
                            />
                        </div>

                    </div>

                    <label className={styles.checkLabel}>
                        <input 
                            type="checkbox" 
                            name="active" 
                            checked={form.active} 
                            onChange={handleChange} 
                        />
                        Cliente Activo
                    </label>

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.btnSave} disabled={isSubmitting}>
                            {isSubmitting ? "Guardando..." : (editId ? "Guardar Cambios" : "Registrar Cliente")}
                        </button>
                        {editId && (
                            <button type="button" className={styles.btnCancel} onClick={handleCancel}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* ── BUSCADOR Y FILTROS */}
            <div className={styles.filtersContainer}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Buscar cliente"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <select 
            onChange={(e) => {
                const [field, direction] = e.target.value.split(",");
                handleSortChange(field, direction);
            }}>
                <option value = "fullName,asc">Nombre (A - Z)</option>
                <option value = "fullName,desc">Nombre (Z - A)</option>
                <option value = "registrationDate,desc">Mas recientes primero</option>                        
                <option value = "registrationDate,asc">Mas antiguos primero</option>                
            </select>
            </div>

            {/* ── TABLA DE DATOS DE CLIENTES ─────────────────────────────── */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>DNI</th>
                            <th>Teléfono</th>
                            <th>Inscripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', color: '#aaa' }}>
                                    No hay clientes registrados de momento.
                                </td>
                            </tr>
                        ) : (
                            customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.fullName}</td>
                                    <td>{customer.dni}</td>
                                    <td>{customer.phone || "-"}</td>
                                    <td>{customer.registrationDate}</td>
                                    <td>
                                        <span className={customer.active ? styles.active : styles.inactive}>
                                            {customer.active ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <button onClick={() => handleEdit(customer)} className={styles.btnEdit}>
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(customer.id)} className={styles.btnDelete}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/*PAGINACION*/}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    
                    {/* IZQUIERDO */}
                    <button 
                        disabled={page === 0}
                        onClick={() => setPage(prev => prev - 1)}
                        style={{
                            padding: '6px 12px', 
                            cursor: page === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        &lt; {/*menor que*/}
                    </button>
                    
                    {/* NUMEROS */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index)}
                            style={{
                                padding: '6px 12px',
                                cursor: 'pointer',
                                backgroundColor: page === index ? '#007bff' : '#f8f9fa',
                                color: page === index ? '#fff' : '#000',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontWeight: page === index ? 'bold' : 'normal'
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* DERECHO */}
                    <button 
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(prev => prev + 1)}
                        style={{
                            padding: '6px 12px',
                            cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        &gt; {/*mayor que*/}
                    </button>
                </div>
            )}
        </div>
    );
}

//cosas a mejorar, registrationDate y birthDate aceptan datos irreales. O posteriores a la fecha.
