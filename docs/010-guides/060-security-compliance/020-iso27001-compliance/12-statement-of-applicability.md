---
sidebar_position: 12
---

# Statement of Applicability (SoA)

## Overview

The Statement of Applicability (SoA) is a critical ISO 27001 document that declares which security controls from Annex A are applicable to the Intra365 ISMS and provides justification for inclusion or exclusion decisions.

## Purpose

The SoA serves to:
- Document which ISO 27001 Annex A controls apply to Intra365
- Justify why certain controls are included or excluded
- Show how controls address identified risks
- Provide a basis for audit and compliance verification
- Track implementation status of applicable controls

## SoA Structure

Each control in the SoA includes:
- **Control ID**: ISO 27001 reference (e.g., A.5.1)
- **Control Name**: Official control title
- **Applicability**: Applicable / Not Applicable
- **Justification**: Reason for applicability decision
- **Implementation Status**: Not Started / In Progress / Implemented / Not Applicable
- **Implementation Notes**: How the control is implemented in Intra365
- **Owner**: Person or team responsible for the control
- **Related Documents**: Links to procedures, policies, evidence

## Control Summary

### Overall Statistics

| Category | Total Controls | Applicable | Not Applicable | Implementation Rate |
|----------|----------------|------------|----------------|---------------------|
| **Organizational (A.5)** | 37 | 37 | 0 | 85% |
| **People (A.6)** | 8 | 8 | 0 | 90% |
| **Physical (A.7)** | 14 | 12 | 2 | 75% |
| **Technological (A.8)** | 34 | 34 | 0 | 80% |
| **Total** | **93** | **91** | **2** | **82%** |

## Organizational Controls (A.5)

### A.5.1 - Policies for Information Security
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Essential for establishing security governance and direction
- **Implementation**: Comprehensive security policy framework established
- **Owner**: CISO
- **Documentation**: [Security Policy Framework](security-policy-framework)

### A.5.2 - Information Security Roles and Responsibilities
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Required for clear accountability and governance
- **Implementation**: RACI matrix and role definitions documented
- **Owner**: CISO / HR
- **Documentation**: [Roles and Responsibilities](roles-responsibilities)

### A.5.3 - Segregation of Duties
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Prevents fraud and errors in critical processes
- **Implementation**: Role-based access control with segregation principles
- **Owner**: CISO / IT Manager
- **Documentation**: [Segregation of Duties](segregation-of-duties)

### A.5.4 - Management Responsibilities
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Ensures management commitment and oversight
- **Implementation**: Regular management reviews and decision-making processes
- **Owner**: Executive Management
- **Documentation**: [Management Responsibilities](management-responsibilities)

### A.5.5 - Contact with Authorities
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Required for regulatory compliance and incident reporting
- **Implementation**: Established contacts with relevant authorities
- **Owner**: Legal / Compliance
- **Documentation**: [Contact with Authorities](contact-authorities)

### A.5.6 - Contact with Special Interest Groups
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Valuable for threat intelligence and best practices
- **Implementation**: Membership in security forums and information sharing groups
- **Owner**: CISO
- **Documentation**: [Special Interest Groups](contact-special-interest-groups)

### A.5.7 - Threat Intelligence
- **Applicability**: ✅ Applicable
- **Status**: 🔄 In Progress
- **Justification**: Critical for proactive security and risk management
- **Implementation**: Threat intelligence feeds integrated into security operations
- **Owner**: Security Operations Team
- **Documentation**: [Threat Intelligence](threat-intelligence)

### A.5.8-A.5.18 - Information Security in Project Management
- **Applicability**: ✅ Applicable
- **Status**: 🔄 In Progress
- **Justification**: Security must be integrated into all projects and changes
- **Implementation**: Security requirements in project lifecycle and change management
- **Owner**: Project Management Office / CISO
- **Documentation**: [Project Security](project-security)

