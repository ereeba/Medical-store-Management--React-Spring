package com.example.myapp.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.myapp.Models.User;
import com.example.myapp.Repository.UserRepository;
import com.example.myapp.service.CustomUserDetail;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class ApiAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenGenerator tokenGenerator;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (tokenGenerator.validateToken(token)) {
                Optional<User> optionalUser = userRepository.findByToken(token);
                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    CustomUserDetail userDetails = new CustomUserDetail(user);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("User not found for the token");
                    return;
                }
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired token");
                return;
            }
        } else if (request.getRequestURI().startsWith("/api/")
                && !request.getRequestURI().equals("/api/register")
                && !request.getRequestURI().equals("/api/login")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token required");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
