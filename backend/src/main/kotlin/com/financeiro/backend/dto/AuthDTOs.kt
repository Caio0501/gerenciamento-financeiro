package com.financeiro.backend.dto

data class RegisterRequest(
    val nome: String,
    val email: String,
    val senha: String
)

data class LoginRequest(
    val email: String,
    val senha: String
)

data class AuthResponse(
    val token: String,
    val nome: String,
    val email: String,
    val id: java.util.UUID
)
