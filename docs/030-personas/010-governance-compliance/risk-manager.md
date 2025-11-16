---
id: risk-manager
title: Risk Manager
sidebar_label: Risk Manager
sidebar_position: 3
persona_type: specialized
parent_persona: governance-compliance
---

# Risk Manager

Risk Managers identify, assess, and manage information security and operational risks within the Intra365 platform. They maintain the risk register, conduct risk assessments, coordinate risk treatment activities, track residual risk, and ensure the organization's risk posture aligns with its risk appetite.

## Role Profile

### Primary Responsibilities
- Conduct information security risk assessments
- Maintain and update the risk register
- Coordinate risk treatment planning and implementation
- Monitor residual risk and risk trends
- Report risk status to management
- Facilitate risk workshops and discussions
- Develop and maintain risk management processes
- Track and report on key risk indicators (KRIs)

### Key Skills
- Deep understanding of risk management frameworks (ISO 31000, ISO 27005)
- Risk assessment methodologies and tools
- Analytical and quantitative risk analysis
- Business and technical risk understanding
- Communication and facilitation skills
- Project management for risk initiatives
- Stakeholder management
- Critical thinking and problem-solving

### Daily Activities
- Reviewing and updating risk register
- Conducting risk assessments for new initiatives
- Monitoring risk indicators and trends
- Coordinating with risk owners on treatment progress
- Preparing risk reports and dashboards
- Facilitating risk discussions with stakeholders
- Responding to emerging risks
- Tracking risk treatment action items

## Documentation Priorities

### Essential Reading
1. **[Risk Assessment Methodology](../../010-guides/060-security-compliance/020-iso27001-compliance/13-risk-assessment-methodology.md)** - Risk assessment approach
2. **[ISO 27001 Overview](../../010-guides/060-security-compliance/020-iso27001-compliance/10-iso27001-overview.md)** - Context for risk management
3. **[System Architecture](../../010-guides/020-architecture/01-system-architecture.md)** - System understanding for risk assessment
4. **[Disaster Recovery](../../010-guides/030-infrastructure/06-disaster-recovery.md)** - Business continuity risks

### Security & Compliance
- **[Zero Trust Architecture](../../010-guides/060-security-compliance/010-core-security/01-zero-trust-architecture.md)** - Security risk mitigation
- **[RAISE 2.0 Compliance](../../010-guides/060-security-compliance/010-core-security/02-raise-2-0-compliance.md)** - Compliance risks
- **[Vulnerability Management](../../010-guides/060-security-compliance/010-core-security/08-vulnerability-management.md)** - Vulnerability risk
- **[Audit Logging](../../010-guides/060-security-compliance/010-core-security/07-audit-logging.md)** - Monitoring risks

### Infrastructure & Operations
- **[Infrastructure Overview](../../010-guides/030-infrastructure/01-azure-aks-setup.md)** - Infrastructure risks
- **[Azure AKS Setup](../../010-guides/030-infrastructure/01-azure-aks-setup.md)** - Platform risks
- **[Networking](../../010-guides/030-infrastructure/02-networking.md)** - Network risks
- **[Incident Response](../../010-guides/070-operations-runbooks/02-incident-response.md)** - Operational risks

### Architecture Understanding
- **[GitOps Workflow](../../010-guides/020-architecture/02-gitops-workflow.md)** - Technology risks
- **[Component Diagram](../../010-guides/020-architecture/03-component-diagram.md)** - Data risks
- **[Integration Points](../../010-guides/020-architecture/04-integration-points.md)** - Integration risks

## Risk Management Tasks

### Risk Assessment Process

