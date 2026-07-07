package org.gym.service.auth;

import java.util.Optional;

import org.gym.dto.response.auth.GoogleUserDto;
import org.gym.dto.response.auth.LoginResponse;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.gym.service.jwt.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Service

public class GoogleAuthService {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.redirect.uri}")
    private String redirectUri;

    private final JpaUserRepository jpaUserRepository;
    private final JwtService jwtService;

    public GoogleAuthService(
            JpaUserRepository jpaUserRepository,
            JwtService jwtService
                             ){
        this.jpaUserRepository = jpaUserRepository;
        this.jwtService = jwtService;
    }

    public GoogleUserDto verifyCodeGoogle(String code) throws Exception {
        //NetHttpTransport viaja hasta los servidores de Google
        NetHttpTransport transport = new NetHttpTransport();
        //GsonFactory traduce el formato JSON que google responde
        GsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        //mandamos los campos seteados en '.properties', junto a code que es el que envia en frontEnd
        // y '.execute()' viaja a la a Url, si todo esta bien devuelve  un GoogleTokenResponse
        GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                transport, jsonFactory,
                "https://oauth2.googleapis.com/token",
                clientId, clientSecret,
                code, redirectUri).execute();

        //aca viene el JWT firmado por google
        //parseIdToken lo extrae y getPayload abre el cuerpo y te da acceso a los datos
        GoogleIdToken idToken = tokenResponse.parseIdToken();
        GoogleIdToken.Payload payload = idToken.getPayload();

        //limpia la info de todo lo que se envía
        GoogleUserDto googleUser = new GoogleUserDto(
                payload.getEmail(),
                (String) payload.get("name")
        );
        return googleUser;
    }

@Transactional
    public LoginResponse processLoginOrRegister(GoogleUserDto googleUser) {
        //va y verifica si el mail que devuelve google existe y lo envuelve en optional
        Optional<User> userOpt = jpaUserRepository.findByEmail(googleUser.getEmail());
        User user;
        //si optional tiene un user dentro entra
        if (userOpt.isPresent()){
            user = userOpt.get();
            //si tiene el proveedor en null o no es GOOGLE por registro local, se cambia a Google
            //haría la cuenta híbrida/google
            if (user.getAuthProvider() == null
                    || !user.getAuthProvider().equals("GOOGLE")
            ){
                user.setAuthProvider("GOOGLE");
                jpaUserRepository.save(user);
            }
            //si optional está vacío, se ínstancia un new user
        } else {
            user = new User();
            user.setEmail(googleUser.getEmail());
            user.setUsername(googleUser.getUsername());
            user.setAuthProvider("GOOGLE");
            user.setPassword(null);

            user = jpaUserRepository.save(user);
        }
        String token = jwtService.generateToken(user);
        return new LoginResponse(token, user.getId(), user.getUsername(), user.getEmail(), user.getAuthProvider());
    }


}
