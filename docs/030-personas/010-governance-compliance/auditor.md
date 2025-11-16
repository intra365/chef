---
id: auditor
title: Auditor
sidebar_label: Auditor
sidebar_position: 2
persona_type: specialized
parent_persona: governance-compliance
---

# Auditor

Auditors conduct internal and support external audits to verify compliance with ISO 27001, RAISE 2.0, GDPR, and other regulatory requirements. They perform independent assessments, collect and verify evidence, test controls, and provide objective reports on the organization's compliance posture.

## Role Profile

### Primary Responsibilities
- Conduct internal audits for ISO 27001 and other frameworks
- Plan and execute audit programs
- Collect and verify compliance evidence
- Test effectiveness of controls
- Document audit findings and observations
- Prepare audit reports and recommendations
- Support external audits and assessments
- Track remediation of audit findings

### Key Skills
- Deep understanding of audit methodologies
- Knowledge of compliance frameworks (ISO 27001, ISO 19011, RAISE 2.0)
- Evidence collection and verification techniques
- Control testing and sampling methods
- Risk-based audit planning
- Report writing and communication
- Independence and objectivity
- Attention to detail and analytical thinking

### Daily Activities
- Planning audit activities and schedules
- Conducting audit interviews and walkthroughs
- Reviewing documentation and evidence
- Testing control effectiveness
- Documenting audit findings
- Preparing audit reports
- Following up on corrective actions
- Supporting external audit preparation

## Documentation Priorities

### Essential Reading
1. **[ISO 27001 Overview](../../010-guides/060-security-compliance/020-iso27001-compliance/10-iso27001-overview.md)** - Framework being audited
2. **[Audit Preparation](../../010-guides/060-security-compliance/020-iso27001-compliance/112-audit-preparation.md)** - Audit readiness
3. **[Statement of Applicability](../../010-guides/060-security-compliance/020-iso27001-compliance/12-statement-of-applicability.md)** - Documentation requirements
4. **[ISMS Framework](../../010-guides/060-security-compliance/020-iso27001-compliance/11-isms-framework.md)** - Control details

### Compliance Framework
- **[RAISE 2.0 Compliance](../../010-guides/060-security-compliance/010-core-security/02-raise-2-0-compliance.md)** - Norwegian requirements
- **[Zero Trust Architecture](../../010-guides/060-security-compliance/010-core-security/01-zero-trust-architecture.md)** - Security model
- **[Risk Assessment Methodology](../../010-guides/060-security-compliance/020-iso27001-compliance/13-risk-assessment-methodology.md)** - Risk approach

### Technical Controls
- **[Security Gates](../../010-guides/060-security-compliance/010-core-security/03-security-gates.md)** - Security checkpoints
- **[Container Security](../../010-guides/060-security-compliance/010-core-security/04-container-security.md)** - Container controls
- **[Network Policies](../../010-guides/060-security-compliance/010-core-security/05-network-policies.md)** - Network security
- **[Audit Logging](../../010-guides/060-security-compliance/010-core-security/07-audit-logging.md)** - Audit trails
- **[Vulnerability Management](../../010-guides/060-security-compliance/010-core-security/08-vulnerability-management.md)** - Vulnerability process

### System Understanding
- **[System Architecture](../../010-guides/020-architecture/01-system-architecture.md)** - System overview
- **[Disaster Recovery](../../010-guides/030-infrastructure/06-disaster-recovery.md)** - BC/DR controls
- **[Backup and Restore](../../010-guides/070-operations-runbooks/04-backup-restore.md)** - Backup procedures
- **[Incident Response](../../010-guides/070-operations-runbooks/02-incident-response.md)** - Incident handling

## Audit Tasks

### Annual Internal Audit Plan