```markdown
# Information Security Risk Assessment

## Risk Identification Workshop
**Date**: 2024-02-15
**Facilitator**: Risk Manager
**Participants**:
- CISO
- Security Engineer
- System Administrator
- DevOps Engineer
- Technical Lead
- Compliance Officer

## Asset Identification

### Critical Information Assets
1. **Customer Database (PROD-DB-01)**
   - Type: PostgreSQL Database
   - Classification: Confidential
   - Owner: Database Administrator
   - Location: Azure West Europe
   - Value: High (customer PII, business critical)

2. **Authentication Service (STS)**
   - Type: Microservice
   - Classification: Confidential
   - Owner: Security Engineer
   - Location: AKS Cluster
   - Value: Critical (platform authentication)

3. **API Gateway**
   - Type: Microservice
   - Classification: Public
   - Owner: DevOps Engineer
   - Location: AKS Cluster
   - Value: Critical (all traffic entry point)

[... additional assets ...]

## Threat & Vulnerability Identification

### Asset: Customer Database (PROD-DB-01)

#### Threats
1. **T-DB-01: Unauthorized Access**
   - Source: External attacker, malicious insider
   - Method: Credential theft, SQL injection, privilege escalation

2. **T-DB-02: Data Breach**
   - Source: External attacker
   - Method: Exploit vulnerability, misconfiguration

3. **T-DB-03: Data Loss/Corruption**
   - Source: System failure, ransomware, human error
   - Method: Hardware failure, malware, accidental deletion

4. **T-DB-04: Denial of Service**
   - Source: External attacker, misconfiguration
   - Method: DDoS, resource exhaustion

#### Vulnerabilities
1. **V-DB-01: Database User Privileges**
   - Status: Some application users have broader privileges than needed
   - Severity: Medium

2. **V-DB-02: Backup Encryption**
   - Status: Backups encrypted at rest but not in transit
   - Severity: Low

3. **V-DB-03: Database Audit Logging**
   - Status: Enabled but retention only 30 days (policy requires 90)
   - Severity: Low

## Risk Analysis

### Risk: Unauthorized Database Access

**Risk ID**: RISK-2024-001
**Asset**: Customer Database (PROD-DB-01)
**Threat**: T-DB-01 - Unauthorized Access
**Vulnerability**: V-DB-01 - Excessive user privileges

#### Likelihood Assessment
**Factors**:
- Threat capability: High (credential theft tools widely available)
- Opportunity: Medium (database not directly Internet-facing)
- Vulnerability severity: Medium (some excessive privileges)
- Existing controls: 
  - ✅ Strong authentication (Azure AD)
  - ✅ Network segmentation
  - ✅ Database firewall
  - ⚠️ Least privilege not fully implemented

**Likelihood Rating**: Medium (3/5)
**Justification**: While strong authentication and network controls exist, excessive privileges increase exploitation risk if credentials are compromised.

#### Impact Assessment
**Impact Categories**:

| Category | Impact Level | Justification |
|----------|--------------|---------------|
| Confidentiality | Critical (5) | Full customer database access = all PII exposed |
| Integrity | High (4) | Unauthorized modifications possible |
| Availability | Medium (3) | Could delete data but backups available |
| Financial | High (4) | GDPR fines, incident response costs, reputation |
| Reputation | Critical (5) | Major breach of customer trust |
| Compliance | Critical (5) | GDPR, ISO 27001 non-compliance |

**Overall Impact**: Critical (5/5)

#### Risk Level Calculation
**Formula**: Risk = Likelihood × Impact
**Calculation**: 3 × 5 = 15
**Risk Level**: HIGH

**Risk Matrix Position**:
```
Impact ↑
5 │    │    │ M  │ H  │ C  │
4 │    │ L  │ M  │ H  │ H  │
3 │    │ L  │ M  │ H  │ [RISK-2024-001]
2 │    │ L  │ L  │ M  │ M  │
1 │    │ L  │ L  │ L  │ M  │
  └────┴────┴────┴────┴────┴→ Likelihood
      1    2    3    4    5

