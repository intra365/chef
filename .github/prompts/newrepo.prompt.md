# New Repository Creation Prompt

**Purpose**: This prompt provides standardized instructions for creating new repositories within the Intra365 ecosystem to ensure consistency and alignment with architecture principles.

---

## 1. Repository Naming Conventions

### Pattern
- **Services**: `{service-name}` (lowercase, hyphen-separated)
- **Libraries**: `{library-name}` (lowercase, hyphen-separated)

### Examples
- **Services**: `sts`, `consent-manager`, `gateway`, `mate-registry`, `llm-proxy`, `backup-manager`
- **Libraries**: `common-auth`, `telemetry-sdk`, `service-mesh-client`

### Description Format
Use a clear, concise purpose statement that follows this pattern:
```
{Primary function} for {target system} - {Key differentiator}
```

**Examples**:
- `sts`: "Security Token Service for Intra365 - Zero-trust authentication with adaptive risk scoring"
- `consent-manager`: "Privacy consent management for Intra365 - GDPR/CCPA compliant adaptive consent"
- `gateway`: "API Gateway for Intra365 - Intelligent routing with rate limiting and security policies"

---

## 2. Repository Structure Guidelines

### Required Files (All Repositories)
```
.
├── README.md              # Project overview, setup instructions, usage
├── LICENSE                # Apache 2.0 or MIT
├── .gitignore            # Language/framework specific ignores
├── CHANGELOG.md          # Version history and release notes
└── .github/
    └── workflows/        # CI/CD pipelines
```

### Service Repository Structure
```
{service-name}/
├── README.md
├── LICENSE
├── .gitignore
├── CHANGELOG.md
├── Dockerfile            # Container image definition
├── .dockerignore
├── docs/
│   ├── ARCHITECTURE.md   # Service architecture and design decisions
│   ├── API.md           # API documentation (OpenAPI/Swagger)
│   ├── DEPLOYMENT.md    # Deployment runbooks and procedures
│   └── adr/             # Architecture Decision Records
│       └── 0001-example.md
├── src/                  # Source code (language-specific structure)
├── tests/                # Test suites
├── k8s/                  # Kubernetes manifests (Helm charts)
│   ├── base/
│   ├── overlays/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── prod/
│   └── values.yaml
├── config/               # Configuration files
│   └── default.yaml
└── .github/
    └── workflows/
        ├── ci.yml        # Continuous Integration
        ├── cd.yml        # Continuous Deployment
        ├── security-scan.yml
        └── sbom-generation.yml
```

### Reference
See `ARCHITECTURE.md` in the `happy-mates-intra365` specs repository for service definitions and component relationships.

---

## 3. Security & Compliance

### Zero-Trust Security Principles
All repositories must implement zero-trust security from the start:

✅ **Authentication**
- Never trust, always verify
- Implement mutual TLS (mTLS) for service-to-service communication
- Use short-lived tokens (max 1 hour TTL)
- Reference: `ZERO_TRUST_SECURITY.md` sections 2.1-2.3

✅ **Authorization**
- Fine-grained access control (attribute-based or role-based)
- Principle of least privilege
- Reference: `FUNCTIONAL_REQUIREMENTS.md` FR-1.2

✅ **Encryption**
- TLS 1.3 for all network communication
- Encrypt data at rest using AES-256
- Key rotation every 90 days
- Reference: `ZERO_TRUST_SECURITY.md` section 3.2

### SBOM Generation (NFR-4.6.x)
Every repository must generate Software Bill of Materials:

```yaml
# .github/workflows/sbom-generation.yml
name: Generate SBOM
on:
  push:
    branches: [main]
  release:
    types: [published]
jobs:
  sbom:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Generate SBOM
        uses: anchore/sbom-action@v0
        with:
          format: cyclonedx-json
          output-file: sbom.json
      - name: Upload SBOM
        uses: actions/upload-artifact@v4
        with:
          name: sbom
          path: sbom.json
```

### Vulnerability Scanning
Implement automated security scanning:

```yaml
# .github/workflows/security-scan.yml
name: Security Scan
on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 0 * * *'  # Daily scan
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'CRITICAL,HIGH'
      - name: Run Snyk security scan
        uses: snyk/actions@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

---

## 4. Initial Configuration

### Branch Protection Rules
Configure immediately after repository creation:

```bash
# Using GitHub CLI
gh repo create intra365/{service-name} --public --description "{description}"
cd {service-name}

