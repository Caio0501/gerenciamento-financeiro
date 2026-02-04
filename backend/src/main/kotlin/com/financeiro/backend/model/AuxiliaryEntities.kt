package com.financeiro.backend.model

import com.financeiro.backend.tenant.TenantEntityListener
import jakarta.persistence.*
import org.hibernate.annotations.Filter
import java.util.UUID

@Entity
@EntityListeners(TenantEntityListener::class)
@Filter(name = "tenantFilter", condition = "empresa_id = :empresaId")
data class CategoriaGasto(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    
    @Column(nullable = false)
    val nome: String, // Remoção da constraint unique=true global, deve ser unique por empresa logicamente, mas no banco simples FK resolve
    
    val cor: String? = null,

    @ManyToOne(optional = false)
    @JoinColumn(name = "empresa_id")
    var empresa: Empresa? = null
)

@Entity
@EntityListeners(TenantEntityListener::class)
@Filter(name = "tenantFilter", condition = "empresa_id = :empresaId")
data class FormaPagamento(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    
    @Column(nullable = false)
    val nome: String,
    
    val icone: String? = null,

    @ManyToOne(optional = false)
    @JoinColumn(name = "empresa_id")
    var empresa: Empresa? = null
)

@Entity
@EntityListeners(TenantEntityListener::class)
@Filter(name = "tenantFilter", condition = "empresa_id = :empresaId")
data class TipoReceita(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    
    @Column(nullable = false)
    val nome: String,
    
    val cor: String? = null,

    @ManyToOne(optional = false)
    @JoinColumn(name = "empresa_id")
    var empresa: Empresa? = null
)
