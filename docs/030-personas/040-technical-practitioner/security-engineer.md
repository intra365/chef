---
id: security-engineer
title: Security Engineer
sidebar_label: Security Engineer
sidebar_position: 3
persona_type: specialized
parent_persona: technical-practitioner
---

# Security Engineer

Security Engineers are responsible for implementing and maintaining security controls, conducting security assessments, and ensuring the Intra365 platform meets security and compliance requirements.

## Role Profile

### Primary Responsibilities
- Implement security controls and policies
- Conduct security assessments and penetration testing
- Monitor security events and respond to incidents
- Manage vulnerability assessments and remediation
- Ensure compliance with security standards (ISO 27001, RAISE 2.0)
- Configure and maintain security tools
- Review code and infrastructure for security issues
- Document security procedures and incidents

### Key Skills
- Deep understanding of security principles and best practices
- Experience with security tools (SIEM, vulnerability scanners, IDS/IPS)
- Knowledge of cloud security (Azure, Kubernetes)
- Understanding of compliance frameworks (ISO 27001, GDPR, RAISE 2.0)
- Proficiency in scripting (Python, Bash) for automation
- Experience with container security and network policies
- Knowledge of cryptography and secure coding practices

### Daily Activities
- Monitoring security dashboards and alerts
- Reviewing security logs and investigating anomalies
- Conducting vulnerability scans and assessments
- Implementing security patches and updates
- Participating in incident response activities
- Reviewing pull requests for security issues
- Updating security documentation

## Documentation Priorities

### Essential Reading
1. **[Zero Trust Architecture](../../010-guides/060-security-compliance/010-core-security/01-zero-trust-architecture.md)** - Core security model
2. **[Security Gates](../../010-guides/060-security-compliance/010-core-security/03-security-gates.md)** - Security checkpoints in CI/CD
3. **[Container Security](../../010-guides/060-security-compliance/010-core-security/04-container-security.md)** - Securing containers and images
4. **[Network Policies](../../010-guides/060-security-compliance/010-core-security/05-network-policies.md)** - Network segmentation and access control

### Security & Compliance
- **[RAISE 2.0 Compliance](../../010-guides/060-security-compliance/010-core-security/02-raise-2-0-compliance.md)** - Norwegian public sector security requirements
- **[ISO 27001 Overview](../../010-guides/060-security-compliance/020-iso27001-compliance/10-iso27001-overview.md)** - Information security management
- **[Audit Logging](../../010-guides/060-security-compliance/010-core-security/07-audit-logging.md)** - Security event logging
- **[Vulnerability Management](../../010-guides/060-security-compliance/010-core-security/08-vulnerability-management.md)** - Vulnerability tracking and remediation

### Infrastructure Security
- **[Secrets Management](../../010-guides/030-infrastructure/04-secrets-management.md)** - Secure secret storage and rotation
- **[Observability](../../010-guides/030-infrastructure/05-observability.md)** - Security monitoring and alerting
- **[DDoS Protection](../../010-guides/030-infrastructure/09-ddos-protection.md)** - DDoS mitigation strategies

### Operations
- **[Incident Response](../../010-guides/070-operations-runbooks/02-incident-response.md)** - Security incident handling
- **[Security Alerts](../../010-guides/080-troubleshooting/06-security-alerts.md)** - Responding to security alerts

## Common Tasks

### Reviewing Security Scans

```bash
# Run vulnerability scan on container images
trivy image intra365/service-name:latest --severity HIGH,CRITICAL

# Check for security misconfigurations
kubesec scan deployment.yaml

# Scan infrastructure as code
checkov -d ./terraform
```

### Investigating Security Alerts

```bash
# Query security logs
kubectl logs -n intra365 -l app=gateway --since=1h | grep "403\|401"

# Check network policies
kubectl get networkpolicies -n intra365

# Review pod security policies
kubectl get psp
```

### Implementing Security Controls

```yaml
# Example: Network Policy for service isolation
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: service-isolation
  namespace: intra365
spec:
  podSelector:
    matchLabels:
      app: sensitive-service
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: api-gateway
      ports:
        - protocol: TCP
          port: 8080
```

### Conducting Security Assessments

```bash
# Scan Kubernetes cluster for security issues
kube-bench run --targets master,node,policies

# Check RBAC permissions
kubectl auth can-i --list --as=system:serviceaccount:intra365:default

# Review secret encryption
kubectl get secrets -A -o json | jq '.items[].metadata.name'
```

## Security Best Practices

### Zero Trust Implementation
- Never trust, always verify all requests
- Implement least privilege access
- Use mutual TLS for service-to-service communication
- Continuously monitor and validate security posture

### Secrets Management
- Never commit secrets to Git
- Rotate secrets regularly
- Use Azure Key Vault for secret storage
- Implement secret scanning in CI/CD pipelines

### Container Security
- Scan images for vulnerabilities before deployment
- Use minimal base images
- Run containers as non-root users
- Implement pod security policies
- Keep images updated with latest security patches

### Network Security
- Implement network segmentation
- Use network policies to restrict traffic
- Enable Azure Firewall for external traffic
- Monitor network traffic for anomalies

## Security Incident Response

### Incident Classification
1. **Critical**: Data breach, system compromise, ransomware
2. **High**: Unauthorized access attempt, DoS attack, critical vulnerability
3. **Medium**: Failed login attempts, minor vulnerabilities, policy violations
4. **Low**: Security warnings, informational alerts

### Response Workflow
1. **Detect**: Identify the security incident from alerts or reports
2. **Contain**: Isolate affected systems to prevent spread
3. **Investigate**: Analyze logs and evidence to understand the scope
4. **Remediate**: Apply fixes and patches to resolve the issue
5. **Document**: Record incident details and lessons learned
6. **Review**: Conduct post-incident review and update procedures

## Tools & Technologies

### Security Monitoring
- **Azure Security Center**: Cloud security posture management
- **Azure Sentinel**: SIEM and SOAR capabilities
- **Falco**: Runtime security for Kubernetes
- **Prometheus + Grafana**: Metrics and alerting

### Vulnerability Management
- **Trivy**: Container image scanning
- **Snyk**: Dependency vulnerability scanning
- **Checkov**: Infrastructure as code security
- **OWASP ZAP**: Web application security testing

### Compliance & Auditing
- **Azure Policy**: Compliance enforcement
- **Open Policy Agent (OPA)**: Policy enforcement
- **Audit2rbac**: RBAC auditing
- **kube-bench**: CIS Kubernetes benchmark

## Related Personas

- **[DevOps Engineer](./devops-engineer.md)**: Collaborate on secure CI/CD pipelines
- **[SRE](./sre.md)**: Work together on security monitoring and incident response
- **[Compliance Officer](../010-governance-compliance/compliance-officer.md)**: Ensure compliance with regulatory requirements
- **[Technical Lead](../030-strategic-decision-maker/technical-lead.md)**: Guide team on security architecture decisions

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes)
- [Azure Security Best Practices](https://docs.microsoft.com/en-us/azure/security/fundamentals/best-practices-and-patterns)
- [Kubernetes Security Documentation](https://kubernetes.io/docs/concepts/security/)
