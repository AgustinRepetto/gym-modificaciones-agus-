import { useProfes } from './useProfes'
import styles from './ProfesPage.module.css'

export function ProfesPage() {
  const { users, isLoading, error, handleRoleChange } = useProfes()

  if (isLoading) {
    return (
      <main className={styles.profesPage}>
        <section className={styles.profesCard}>
          <p>Cargando profesores...</p>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className={styles.profesPage}>
        <section className={styles.profesCard}>
          <p className={styles.error}>Error: {error}</p>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.profesPage}>
      <section className={styles.profesCard}>
        <header className={styles.profesHeader}>
          <p className={styles.profesBadge}>Profesores</p>
          <h1>Gestión de Profesores</h1>
          <p className={styles.profesDescription}>
            Aquí puedes ver y administrar los roles de los profesores del gimnasio.
          </p>
        </header>

        <div className={styles.tableContainer}>
          {users.length === 0 ? (
            <p className={styles.noData}>No hay profesores registrados</p>
          ) : (
            <table className={styles.profesTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre de usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`${styles.roleBadge} ${styles[user.role?.toLowerCase()]}`}>
                        {user.role || 'PROFESOR'}
                      </span>
                    </td>
                    <td>
                      <select
                        className={styles.roleSelect}
                        value={user.role || 'PROFESOR'}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <option value="PROFESOR">Profesor</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  )
}
