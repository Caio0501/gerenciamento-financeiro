package com.financeiro.backend.repository

import com.financeiro.backend.model.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface EmpresaRepository : JpaRepository<Empresa, UUID>

@Repository
interface CategoriaGastoRepository : JpaRepository<CategoriaGasto, UUID>

@Repository
interface FormaPagamentoRepository : JpaRepository<FormaPagamento, UUID>

@Repository
interface TipoReceitaRepository : JpaRepository<TipoReceita, UUID>

@Repository
interface GastoRepository : JpaRepository<Gasto, UUID> {
    fun findByEmpresaId(empresaId: UUID): List<Gasto>
}

@Repository
interface ReceitaRepository : JpaRepository<Receita, UUID> {
    fun findByEmpresaId(empresaId: UUID): List<Receita>
}

@Repository
interface UsuarioRepository : JpaRepository<Usuario, UUID> {
    fun findByEmail(email: String): Usuario?
}
