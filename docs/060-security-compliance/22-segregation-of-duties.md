---
sidebar_position: 22
---

# Segregation of Duties

## ISO 27001:2022 Control

**Control**: A.5.3 - Segregation of duties

## Overview

This document provides guidance for implementing and maintaining segregation of duties controls for the Intra365 platform in accordance with ISO 27001:2022 requirements.

## Control Objective

The objective of this control is to ensure appropriate security measures are in place to protect information assets and support business operations.

## Applicability

- **Status**: Applicable
- **Implementation Status**: In Progress
- **Owner**: CISO
- **Review Date**: Quarterly

## Control Requirements

### What Must Be Done

Segregation of duties (SoD) must be implemented according to ISO 27001:2022 requirements:

1. **Identify Conflicting Duties**: Determine which combinations of roles or activities could lead to fraud, error, or security breaches
2. **Separate Incompatible Functions**: Ensure that no single person has control over all phases of a critical process
3. **Implement Dual Controls**: Require multiple people for sensitive operations
4. **Enforce Through Technical Controls**: Use system-level controls to prevent SoD violations
5. **Monitor and Review**: Regularly audit role assignments and access rights
6. **Document Exceptions**: Any SoD exceptions must be documented with compensating controls

### Core SoD Principles

- **No single person should initiate and approve the same transaction**
- **Development and production environments must be separated**
- **Security administration should be independent from system administration**
- **Financial authorization should be separate from transaction initiation**
- **Audit functions must be independent from operational functions**

### Conflicting Role Combinations

| Role Combination | Conflict Level | Allowed | Compensating Controls | Review Frequency |
|------------------|----------------|---------|----------------------|------------------|
| **Developer + Production Admin** | 🔴 High | ✗ Prohibited | Separate accounts if necessary | N/A |
| **Security Admin + System Admin** | 🟡 Medium | ✓ With approval | Enhanced logging + reviews | Quarterly |
| **Financial Approver + Requestor** | 🔴 High | ✗ Prohibited | Different approver required | N/A |
| **Data Owner + Data Custodian** | 🟢 Low | ✓ Small teams only | Documentation required | Semi-annual |
| **Auditor + System Owner** | 🔴 High | ✗ Prohibited | Independent audit required | N/A |
| **Developer + Code Reviewer** | 🟡 Medium | ✗ Same code | Peer review required | Per commit |
| **Backup Admin + Restore Admin** | 🟢 Low | ✓ With logging | Enhanced monitoring | Quarterly |
| **User Provisioning + Access Review** | 🟡 Medium | ✓ With approval | Management oversight | Quarterly |

## Implementation Guidance

### For Intra365

Intra365 implements segregation of duties through multiple layers:

#### 1. Development vs Production Separation

**Environment Access Matrix**:

| Environment | Developer Access | Deployment Method | Data Sensitivity | Approval Required | Monitoring |
|-------------|------------------|-------------------|------------------|-------------------|------------|
| **Development** | ✓ Full access | Direct/CI-CD | Synthetic data only | Manager | Standard |
| **Testing/QA** | ✓ Limited | CI-CD pipeline | Masked/anonymized | Manager | Standard |
| **Staging** | ✓ Read-only | CI-CD pipeline | Masked production data | Manager + QA | Enhanced |
| **Production** | ✗ View-only | CI-CD + approval | Live data | Manager + Security + CAB | Maximum |
| **DR/Backup** | ✗ Prohibited | Automated only | Live data | Security + Ops | Maximum |

**Technical Implementation**:

```yaml
# Azure DevOps Pipeline - Production Deployment
trigger: none # Manual trigger only

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: Build
  jobs:
  - job: Build
    steps:
    - script: npm run build
    
- stage: Deploy_Production
  dependsOn: Build
  condition: succeeded()
  jobs:
  - deployment: DeployProd
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'Production'
              appName: 'intra365-prod'
    # Requires manual approval in Azure DevOps environment settings
    # Approval required from: Security Team + Operations Manager
```

**Kubernetes RBAC for Environment Separation**:

```yaml
# Developers - Dev namespace only
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developers-dev-access
  namespace: development
subjects:
- kind: Group
  name: developers
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer-role
  apiGroup: rbac.authorization.k8s.io

---
# Production - Read-only for developers
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developers-prod-readonly
  namespace: production
subjects:
- kind: Group
  name: developers
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
```

#### 2. Approval Workflow Requirements

**Multi-Level Approval Matrix**:

| Action Type | Single Approval | Dual Approval | Management Level | Security Review | Change Board |
|-------------|----------------|---------------|------------------|-----------------|--------------|
| **Standard Access Request** | ✓ Manager | No | Line manager | No | No |
| **Elevated Privilege** | No | ✓ Manager + Security | Senior manager | ✓ Required | No |
| **Production Access** | No | ✓ Manager + Ops | Manager | ✓ Required | Notification |
| **Break-Glass Access** | Emergency only | Post-event | Security officer | ✓ Post-event | ✓ Required |
| **Third-Party Access** | No | ✓ Manager + Security | Senior manager | ✓ Required | Notification |
| **Privileged Account** | No | ✓ Dual control | Senior manager | ✓ Required | ✓ Required |
| **Production Deployment** | No | ✓ Tech lead + Ops | Manager | Automated | ✓ Required |
| **Database Schema Change** | No | ✓ DBA + App owner | Manager | Review | ✓ Required |

