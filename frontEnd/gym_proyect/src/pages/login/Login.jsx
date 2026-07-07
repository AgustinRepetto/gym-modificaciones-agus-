import { Link } from 'react-router-dom' 
import { useId } from 'react' 
import { useAuthLogin, GOOGLE_AUTH_URL } from '../login/useLogin'
import styles from "./Login.module.css"
import googleIcon from '../../assets/icons/web_dark_sq_ctn@1x.png'

export function Login() {
  const emailId = useId()
  const passwordId = useId()

  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
    handleMouseMove
  } = useAuthLogin()

  // Pantalla de carga condicional
  if (isLoading) {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <h2>Procesando inicio de sesión...</h2>
          <p>Por favor, espera un momento.</p>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <header className={styles.loginHeader}>
          <h1>Acceso al Gym</h1>
          <p>Introduce tus datos para continuar</p>
        </header>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Iniciar sesión</legend>

            <label htmlFor={emailId}>Correo electrónico</label>
            <input
              id={emailId}
              className={styles.inputField}
              name="email"
              type="email"
              placeholder="ejemplo@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor={passwordId}>Contraseña</label>
            <input
              id={passwordId}
              className={styles.inputField}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className={styles.passwordRow}>
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <button className={styles.submitButton} type="submit">
              Entrar
            </button>
          </fieldset>
        </form>

        <p className={styles.minorText}>
          ¿No tienes cuenta? <Link to="/users">Regístrate acá</Link>
        </p>

        <div className={styles.oauthSeparator}></div>

        <div className={styles.googleBtnContainer}>
          <a 
          href={GOOGLE_AUTH_URL} 
          className={styles.googleImageLink}
          onMouseMove={handleMouseMove}>
            <img 
              src={googleIcon} 
              alt="Iniciar sesión con Google" 
              className={styles.googleFullImage}
            />
          </a>
        </div>

        <p className={styles.minorText}>
          ¿Quieres regresar al home? <Link to="/home">Volver al inicio</Link>
        </p>
      </section>
    </main>
  )
}