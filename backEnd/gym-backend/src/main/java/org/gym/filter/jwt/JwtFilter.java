package org.gym.filter.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.gym.service.jwt.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws
            ServletException, IOException {

        if("OPTIONS".equalsIgnoreCase(request.getMethod())){
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
            return;
        }

        String path = request.getRequestURI();
        String method = request.getMethod();

        //rutas públicas exceptuadas
        if (path.startsWith("/api/auth")
                || path.startsWith("/api/v1/auth")
                || (path.equals("/api/users") && method.equals("POST"))
                || (path.equals("/api/news/active") && method.equals("GET"))
        ) {
            filterChain.doFilter(request, response);
            return;
        }
        //extraer el encabezado de autorización
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token nulo o formato invalido");
            return;
        }

        String token = authHeader.substring(7);

        if (!jwtService.isValid(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("El token ha expirado");
            return;
        }
        String username = jwtService.extractEmail(token);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                 username, null, Collections.emptyList()
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }


        filterChain.doFilter(request, response);
    }
}
