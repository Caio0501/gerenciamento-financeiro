package com.financeiro.backend.service

import com.financeiro.backend.model.*
import com.financeiro.backend.repository.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
class EmpresaService(private val repository: EmpresaRepository) {
    fun findAll(): List<Empresa> = repository.findAll()
    fun save(empresa: Empresa): Empresa = repository.save(empresa)
    fun delete(id: UUID) = repository.deleteById(id)
    fun findById(id: UUID): Empresa = repository.findById(id).orElseThrow { RuntimeException("Empresa not found") }
}

@Service
class AuxiliaresService(
    private val catRepo: CategoriaGastoRepository,
    private val fpRepo: FormaPagamentoRepository,
    private val trRepo: TipoReceitaRepository
) {
    fun findAllCategorias(): List<CategoriaGasto> = catRepo.findAll()
    fun saveCategoria(c: CategoriaGasto): CategoriaGasto = catRepo.save(c)
    
    fun findAllFormasPagamento(): List<FormaPagamento> = fpRepo.findAll()
    fun saveFormaPagamento(f: FormaPagamento): FormaPagamento = fpRepo.save(f)
    
    fun findAllTiposReceita(): List<TipoReceita> = trRepo.findAll()
    fun saveTipoReceita(t: TipoReceita): TipoReceita = trRepo.save(t)
    
    // Add delete if needed
}

@Service
class FinanceiroService(
    private val gastoRepo: GastoRepository,
    private val receitaRepo: ReceitaRepository,
    private val empresaRepo: EmpresaRepository,
    private val categoriaRepo: CategoriaGastoRepository,
    private val formaPagamentoRepo: FormaPagamentoRepository,
    private val tipoReceitaRepo: TipoReceitaRepository
) {
    fun findGastosByEmpresa(empresaId: UUID): List<Gasto> = gastoRepo.findByEmpresaId(empresaId)
    
    @Transactional
    fun saveGasto(gasto: Gasto): Gasto {
         return gastoRepo.save(gasto)
    }
    
    @Transactional
    fun saveGastoFromDTO(dto: com.financeiro.backend.controller.GastoDTO): Gasto {
        val empresa = empresaRepo.findById(dto.empresa.id).orElseThrow { RuntimeException("Empresa not found") }
        val formaPagamento = formaPagamentoRepo.findById(dto.formaPagamento.id).orElseThrow { RuntimeException("FormaPagamento not found") }
        val categoria = categoriaRepo.findById(dto.categoria.id).orElseThrow { RuntimeException("Categoria not found") }
        
        val gasto = Gasto(
            id = dto.id,
            empresa = empresa,
            dataPagamento = java.time.LocalDate.parse(dto.dataPagamento),
            formaPagamento = formaPagamento,
            categoria = categoria,
            descricao = dto.descricao,
            valor = dto.valor
        )
        
        return gastoRepo.save(gasto)
    }

    fun findReceitasByEmpresa(empresaId: UUID): List<Receita> = receitaRepo.findByEmpresaId(empresaId)
    
    @Transactional
    fun saveReceita(receita: Receita): Receita {
        return receitaRepo.save(receita)
    }
    
    @Transactional
    fun saveReceitaFromDTO(dto: com.financeiro.backend.controller.ReceitaDTO): Receita {
        val empresa = empresaRepo.findById(dto.empresa.id).orElseThrow { RuntimeException("Empresa not found") }
        val formaPagamento = formaPagamentoRepo.findById(dto.formaPagamento.id).orElseThrow { RuntimeException("FormaPagamento not found") }
        val tipoReceita = tipoReceitaRepo.findById(dto.tipoReceita.id).orElseThrow { RuntimeException("TipoReceita not found") }
        
        val receita = Receita(
            id = dto.id,
            empresa = empresa,
            dataRecebimento = java.time.LocalDate.parse(dto.dataRecebimento),
            formaPagamento = formaPagamento,
            tipoReceita = tipoReceita,
            descricao = dto.descricao,
            valor = dto.valor
        )
        
        return receitaRepo.save(receita)
    }
}