L = Low, M = Medium, H = High, C = Critical
```

## Risk Treatment

### Risk Treatment Plan: RISK-2024-001

**Treatment Option Selected**: Modify (Reduce)

**Treatment Actions**:

1. **Action RT-001: Implement Least Privilege**
   - Description: Review and reduce database user privileges to minimum required
   - Owner: Database Administrator
   - Timeline: 2 weeks
   - Cost: Internal effort (~40 hours)
   - Expected Risk Reduction: Likelihood 3→2

2. **Action RT-002: Enhanced Monitoring**
   - Description: Implement database activity monitoring with alerts
   - Owner: Security Engineer
   - Timeline: 3 weeks
   - Cost: Internal effort + monitoring tool (~€2,000/year)
   - Expected Risk Reduction: Earlier detection, reduce impact 5→4

3. **Action RT-003: Regular Access Reviews**
   - Description: Quarterly review of database access rights
   - Owner: Database Administrator
   - Timeline: Ongoing (quarterly)
   - Cost: Internal effort (~8 hours/quarter)
   - Expected Risk Reduction: Maintain reduced likelihood

**Total Investment**: ~€2,000 + 50 hours internal effort

#### Residual Risk Assessment
**After Treatment**:
- Likelihood: Medium → Low (3 → 2)
- Impact: Critical → High (5 → 4)
- Residual Risk Level: 2 × 4 = 8 (MEDIUM)

**Residual Risk Acceptance**:
- Risk Level: MEDIUM
- Accepted by: CISO
- Date: 2024-03-01
- Justification: Residual risk within acceptable range after treatment implementation
- Review Date: 2024-09-01

## Risk Register Update
- Status: Treatment in progress
- Next review: Monthly progress check
- Final verification: After all actions complete (2024-03-30)
```

### Risk Register Dashboard

```markdown
# Risk Register - Q1 2024

## Executive Summary
- **Total Risks**: 28
- **Critical**: 2 (7%)
- **High**: 8 (29%)
- **Medium**: 12 (43%)
- **Low**: 6 (21%)
- **Treatment Status**: 
  - In Progress: 12 (43%)
  - Completed: 8 (29%)
  - Planned: 5 (18%)
  - Monitoring: 3 (10%)

## Top Risks (By Risk Score)

### Critical Risks

#### RISK-2024-007: Cloud Infrastructure Misconfiguration
**Risk Score**: 20 (Critical)
**Category**: Infrastructure
**Asset**: Azure AKS Cluster
**Threat**: Unauthorized access due to misconfiguration
**Impact**: Critical (Entire platform compromise)
**Likelihood**: High (Complex configuration, human error)
**Risk Owner**: DevOps Engineer
**Status**: 🔴 Treatment in progress (30% complete)
**Treatment**:
- Infrastructure as Code implementation (Terraform)
- Automated configuration validation
- Regular security audits
**Target Completion**: 2024-04-15
**Residual Risk**: Medium (10)

#### RISK-2024-003: Third-Party Service Dependency
**Risk Score**: 16 (Critical)
**Category**: Third Party
**Asset**: External Authentication Provider
**Threat**: Service outage or security breach
**Impact**: Critical (Authentication unavailable)
**Likelihood**: Medium (Dependent on third party)
**Risk Owner**: Security Engineer
**Status**: 🟡 Treatment planned
**Treatment**:
- Implement fallback authentication mechanism
- Enhanced monitoring of third-party service
- Incident response plan for provider outage
**Target Completion**: 2024-05-30
**Residual Risk**: Medium (9)

### High Risks

#### RISK-2024-001: Unauthorized Database Access
**Risk Score**: 15 (High)
**Category**: Security
**Asset**: Customer Database
**Details**: [See risk assessment above]
**Status**: 🟢 Treatment 60% complete
**Target Completion**: 2024-03-30

#### RISK-2024-012: Insufficient Disaster Recovery Testing
**Risk Score**: 12 (High)
**Category**: Business Continuity
**Asset**: All Systems
**Threat**: Inability to recover from disaster
**Impact**: High (Extended downtime)
**Likelihood**: Medium (Untested procedures)
**Risk Owner**: System Administrator
**Status**: 🟡 Treatment planned
**Treatment**:
- Quarterly DR test exercises
- Update and validate DR procedures
- Document test results and improvements
**Target Completion**: 2024-03-31
**Residual Risk**: Low (6)

## Risk Trend Analysis

### Risk Score Trend (Last 6 Months)
```
Total Risk Score
300 │                         
250 │     ●─────●             
200 │   ●─'       `───●       
150 │ ●─'               `──●  ← Current: 185
100 │                         
 50 │                         
    └─────────────────────────
     Sep  Oct  Nov  Dec  Jan  Feb
     2023                 2024

