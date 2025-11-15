---
id: devops-engineer
title: DevOps Engineer
sidebar_label: DevOps Engineer
sidebar_position: 3
persona_type: specialized
parent_persona: technical-practitioner
---

# DevOps Engineer

DevOps Engineers bridge the gap between development and operations, building and maintaining the infrastructure, deployment pipelines, and automation that enable rapid, reliable software delivery.

## Role Profile

### Primary Responsibilities
- Design and maintain CI/CD pipelines
- Manage infrastructure as code
- Automate deployment processes
- Configure and maintain Kubernetes clusters
- Implement monitoring and observability
- Manage secrets and configuration
- Optimize build and deployment times

### Key Skills
- Kubernetes administration and operations
- CI/CD tools (GitHub Actions, GitLab CI, etc.)
- Infrastructure as Code (Terraform, Helm, Kustomize)
- Container technologies (Docker, containerd)
- Cloud platforms (Azure, AWS, GCP)
- Scripting (Bash, Python, Go)
- GitOps methodologies

### Daily Activities
- Reviewing and optimizing pipeline runs
- Troubleshooting deployment failures
- Updating Helm charts and Kustomize overlays
- Managing cluster resources and scaling
- Implementing infrastructure changes
- Responding to automation alerts

## Documentation Priorities

### Essential Reading
1. **[GitOps Workflow](/docs/architecture/gitops-workflow)** - Core deployment methodology
2. **[Deployment Pipeline](/docs/architecture/deployment-pipeline)** - Pipeline architecture and stages
3. **[Azure AKS Setup](/docs/infrastructure/azure-aks-setup)** - Kubernetes cluster configuration
4. **[GitHub Actions Workflows](/docs/deployment-workflows/github-actions-workflows)** - CI/CD implementation

### Infrastructure Management
- **[Infrastructure Overview](/docs/infrastructure/)** - Complete infrastructure guide
- **[Networking](/docs/infrastructure/networking)** - Network architecture and policies
- **[Storage](/docs/infrastructure/storage)** - Persistent storage configuration
- **[Secrets Management](/docs/infrastructure/secrets-management)** - Managing sensitive data
- **[Observability](/docs/infrastructure/observability)** - Monitoring and logging

### Deployment Workflows
- **[Deployment Overview](/docs/deployment-workflows/deployment-overview)** - Deployment strategies
- **[Conventional Deployments](/docs/deployment-workflows/conventional-deployments)** - Standard processes
- **[Helm Charts](/docs/deployment-workflows/helm-charts)** - Chart development and management
- **[Kustomize Overlays](/docs/deployment-workflows/kustomize-overlays)** - Environment-specific configs
- **[Rollback Procedures](/docs/deployment-workflows/rollback-procedures)** - Handling failures
- **[Zero Downtime Updates](/docs/deployment-workflows/zero-downtime-updates)** - Production deployments

### Scaling and Performance
- **[Scaling Strategy](/docs/infrastructure/scaling-strategy)** - Auto-scaling configuration
- **[Disaster Recovery](/docs/infrastructure/disaster-recovery)** - Backup and recovery procedures
- **[Multi-Environment](/docs/architecture/multi-environment)** - Managing multiple environments

## Common Tasks

### Managing CI/CD Pipelines

#### Viewing Pipeline Status

```bash
# Check recent workflow runs
gh run list --repo intra365/intra365-chef --limit 10

# Watch a specific run
gh run watch <run-id>

# View logs for failed job
gh run view <run-id> --log-failed
```

#### Triggering Manual Deployments

```bash
# Trigger deployment workflow
gh workflow run deploy.yml \
  --ref main \
  --field environment=production \
  --field service=intra365-sts

# Monitor the deployment
gh run watch
```

### Working with Helm Charts

#### Creating a New Chart

```bash
# Create chart from template
helm create services/my-service

# Customize values
cat > services/my-service/values.yaml <<EOF
replicaCount: 3
image:
  repository: intra365.azurecr.io/my-service
  tag: latest
service:
  type: ClusterIP
  port: 80
ingress:
  enabled: true
  hosts:
    - host: my-service.intra365.io
      paths: [/]
EOF

# Test the chart
helm template my-service services/my-service

# Lint the chart
helm lint services/my-service
```

#### Deploying with Helm

```bash
# Install release
helm install my-service services/my-service \
  --namespace production \
  --values environments/production/values.yaml

# Upgrade release
helm upgrade my-service services/my-service \
  --namespace production \
  --values environments/production/values.yaml

# Rollback if needed
helm rollback my-service 0 --namespace production
```

### Managing Kustomize Overlays

#### Structure

```
k8s/
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
└── overlays/
    ├── development/
    │   ├── kustomization.yaml
    │   └── patches/
    ├── staging/
    │   ├── kustomization.yaml
    │   └── patches/
    └── production/
        ├── kustomization.yaml
        └── patches/
```

#### Applying Overlays

```bash
# Preview changes
kubectl kustomize overlays/production

# Apply to cluster
kubectl apply -k overlays/production

# Diff before applying
kubectl diff -k overlays/production
```

### Infrastructure as Code

#### Terraform Operations

```bash
# Initialize Terraform
terraform init

# Plan changes
terraform plan -out=tfplan

# Apply changes
terraform apply tfplan

# Show current state
terraform show

# Refresh state
terraform refresh
```

