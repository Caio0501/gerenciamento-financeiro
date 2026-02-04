package com.financeiro.backend.tenant

import com.financeiro.backend.model.Empresa
import jakarta.persistence.PrePersist
import java.util.UUID

class TenantEntityListener {
    @PrePersist
    fun prePersist(entity: Any) {
        val tenantId = TenantContext.getTenant()
        if (tenantId != null) {
            // Reflection or Interface approach could be used. 
            // Here we assume entities have a mutable 'empresa' field or we check specific types.
            // A cleaner way is to make entities implement a TenantAware interface, 
            // but for now let's try to set the field via reflection if it exists 
            // AND is currently null or we want to enforce it.
            
            try {
                val field = entity.javaClass.getDeclaredField("empresa")
                field.isAccessible = true
                
                // Always overwrite with current tenant if set
                // This prevents malicious attempts to save data to other tenants
                // ignoring whatever the Service/Controller passed
                val empresaProxy = Empresa(id = tenantId, nome = "Proxy") 
                field.set(entity, empresaProxy)
            } catch (e: NoSuchFieldException) {
                // Entity doesn't have 'empresa' field, ignore
            } catch (e: Exception) {
                e.printStackTrace()
                // Log error but allow proceed (maybe?) or throw exception
            }
        }
    }
}
