---
sidebar_position: 103
---

# Protection of Information Systems During Audit Testing

## ISO 27001:2022 Control

**Control**: A.8.34 - Audit testing protection

## Overview

This document provides guidance for implementing and maintaining protection of information systems during audit testing controls for the Intra365 platform in accordance with ISO 27001:2022 requirements.

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
- [ISO/IEC 27002:2022 - Control A.8.34](https://www.iso.org/standard/75652.html) - Protection of information systems during audit testing
- [NIST SP 800-53 - CA-7: Continuous Monitoring](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) - NIST
- [ISO 19011:2018 - Auditing Management Systems](https://www.iso.org/standard/70017.html) - ISO
- [Kubernetes Audit Logging](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/) - Kubernetes Documentation
- [Azure Security Center Auditing](https://learn.microsoft.com/en-us/azure/security-center/security-center-auditing) - Microsoft Learn
- [IT Audit Best Practices](https://www.isaca.org/resources/it-audit) - ISACA

[^1]: **Audit Testing Protection**: Controls to ensure that audit and security testing activities do not disrupt production systems or expose sensitive information. This includes using read-only access where possible, testing in isolated environments, and ensuring that audit tools themselves are secure and properly configured.

---

**Related Documentation**:
- [Audit Logging](07-audit-logging.md)
- [Observability](../030-infrastructure/05-observability.md)

---

**Questions or feedback?** [Open an issue](https://github.com/intra365/chef/issues) or [start a discussion](https://github.com/intra365/chef/discussions).