### A.5.19-A.5.22 - Information Security in Supplier Relationships
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Third-party risk management is critical
- **Implementation**: Supplier security assessments and contract requirements
- **Owner**: Procurement / CISO
- **Documentation**: [Supplier Relationships](supplier-relationships)

### A.5.23 - Information Security for Use of Cloud Services
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Intra365 runs on Azure cloud infrastructure
- **Implementation**: Azure security controls, CSP assessments, shared responsibility model
- **Owner**: Cloud Operations / CISO
- **Documentation**: [Cloud Services Security](cloud-services-security)

### A.5.24-A.5.28 - Information Security Incident Management
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Essential for effective incident response
- **Implementation**: Incident response procedures, on-call rotation, playbooks
- **Owner**: Security Operations Team
- **Documentation**: [Incident Management](incident-management)

### A.5.29-A.5.30 - Information Security During Disruption
- **Applicability**: ✅ Applicable
- **Status**: 🔄 In Progress
- **Justification**: Business continuity and disaster recovery are critical
- **Implementation**: BC/DR plans, failover procedures, backup strategies
- **Owner**: Operations / CISO
- **Documentation**: [Business Continuity](business-continuity)

### A.5.31-A.5.37 - Compliance
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Legal and regulatory compliance is mandatory
- **Implementation**: Compliance tracking, legal reviews, audit programs
- **Owner**: Legal / Compliance Team
- **Documentation**: [Legal Compliance](legal-compliance)

## People Controls (A.6)

### A.6.1 - Screening
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Essential for trusted workforce
- **Implementation**: Background checks for all employees and contractors
- **Owner**: HR
- **Documentation**: [Screening](screening)

### A.6.2 - Terms and Conditions of Employment
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Clarifies security responsibilities
- **Implementation**: Security clauses in employment contracts
- **Owner**: HR
- **Documentation**: [Terms of Employment](terms-of-employment)

### A.6.3 - Information Security Awareness, Education and Training
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Human factor is critical in security
- **Implementation**: Annual training, onboarding, ongoing awareness
- **Owner**: CISO / HR
- **Documentation**: [Awareness Training](awareness-training)

### A.6.4 - Disciplinary Process
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Enforcement of security policies
- **Implementation**: Clear disciplinary procedures for violations
- **Owner**: HR / Legal
- **Documentation**: [Disciplinary Process](disciplinary-process)

### A.6.5 - Responsibilities After Termination or Change
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Protects assets during transitions
- **Implementation**: Offboarding checklist, access revocation procedures
- **Owner**: HR / IT
- **Documentation**: [Termination Responsibilities](termination-responsibilities)

### A.6.6 - Confidentiality or Non-Disclosure Agreements
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Protects confidential information
- **Implementation**: NDAs for all employees, contractors, and relevant third parties
- **Owner**: Legal / HR
- **Documentation**: [Confidentiality Agreements](confidentiality-agreements)

### A.6.7 - Remote Working
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Remote work is standard for Intra365
- **Implementation**: Remote work policy, VPN, endpoint security
- **Owner**: IT / CISO
- **Documentation**: [Remote Working](remote-working)

### A.6.8 - Information Security Event Reporting
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Early detection and response
- **Implementation**: Incident reporting portal, clear escalation paths
- **Owner**: Security Operations
- **Documentation**: [Event Reporting](event-reporting)

## Physical Controls (A.7)

### A.7.1 - Physical Security Perimeters
- **Applicability**: ⚠️ Partially Applicable
- **Status**: ✅ Implemented
- **Justification**: Limited physical facilities; relies on data center providers
- **Implementation**: Cloud provider physical security; office security where applicable
- **Owner**: Facilities / Cloud Operations
- **Documentation**: [Physical Security Perimeters](physical-security-perimeters)

