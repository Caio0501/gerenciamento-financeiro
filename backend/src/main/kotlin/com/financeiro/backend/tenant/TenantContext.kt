package com.financeiro.backend.tenant

import java.util.UUID

object TenantContext {
    private val currentTenant = ThreadLocal<UUID>()

    fun setTenant(tenantId: UUID) {
        currentTenant.set(tenantId)
    }

    fun getTenant(): UUID? {
        return currentTenant.get()
    }

    fun clear() {
        currentTenant.remove()
    }
}
