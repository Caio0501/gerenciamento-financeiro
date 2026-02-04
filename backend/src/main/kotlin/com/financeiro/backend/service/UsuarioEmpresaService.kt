package com.financeiro.backend.service

import com.financeiro.backend.model.UsuarioEmpresa
import com.financeiro.backend.repository.EmpresaRepository
import com.financeiro.backend.repository.UsuarioEmpresaRepository
import com.financeiro.backend.repository.UsuarioRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
class UsuarioEmpresaService(
    private val usuarioEmpresaRepository: UsuarioEmpresaRepository,
    private val usuarioRepository: UsuarioRepository,
    private val empresaRepository: EmpresaRepository
) {

    fun findAll(): List<UsuarioEmpresa> = usuarioEmpresaRepository.findAll()

    fun findByUsuario(usuarioId: UUID): List<UsuarioEmpresa> = 
        usuarioEmpresaRepository.findByUsuarioId(usuarioId)

    fun findByEmpresa(empresaId: UUID): List<UsuarioEmpresa> = 
        usuarioEmpresaRepository.findByEmpresaId(empresaId)

    @Transactional
    fun vincularUsuarioEmpresa(usuarioId: UUID, empresaId: UUID): UsuarioEmpresa {
        val usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow { RuntimeException("Usuario não encontrado") }
        val empresa = empresaRepository.findById(empresaId)
            .orElseThrow { RuntimeException("Empresa não encontrada") }

        // Verifica se já existe o vínculo
        val existente = usuarioEmpresaRepository.findByUsuarioIdAndEmpresaId(usuarioId, empresaId)
        if (existente != null) {
            return existente
        }

        val novoVinculo = UsuarioEmpresa(
            usuario = usuario,
            empresa = empresa
        )
        return usuarioEmpresaRepository.save(novoVinculo)
    }

    @Transactional
    fun desvincularUsuarioEmpresa(usuarioId: UUID, empresaId: UUID) {
        val vinculo = usuarioEmpresaRepository.findByUsuarioIdAndEmpresaId(usuarioId, empresaId)
            ?: throw RuntimeException("Vínculo não encontrado")
        usuarioEmpresaRepository.delete(vinculo)
    }
}