### A.7.2 - Physical Entry
- **Applicability**: ⚠️ Partially Applicable
- **Status**: ✅ Implemented
- **Justification**: Office access control; data center managed by cloud provider
- **Implementation**: Badge access, visitor logs, escort procedures for offices
- **Owner**: Facilities
- **Documentation**: [Physical Entry](physical-entry)

### A.7.3 - Securing Offices, Rooms and Facilities
- **Applicability**: ⚠️ Partially Applicable
- **Status**: 🔄 In Progress
- **Justification**: Limited office space; most work is remote
- **Implementation**: Office security measures where applicable
- **Owner**: Facilities
- **Documentation**: [Securing Offices](securing-offices)

### A.7.4 - Physical Security Monitoring
- **Applicability**: ⚠️ Partially Applicable
- **Status**: ✅ Implemented
- **Justification**: Cloud provider handles data center monitoring
- **Implementation**: Cloud provider CCTV and monitoring; office monitoring where present
- **Owner**: Facilities / Cloud Operations
- **Documentation**: [Physical Security Monitoring](physical-security-monitoring)

### A.7.5 - Protecting Against Physical and Environmental Threats
- **Applicability**: ❌ Not Applicable
- **Status**: N/A
- **Justification**: No physical data centers; cloud provider responsibility
- **Implementation**: Covered under cloud provider SLAs and certifications
- **Owner**: N/A
- **Documentation**: [Protecting Against Threats](protecting-against-threats)

### A.7.6 - Working in Secure Areas
- **Applicability**: ❌ Not Applicable
- **Status**: N/A
- **Justification**: No classified or highly secure physical areas required
- **Implementation**: N/A
- **Owner**: N/A
- **Documentation**: [Secure Areas](secure-areas)

### A.7.7 - Clear Desk and Clear Screen
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Protects information in remote and office environments
- **Implementation**: Clear desk/screen policy, screen lock requirements
- **Owner**: CISO / HR
- **Documentation**: [Clear Desk and Screen](clear-desk-screen)

### A.7.8 - Equipment Siting and Protection
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Endpoint devices require protection
- **Implementation**: Laptop security policies, encryption, theft prevention
- **Owner**: IT / CISO
- **Documentation**: [Equipment Siting](equipment-siting)

### A.7.9 - Security of Assets Off-Premises
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Remote work means most assets are off-premises
- **Implementation**: Endpoint management, encryption, remote wipe
- **Owner**: IT / CISO
- **Documentation**: [Off-Premises Assets](off-premises-assets)

### A.7.10 - Storage Media
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Data on laptops and removable media needs protection
- **Implementation**: Encryption, media handling procedures, disposal
- **Owner**: IT / CISO
- **Documentation**: [Storage Media](storage-media)

### A.7.11 - Supporting Utilities
- **Applicability**: ⚠️ Partially Applicable
- **Status**: ✅ Implemented
- **Justification**: Cloud provider responsibility; backup power for offices
- **Implementation**: Cloud provider utilities management; UPS in offices
- **Owner**: Facilities / Cloud Operations
- **Documentation**: [Supporting Utilities](supporting-utilities)

### A.7.12 - Cabling Security
- **Applicability**: ⚠️ Partially Applicable
- **Status**: ✅ Implemented
- **Justification**: Minimal physical cabling; cloud provider responsibility
- **Implementation**: Cloud provider cabling security; office network security
- **Owner**: IT / Facilities
- **Documentation**: [Cabling Security](cabling-security)

### A.7.13 - Equipment Maintenance
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Endpoint devices require maintenance
- **Implementation**: Patch management, hardware maintenance procedures
- **Owner**: IT
- **Documentation**: [Equipment Maintenance](equipment-maintenance)

### A.7.14 - Secure Disposal or Re-use of Equipment
- **Applicability**: ✅ Applicable
- **Status**: ✅ Implemented
- **Justification**: Proper disposal prevents data leakage
- **Implementation**: Secure wipe procedures, certified destruction for storage media
- **Owner**: IT
- **Documentation**: [Secure Disposal](secure-disposal)

