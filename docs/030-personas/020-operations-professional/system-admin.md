---
id: system-admin
title: System Administrator
sidebar_label: System Administrator
sidebar_position: 1
persona_type: specialized
parent_persona: operations-professional
---

# System Administrator

System Administrators are responsible for managing and maintaining the servers, Kubernetes infrastructure, and system configurations that power the Intra365 platform. They ensure systems are running optimally, properly configured, and available to users.

## Role Profile

### Primary Responsibilities
- Manage Kubernetes cluster operations and health
- Configure and maintain server infrastructure
- Implement and maintain system configurations
- Monitor system performance and capacity
- Manage user access and permissions
- Perform system updates and patches
- Troubleshoot system-level issues
- Document system configurations and procedures

### Key Skills
- Deep knowledge of Linux/Unix system administration
- Kubernetes cluster administration
- Azure infrastructure management
- Configuration management tools
- Shell scripting (Bash, PowerShell)
- Understanding of networking and security
- Experience with monitoring and logging tools
- Capacity planning and performance tuning

### Daily Activities
- Monitoring system health and performance metrics
- Responding to system alerts and incidents
- Performing routine maintenance tasks
- Managing system updates and patches
- Reviewing system logs for issues
- Configuring new services and resources
- Documenting system changes

## Documentation Priorities

### Essential Reading
1. **[Azure AKS Setup](../../010-guides/030-infrastructure/01-azure-aks-setup.md)** - Kubernetes cluster configuration
2. **[System Architecture](../../010-guides/020-architecture/01-system-architecture.md)** - Overall system design
3. **[Observability](../../010-guides/030-infrastructure/05-observability.md)** - Monitoring and logging
4. **[Disaster Recovery](../../010-guides/030-infrastructure/06-disaster-recovery.md)** - Backup and recovery procedures

### Infrastructure Management
- **[Infrastructure Overview](../../010-guides/030-infrastructure/01-azure-aks-setup.md)** - Complete infrastructure guide
- **[Networking](../../010-guides/030-infrastructure/02-networking.md)** - Network architecture and configuration
- **[Storage](../../010-guides/030-infrastructure/03-storage.md)** - Persistent storage management
- **[Scaling Strategy](../../010-guides/030-infrastructure/07-scaling-strategy.md)** - Auto-scaling and capacity planning

### Operations & Maintenance
- **[Health Checks](../../010-guides/070-operations-runbooks/08-health-checks.md)** - System health monitoring
- **[Incident Response](../../010-guides/070-operations-runbooks/02-incident-response.md)** - Handling incidents
- **[Backup and Restore](../../010-guides/070-operations-runbooks/04-backup-restore.md)** - Data protection
- **[Patching and Updates](../../010-guides/070-operations-runbooks/05-certificate-renewal.md)** - System maintenance

### Troubleshooting
- **[Cluster Issues](../../010-guides/080-troubleshooting/01-common-issues.md)** - Kubernetes troubleshooting
- **[Performance Issues](../../010-guides/080-troubleshooting/05-performance-debugging.md)** - Performance tuning

## Common Tasks

### Kubernetes Cluster Management

```bash
# Check cluster status
kubectl cluster-info
kubectl get nodes -o wide
kubectl top nodes

# View cluster resource usage
kubectl get resourcequotas --all-namespaces
kubectl get limitranges --all-namespaces

# Check pod status across all namespaces
kubectl get pods --all-namespaces --field-selector=status.phase!=Running

# Describe node details
kubectl describe node <node-name>

# Drain node for maintenance
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data

# Uncordon node after maintenance
kubectl uncordon <node-name>
```

### System Resource Management

```bash
# Check disk usage
df -h
du -sh /var/lib/kubelet/* | sort -h

# Monitor system resources
top
htop
iostat -x 1

# Check memory usage
free -h
cat /proc/meminfo

# View system logs
journalctl -u kubelet -f
journalctl -u containerd -f

# Clean up unused Docker resources
docker system prune -a --volumes
```

### Configuration Management

```bash
# View ConfigMaps
kubectl get configmaps -n intra365
kubectl describe configmap <configmap-name> -n intra365

# Edit ConfigMap
kubectl edit configmap <configmap-name> -n intra365

# View and manage namespaces
kubectl get namespaces
kubectl describe namespace intra365

# Check resource quotas
kubectl describe resourcequota -n intra365

# Apply configuration changes
kubectl apply -f config/namespace.yaml
kubectl apply -f config/resource-quota.yaml
```