```markdown
# Internal Audit Plan 2024

## Audit Program Overview
**Scope**: ISO 27001 ISMS
**Period**: January - December 2024
**Lead Auditor**: [Auditor Name]
**Frequency**: Quarterly cycle covering all ISMS clauses

## Audit Schedule

### Q1 2024: Leadership & Planning (Clauses 5 & 6)
**Dates**: February 5-9, 2024
**Focus Areas**:
- Leadership commitment and ISMS policy
- Risk assessment and treatment process
- Information security objectives
- Resource allocation

**Auditees**:
- CISO
- Compliance Officer
- Risk Manager
- Department Heads

**Estimated Effort**: 3 days

### Q2 2024: Support & Operation (Clauses 7 & 8)
**Dates**: May 6-10, 2024
**Focus Areas**:
- Competence and awareness
- Documentation management
- Operational planning and control
- Change management
- Incident management

**Auditees**:
- HR Manager
- Security Engineer
- DevOps Engineer
- System Administrator

**Estimated Effort**: 4 days

### Q3 2024: Performance Evaluation (Clause 9)
**Dates**: August 5-9, 2024
**Focus Areas**:
- Monitoring and measurement
- Internal audit program
- Management review process
- Compliance evaluation

**Auditees**:
- Compliance Officer
- SRE Team
- Technical Leads

**Estimated Effort**: 3 days

### Q4 2024: Improvement & Technical Controls (Clause 10 & Annex A)
**Dates**: November 4-15, 2024
**Focus Areas**:
- Nonconformity and corrective action
- Continual improvement
- Annex A controls sampling (focus on A.8 Technological)
- Follow-up on previous findings

**Auditees**:
- All departments
- Technical teams
- Management

**Estimated Effort**: 5 days

## Audit Methodology
- Risk-based approach
- Sampling where appropriate
- Interview, observation, evidence review
- Control testing for critical controls
- Follow ISO 19011 guidelines

## Deliverables
- Audit plan (this document)
- Audit checklists
- Audit working papers
- Audit findings register
- Quarterly audit reports
- Annual audit summary report

## Resources
- Lead Auditor: 15 days
- Technical Auditors: 20 days
- Administrative support: 5 days
```

### Audit Checklist Example

```markdown
# ISO 27001 Audit Checklist - Clause 6: Planning

**Audit Date**: 2024-02-05
**Auditor**: [Name]
**Auditee**: Risk Manager
**Location**: Virtual / Office

## 6.1: Actions to Address Risks and Opportunities

### 6.1.1: General
**Requirement**: Organization shall consider issues and requirements from 4.1 and 4.2 when planning ISMS

**Audit Question**: How does the organization identify risks and opportunities for the ISMS?

**Evidence Requested**:
- Risk assessment methodology
- Current risk register
- Risk assessment reports

**Findings**:
- ✅ Risk assessment methodology documented (v2.0, 2024-01-15)
- ✅ Risk register current and maintained (last update: 2024-01-20)
- ✅ Annual risk assessment completed 2024-01-20
- ℹ️ Observation: Consider more frequent risk reviews for critical systems (currently annual)

**Rating**: ✅ Conformance

---

### 6.1.2: Information Security Risk Assessment
**Requirement**: Organization shall establish and maintain risk assessment process

**Audit Questions**:
1. Is there a documented risk assessment process?
2. Are risk criteria defined and applied consistently?
3. Are information assets identified?
4. Are threats and vulnerabilities identified?
5. Is likelihood and impact assessed?
6. Is risk level determined?

**Evidence Requested**:
- Risk assessment procedure
- Risk criteria definition
- Asset inventory
- Threat and vulnerability assessment
- Risk calculation methodology

**Sample Testing**:
- Selected 5 random assets from inventory
- Verified threat/vulnerability identification
- Verified risk rating calculations

**Findings**:
- ✅ Risk assessment procedure (Doc-RA-001, v2.0)
- ✅ Risk criteria clearly defined and documented
- ✅ Asset inventory maintained in CMDB (347 assets)
- ✅ Sample testing: 5/5 assets properly assessed
- ⚠️ Minor: Risk assessment for "Legacy Database Server" last updated 8 months ago (exceeds 6-month threshold)

**Rating**: ⚠️ Minor Nonconformance

**Corrective Action Required**: 
- Update risk assessment for legacy systems
- Implement automated reminders for 6-month review cycle

---

### 6.1.3: Information Security Risk Treatment
**Requirement**: Organization shall establish risk treatment process

**Audit Questions**:
1. Is there a risk treatment plan?
2. Are risk owners assigned?
3. Are treatment options selected (accept, avoid, transfer, modify)?
4. Is residual risk accepted by management?

**Evidence Requested**:
- Risk treatment plan
- Risk owner assignments
- Management acceptance of residual risk
- Treatment implementation evidence

**Findings**:
- ✅ Risk treatment plan current (2024-01-25)
- ✅ All risks have assigned owners
- ✅ Treatment decisions documented and justified
- ✅ Residual risk formally accepted (Management Review 2024-01-30)
- ✅ Implementation status tracked in Jira

**Rating**: ✅ Conformance

---

## 6.2: Information Security Objectives

**Requirement**: Organization shall establish information security objectives

**Audit Questions**:
1. Are objectives established at relevant functions and levels?
2. Are objectives consistent with information security policy?
3. Are objectives measurable?
4. Are objectives communicated?
5. Are objectives monitored and updated?

**Evidence Requested**:
- Information security objectives document
- Objective measurements/KPIs
- Communication records
- Progress reports

**Findings**:
- ✅ Objectives documented for 2024 (approved 2024-01-15)
- ✅ Aligned with ISMS policy
- ✅ Objectives are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- ✅ Communicated in all-hands meeting (2024-01-20)
- ✅ Monthly progress tracking dashboard
- ℹ️ Observation: Consider adding objective related to cloud security posture

**Rating**: ✅ Conformance

---

## 6.3: Planning of Changes

**Requirement**: When changes are planned, they shall be carried out in a planned manner

**Audit Questions**:
1. Is there a change management process for ISMS changes?
2. Are changes risk-assessed?
3. Is change approval documented?

**Evidence Requested**:
- Change management procedure
- Recent ISMS changes
- Change approval records
- Risk assessments for changes

**Sample Testing**:
- Review 3 recent ISMS scope changes
- Verify approval and risk assessment

**Findings**:
- ✅ Change management procedure (Doc-CM-001, v1.5)
- ✅ Sample testing: 3/3 changes properly approved
- ✅ Risk assessments performed for all sampled changes
- ✅ Changes tracked in ServiceNow

**Rating**: ✅ Conformance

---

## Summary for Clause 6
- **Total Requirements Audited**: 4
- **Conformance**: 3
- **Minor Nonconformance**: 1
- **Major Nonconformance**: 0
- **Observations**: 2

**Overall Assessment**: Generally conforming with minor issues to address

## Action Items
1. **NC-2024-001**: Update risk assessment for legacy database server within 30 days
2. **NC-2024-001**: Implement automated risk assessment review reminders
3. **OBS-2024-001**: Consider increasing risk review frequency for critical systems
4. **OBS-2024-002**: Add cloud security posture objective for 2024
```