Trend: ↘️ Decreasing (Positive)
Change: -15% since September 2023
```

### New Risks (This Quarter)
- RISK-2024-007: Cloud misconfiguration (Critical) - Identified during security audit
- RISK-2024-015: Supply chain risk (Medium) - New dependency added
- RISK-2024-018: Data retention compliance (Low) - Regulatory change

### Closed Risks (This Quarter)
- RISK-2023-045: Legacy system vulnerability (Migrated to new system)
- RISK-2023-052: Weak password policy (New policy implemented)
- RISK-2023-061: Missing backup encryption (Encryption enabled)

## Key Risk Indicators (KRIs)

| KRI | Current | Target | Threshold | Status |
|-----|---------|--------|-----------|--------|
| Critical vulnerabilities open >30 days | 0 | 0 | 2 | ✅ |
| High-risk items in treatment | 8 | <10 | 15 | ✅ |
| Risk assessment currency (% <6 months) | 89% | >90% | 80% | ⚠️ |
| Security incidents (monthly) | 2 | <5 | 10 | ✅ |
| Backup success rate | 99.2% | >99% | 95% | ✅ |
| Patching compliance | 94% | >95% | 90% | ⚠️ |

## Risk Treatment Progress

### By Quarter
```
Q4 2023: ████████████░░░░░░░░ 60% (12/20 completed)
Q1 2024: ████████░░░░░░░░░░░░ 40% (8/20 planned completed)
Q2 2024: ░░░░░░░░░░░░░░░░░░░░  0% (0/15 planned started)
```

### Investment in Risk Treatment (Q1 2024)
- Budget allocated: €50,000
- Spent to date: €18,500 (37%)
- Committed: €25,000 (50%)
- Available: €6,500 (13%)

## Emerging Risks

### Under Monitoring
1. **AI/ML Model Security**: Potential risks from LLM integration
2. **Geopolitical Cyber Threats**: Increased nation-state activity
3. **Regulatory Changes**: Upcoming EU AI Act compliance

### Recommended Actions
- Commission AI security assessment (Q2 2024)
- Enhance threat intelligence monitoring
- Begin AI Act compliance gap analysis

## Next Steps
1. Complete treatment for RISK-2024-001 (Database access)
2. Begin treatment for RISK-2024-003 (Third-party dependency)
3. Conduct risk assessment workshop for new AI features
4. Update risk assessments >6 months old
5. Management review of risk register (2024-03-15)
```

### Risk Heat Map

```markdown
# Risk Heat Map - Q1 2024

## Current Risk Position

```
IMPACT ↑
   5 Critical │              │              │ RISK-2024-012│ RISK-2024-007│ RISK-2024-007│
              │              │              │              │              │ RISK-2024-003│
   4 High     │              │              │ RISK-2024-015│ RISK-2024-001│              │
              │              │              │ RISK-2024-018│              │              │
   3 Medium   │              │ RISK-2024-020│ RISK-2024-022│              │              │
              │              │ RISK-2024-021│ RISK-2024-019│              │              │
   2 Low      │ RISK-2024-025│ RISK-2024-024│ RISK-2024-023│              │              │
              │              │              │              │              │              │
   1 V.Low    │              │              │              │              │              │
              └──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴→ LIKELIHOOD
                 1 Rare        2 Unlikely     3 Possible     4 Likely      5 Almost Certain

