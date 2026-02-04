package com.financeiro.backend.controller

import com.financeiro.backend.dto.AuthResponse
import com.financeiro.backend.dto.LoginRequest
import com.financeiro.backend.dto.RegisterRequest
import com.financeiro.backend.security.JwtUtil
import com.financeiro.backend.service.UsuarioService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = ["*"])
class AuthController(
    private val usuarioService: UsuarioService,
    private val jwtUtil: JwtUtil
) {

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<AuthResponse> {
        return try {
            val usuario = usuarioService.register(request)
            val token = jwtUtil.generateToken(usuario.email)
            
            val response = AuthResponse(
                token = token,
                nome = usuario.nome,
                email = usuario.email,
                id = usuario.id!!
            )
            
            ResponseEntity.ok(response)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.CONFLICT).build()
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        val usuario = usuarioService.authenticate(request)
        
        return if (usuario != null) {
            val token = jwtUtil.generateToken(usuario.email)
            
            val response = AuthResponse(
                token = token,
                nome = usuario.nome,
                email = usuario.email,
                id = usuario.id!!
            )
            
            ResponseEntity.ok(response)
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }
}
