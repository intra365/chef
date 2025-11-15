---
sidebar_position: 100
---

# Separation of Development, Test and Production Environments

## ISO 27001:2022 Control

**Control**: A.8.31 - Separation of environments

## Overview

This document provides guidance for implementing and maintaining separation of development, test and production environments controls for the Intra365 platform in accordance with ISO 27001:2022 requirements.

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

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) - Information Security Management Systems - Requirements (Control A.8.31)
- [ISO/IEC 27002:2022](https://www.iso.org/standard/75652.html) - Information Security Controls - Section 8.31: Separation of Development, Test and Production Environments
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) - CM-4: Security Impact Analysis, SC-7: Boundary Protection
- [CIS Controls v8](https://www.cisecurity.org/controls/v8) - Control 12.2: Establish Network Architecture
- [NIST SSDF (SP 800-218)](https://csrc.nist.gov/publications/detail/sp/800-218/final) - Environment Separation Practices
- [ITIL 4: Release Management](https://www.axelos.com/certifications/itil-service-management) - Environment Management
- [Azure: Environment Strategy](https://docs.microsoft.com/en-us/azure/architecture/) - Cloud Environment Separation
- [Kubernetes Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) - Environment Isolation
- [PCI DSS v4.0](https://www.pcisecuritystandards.org/) - Requirement 6.4.2: Separate Development from Production
- [SOC 2 Trust Services Criteria](https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report) - CC8.1: Environment Separation
- [OWASP: Secure SDLC](https://owasp.org/) - Environment Management
- [Google SRE: Deployment Environments](https://sre.google/sre-book/release-engineering/) - Production Safety
- Intra365 Security Policies and Procedures
- [NIST SP 800-53 - CM-7: Least Functionality](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) - NIST
- [Azure Environment Strategy](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/considerations/environments) - Microsoft Cloud Adoption Framework
- [Kubernetes Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) - Kubernetes Documentation
- [CIS Kubernetes Benchmark - Environment Separation](https://www.cisecurity.org/benchmark/kubernetes) - CIS
- [DevOps Environment Management](https://docs.gitlab.com/ee/ci/environments/) - GitLab CI/CD

[^1]: **Environment Separation**: The practice of maintaining distinct development, test/staging, and production environments to prevent unauthorized changes to production systems, reduce the risk of errors, and ensure proper testing before deployment. This is a fundamental security control that prevents development activities from impacting live services.

---

**Related Documentation**:
- [System Architecture](../../020-architecture/01-system-architecture.md)
- [GitOps Workflow](../../020-architecture/02-gitops-workflow.md)
- [Multi-Environment Strategy](../../020-architecture/06-multi-environment.md)

---

**Need help now?** [Open an issue](https://github.com/intra365/chef/issues) or [start a discussion](https://github.com/intra365/chef/discussions).
