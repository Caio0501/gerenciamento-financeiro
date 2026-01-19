package com.financeiro.backend.controller

import com.financeiro.backend.model.*
import com.financeiro.backend.service.*
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = ["*"])
class EmpresaController(private val service: EmpresaService) {
    @GetMapping
    fun findAll() = service.findAll()

    @PostMapping
    fun create(@RequestBody empresa: Empresa) = service.save(empresa)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: UUID) = service.delete(id)
}

@RestController
@RequestMapping("/api/auxiliares")
@CrossOrigin(origins = ["*"])
class AuxiliaresController(private val service: AuxiliaresService) {
    @GetMapping("/categorias")
    fun getCategorias() = service.findAllCategorias()
    
    @PostMapping("/categorias")
    fun createCategoria(@RequestBody c: CategoriaGasto) = service.saveCategoria(c)
    
    @GetMapping("/formas-pagamento")
    fun getFormas() = service.findAllFormasPagamento()
    
    @PostMapping("/formas-pagamento")
    fun createForma(@RequestBody f: FormaPagamento) = service.saveFormaPagamento(f)
    
    @GetMapping("/tipos-receita")
    fun getTipos() = service.findAllTiposReceita()
    
    @PostMapping("/tipos-receita")
    fun createTipo(@RequestBody t: TipoReceita) = service.saveTipoReceita(t)
}

@RestController
@RequestMapping("/api/financeiro")
@CrossOrigin(origins = ["*"])
class FinanceiroController(private val service: FinanceiroService) {
    @GetMapping("/gastos/{empresaId}")
    fun getGastos(@PathVariable empresaId: UUID) = service.findGastosByEmpresa(empresaId)

    @PostMapping("/gastos")
    fun createGasto(@RequestBody dto: GastoDTO) = service.saveGastoFromDTO(dto)

    @GetMapping("/receitas/{empresaId}")
    fun getReceitas(@PathVariable empresaId: UUID) = service.findReceitasByEmpresa(empresaId)

    @PostMapping("/receitas")
    fun createReceita(@RequestBody dto: ReceitaDTO) = service.saveReceitaFromDTO(dto)
}

// DTOs for receiving data from frontend
data class GastoDTO(
    val id: UUID? = null,
    val empresa: IdWrapper,
    val dataPagamento: String,
    val formaPagamento: IdWrapper,
    val categoria: IdWrapper,
    val descricao: String? = null,
    val valor: java.math.BigDecimal
)

data class ReceitaDTO(
    val id: UUID? = null,
    val empresa: IdWrapper,
    val dataRecebimento: String,
    val formaPagamento: IdWrapper,
    val tipoReceita: IdWrapper,
    val descricao: String? = null,
    val valor: java.math.BigDecimal
)

data class IdWrapper(val id: UUID)
