package org.gym.config;


import lombok.RequiredArgsConstructor;
import org.gym.filter.jwt.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    //filtro proveniente de la carpeta filter
    private final JwtFilter jwtFilter;
    private final ClientRegistrationRepository clientRegistrationRepository;

    @Bean
//Bean define el componente principal que maneja el ciclo de seguridad
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception{
        http
                //política de CORS
                .cors( cors -> cors.configurationSource(corsConfigurationSource()))

                //desactiva CSRF, ya que se usa JWT y no sesiones en cookies, ahí el código cambia por completo
                .csrf( csrf -> csrf.disable())

                //Habilita inicio de sesión con provedores externos
                //vincula el resolver para aceptar prompt = login, o sea, email y password
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(authorization ->authorization
                                .authorizationRequestResolver(customAuthorizationRequestResolver())
                        )
                )

                //delega el control de auth a los tokens de JWT
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 3. Configura los permisos de las rutas. Por ahora, permitAll() deja todo el backend libre para pruebas
                .authorizeHttpRequests(
                        auth -> auth
                        .requestMatchers("/api/auth/**", "/api/v1/auth/**").permitAll() //endoints de auth publicos
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll() //registros publicos
                        .requestMatchers(HttpMethod.GET,"/api/news/active").permitAll() //noticias activas
                        .anyRequest().authenticated()
                )


                //Engancha nuestro filtro JWT antes del filtro de autenticación por defecto de Spring
                .addFilterBefore( jwtFilter, UsernamePasswordAuthenticationFilter.class);

        //Cierra, construye y retorna la cadena de filtros configurada
        return http.build();
    }

    //evita que se salte el login usando sesiones automáticas cacheadas
    private OAuth2AuthorizationRequestResolver
    customAuthorizationRequestResolver(){
        DefaultOAuth2AuthorizationRequestResolver resolver =
                new DefaultOAuth2AuthorizationRequestResolver(
                        clientRegistrationRepository,
                        "/oauth2/authorization");
        resolver.setAuthorizationRequestCustomizer(
                customizer -> customizer.additionalParameters(
                        params -> params.put("prompt", "login")));
       return resolver;
    }

    //// Configura el CORS para permitir que aplicaciones externas se conecten
    @Bean
    public CorsConfigurationSource corsConfigurationSource () {
        CorsConfiguration config = new CorsConfiguration();
        //les da permiso a las peticiones que vienen del puerto de VITE/REACT
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        //define cualquier método http desde el frontend
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        //permite cualquier tipo de headers
        config.setAllowedHeaders(List.of("*"));
        //permite el envío de credenciales
        config.setAllowCredentials(true);

        //Aplica todas las reglas anteriores específicamente a las rutas que empiecen con /api/
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    //Define el algoritmo de encriptación que usaremos para hashear las contraseñas en la base de datos
    @Bean
    public PasswordEncoder passwordEncoder(){
        // BCrypt aplica un hash seguro y aleatorio automáticamente
        return new BCryptPasswordEncoder();
    }
}