### Audit Finding Report Template

```markdown
# Audit Finding Report

**Finding ID**: NC-2024-001
**Audit**: Internal ISO 27001 Audit Q1-2024
**Date Identified**: 2024-02-05
**Auditor**: [Auditor Name]

## Classification
**Type**: ☐ Major Nonconformance  ☑ Minor Nonconformance  ☐ Observation  ☐ Positive Practice

**Severity**: Medium

## Requirement
**Standard**: ISO/IEC 27001:2022
**Clause**: 6.1.2 - Information Security Risk Assessment
**Requirement Text**: "The organization shall define and apply an information security risk assessment process that establishes and maintains information security risk criteria"

## Finding Description
Risk assessment for "Legacy Database Server (DB-LEGACY-01)" was last updated on 2023-06-15, which exceeds the organization's documented requirement for risk assessment reviews every 6 months.

## Evidence
- Asset: Legacy Database Server (DB-LEGACY-01)
- Last risk assessment: 2023-06-15
- Current date: 2024-02-05
- Time elapsed: ~8 months
- Organization standard: Risk assessments reviewed every 6 months (Risk Management Procedure v2.0, Section 4.3)

## Impact
- Potential for unidentified new risks
- Non-compliance with internal procedure
- Could result in major finding if not addressed by external audit

## Root Cause Analysis
Primary cause: Manual tracking of risk assessment review dates
Contributing factors:
- No automated reminders for reviews
- Resource constraints in Q3-2023
- Risk owner turnover (new owner assigned Q4-2023)

## Corrective Action Required

### Immediate (Within 30 days)
1. Conduct updated risk assessment for DB-LEGACY-01
2. Review all other legacy system risk assessments
3. Update any other overdue assessments

### Long-term (Within 90 days)
1. Implement automated reminder system for risk assessment reviews
2. Integrate risk assessment review dates into compliance dashboard
3. Add risk assessment review status to monthly compliance reports

**Responsible**: Risk Manager
**Target Completion Date**: 2024-03-05 (immediate), 2024-05-05 (long-term)

## Verification Plan
- Review updated risk assessment document
- Confirm automated reminder system operational
- Verify compliance dashboard includes risk review tracking
- Follow-up audit in Q2-2024 to verify effectiveness

## Auditee Response
[To be completed by auditee]

**Acknowledgement**: ☐ Agreed  ☐ Partially Agreed  ☐ Disagree

**Planned Actions**:
[Auditee to describe their corrective action plan]

**Proposed Completion Date**:

**Signature**: _________________ Date: _________

## Status Tracking
- ☐ Open
- ☐ In Progress
- ☐ Pending Verification
- ☐ Closed

**Last Updated**: 2024-02-05
**Updates**:
- 2024-02-05: Finding issued
```

