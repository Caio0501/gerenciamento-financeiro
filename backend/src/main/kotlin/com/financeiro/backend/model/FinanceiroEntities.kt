package com.financeiro.backend.model

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

@Entity
data class Gasto(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(optional = false)
    val empresa: Empresa,

    @Column(nullable = false)
    val dataPagamento: LocalDate,

    @ManyToOne(optional = false)
    val formaPagamento: FormaPagamento,

    @ManyToOne(optional = false)
    val categoria: CategoriaGasto,

    val descricao: String? = null,

    @Column(nullable = false)
    val valor: BigDecimal
)

@Entity
data class Receita(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(optional = false)
    val empresa: Empresa,

    @Column(nullable = false)
    val dataRecebimento: LocalDate,

    @ManyToOne(optional = false)
    val formaPagamento: FormaPagamento,

    @ManyToOne(optional = false)
    val tipoReceita: TipoReceita,

    val descricao: String? = null,

    @Column(nullable = false)
    val valor: BigDecimal
)