# Set up branch protection
gh api repos/intra365/{service-name}/branches/main/protection \
  --method PUT \
  -f required_status_checks='{"strict":true,"contexts":["ci","security-scan"]}' \
  -f enforce_admins=true \
  -f required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1}' \
  -f restrictions=null
```

**Required Rules**:
- ✅ Require pull request reviews (minimum 1 approval)
- ✅ Require status checks to pass (CI, security scan)
- ✅ Require branches to be up to date
- ✅ Include administrators
- ✅ Require signed commits (recommended)

### Required CI/CD Workflows

#### Continuous Integration (ci.yml)
```yaml
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup environment
        # Language-specific setup
      - name: Install dependencies
        run: # Package manager install
      - name: Run linters
        run: # Lint command
      - name: Run tests
        run: # Test command
      - name: Generate coverage report
        run: # Coverage command
      - name: Upload coverage
        uses: codecov/codecov-action@v4
```

#### Continuous Deployment (cd.yml)
```yaml
name: CD
on:
  push:
    branches: [main]
    tags:
      - 'v*'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t intra365/{service-name}:${{ github.sha }} .
      - name: Push to registry
        # Push to container registry
      - name: Update Chef manifests
        # Create PR in chef repo with updated image tags
```

### Secrets Management
**Never commit secrets to Git!**

#### Local Development
```bash
# Use environment variables or .env files (gitignored)
# Example .env.example (commit this)
DATABASE_URL=postgresql://localhost:5432/dbname
AZURE_KEY_VAULT_URL=https://{vault-name}.vault.azure.net/
```

#### Production (Azure Key Vault via CSI Driver)
```yaml
# k8s/base/secretproviderclass.yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: {service-name}-secrets
spec:
  provider: azure
  parameters:
    keyvaultName: intra365-{env}-kv
    cloudName: AzurePublicCloud
    objects: |
      array:
        - |
          objectName: {service-name}-db-password
          objectType: secret
          objectVersion: ""
    tenantId: ${{ AZURE_TENANT_ID }}