#### Managing Kubernetes Resources

```bash
# Apply manifests
kubectl apply -f manifests/

# View deployments
kubectl get deployments -n production

# Check pod status
kubectl get pods -n production -w

# View logs
kubectl logs -f deployment/my-service -n production

# Describe resource
kubectl describe deployment my-service -n production

# Scale deployment
kubectl scale deployment my-service --replicas=5 -n production
```

### Secrets Management

#### Azure Key Vault Integration

```bash
# Create secret in Key Vault
az keyvault secret set \
  --vault-name intra365-kv \
  --name my-secret \
  --value "secret-value"

# Sync to Kubernetes
kubectl create secret generic my-secret \
  --from-literal=value="$(az keyvault secret show \
    --vault-name intra365-kv \
    --name my-secret \
    --query value -o tsv)" \
  --namespace production

# Or use External Secrets Operator
kubectl apply -f - <<EOF
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: my-secret
  namespace: production
spec:
  secretStoreRef:
    name: azure-keyvault
    kind: SecretStore
  target:
    name: my-secret
  data:
  - secretKey: value
    remoteRef:
      key: my-secret
EOF
```

### Monitoring and Observability

#### Checking Metrics

```bash
# View resource usage
kubectl top nodes
kubectl top pods -n production

# Query Prometheus
curl -G 'http://prometheus:9090/api/v1/query' \
  --data-urlencode 'query=up{job="kubernetes-pods"}'

# View Grafana dashboards
# Navigate to https://grafana.intra365.io
```

#### Log Analysis

```bash
# Stream logs from all pods
kubectl logs -f -l app=my-service -n production

# Get logs from previous container
kubectl logs my-service-pod --previous -n production

# Export logs to file
kubectl logs deployment/my-service -n production > logs.txt
```

## Troubleshooting

### Pipeline Failures

#### Build Issues

```bash
# Check action logs
gh run view <run-id> --log

# Re-run failed jobs
gh run rerun <run-id> --failed

# Debug with tmate (add to workflow)
- name: Setup tmate session
  if: failure()
  uses: mxschmitt/action-tmate@v3
```

#### Deployment Failures

```bash
# Check deployment status
kubectl rollout status deployment/my-service -n production

# View rollout history
kubectl rollout history deployment/my-service -n production

# Rollback deployment
kubectl rollout undo deployment/my-service -n production

# Pause/resume rollout
kubectl rollout pause deployment/my-service -n production
kubectl rollout resume deployment/my-service -n production
```

### Infrastructure Issues

#### Pod Failures

```bash
# Describe pod for events
kubectl describe pod <pod-name> -n production

# Check logs
kubectl logs <pod-name> -n production --previous

# Execute commands in pod
kubectl exec -it <pod-name> -n production -- /bin/sh

# Check resource constraints
kubectl get resourcequota -n production
kubectl get limitrange -n production
```

#### Network Issues

```bash
# Test pod connectivity
kubectl run test-pod --rm -it --image=busybox -- /bin/sh
# Inside pod:
wget -O- http://my-service.production.svc.cluster.local

# Check network policies
kubectl get networkpolicies -n production
kubectl describe networkpolicy <policy-name> -n production

# Inspect service endpoints
kubectl get endpoints my-service -n production
```

## Best Practices

### CI/CD Pipeline Design
- Keep pipelines fast (< 10 minutes ideal)
- Run tests in parallel when possible
- Cache dependencies between runs
- Use matrix builds for multi-platform
- Fail fast on critical errors
- Provide clear error messages

### Infrastructure as Code
- Version control all infrastructure code
- Use modules for reusable components
- Document all configuration options
- Test changes in non-production first
- Use remote state with locking
- Tag resources consistently

### Deployment Strategy
- Always use rolling updates
- Define proper readiness probes
- Set appropriate resource limits
- Use PodDisruptionBudgets
- Enable horizontal pod autoscaling
- Monitor deployment metrics

### Security
- Scan container images for vulnerabilities
- Use minimal base images
- Never commit secrets to git
- Rotate secrets regularly
- Use RBAC for access control
- Enable pod security policies

### Observability
- Implement structured logging
- Export metrics in Prometheus format
- Create meaningful alerts
- Use distributed tracing
- Monitor SLIs and SLOs
- Set up dashboards for each service

## Career Growth

### Junior to Mid-Level
- Master Kubernetes fundamentals
- Learn multiple CI/CD tools
- Understand infrastructure as code
- Develop scripting skills
- Learn cloud platform services

### Mid-Level to Senior
- Design complex deployment strategies
- Optimize infrastructure costs
- Implement advanced monitoring
- Lead infrastructure initiatives
- Mentor junior engineers

### Senior to Lead
- Define DevOps strategy
- Establish platform standards
- Guide multiple teams
- Make tooling decisions
- Drive cultural change

## Related Personas

- **[Developer](./developer.md)**: Support with deployment needs
- **[SRE](./sre.md)**: Collaborate on reliability and performance
- **[Security Engineer](./security-engineer.md)**: Implement security controls
- **[System Administrator](../operations-professional/system-admin.md)**: Manage infrastructure together
- **[Enterprise Architect](../strategic-decision-maker/enterprise-architect.md)**: Align with architectural decisions
