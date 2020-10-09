/*
 * package com.eventapp.backend.Security;
 * 
 * import org.springframework.context.annotation.Configuration; import
 * org.springframework.security.config.annotation.authentication.builders.
 * AuthenticationManagerBuilder; import
 * org.springframework.security.config.annotation.web.builders.HttpSecurity;
 * import org.springframework.security.config.annotation.web.configuration.
 * EnableWebSecurity; import
 * org.springframework.security.config.annotation.web.configuration.
 * WebSecurityConfigurerAdapter;
 * 
 * @Configuration
 * 
 * @EnableWebSecurity public class BasicConfiguration extends
 * WebSecurityConfigurerAdapter {
 * 
 * @Override protected void configure(AuthenticationManagerBuilder auth) throws
 * Exception { auth.inMemoryAuthentication().withUser("user")
 * .password("$2a$10$lnUpJAnHY4xuIX3gMejMpesTBoruhFIXBpQqK86VcoGWE9wgY8OWe").
 * roles("USER").and().withUser("admin")
 * .password("$2a$10$cmLWBqBm7yERQtPVDDO9W.V0dxZbM38rIm5CzhF7ynv7jx/oaSNna").
 * roles("USER", "ADMIN"); }
 * 
 * @Override protected void configure(HttpSecurity http) throws Exception {
 * http.authorizeRequests() //
 * .antMatchers("/users").hasRole("ADMIN").antMatchers("/vouchers").hasAnyRole(
 * "USER", // "ADMIN") .anyRequest().permitAll().and().httpBasic();
 * 
 * } }
 */
