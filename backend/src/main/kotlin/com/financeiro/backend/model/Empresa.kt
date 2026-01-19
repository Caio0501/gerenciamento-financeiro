package com.financeiro.backend.model

import jakarta.persistence.*
import java.time.LocalDate
import java.util.UUID

@Entity
data class Empresa(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @Column(nullable = false)
    val nome: String,

    val cnpj: String? = null,
    
    val descricao: String? = null,

    val dataCriacao: LocalDate = LocalDate.now()
)