```

**Reference**: `NON_FUNCTIONAL_REQUIREMENTS.md` NFR-4.5 (Secrets Management)

---

## 5. Service-Specific Considerations

### 5.1 STS (Security Token Service)

**Core Responsibilities**:
- Issue and validate JWT tokens
- Anomaly detection for authentication patterns
- Risk scoring based on context (location, device, behavior)
- Token revocation and session management

**Key Implementation Requirements**:
```yaml
# Required endpoints
POST /auth/login          # Authenticate and issue token
POST /auth/refresh        # Refresh access token
POST /auth/logout         # Revoke token
GET  /auth/validate       # Validate token
POST /auth/risk-score     # Calculate authentication risk
```

**Security Considerations**:
- Implement rate limiting (max 5 login attempts per IP per minute)
- Store session state in Redis with TTL
- Log all authentication events for audit
- Integrate with anomaly detection service

**Reference**: `FUNCTIONAL_REQUIREMENTS.md` FR-1 (Authentication & Authorization)

---

### 5.2 Consent Manager

**Core Responsibilities**:
- Manage user privacy consent preferences
- GDPR/CCPA compliance enforcement
- Audit trail for all consent changes
- Adaptive consent based on context

**Key Implementation Requirements**:
```yaml
# Required endpoints
POST /consent/grant       # Grant consent
POST /consent/revoke      # Revoke consent
GET  /consent/status      # Check consent status
GET  /consent/audit       # Get audit trail
POST /consent/export      # Export user data (GDPR)
DELETE /consent/forget    # Right to be forgotten (GDPR)
```

**Compliance Considerations**:
- Store consent with timestamp, version, and IP address
- Support consent expiration and renewal
- Implement consent proof (cryptographic signatures)
- Maintain immutable audit log (append-only)

**Reference**: `FUNCTIONAL_REQUIREMENTS.md` FR-3 (Privacy & Consent)

---

### 5.3 Mate Registry

**Core Responsibilities**:
- Service discovery and registration
- Capability metadata management
- Health check aggregation
- Service dependency graph

**Key Implementation Requirements**:
```yaml
# Required endpoints
POST /registry/register   # Register service
PUT  /registry/heartbeat  # Service heartbeat
GET  /registry/discover   # Discover services by capability
GET  /registry/health     # Aggregate health status
GET  /registry/dependencies # Service dependency graph
```

**Integration Considerations**:
- Support Kubernetes service discovery
- Cache service metadata for performance
- Implement circuit breaker for unhealthy services
- Expose Prometheus metrics

**Reference**: `ARCHITECTURE.md` section on Service Mesh

---

### 5.4 Gateway

**Core Responsibilities**:
- API routing and load balancing
- Rate limiting and throttling
- Request/response transformation
- Security policy enforcement

**Key Implementation Requirements**:
```yaml
# Configuration structure
routes:
  - path: /api/v1/auth/*
    service: sts
    rateLimit:
      requests: 100
      window: 60s
    security:
      requireAuth: true
      allowedRoles: [user, admin]
```

**Performance Considerations**:
- Implement request caching where appropriate
- Support circuit breaker pattern
- Enable request tracing (OpenTelemetry)
- Target: <100ms p95 latency

**Reference**: `NON_FUNCTIONAL_REQUIREMENTS.md` NFR-1 (Performance)

---

### 5.5 LLM Proxy

**Core Responsibilities**:
- Multi-provider LLM integration (OpenAI, Azure OpenAI, Anthropic)
- Cost tracking and budget management
- Request queuing and prioritization
- Response caching

**Key Implementation Requirements**:
```yaml
# Required endpoints
POST /llm/complete        # Text completion
POST /llm/chat            # Chat completion
POST /llm/embed           # Generate embeddings
GET  /llm/cost            # Cost tracking
GET  /llm/usage           # Usage statistics
```

**Cost Management**:
- Track token usage per request
- Implement budget alerts and limits
- Cache responses for identical requests (configurable TTL)
- Support fallback providers for redundancy

**Reference**: `FUNCTIONAL_REQUIREMENTS.md` FR-8 (LLM Integration)

---

### 5.6 Backup Manager

**Core Responsibilities**:
- Automated backup scheduling
- Disaster recovery orchestration
- Retention policy enforcement
- Backup verification and testing

**Key Implementation Requirements**:
```yaml
# Configuration structure
backups:
  - name: postgresql-backups
    source:
      type: postgresql
      connectionString: ${DATABASE_URL}
    schedule: "0 2 * * *"  # Daily at 2 AM
    retention:
      daily: 7
      weekly: 4
      monthly: 12
    encryption: true
    verification: true
```

**Disaster Recovery Considerations**:
- Support point-in-time recovery
- Test restore procedures automatically
- Store backups in geographically distributed locations
- Implement backup integrity verification

**Reference**: `NON_FUNCTIONAL_REQUIREMENTS.md` NFR-3 (Reliability & Availability)

---

## 6. Documentation Requirements

### 6.1 README.md
Every repository must have a comprehensive README:

```markdown
# {Service Name}

{One-line description}

## Overview
{2-3 paragraph overview of the service}

## Features
- Feature 1
- Feature 2

## Quick Start
\`\`\`bash
# Installation
# Configuration
# Running
\`\`\`

## Documentation
- [Architecture](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing](CONTRIBUTING.md)

## License
[License type]
```

### 6.2 Architecture Decision Records (ADRs)
Document significant architectural decisions:

```markdown
# ADR-0001: {Title}

## Status
{Proposed | Accepted | Deprecated | Superseded}

## Context
{What is the issue we're trying to solve?}

## Decision
{What decision did we make?}

## Consequences
{What are the positive and negative consequences?}

## Alternatives Considered
{What other options did we consider?}
```

**Location**: `docs/adr/NNNN-title.md`

### 6.3 API Documentation (OpenAPI/Swagger)
Use OpenAPI 3.0 specification:

```yaml
# docs/openapi.yaml
openapi: 3.0.0
info:
  title: {Service Name} API
  version: 1.0.0
  description: {Service description}
servers:
  - url: https://api.intra365.com/v1
paths:
  /endpoint:
    get:
      summary: {Summary}
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Response'
```

### 6.4 Deployment Runbooks
Document operational procedures in `docs/DEPLOYMENT.md`:

**Required Sections**:
- Prerequisites
- Deployment steps (dev, staging, prod)
- Rollback procedures
- Troubleshooting common issues
- Monitoring and alerting

**Performance Targets** (reference `NON_FUNCTIONAL_REQUIREMENTS.md`):
- Response time: <200ms p95 for API calls
- Throughput: >1000 requests/second
- Availability: 99.9% uptime
- Error rate: <0.1%

---

## 7. GitOps Integration

### 7.1 Chef Orchestration
All services are deployed and managed through the Chef repository:

**Convention**:
- Service manifests live in: `chef/k8s/{service-name}/`
- Chef monitors service repository tags
- On new tag, Chef automatically updates manifests and deploys

**Integration Steps**:
1. Create service repository with Kubernetes manifests in `k8s/` directory
2. Create corresponding directory in Chef: `chef/k8s/{service-name}/`
3. Set up automated sync workflow in service repo:

```yaml
# .github/workflows/sync-to-chef.yml
name: Sync to Chef
on:
  push:
    tags:
      - 'v*'
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Create Chef PR
        env:
          GH_TOKEN: ${{ secrets.CHEF_SYNC_TOKEN }}
        run: |
          # Clone Chef repo
          git clone https://github.com/intra365/chef.git
          cd chef
          
          # Create branch
          git checkout -b update-${{ github.event.repository.name }}-${{ github.ref_name }}
          
          # Copy manifests
          cp -r ../k8s/* k8s/${{ github.event.repository.name }}/
          
          # Update image tag
          sed -i "s|image: .*|image: intra365/${{ github.event.repository.name }}:${{ github.ref_name }}|" \
            k8s/${{ github.event.repository.name }}/base/deployment.yaml
          
          # Commit and push
          git add .
          git commit -m "Update ${{ github.event.repository.name }} to ${{ github.ref_name }}"
          git push origin update-${{ github.event.repository.name }}-${{ github.ref_name }}
          
          # Create PR
          gh pr create --title "Update ${{ github.event.repository.name }} to ${{ github.ref_name }}" \
            --body "Automated update from service repository"
```

### 7.2 Convention-Over-Configuration
Services follow conventions to minimize configuration:

**Naming Conventions**:
- Kubernetes namespace: `intra365-{env}` (e.g., `intra365-prod`)
- Service name: `{service-name}-svc`
- Deployment name: `{service-name}-deployment`
- ConfigMap: `{service-name}-config`
- Secret: `{service-name}-secrets`

**Port Conventions**:
- HTTP: 8080
- HTTPS: 8443
- Metrics: 9090
- Health: 8081

### 7.3 Multi-Domain Support

**MSOPS Domain** (Microsoft 365 Operations):
- Services that integrate with Microsoft 365 APIs
- Examples: `msops-mail-sync`, `msops-user-provisioning`

**INTRA Domain** (Internal Services):
- Core platform services
- Examples: `sts`, `consent-manager`, `gateway`

**Configuration**:
```yaml
# k8s/base/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {service-name}-config
data:
  DOMAIN: "INTRA"  # or "MSOPS"
  ENVIRONMENT: "prod"
  SERVICE_MESH_ENABLED: "true"
```

---

## 8. Creation Checklist

Use this checklist when creating a new repository:

### Initial Setup
- [ ] Create repository: `gh repo create intra365/{service-name} --public`
- [ ] Add description following naming conventions
- [ ] Initialize with README.md
- [ ] Add LICENSE file (Apache 2.0 or MIT)
- [ ] Create .gitignore (language/framework specific)

### Security & Compliance
- [ ] Configure branch protection rules
- [ ] Set up SBOM generation workflow
- [ ] Set up vulnerability scanning workflow
- [ ] Configure Dependabot for dependency updates
- [ ] Set up secret scanning
- [ ] Create SecretProviderClass for Azure Key Vault

### CI/CD
- [ ] Create CI workflow (build, test, lint)
- [ ] Create CD workflow (build image, deploy)
- [ ] Create sync-to-chef workflow
- [ ] Configure status checks in branch protection

### Documentation
- [ ] Write comprehensive README.md
- [ ] Create docs/ARCHITECTURE.md
- [ ] Create docs/API.md (with OpenAPI spec)
- [ ] Create docs/DEPLOYMENT.md
- [ ] Set up docs/adr/ directory with template

### Service Implementation
- [ ] Implement health check endpoint (`/health`)
- [ ] Implement readiness endpoint (`/ready`)
- [ ] Implement metrics endpoint (`/metrics`) with Prometheus format
- [ ] Add OpenTelemetry tracing
- [ ] Implement structured logging (JSON format)

### Kubernetes Manifests
- [ ] Create k8s/base/ with core manifests
- [ ] Create k8s/overlays/dev/
- [ ] Create k8s/overlays/staging/
- [ ] Create k8s/overlays/prod/
- [ ] Define resource requests and limits
- [ ] Configure HorizontalPodAutoscaler

### Chef Integration
- [ ] Create corresponding directory in Chef repo
- [ ] Test sync workflow
- [ ] Verify deployment in dev environment
- [ ] Document any Chef-specific configuration

### Testing & Validation
- [ ] Write unit tests (>80% coverage)
- [ ] Write integration tests
- [ ] Test in dev environment
- [ ] Perform security scan
- [ ] Verify SBOM generation
- [ ] Test disaster recovery procedures (if applicable)

---

## 9. Quick Start Commands

### Create New Service Repository
```bash
# 1. Create repository
gh repo create intra365/{service-name} \
  --public \
  --description "{Service description}" \
  --clone

cd {service-name}

# 2. Initialize basic structure
mkdir -p .github/workflows docs/adr k8s/{base,overlays/{dev,staging,prod}} src tests config

# 3. Create README
cat > README.md << 'EOF'
# {Service Name}

{Description}

## Quick Start
[To be documented]

## Documentation
- [Architecture](docs/ARCHITECTURE.md)
- [API](docs/API.md)
- [Deployment](docs/DEPLOYMENT.md)
EOF

# 4. Create LICENSE
gh api repos/intra365/{service-name}/license \
  --raw-field license=apache-2.0

# 5. Create .gitignore
curl -sL https://www.toptal.com/developers/gitignore/api/{language} > .gitignore

# 6. Initial commit
git add .
git commit -m "Initial commit"
git push origin main

# 7. Set up branch protection
gh api repos/intra365/{service-name}/branches/main/protection \
  --method PUT \
  -f required_status_checks='{"strict":true,"contexts":["ci"]}' \
  -f enforce_admins=true \
  -f required_pull_request_reviews='{"required_approving_review_count":1}'
```

---

## 10. References

### Specification Documents
All specifications are in the `happy-mates-intra365` repository:

- **`ARCHITECTURE.md`**: Core components, system design, service definitions
- **`FUNCTIONAL_REQUIREMENTS.md`**: 
  - FR-1: Authentication & Authorization (zero-trust)
  - FR-2: Service Mesh & Communication
  - FR-3: Privacy & Consent Management
  - FR-4: Monitoring & Observability
  - FR-5-13: Service-specific requirements
- **`NON_FUNCTIONAL_REQUIREMENTS.md`**: 
  - NFR-1: Performance targets
  - NFR-2: Scalability
  - NFR-3: Reliability & Availability
  - NFR-4: Security & Compliance
  - NFR-5: Maintainability
- **`ZERO_TRUST_SECURITY.md`**: Security architecture patterns, authentication flows, encryption standards

### External Resources
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Azure Key Vault CSI Driver](https://secrets-store-csi-driver.sigs.k8s.io/)
- [OpenTelemetry](https://opentelemetry.io/)
- [OpenAPI Specification](https://swagger.io/specification/)

---

## Notes on Neurodiversity-Friendly Communication

This document follows these principles:
- ✅ **Clear structure**: Numbered sections, consistent formatting
- ✅ **Unambiguous language**: Specific requirements, no implicit assumptions
- ✅ **Practical examples**: Concrete code snippets and commands
- ✅ **Checklists**: Step-by-step validation
- ✅ **Visual hierarchy**: Headers, bullet points, code blocks
- ✅ **Explicit references**: Line numbers and section references where helpful

---

**Last Updated**: 2025-10-30  
**Version**: 1.0.0  
**Maintained By**: Intra365 Platform Team
