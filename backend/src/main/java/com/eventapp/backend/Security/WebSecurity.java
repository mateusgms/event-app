/*
 * package com.eventapp.backend.Security;
 * 
 * import org.springframework.context.annotation.Bean; import
 * org.springframework.http.HttpMethod; import
 * org.springframework.security.config.annotation.authentication.builders.
 * AuthenticationManagerBuilder; import
 * org.springframework.security.config.annotation.web.builders.HttpSecurity;
 * import org.springframework.security.config.annotation.web.configuration.
 * EnableWebSecurity; import
 * org.springframework.security.config.annotation.web.configuration.
 * WebSecurityConfigurerAdapter; import
 * org.springframework.security.config.http.SessionCreationPolicy; import
 * org.springframework.security.core.userdetails.UserDetailsService; import
 * org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; import
 * org.springframework.web.cors.CorsConfiguration; import
 * org.springframework.web.cors.CorsConfigurationSource; import
 * org.springframework.web.cors.UrlBasedCorsConfigurationSource;
 * 
 * import static com.eventapp.backend.Security.SecurityConstants.SIGN_UP_URL;
 * 
 * @EnableWebSecurity public class WebSecurity extends
 * WebSecurityConfigurerAdapter {
 * 
 * private UserDetailsService userDetailsService;
 * 
 * private BCryptPasswordEncoder bEncoder;
 * 
 * @Override protected void configure(HttpSecurity http) throws Exception {
 * http.cors().and().csrf().disable().authorizeRequests()
 * .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
 * .anyRequest().authenticated() .and().addFilter(new
 * JWTAuthenticationFilter(authenticationManager())) .addFilter(new
 * JWTAuthenticationFilter(authenticationManager()))
 * .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
 * }
 * 
 * @Override public void configure(AuthenticationManagerBuilder auth) throws
 * Exception {
 * auth.userDetailsService(userDetailsService).passwordEncoder(bEncoder); }
 * 
 * @Bean CorsConfigurationSource configurationSource() {
 * 
 * final UrlBasedCorsConfigurationSource source = new
 * UrlBasedCorsConfigurationSource();
 * 
 * source.registerCorsConfiguration("/**", new
 * CorsConfiguration().applyPermitDefaultValues()); return source; } }
 */