**Approval Workflow Implementation**:

```typescript
// Example approval workflow in code
interface ApprovalRequest {
  type: 'production-access' | 'elevated-privilege' | 'schema-change';
  requestor: User;
  justification: string;
  duration?: Duration;
}

class ApprovalWorkflow {
  async requestApproval(request: ApprovalRequest): Promise<ApprovalResult> {
    const approvers = this.getRequiredApprovers(request.type);
    
    // Send approval requests
    const approvalTasks = approvers.map(approver => 
      this.sendApprovalRequest(approver, request)
    );
    
    // Wait for all approvals (dual approval)
    const results = await Promise.all(approvalTasks);
    
    // Log approval process
    await this.auditLog.logApproval(request, results);
    
    return this.processApprovalResults(results);
  }
  
  private getRequiredApprovers(type: string): Approver[] {
    const approverMatrix = {
      'production-access': ['manager', 'ops-lead', 'security-team'],
      'elevated-privilege': ['manager', 'security-officer'],
      'schema-change': ['dba-lead', 'app-owner']
    };
    return approverMatrix[type] || [];
  }
}
```

#### 3. Code Review and Deployment Controls

**Code Review Requirements**:

- **All production code** requires peer review before merge
- **Developers cannot approve their own code** (enforced via GitHub branch protection)
- **Minimum two reviewers** for critical components
- **Security review required** for authentication, authorization, cryptography changes

**GitHub Branch Protection Rules**:

```json
{
  "required_pull_request_reviews": {
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "require_last_push_approval": true
  },
  "required_status_checks": {
    "strict": true,
    "contexts": ["security-scan", "unit-tests", "integration-tests"]
  },
  "enforce_admins": true,
  "restrictions": {
    "users": [],
    "teams": ["senior-developers"],
    "apps": ["github-actions"]
  }
}
```

#### 4. Financial and Business Process Controls

**Financial Transaction Segregation**:

| Role | Initiate Request | Approve Request | Process Transaction | Reconcile | Audit |
|------|-----------------|----------------|-------------------|-----------|-------|
| **Requestor** | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Manager** | ✗ | ✓ | ✗ | ✗ | ✗ |
| **Finance Team** | ✗ | ✗ | ✓ | ✓ | ✗ |
| **Controller** | ✗ | ✗ | ✗ | ✓ | ✗ |
| **Auditor** | ✗ | ✗ | ✗ | ✗ | ✓ |

**Procurement Approval Thresholds**:

| Amount | Approver 1 | Approver 2 | Approver 3 |
|--------|-----------|-----------|-----------|
| **< $1,000** | Line Manager | - | - |
| **$1,000 - $10,000** | Department Head | Finance | - |
| **$10,000 - $50,000** | Director | CFO | - |
| **> $50,000** | VP/C-level | CFO | CEO |

#### 5. Security Operations Segregation

**Security Role Separation**:

| Function | Security Analyst | Security Engineer | Security Admin | CISO |
|----------|-----------------|------------------|---------------|------|
| **Monitor Security Events** | ✓ Primary | ✓ Secondary | ✗ | ✗ |
| **Investigate Incidents** | ✓ Primary | ✓ Support | ✗ | ✗ |
| **Configure Security Tools** | ✗ | ✓ Primary | ✓ Approval | ✗ |
| **Modify Security Policies** | ✗ | ✓ Propose | ✓ Implement | ✓ Approve |
| **Grant Admin Access** | ✗ | ✗ | ✓ Execute | ✓ Approve |
| **Audit Security Controls** | ✓ Support | ✗ | ✗ | ✓ Oversee |

#### 6. Database Administration Segregation

**Database Role Separation**:

```sql
-- Separate roles for different DBA functions
CREATE ROLE dba_schema_manager;
GRANT CREATE, ALTER, DROP ON SCHEMA public TO dba_schema_manager;

CREATE ROLE dba_data_manager;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO dba_data_manager;

CREATE ROLE dba_security_manager;
GRANT CREATE ROLE, ALTER ROLE, DROP ROLE TO dba_security_manager;

CREATE ROLE dba_monitor;
GRANT SELECT ON pg_stat_activity, pg_stat_database TO dba_monitor;

-- No single user has all privileges
-- Production DBA team members assigned specific roles based on responsibility
```

#### 7. Backup and Recovery Segregation

**Backup/Recovery Role Matrix**:

| Role | Schedule Backups | Perform Backups | Access Backups | Restore Data | Test Restores | Audit Logs |
|------|-----------------|----------------|---------------|--------------|---------------|------------|
| **Backup Admin** | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Recovery Admin** | ✗ | ✗ | ✓ With approval | ✓ With approval | ✓ | ✗ |
| **Ops Manager** | ✗ | ✗ | ✗ | ✓ Approve | ✓ Approve | ✓ |
| **Security Team** | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |

#### 8. Cloud Infrastructure Segregation

