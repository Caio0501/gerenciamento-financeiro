package com.financeiro.backend.model

import jakarta.persistence.*
import java.util.UUID

@Entity
@Table(name = "usuario_empresa")
data class UsuarioEmpresa(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(optional = false)
    @JoinColumn(name = "empresa_id", nullable = false)
    val empresa: Empresa,

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    val usuario: Usuario
)
