---
sidebar_position: 102
---

# Test Information

## ISO 27001:2022 Control

**Control**: A.8.33 - Test information

## Overview

This document provides guidance for implementing and maintaining test information controls for the Intra365 platform in accordance with ISO 27001:2022 requirements.

## Control Objective

The objective of this control is to ensure appropriate security measures are in place to protect information assets and support business operations.

## Applicability

- **Status**: Applicable
- **Implementation Status**: In Progress
- **Owner**: CISO
- **Review Date**: Quarterly

## Control Requirements

### What Must Be Done

This section outlines the specific requirements for implementing this control within Intra365.

(Detailed requirements will be documented based on ISO 27001:2022 Annex A guidance and Intra365 context)

## Implementation Guidance

### For Intra365

This section provides specific guidance for implementing this control in the Intra365 environment.

(Implementation details specific to Azure AKS, cloud services, and Intra365 architecture will be documented)

## Verification and Evidence

### How to Verify Compliance

- Regular audits and assessments
- Documentation reviews
- Technical testing where applicable
- Management reviews

### Evidence Requirements

- Policy documents
- Procedure documentation
- Implementation records
- Audit logs and reports
- Training records (where applicable)
- Test results (where applicable)

## Integration with Existing Systems

This control integrates with:
- ISMS Framework
- Risk Management Process
- Existing Security Controls (Zero Trust, RAISE 2.0)
- Operational Procedures

## Responsibilities

- **Accountable**: CISO
- **Responsible**: Security Team / Operations / Development (as appropriate)
- **Consulted**: Relevant stakeholders
- **Informed**: Management and affected parties

See [Roles and Responsibilities](roles-responsibilities) for detailed RACI matrix.

## Related Controls and Documents

- [ISO 27001 Overview](iso27001-overview)
- [ISMS Framework](isms-framework)
- [Statement of Applicability](statement-of-applicability)
- [Risk Assessment Methodology](risk-assessment-methodology)

## Metrics and KPIs

Key performance indicators for this control:
- Compliance rate
- Implementation status
- Incident rate related to this control
- Audit findings

## Review and Maintenance

- **Review Frequency**: Quarterly minimum
- **Update Triggers**: Security incidents, audit findings, regulatory changes
- **Approval Required**: CISO

## References

- ISO/IEC 27001:2022 - Information security management systems
- [ISO/IEC 27002:2022 - Control A.8.33](https://www.iso.org/standard/75652.html) - Test information
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) - OWASP
- [NIST SP 800-53 - SA-11: Developer Security Testing](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) - NIST
- [GDPR Test Data Guidelines](https://gdpr.eu/test-data/) - GDPR.eu
- [Azure Test Data Management](https://learn.microsoft.com/en-us/azure/architecture/data-guide/scenarios/test-data-management) - Microsoft Learn
- [Data Masking Best Practices](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL

[^1]: **Test Information Security**: Controls to ensure that test data is appropriately selected, protected, and controlled. Production data should not be used in test environments without proper anonymization or masking to prevent data breaches and comply with privacy regulations like GDPR.

---

**Related Documentation**:
- [Environment Separation](100-separation-environments.md)
- [Data Protection](../030-infrastructure/04-secrets-management.md)
- [Testing Procedures](../070-operations-runbooks/05-testing-procedures.md)

---

**Need help now?** [Open an issue](https://github.com/intra365/chef/issues) or [start a discussion](https://github.com/intra365/chef/discussions).
