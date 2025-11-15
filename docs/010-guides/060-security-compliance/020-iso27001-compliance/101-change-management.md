---
sidebar_position: 101
---

# Change Management

## ISO 27001:2022 Control

**Control**: A.8.32 - Change management

## Overview

This document provides guidance for implementing and maintaining change management controls for the Intra365 platform in accordance with ISO 27001:2022 requirements.

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

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) - Information Security Management Systems - Requirements (Control A.8.32)
- [ISO/IEC 27002:2022](https://www.iso.org/standard/75652.html) - Information Security Controls - Section 8.32: Change Management
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) - CM-3: Configuration Change Control, CM-4: Security Impact Analysis
- [ITIL 4: Change Enablement](https://www.axelos.com/certifications/itil-service-management) - Change Management Best Practices
- [ISO/IEC 20000-1:2018](https://www.iso.org/standard/70636.html) - IT Service Management - Change Management
- [CIS Controls v8](https://www.cisecurity.org/controls/v8) - Control 4.1: Establish Change Management Process
- [NIST SSDF (SP 800-218)](https://csrc.nist.gov/publications/detail/sp/800-218/final) - Change Control Practices
- [GitOps Principles](https://opengitops.dev/) - Infrastructure Change Management
- [Kubernetes: GitOps](https://kubernetes.io/docs/concepts/overview/) - Declarative Change Management
- [PCI DSS v4.0](https://www.pcisecuritystandards.org/) - Requirement 6.5: Change Control Procedures
- [SOC 2 Trust Services Criteria](https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report) - CC8.1: Change Management
- [Google SRE: Release Engineering](https://sre.google/sre-book/release-engineering/) - Change Management at Scale
- Intra365 Security Policies and Procedures

[^1]: **Change Management**: A systematic approach to dealing with changes in IT systems and infrastructure, ensuring that changes are planned, tested, documented, and approved before implementation. This control prevents unauthorized or poorly tested changes from causing security incidents or service disruptions.

---

**Related Documentation**:
- [GitOps Workflow](../../020-architecture/02-gitops-workflow.md)
- [Deployment Pipeline](../../020-architecture/05-deployment-pipeline.md)
- [GitHub Actions Workflows](../../040-deployment-workflows/05-github-actions-workflows.md)

---

**Need help now?** [Open an issue](https://github.com/intra365/chef/issues) or [start a discussion](https://github.com/intra365/chef/discussions).