**Azure Role Assignments**:

| Function | Network Admin | Compute Admin | Security Admin | Subscription Admin |
|----------|--------------|---------------|----------------|-------------------|
| **Modify NSGs** | ✓ | ✗ | Review | ✗ |
| **Create VMs** | ✗ | ✓ | ✗ | ✗ |
| **Configure Firewall** | ✓ | ✗ | Review | ✗ |
| **Manage Key Vault** | ✗ | ✗ | ✓ | ✗ |
| **Assign RBAC** | ✗ | ✗ | ✓ | ✓ Approve |
| **View Cost Data** | ✗ | ✓ | ✗ | ✓ |
| **Subscription Settings** | ✗ | ✗ | ✗ | ✓ |

**Terraform State Management**:

```hcl
# Separate Terraform workspaces and state backends
terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstateprod"
    container_name       = "production-state"
    key                  = "infrastructure.tfstate"
  }
}

# Access control via Azure RBAC
# Infrastructure team: Can plan changes
# Senior engineers: Can apply changes (with approval)
# Security team: Read-only access to state
```

#### 9. Monitoring and Audit Separation

**Audit Independence**:

- Internal audit team reports to CEO/Board, not IT
- External auditors selected independently
- Audit logs immutable and stored in separate system
- Security team monitors audit log access

**Separation Implementation**:

```yaml
# Azure Policy - Audit Log Protection
{
  "mode": "All",
  "policyRule": {
    "if": {
      "allOf": [
        {
          "field": "type",
          "equals": "Microsoft.Storage/storageAccounts"
        },
        {
          "field": "tags.purpose",
          "equals": "audit-logs"
        }
      ]
    },
    "then": {
      "effect": "append",
      "details": [
        {
          "field": "Microsoft.Storage/storageAccounts/allowBlobPublicAccess",
          "value": false
        },
        {
          "field": "Microsoft.Storage/storageAccounts/immutableStorageWithVersioning.enabled",
          "value": true
        }
      ]
    }
  }
}
```

## Verification and Evidence

### How to Verify Compliance

- **Access Rights Review**: Quarterly review of role assignments
- **Conflict Detection**: Automated scanning for SoD violations
- **Approval Audits**: Review approval workflows and dual-control enforcement
- **Environment Separation**: Verify production access restrictions
- **Code Review Compliance**: Check that all merges have required approvals
- **Financial Controls Testing**: Sample testing of approval thresholds
- **Incident Analysis**: Review security incidents for SoD violations

### Evidence Requirements

- **Role Assignment Matrix**: Current role assignments and responsibilities
- **Approval Workflow Logs**: Records of dual approvals for sensitive operations
- **Code Review Records**: GitHub PR approvals and review comments
- **Access Review Reports**: Quarterly access recertification results
- **Environment Access Logs**: Production access attempts and approvals
- **Conflict Reports**: Automated SoD conflict detection results
- **Training Records**: SoD awareness training completion

### Automated Compliance Checks

**Daily Checks**:

- Scan for SoD violations in Azure AD role assignments
- Verify branch protection rules on all repositories
- Check for developers with production access
- Monitor privileged account usage

**Weekly Reports**:

- SoD compliance dashboard
- Approval workflow statistics
- Role assignment changes
- Exception status report

**Monthly Audits**:

- Comprehensive SoD review
- Exception review and reauthorization
- Control effectiveness assessment

## Integration with Existing Systems

This control integrates with:

- **ISMS Framework**: Core control for information security management
- **Risk Management Process**: SoD violations are key risks to manage
- **[Network Access Control Model](./124-network-access-control-model.md)**: Access control enforcement
- **[Privileged Access Rights](./71-privileged-access-rights.md)**: Privileged account segregation
- **[Zero Trust Architecture](./01-zero-trust-architecture.md)**: Continuous verification of access
- **Change Management**: CAB approval workflows enforce segregation
- **Incident Response**: Independent investigation and remediation

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

- **SoD Violation Rate**: Number of detected SoD violations (target: 0)
- **Exception Count**: Active SoD exceptions with compensating controls (target: minimize)
- **Approval Compliance**: Percentage of sensitive operations with required approvals (target: 100%)
- **Code Review Compliance**: PRs merged with required approvals (target: 100%)
- **Access Review Completion**: Quarterly access reviews completed on time (target: 100%)
- **Production Access Attempts**: Unauthorized production access attempts by developers (target: 0)
- **Dual Control Compliance**: Sensitive operations with dual approval (target: 100%)
- **Environment Separation**: Developers with production write access (target: 0)
- **Training Completion**: SoD awareness training completion (target: 100%)

## Review and Maintenance

- **Review Frequency**: Quarterly minimum
- **Update Triggers**: Security incidents, audit findings, regulatory changes
- **Approval Required**: CISO

## References

- ISO/IEC 27001:2022 - Information security management systems
- ISO/IEC 27002:2022 - Code of practice for information security controls
- Intra365 Security Policies and Procedures

---

**Questions or feedback?** [Open an issue](https://github.com/intra365/chef/issues) or [start a discussion](https://github.com/intra365/chef/discussions).
