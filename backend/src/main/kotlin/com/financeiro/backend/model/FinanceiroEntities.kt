package com.financeiro.backend.model

import com.financeiro.backend.tenant.TenantEntityListener
import jakarta.persistence.*
import org.hibernate.annotations.Filter
import org.hibernate.annotations.FilterDef
import org.hibernate.annotations.ParamDef
import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

@Entity
@EntityListeners(TenantEntityListener::class)
@Filter(name = "tenantFilter", condition = "empresa_id = :empresaId")
data class Gasto(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(optional = false)
    @JoinColumn(name = "empresa_id")
    var empresa: Empresa? = null,

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
@EntityListeners(TenantEntityListener::class)
@Filter(name = "tenantFilter", condition = "empresa_id = :empresaId")
data class Receita(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(optional = false)
    @JoinColumn(name = "empresa_id")
    var empresa: Empresa? = null,

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
