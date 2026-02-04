package com.financeiro.backend.tenant

import jakarta.persistence.EntityManager
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.hibernate.Session
import org.springframework.stereotype.Component

@Aspect
@Component
class TenantAspect(
    private val entityManager: EntityManager
) {

    @Before("execution(* com.financeiro.backend.repository.*.*(..))")
    fun beforeRepositoryMethod() {
        val tenantId = TenantContext.getTenant()
        if (tenantId != null) {
            if (entityManager.delegate is Session) {
                val session = entityManager.delegate as Session
                val filter = session.enableFilter("tenantFilter")
                filter.setParameter("empresaId", tenantId)
            }
        }
    }
}
