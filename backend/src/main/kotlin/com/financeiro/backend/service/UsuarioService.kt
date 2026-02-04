package com.financeiro.backend.service

import com.financeiro.backend.dto.LoginRequest
import com.financeiro.backend.dto.RegisterRequest
import com.financeiro.backend.model.Usuario
import com.financeiro.backend.repository.UsuarioRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UsuarioService(
    private val repository: UsuarioRepository,
    private val passwordEncoder: PasswordEncoder
) {
    fun register(request: RegisterRequest): Usuario {
        // Verificar se o email já está cadastrado
        if (repository.findByEmail(request.email) != null) {
            throw IllegalArgumentException("Email já cadastrado")
        }

        val usuario = Usuario(
            nome = request.nome,
            email = request.email,
            senha = passwordEncoder.encode(request.senha)
        )

        return repository.save(usuario)
    }

    fun authenticate(request: LoginRequest): Usuario? {
        val usuario = repository.findByEmail(request.email) ?: return null
        
        return if (passwordEncoder.matches(request.senha, usuario.senha)) {
            usuario
        } else {
            null
        }
    }

    fun findByEmail(email: String): Usuario? {
        return repository.findByEmail(email)
    }
}
