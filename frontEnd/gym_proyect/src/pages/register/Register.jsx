import { registerService } from "../../services/registerService";
import { loginService } from "../../services/loginService"; 
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { useState, useId } from "react";

export function Register() {
    
    const userRefId = useId();
    const emailRefId = useId();
    const passwordRefId = useId();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 

    async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        console.log("-> Iniciando registro para:", email);
        
        //Crear la cuenta en el backend
        const userCreated = await registerService.register({ username, email, password });
        console.log("¡1. Usuario creado con éxito!", userCreated);

        //Auto-Login silencioso
        console.log("->auto-login para:", email);
        const loginData = await loginService.requestLogin(email, password);
        console.log("¡2. Login exitoso:", loginData);
        
        //Guardar el token JWT
        if (loginData && loginData.token) {
            localStorage.setItem('token', loginData.token);
            window.location.href = "/profile";
        } else {
            console.warn("No se encontró propiedad '.token' en la respuesta del login. Redirigiendo a login manual.");
            window.location.href="/auth/login";
        }

    } catch (err) {
        setError(err.message || "Ocurrió un error inesperado.");
    } finally {
        setLoading(false);
    }
}
    return (
        <main className={styles.registerPage}>
            <section className={styles.registerCard}>
                <header className={styles.registerHeader}>
                    <h1>Crear una cuenta</h1>
                    <p>Introduce tus datos</p>
                </header>

                <form className={styles.registerForm} onSubmit={handleRegister}>
                    <fieldset disabled={loading}> {/* Deshabilita inputs si está cargando */}
                        <legend>Datos de registro</legend>

                        <label htmlFor={userRefId}>Nombre de usuario</label>
                        <input
                            id={userRefId}
                            className={styles.inputField}
                            type="text"
                            placeholder="User Name"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />

                        <label htmlFor={emailRefId}>Correo electrónico</label>
                        <input
                            id={emailRefId}
                            className={styles.inputField}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor={passwordRefId}>Contraseña</label>
                        <input
                            id={passwordRefId}
                            className={styles.inputField}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />

                        {error && <p className={styles.errorMessage}>{error}</p>}

                        <button className={styles.submitButton} type="submit">
                            {loading ? "Procesando..." : "Registrarme"}
                        </button>
                    </fieldset>
                </form>

                <p className={styles.minorText}>
                    ¿Ya tienes una cuenta? <Link to="/auth/login">Ingresar acá</Link>
                </p>
            </section>
        </main>
    );
}