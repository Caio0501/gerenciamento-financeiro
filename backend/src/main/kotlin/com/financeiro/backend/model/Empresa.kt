package com.financeiro.backend.model

import jakarta.persistence.*
import org.hibernate.annotations.FilterDef
import org.hibernate.annotations.ParamDef
import java.time.LocalDate
import java.util.UUID

@Entity
@FilterDef(
    name = "tenantFilter", 
    parameters = [ParamDef(name = "empresaId", type = UUID::class)]
)
data class Empresa(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @Column(nullable = false)
    val nome: String,

    val cnpj: String? = null,
    
    val descricao: String? = null,

    val dataCriacao: LocalDate = LocalDate.now()
)
