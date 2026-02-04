package com.financeiro.backend.tenant

import com.financeiro.backend.repository.UsuarioEmpresaRepository
import com.financeiro.backend.repository.UsuarioRepository
import com.financeiro.backend.security.JwtUtil
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.util.UUID

@Component
class TenantFilter(
    private val jwtUtil: JwtUtil,
    private val usuarioEmpresaRepository: UsuarioEmpresaRepository,
    private val usuarioRepository: UsuarioRepository
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val tenantHeader = request.getHeader("X-Tenant-ID")

        if (tenantHeader != null) {
            try {
                val tenantId = UUID.fromString(tenantHeader)
                val authHeader = request.getHeader("Authorization")

                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    val token = authHeader.substring(7)
                    if (jwtUtil.validateToken(token)) {
                        val email = jwtUtil.extractEmail(token)
                        
                        // We need the ID of the user. 
                        // Since JWT currently only has Email (based on previous view), we need to fetch User.
                        // Ideally JWT should have ID, but for now lets fetch.
                        val usuario = usuarioRepository.findByEmail(email)
                        
                        if (usuario != null && usuario.id != null) {
                            // Validate if user belongs to this tenant
                             val access = usuarioEmpresaRepository.findByUsuarioIdAndEmpresaId(usuario.id, tenantId)
                             
                             if (access != null) {
                                 TenantContext.setTenant(tenantId)
                             } else {
                                 response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access to this company denied")
                                 return
                             }
                        }
                    }
                }
            } catch (e: IllegalArgumentException) {
                // Invalid UUID format
            } catch (e: Exception) {
                // Other errors
            }
        }

        try {
            filterChain.doFilter(request, response)
        } finally {
            TenantContext.clear()
        }
    }
}
