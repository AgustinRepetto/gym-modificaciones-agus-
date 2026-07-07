import { Link } from "react-router-dom";
import styles from "./nav-bar.module.css"

export function NavBar() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const profileImage = localStorage.getItem('profileImage');
    const isAdmin = role === 'ADMIN';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        window.location.href = '/auth/login';
    };

    return (
        <nav className={styles.navBar}>
            <div className={styles.left}>
                {token ? (
                    <p onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</p>
                ) : (
                    null
                )}
            </div>

            <div className={styles.right}>
                {token ? (
                    <>
                        <Link to="/home">Home</Link>
                        
                        {/* Solo mostrar si es ADMIN */}
                        {isAdmin && (
                            <>
                                <Link to="/news">Noticias</Link> 
                                <Link to="/profesores">Profes</Link>
                                <Link to="/customers">Clientes</Link>
                            </>
                        )}
                        
                        <Link to="/profile">Perfil</Link>
                        <Link to="/profile" className={styles.profileImageLink}>
                            {profileImage ? (
                                <img src={profileImage} alt="Perfil" className={styles.userImage} />
                            ) : (
                                <span className={styles.userImage}></span>
                            )}
                        </Link>
                        
                    </>
                ) : (
                    <>
                        <Link to="/home">Home</Link>
                        <Link to="/auth/login">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
}