Risk Distribution:
■ Critical (5×4, 5×5): 2 risks
■ High (4×3, 4×4, 3×4): 8 risks
■ Medium (3×3, 2×4, 4×2): 12 risks
■ Low (1×3, 2×2, 3×1): 6 risks
```

## Target Risk Position (After Treatment)

```
IMPACT ↑
   5 Critical │              │              │              │              │              │
              │              │              │              │              │              │
   4 High     │              │              │ RISK-2024-007│ RISK-2024-003│              │
              │              │              │              │              │              │
   3 Medium   │              │ RISK-2024-012│ RISK-2024-001│              │              │
              │              │ RISK-2024-020│ RISK-2024-015│              │              │
   2 Low      │ RISK-2024-025│ RISK-2024-024│ RISK-2024-022│              │              │
              │ RISK-2024-021│ RISK-2024-023│ RISK-2024-019│              │              │
   1 V.Low    │              │ RISK-2024-018│              │              │              │
              └──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴→ LIKELIHOOD
                 1 Rare        2 Unlikely     3 Possible     4 Likely      5 Almost Certain

Target Distribution:
■ High: 2 risks (down from 10)
■ Medium: 6 risks (down from 12)
■ Low: 20 risks (up from 6)
```

**Target Achievement**: 85% of high/critical risks reduced by Q2 2024
```

## Risk Management Best Practices

### Risk Assessment
- Use consistent risk criteria across the organization
- Involve relevant stakeholders in risk identification
- Consider both threat-based and scenario-based approaches
- Document assumptions and rationale
- Regular reassessment (at least annually, or when changes occur)
- Consider cascade effects and interconnected risks

### Risk Treatment
- Prioritize based on risk level and treatment cost/benefit
- Set realistic timelines and assign clear ownership
- Monitor treatment progress regularly
- Verify effectiveness after implementation
- Document residual risk and obtain management acceptance
- Plan for continuous monitoring of residual risks

### Risk Communication
- Tailor communication to audience (technical vs executive)
- Use visual aids (heat maps, dashboards, charts)
- Focus on trends and changes, not just snapshots
- Provide context and business impact
- Be transparent about limitations and uncertainties
- Regular reporting to management and board

### Risk Culture
- Foster open discussion of risks without blame
- Encourage proactive risk identification
- Recognize and reward good risk management
- Learn from near-misses and incidents
- Integrate risk thinking into decision-making
- Balance risk and opportunity

### Documentation
- Maintain comprehensive risk register
- Document risk assessments thoroughly
- Track risk treatment actions and progress
- Keep evidence of management decisions
- Version control for risk documents
- Regular backup of risk information

## Tools & Technologies

### Risk Management
- **Excel/Google Sheets**: Risk register and analysis
- **ServiceNow**: Risk tracking and workflow
- **Azure DevOps**: Risk action tracking
- **Power BI**: Risk dashboards and reporting

### Risk Assessment
- **Risk Matrix Tool**: Custom or commercial
- **Threat Modeling Tools**: Microsoft Threat Modeling Tool
- **Vulnerability Scanners**: Nessus, Qualys, Trivy
- **FAIR Calculator**: Quantitative risk analysis

### Monitoring & Reporting
- **Grafana**: KRI dashboards
- **Azure Monitor**: Infrastructure monitoring
- **SIEM**: Security event monitoring
- **PowerPoint**: Executive risk presentations

### Documentation
- **SharePoint**: Risk document repository
- **Confluence**: Risk management wiki
- **GitHub**: Risk management procedures (version controlled)
- **Visio/Draw.io**: Risk diagrams and flows

## Related Personas

- **[Compliance Officer](./compliance-officer.md)**: Align risk management with compliance requirements
- **[Auditor](./auditor.md)**: Support risk-based audit planning
- **[Security Engineer](../040-technical-practitioner/security-engineer.md)**: Identify and treat technical risks
- **[Enterprise Architect](../030-strategic-decision-maker/enterprise-architect.md)**: Consider risk in architectural decisions
- **[Data Protection Officer](./dpo.md)**: Manage data protection risks

## Additional Resources

- [ISO 31000:2018 - Risk Management](https://www.iso.org/iso-31000-risk-management.html)
- [ISO/IEC 27005:2022 - Information Security Risk Management](https://www.iso.org/standard/80585.html)
- [NIST Risk Management Framework](https://csrc.nist.gov/projects/risk-management)
- [FAIR (Factor Analysis of Information Risk)](https://www.fairinstitute.org/)
- [COSO ERM Framework](https://www.coso.org/guidance-on-enterprise-risk-management)
