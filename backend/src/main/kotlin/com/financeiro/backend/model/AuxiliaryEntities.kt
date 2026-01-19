package com.financeiro.backend.model

import jakarta.persistence.*
import java.util.UUID

@Entity
data class CategoriaGasto(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    
    @Column(nullable = false, unique = true)
    val nome: String,
    
    val cor: String? = null
)

@Entity
data class FormaPagamento(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    
    @Column(nullable = false, unique = true)
    val nome: String,
    
    val icone: String? = null
)

@Entity
data class TipoReceita(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    
    @Column(nullable = false, unique = true)
    val nome: String,
    
    val cor: String? = null
)
