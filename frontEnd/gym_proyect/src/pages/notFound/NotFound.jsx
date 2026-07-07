import { Link } from 'react-router-dom';
import gokuImg from '../../assets/images/Goku.jfif'
import styles from './NotFound.module.css'
import { useEffect } from 'react';

export function NotFound(){

    useEffect(() => {
        const titulo = document.title;
        document.title = "Page Not Found";

        return () => {
            document.title = titulo;
        };
    }, []);

    return(

        <main className={styles.errorContainer}>

            <section className={styles.banner404}>
                <div className={styles.bannerContent}>
                <div className={styles.errorCode}>
                <h1>404</h1>
                <p>This is not the web page you are looking for</p>
                </div>
                <div className={styles.illustration}>
                    <img src={gokuImg}
                    alt='error illustration'></img>
                </div>
                </div>
            </section>

            <section className={styles.searchSession}>
                <p>Buscar</p>
            <div className={styles.linksFooter}>
                <Link to='/'>
                Volver al inicio</Link>

                <Link to='/auth/login'>
                Login</Link>
            </div>
            </section>
        </main>
        
    );
    
    
}