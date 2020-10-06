/*
 * package com.eventapp.backend.Security;
 * 
 * import java.io.IOException; import java.util.ArrayList; import
 * java.util.Date;
 * 
 * import javax.servlet.FilterChain; import javax.servlet.ServletException;
 * import javax.servlet.http.HttpServletRequest; import
 * javax.servlet.http.HttpServletResponse;
 * 
 * import com.auth0.jwt.JWT; import com.auth0.jwt.algorithms.Algorithm; import
 * com.eventapp.backend.Model.User; import
 * com.fasterxml.jackson.databind.ObjectMapper;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.security.authentication.AuthenticationManager; import
 * org.springframework.security.authentication.
 * UsernamePasswordAuthenticationToken; import
 * org.springframework.security.core.Authentication; import
 * org.springframework.security.core.AuthenticationException; import
 * org.springframework.security.web.authentication.
 * UsernamePasswordAuthenticationFilter;
 * 
 * import static com.eventapp.backend.Security.SecurityConstants.HEADER_STRING;
 * import static com.eventapp.backend.Security.SecurityConstants.TOKEN_PREFIX;
 * import static com.eventapp.backend.Security.SecurityConstants.SECRET; import
 * static com.eventapp.backend.Security.SecurityConstants.EXPIRATION_TIME;;
 * 
 * public class JWTAuthenticationFilter extends
 * UsernamePasswordAuthenticationFilter {
 * 
 * @Autowired private AuthenticationManager aManager;
 * 
 * public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
 * }
 * 
 * @Override public Authentication attemptAuthentication(HttpServletRequest req,
 * HttpServletResponse res) throws AuthenticationException { try { User creds =
 * new ObjectMapper().readValue(req.getInputStream(), User.class); return
 * aManager.authenticate( new
 * UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword(),
 * new ArrayList<>()));
 * 
 * } catch (IOException e) { throw new RuntimeException(e); } }
 * 
 * @Override protected void successfulAuthentication(HttpServletRequest req,
 * HttpServletResponse res, FilterChain chain, Authentication auth) throws
 * IOException, ServletException {
 * 
 * String token = JWT.create().withSubject(((User)
 * auth.getPrincipal()).getEmail()) .withExpiresAt(new
 * Date(System.currentTimeMillis() + EXPIRATION_TIME))
 * .sign(Algorithm.HMAC256(SECRET.getBytes())); res.addHeader(HEADER_STRING,
 * TOKEN_PREFIX + token); }
 * 
 * }
 */