### Control Testing Worksheet

```markdown
# Control Testing Worksheet

**Control ID**: A.8.8 - Management of Technical Vulnerabilities
**Audit Date**: 2024-02-07
**Auditor**: [Name]
**Control Owner**: Security Engineer

## Control Description
Information about technical vulnerabilities of information systems being used shall be obtained in a timely fashion, the organization's exposure to such vulnerabilities evaluated, and appropriate measures taken to address the associated risk.

## Control Objectives
- Timely awareness of technical vulnerabilities
- Assessment of organization's exposure
- Risk-based prioritization
- Timely remediation

## Testing Approach
**Method**: Inquiry, Observation, Evidence Review, Sample Testing
**Sample Size**: 20 vulnerabilities from last quarter
**Selection Method**: Random sampling across severity levels

## Test Procedures

### 1. Vulnerability Identification Process
**Test**: Verify automated vulnerability scanning is operational

**Procedure**:
- Review vulnerability scanner configuration
- Verify scan frequency and coverage
- Check scan completion logs

**Results**:
- ✅ Trivy scanner configured for container images
- ✅ Nessus scanner for infrastructure (weekly)
- ✅ Dependency scanning in GitHub Actions
- ✅ Scans running as scheduled (100% completion rate)
- ✅ Coverage: All production systems

**Evidence**: Scanner configuration, scan logs (Jan 2024)

---

### 2. Vulnerability Assessment
**Test**: Verify vulnerabilities are assessed for exposure and risk

**Procedure**:
- Review vulnerability assessment process
- Sample 20 vulnerabilities from Q4-2023
- Verify risk assessment performed

**Sample Results**:

| CVE ID | Severity | Affected System | Risk Assessment | Assessment Date | Assessor |
|--------|----------|-----------------|-----------------|-----------------|----------|
| CVE-2023-1234 | Critical | Gateway Service | High (Internet-facing) | 2023-10-15 | Security Eng |
| CVE-2023-2345 | High | Internal DB | Medium (Internal only) | 2023-10-20 | Security Eng |
| CVE-2023-3456 | Medium | Worker Node | Low (No data exposure) | 2023-11-05 | DevOps |
| ... | ... | ... | ... | ... | ... |

**Analysis**:
- ✅ 20/20 (100%) vulnerabilities had risk assessment
- ✅ Risk assessment documented with rationale
- ✅ Assessment completed within SLA (3 days for Critical/High)
- ✅ Appropriate assessors involved

**Evidence**: Vulnerability tracking system (Jira), risk assessment records

---

### 3. Remediation Process
**Test**: Verify vulnerabilities are remediated according to risk-based timelines

**Procedure**:
- Review remediation SLAs
- Check compliance with SLAs for sampled vulnerabilities
- Verify patch management process

**Remediation SLAs**:
- Critical: 7 days
- High: 30 days
- Medium: 90 days
- Low: Next maintenance window

**Sample Results**:
- Critical (5 vulnerabilities): 5/5 (100%) within SLA
- High (8 vulnerabilities): 7/8 (87.5%) within SLA
- Medium (5 vulnerabilities): 5/5 (100%) within SLA
- Low (2 vulnerabilities): 2/2 (100%) within SLA

**Issue Identified**:
- 1 High severity vulnerability remediated in 35 days (exceeded 30-day SLA)
- CVE-2023-2345: Delayed due to compatibility testing
- Exception approved by CISO (documented)

**Overall SLA Compliance**: 19/20 (95%)

**Evidence**: Remediation tracking, patch logs, exception approval

---

### 4. Communication & Reporting
**Test**: Verify vulnerability status is reported to stakeholders

**Procedure**:
- Review vulnerability reports
- Verify reporting frequency
- Check stakeholder distribution

**Results**:
- ✅ Weekly vulnerability status report to Security team
- ✅ Monthly executive summary to CISO
- ✅ Critical vulnerabilities escalated immediately (documented procedure)
- ✅ Dashboard available to relevant stakeholders

**Evidence**: Sample reports (Oct, Nov, Dec 2023), distribution lists

---

## Testing Summary

### Strengths
- Robust automated scanning across all systems
- Consistent risk assessment process
- Strong SLA compliance (95%)
- Clear communication and reporting

### Weaknesses
- One High severity SLA breach (with documented exception)
- Consider reducing High severity SLA from 30 to 14 days for Internet-facing systems

### Recommendations
1. Implement tiered SLAs based on system exposure
2. Add automated alerting for approaching SLA deadlines
3. Consider adding vulnerability metrics to compliance dashboard

## Control Effectiveness Rating
☑ Effective  ☐ Partially Effective  ☐ Ineffective

**Rationale**: Control is well-designed and operating effectively. Strong scanning coverage, consistent risk assessment, and high SLA compliance. Minor improvement opportunity with tiered SLAs.

## Auditor Conclusion
No findings. Control A.8.8 is effectively implemented and operating as intended.

**Auditor Signature**: _________________ Date: _________
**Control Owner Signature**: _________________ Date: _________
```

