import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // Link permite la navegación interna sin recargar la página
import styles from "./Home.module.css"
import { CustomCarousel } from '../../components/carousel/Carousel'
import { useNews } from '../news/useNews'
import { newsService } from '../../services/newsService'
import { CarouselNews } from '../../components/carouselNews/CarouselNews'

export function Home() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    setIsLogged(Boolean(localStorage.getItem('token')))
  }, [])

  const { news: activeNews, loading } = useNews(newsService, 10);

  const fotos = [
    "https://etenonfitness.com/wp-content/uploads/2023/05/diseno_gym_16-1.jpg",
    "https://www.ecler.com/_next/image/?url=https%3A%2F%2Fwww.datocms-assets.com%2F70814%2F1685000790-ecler_solutions_sports_wellness_snap_fitness_gyms_the_netherlands_4.jpg%3Fauto%3Dformat%26w%3D1920&w=3840&q=90",
    "https://cdns3.fitfit.fitness/es/media/items/350x215/4744-Majestic-Centro-Deportivo-7PcnX.jpg",
    "https://assets-cdn.wellhub.com/images/?su=https://images.partners.gympass.com/image/filename/5582573/lg__RSJ_R1bolguC7a7VZu3lvPa4PGFYdmC.jpg"
  ]; //SON IMAGENES ILUSTRATIVAS

  return (


    // main es el contenedor principal para la página de inicio
    <main className={styles.homePage}>
      {/* section contiene la tarjeta de bienvenida y el contenido del home */}
      <section className={styles.homeCard}>
        <header className={styles.homeHeader}>
          <p className={styles.homeBadge}>Bienvenido a "Gym"</p>
          <h1>Tu espacio para gestionar el gimnasio</h1>
          <p className={styles.homeDescription}>
            Aquí puedes iniciar sesión para acceder a tu cuenta de gimnasio profesor, consultar tus rutinas.
          </p>
        </header>

        <section className={styles.topProductsCarousel} aria-label="Carrusel de suplementos y accesorios">
          <div className={styles.topProductsHeader}>
            <p className={styles.sectionEyebrow}>Suplementos y accesorios</p>
            <h2>Descubrí lo mejor para entrenar con más energía</h2>
            <p className={styles.topProductsSubtitle}>Productos seleccionados para acompañar tus sesiones y mejorar tu rendimiento diario.</p>
          </div>
          <div className={styles.topProductsTrack}>
            {[
              {
                name: 'Proteína Whey',
                tag: 'Proteína',
                image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
                color: 'linear-gradient(135deg, #7f0d18 0%, #4b0811 100%)'
              },
              {
                name: 'Creatina',
                tag: 'Energía',
                image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
                color: 'linear-gradient(135deg, #7f0d18 0%, #4b0811 100%)'
              },
              {
                name: 'Pre-Entreno',
                tag: 'Rendimiento',
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
                color: 'linear-gradient(135deg, #7f0d18 0%, #4b0811 100%)'
              },
              {
                name: 'Botella de Aluminio',
                tag: 'Accesorio',
                image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
                color: 'linear-gradient(135deg, #7f0d18 0%, #4b0811 100%)'
              }
            ].map((item) => (
              <article key={item.name} className={styles.topProductCard} style={{ background: item.color }}>
                <img src={item.image} alt={item.name} className={styles.topProductImage} />
                <div className={styles.topProductContent}>
                  <span>{item.tag}</span>
                  <h3>{item.name}</h3>
                  <p>Calidad premium para potenciar tus sesiones.</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div>
          <CustomCarousel images={fotos} />
        </div>

        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <span>+500</span>
            <p>clientes activos</p>
          </div>
          <div className={styles.statCard}>
            <span>24/7</span>
            <p>acceso a instalaciones</p>
          </div>
          <div className={styles.statCard}>
            <span>4.9/5</span>
            <p>valoración de la comunidad</p>
          </div>
        </section>

        <section className={styles.highlightSection}>
          <div className={styles.highlightPanel}>
            <div className={styles.highlightText}>
              <h2>Entrena con una experiencia completa</h2>
              <p>
                Combina fuerza, movilidad y bienestar en un entorno pensado para que cada sesión sea motivadora y efectiva.
              </p>
              <ul>
                <li>Clases guiadas y programas adaptados a tus metas.</li>
                <li>Equipamiento moderno y áreas pensadas para cada tipo de entrenamiento.</li>
                <li>Seguimiento cercano para que avances con confianza.</li>
              </ul>
            </div>
            <aside className={styles.highlightCard}>
              <h3>Horario destacado</h3>
              <ul>
                <li>Lunes a viernes: 06:00 - 22:00</li>
                <li>Sábados: 08:00 - 14:00</li>
                <li>Domingos: recuperación y descanso</li>
              </ul>
              <div className={styles.pillGroup}>
                <span>Funcional</span>
                <span>Cardio</span>
                <span>Recuperación</span>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.announcementsSection}>
          <div className={styles.topProductsHeader}>
            <p className={styles.sectionEyebrow}>
              Noticias y comunicados</p>
              <h2>Enterate los ultimos avisos de el gym</h2>
          </div>
          {loading ? (
           <div className={styles.carouselEmpty}>
            Cargando Noticias...
           </div> 
          ) : ( 
            <CarouselNews items={activeNews}/>
          )}
        </section>

        <section className={styles.productsSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Productos destacados</p>
            <h2>Todo lo que necesitas para potenciar tu rutina</h2>
            <p className={styles.sectionText}>Una selección pensada para que cada entrenamiento se sienta más completo y eficaz.</p>
          </div>
          <div className={styles.productsGrid}>
            <article className={styles.productCard}>
              <div className={styles.productIcon}>🥤</div>
              <h3>Suplementos</h3>
              <p>Proteínas, pre-entreno y recuperación para acompañar tus entrenamientos.</p>
              <span>En stock</span>
            </article>
            <article className={styles.productCard}>
              <div className={styles.productIcon}>🎒</div>
              <h3>Accesorios</h3>
              <p>Botellas, toallas, guantes y demás essentials para tu día a día.</p>
              <span>Nuevo</span>
            </article>
            <article className={styles.productCard}>
              <div className={styles.productIcon}>🏋️</div>
              <h3>Plan de membresía</h3>
              <p>Accedé a beneficios exclusivos, clases y seguimiento personalizado.</p>
              <span>Mejor precio</span>
            </article>
          </div>
        </section>

        {/* Sección de descripción del gimnasio */}
        <section className={styles.gymDescription}>
          <header className={styles.descriptionHeader}>
            <h2>Sobre Nuestro Gimnasio</h2>
            <p>
              Bienvenido a <strong>Proyecto GYM</strong>, un sistema de gestión de gimnasios diseñado para entrenadores y clientes. Hecho por <strong>Alexandro</strong>, <strong>Mariana</strong> y <strong>Agustin</strong>. Nuestro objetivo es ofrecer una plataforma intuitiva y eficiente para la gestión de rutinas, seguimiento de progreso y administración de clientes.
            </p>
          </header>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>🏋️ Rutinas Personalizadas</h3>
              <p>Accede a rutinas diseñadas especialmente para tus objetivos fitness</p>
            </div>
            <div className={styles.feature}>
              <h3>👥 Gestión de Clientes</h3>
              <p>Administra tu cartera de clientes de forma eficiente</p>
            </div>
            <div className={styles.feature}>
              <h3>💪 Seguimiento de Progreso</h3>
              <p>Monitorea tu avance y logra tus metas</p>
            </div>
          </div>

          <div className={styles.locationSection}>
            <div className={styles.locationInfo}>
              <p className={styles.sectionEyebrow}>Nuestra ubicación</p>
              <h3>Estamos en un punto estratégico para que llegues fácil</h3>
              <p>Te esperamos en una zona accesible, con estacionamiento cercano y muy buena conexión para que tu visita sea cómoda desde el primer momento.</p>
              <ul>
                <li>Acceso rápido desde la avenida principal</li>
                <li>Ambiente moderno y cómodo</li>
                <li>Atención personalizada para nuevos miembros</li>
              </ul>
            </div>
            <div className={styles.mapWrapper}>
              <iframe
                title="Ubicación del gimnasio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13088.495915509864!2d-60.01438485!3d-34.9033381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bea55b0b969b9d%3A0xde3569486128da3b!2sHeladeria%20Asti!5e0!3m2!1ses-419!2sar!4v1782433224528!5m2!1ses-419!2sar"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </section>


        {/* El footer aquí muestra la acción principal para ir al login */}
        <footer className={styles.homeFooter}>
          <p>
            {isLogged
              ? 'Estás conectado. Puedes seguir navegando por tu cuenta.'
              : 'Accede sin cuenta a esta pantalla. Para avanzar al login, haz clic en el botón.'}
          </p>
          {!isLogged && (
            <Link className={styles.ctaButton} to="/auth/login">
              Ir a Login
            </Link>
          )}
        </footer>

        {/* Footer de la página */}
        <footer className={styles.pageFooter}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h4>Sobre Proyecto GYM</h4>
              <p>Tu plataforma de gestión integral de gimnasios</p>
            </div>
            <div className={styles.footerSection}>
              <h4>Enlaces</h4>
              <ul>
                <li><Link to="/home">Inicio</Link></li>
                <li><Link to="/auth/login">Login</Link></li>
                <li><Link to="/users">Registro</Link></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h4>Contacto</h4>
              <p>Email: alex_mariana_agus@gym.com</p>
              <p>Teléfono: +54 2346 123456</p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 Proyecto GYM. Todos los derechos reservados.</p>
          </div>
        </footer>
      </section>
    </main>
  )
}
