package com.project.votingsystem.utils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;
        String role = null;
        
        String path = request.getServletPath();
        //System.out.println("Request path: " + path); 

        if (path.startsWith("/api/auth")) {
            //System.out.println("Skipping JWT filter for: " + path); 
            chain.doFilter(request, response);
            return;
        }
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            //System.out.println(jwtUtil.validateToken(token));
            if (jwtUtil.validateToken(token)) {
                email = jwtUtil.extractEmail(token);
                role = jwtUtil.extractRole(token);
                //System.out.println("Extracted role from token: " + role);
            }
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        	SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()); 
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(email, null, Collections.singletonList(authority));

            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(request, response);
    }
}