## Audit Best Practices

### Independence & Objectivity
- Maintain independence from audited activities
- Avoid conflicts of interest
- Provide objective, fact-based findings
- Separate fact from opinion
- Base conclusions on evidence

### Professional Competence
- Maintain audit skills and certifications (ISO 19011, CIA, CISA)
- Understand technical controls deeply
- Stay current with standards and regulations
- Continuous learning and development
- Seek guidance when needed

### Audit Quality
- Risk-based audit planning
- Adequate audit evidence collection
- Appropriate sampling methods
- Thorough documentation
- Clear and constructive findings
- Actionable recommendations

### Stakeholder Relations
- Build trust with auditees
- Clear communication throughout audit
- Focus on improvement, not blame
- Collaborative problem-solving
- Professional demeanor
- Follow-up on corrective actions

### Documentation
- Complete and accurate working papers
- Sufficient evidence to support findings
- Clear audit trail
- Timely report preparation
- Proper retention of audit records

## Tools & Technologies

### Audit Management
- **AuditBoard**: Audit workflow and documentation
- **SharePoint**: Audit file repository
- **Excel/Google Sheets**: Audit checklists and trackers
- **Teams/Zoom**: Virtual audit meetings

### Evidence Collection
- **Screenshot Tools**: Snagit, Greenshot
- **Azure Portal**: Cloud infrastructure evidence
- **GitHub**: Code and configuration evidence
- **Jira/ServiceNow**: Ticket and workflow evidence

### Analysis & Reporting
- **Excel**: Data analysis and sampling
- **Word/Google Docs**: Audit reports
- **Power BI**: Audit metrics dashboards
- **Visio/Draw.io**: Process flow diagrams

### Technical Review
- **kubectl**: Kubernetes inspection
- **Azure CLI**: Azure resource review
- **Git**: Code repository review
- **SonarQube**: Code quality review

## Related Personas

- **[Compliance Officer](./compliance-officer.md)**: Coordinate audit activities and programs
- **[Risk Manager](./risk-manager.md)**: Understand risk assessment and treatment
- **[Security Engineer](../040-technical-practitioner/security-engineer.md)**: Audit technical security controls
- **[System Administrator](../020-operations-professional/system-admin.md)**: Audit operational controls
- **[Data Protection Officer](./dpo.md)**: Audit data protection controls

## Additional Resources

- [ISO 19011:2018 - Guidelines for Auditing Management Systems](https://www.iso.org/standard/70017.html)
- [ISO/IEC 27001:2022 Standard](https://www.iso.org/standard/27001)
- [Certified Internal Auditor (CIA)](https://www.theiia.org/en/certifications/cia/)
- [Certified Information Systems Auditor (CISA)](https://www.isaca.org/credentialing/cisa)
- [ISACA Audit Guidelines](https://www.isaca.org/resources/it-audit)