### User Access Management

```bash
# List service accounts
kubectl get serviceaccounts --all-namespaces

# View RBAC roles
kubectl get roles --all-namespaces
kubectl get clusterroles

# Check permissions for service account
kubectl auth can-i --list --as=system:serviceaccount:intra365:default

# Create new service account
kubectl create serviceaccount my-service-account -n intra365

# Bind role to service account
kubectl create rolebinding my-binding \
  --role=admin \
  --serviceaccount=intra365:my-service-account \
  -n intra365
```

### Monitoring and Health Checks

```bash
# Check pod health
kubectl get pods -n intra365 -o wide
kubectl describe pod <pod-name> -n intra365

# View pod logs
kubectl logs -n intra365 <pod-name> --tail=100 -f
kubectl logs -n intra365 <pod-name> --previous

# Check events
kubectl get events -n intra365 --sort-by='.lastTimestamp'
kubectl get events --all-namespaces --watch

# Port-forward for debugging
kubectl port-forward -n intra365 svc/<service-name> 8080:80

# Execute command in pod
kubectl exec -it -n intra365 <pod-name> -- /bin/bash
```

### System Maintenance

```yaml
# Example: PodDisruptionBudget for maintenance
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: intra365-pdb
  namespace: intra365
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: intra365-service
```

```bash
# Apply node affinity for workload distribution
kubectl label nodes <node-name> workload-type=database

# Cordon node (prevent new pods)
kubectl cordon <node-name>

# Update node labels
kubectl label nodes <node-name> environment=production

# Taint node for dedicated workloads
kubectl taint nodes <node-name> dedicated=database:NoSchedule
```

## System Administration Best Practices

### Capacity Planning
- Monitor resource trends over time
- Set up alerts for resource thresholds (80% CPU, memory)
- Plan for growth and scale infrastructure proactively
- Regular capacity reviews and forecasting
- Document baseline performance metrics

### Security Hardening
- Keep systems patched and up-to-date
- Implement least privilege access
- Use network policies to restrict traffic
- Enable audit logging for all administrative actions
- Regular security reviews and compliance checks

### High Availability
- Ensure critical services have multiple replicas
- Configure pod disruption budgets
- Use anti-affinity rules for pod distribution
- Test failover procedures regularly
- Document recovery time objectives (RTO)

### Change Management
- Document all configuration changes
- Use version control for infrastructure code
- Test changes in non-production environments first
- Implement rollback procedures
- Communicate changes to stakeholders

### Monitoring and Alerting
- Set up comprehensive monitoring coverage
- Configure meaningful alerts (avoid alert fatigue)
- Create runbooks for common issues
- Review metrics dashboards regularly
- Conduct post-incident reviews

## Tools & Technologies

### Kubernetes Management
- **kubectl**: Command-line tool for Kubernetes
- **k9s**: Terminal UI for Kubernetes
- **Lens**: Kubernetes IDE
- **Helm**: Package manager for Kubernetes

### Monitoring & Observability
- **Prometheus**: Metrics collection and alerting
- **Grafana**: Visualization and dashboards
- **Azure Monitor**: Cloud monitoring service
- **ELK Stack**: Log aggregation and analysis

### Infrastructure Management
- **Terraform**: Infrastructure as Code
- **Azure CLI**: Azure resource management
- **Azure Portal**: Web-based management interface
- **Kustomize**: Kubernetes configuration management

### Automation
- **Bash/Shell**: System automation
- **Python**: Advanced automation and tooling
- **Ansible**: Configuration management
- **GitHub Actions**: CI/CD automation

## Related Personas

- **[DevOps Engineer](../040-technical-practitioner/devops-engineer.md)**: Collaborate on infrastructure automation and deployment pipelines
- **[SRE](../040-technical-practitioner/sre.md)**: Work together on reliability and performance
- **[Network Administrator](./network-admin.md)**: Coordinate on network configuration and connectivity
- **[Database Administrator](./database-admin.md)**: Support database infrastructure and performance
- **[Support Engineer](./support-engineer.md)**: Assist with system-level troubleshooting

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [Azure Kubernetes Service Documentation](https://docs.microsoft.com/en-us/azure/aks/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/)
- [Linux System Administrator's Guide](https://tldp.org/LDP/sag/html/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