## Technological Controls (A.8)

All 34 technological controls (A.8.1 through A.8.34) are applicable to Intra365 given the technology-centric nature of the platform. Implementation status ranges from 70-100% depending on the control.

### Key Technological Controls Status

| Control Area | Status | Notes |
|--------------|--------|-------|
| **A.8.1-A.8.5** (Access Control) | ✅ Implemented | Zero Trust architecture in place |
| **A.8.6-A.8.7** (Capacity & Malware) | ✅ Implemented | Monitoring and AV deployed |
| **A.8.8-A.8.14** (Vulnerability & Backup) | 🔄 In Progress | Continuous improvement |
| **A.8.15-A.8.17** (Logging & Monitoring) | ✅ Implemented | SIEM and centralized logging |
| **A.8.18-A.8.24** (Operations & Crypto) | ✅ Implemented | Operational controls active |
| **A.8.25-A.8.34** (Secure Development) | 🔄 In Progress | DevSecOps pipeline enhancement |

For detailed implementation status of each technological control, see Phase 5 documentation (files 70-103).

## Exclusions and Justifications

### Excluded Controls

The following controls are marked as Not Applicable:

1. **A.7.5 - Protecting Against Physical and Environmental Threats**
   - **Reason**: Intra365 has no physical data centers; infrastructure is cloud-based on Azure
   - **Mitigation**: Rely on Azure's ISO 27001 certification and physical security controls

2. **A.7.6 - Working in Secure Areas**
   - **Reason**: No classified or highly secure physical work areas required for Intra365 operations
   - **Mitigation**: Remote work security controls and office security where applicable

### Partially Applicable Controls

Several physical controls (A.7.1, A.7.2, A.7.3, A.7.4, A.7.11, A.7.12) are marked as "Partially Applicable" because:
- Intra365 operates primarily in the cloud
- Physical infrastructure is managed by cloud service providers
- Limited physical office presence with remote-first work model
- Controls are implemented where relevant (offices) and verified through cloud provider certifications

## Control Ownership

### Primary Control Owners

| Owner Role | Control Count | Key Responsibilities |
|------------|---------------|----------------------|
| **CISO** | 45 | Overall ISMS, policies, risk management |
| **IT/Operations** | 25 | Technical controls, infrastructure |
| **HR** | 8 | People controls, awareness |
| **Legal/Compliance** | 7 | Regulatory compliance, contracts |
| **DevOps** | 8 | Secure development, CI/CD |

## Implementation Roadmap

### Priority 1 (Immediate) - Q1 2025
- Complete in-progress organizational controls
- Finalize secure development lifecycle controls
- Enhance threat intelligence capabilities

### Priority 2 (Short-term) - Q2 2025
- Implement remaining technological controls
- Complete business continuity testing
- Enhance physical security for offices

### Priority 3 (Medium-term) - Q3-Q4 2025
- Continuous improvement of all controls
- Automation and integration enhancements
- Preparation for certification audit

## Review and Maintenance

### SoA Review Frequency
- **Quarterly**: Review implementation status and update progress
- **Annually**: Comprehensive review of applicability decisions
- **Ad-hoc**: When significant changes occur (new services, regulations, technologies)

### Change Management
- All changes to SoA require CISO approval
- Version control maintained for audit trail
- Stakeholders notified of significant changes

### Audit Trail
- Version history maintained
- Change justifications documented
- Approval records retained

## Related Documents

- [ISO 27001 Overview](iso27001-overview)
- [ISMS Framework](isms-framework)
- [Risk Assessment Methodology](risk-assessment-methodology)
- [Control Mapping](control-mapping)
- [Compliance Checklist](compliance-checklist)

---

**Questions or feedback?** [Open an issue](https://github.com/intra365/chef/issues) or [start a discussion](https://github.com/intra365/chef/discussions).
