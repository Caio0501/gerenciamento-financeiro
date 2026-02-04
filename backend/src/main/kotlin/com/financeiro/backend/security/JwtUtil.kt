package com.financeiro.backend.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtUtil {
    // Em produção, use uma chave mais segura e armazenada em variáveis de ambiente
    private val SECRET_KEY = "minha-chave-secreta-muito-segura-com-no-minimo-256-bits-para-hmac-sha"
    private val secretKey: SecretKey = Keys.hmacShaKeyFor(SECRET_KEY.toByteArray())
    
    private val EXPIRATION_TIME = 86400000L // 24 horas em milissegundos

    fun generateToken(email: String): String {
        return Jwts.builder()
            .subject(email)
            .issuedAt(Date())
            .expiration(Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(secretKey)
            .compact()
    }

    fun extractEmail(token: String): String {
        return extractClaims(token).subject
    }

    fun validateToken(token: String): Boolean {
        return try {
            extractClaims(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    private fun extractClaims(token: String): Claims {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .payload
    }
}
