---
id: sre
title: Site Reliability Engineer (SRE)
sidebar_label: SRE
sidebar_position: 4
persona_type: specialized
parent_persona: technical-practitioner
---

# Site Reliability Engineer (SRE)

Site Reliability Engineers apply software engineering principles to operations, ensuring services run reliably, performantly, and efficiently at scale. SREs balance feature velocity with system reliability through measurement, automation, and engineering practices.

## Role Profile

### Primary Responsibilities
- Define and monitor Service Level Objectives (SLOs)
- Implement automated incident response and remediation
- Manage on-call rotations and incident response
- Conduct post-incident reviews and root cause analysis
- Build self-healing systems and automation
- Optimize system performance and resource utilization
- Manage capacity planning and scaling
- Ensure high availability and disaster recovery

### Key Skills
- Deep understanding of distributed systems
- Strong software engineering fundamentals
- Production operations experience
- Monitoring and observability expertise
- Incident management and troubleshooting
- Performance analysis and optimization
- Automation and tooling development
- Statistical analysis for reliability metrics

### Daily Activities
- Monitoring service health and SLIs
- Responding to incidents and alerts
- Writing automation tools and scripts
- Reviewing metrics and dashboards
- Conducting capacity planning
- Participating in architecture reviews
- Improving observability and monitoring
- Conducting postmortems

## Documentation Priorities

### Essential Reading
1. **[Observability](../../010-guides/030-infrastructure/05-observability.md)** - Monitoring and logging infrastructure
2. **[Scaling Strategy](../../010-guides/030-infrastructure/07-scaling-strategy.md)** - Auto-scaling and capacity management
3. **[Disaster Recovery](../../010-guides/030-infrastructure/06-disaster-recovery.md)** - Backup and recovery procedures
4. **[Incident Response](../../010-guides/070-operations-runbooks/02-incident-response.md)** - Handling production incidents

### Reliability Engineering
- **[Zero Downtime Updates](../../010-guides/040-deployment-workflows/08-zero-downtime-updates.md)** - Production deployments
- **[Rollback Procedures](../../010-guides/040-deployment-workflows/06-rollback-procedures.md)** - Recovery from failures
- **[Canary Deployments](../../010-guides/040-deployment-workflows/07-canary-deployments.md)** - Progressive rollouts
- **[Multi-Environment](../../010-guides/020-architecture/06-multi-environment.md)** - Environment management

### Performance and Scaling
- **[Performance Tuning](../../010-guides/070-operations-runbooks/06-scaling-operations.md)** - Optimization techniques
- **[Capacity Planning](../../010-guides/070-operations-runbooks/06-scaling-operations.md)** - Resource forecasting
- **[Load Testing](../../010-guides/070-operations-runbooks/08-health-checks.md)** - Performance validation

### Security and Compliance
- **[Security Monitoring](../../010-guides/060-security-compliance/010-core-security/07-audit-logging.md)** - Security event tracking
- **[Vulnerability Management](../../010-guides/060-security-compliance/010-core-security/08-vulnerability-management.md)** - Security response

## Common Tasks

### Service Level Management

#### Defining SLOs

```yaml
# SLO definition example
apiVersion: slo.intra365.io/v1
kind: ServiceLevelObjective
metadata:
  name: api-availability
  service: intra365-gateway
spec:
  description: "API Gateway availability SLO"
  sli:
    type: availability
    query: |
      sum(rate(http_requests_total{job="gateway",code!~"5.."}[5m]))
      /
      sum(rate(http_requests_total{job="gateway"}[5m]))
  objective:
    target: 99.9  # 99.9% availability
    window: 30d
  alerting:
    burn_rate_alerts:
      - severity: critical
        burn_rate: 14.4
        window: 1h
      - severity: warning
        burn_rate: 6
        window: 6h
```

#### Monitoring SLIs

```bash
# Query current SLI value
curl -G 'http://prometheus:9090/api/v1/query' \
  --data-urlencode 'query=sum(rate(http_requests_total{job="gateway",code!~"5.."}[5m]))/sum(rate(http_requests_total{job="gateway"}[5m]))'

# Check error budget
kubectl get slo api-availability -o jsonpath='{.status.errorBudget}'

# View SLO dashboard
open https://grafana.intra365.io/d/slo-overview
```

### Incident Response

#### Incident Workflow

```bash
# Step 1: Acknowledge alert
kubectl annotate alert <alert-name> \
  incident.intra365.io/acknowledged=true \
  incident.intra365.io/owner=<your-name>

# Step 2: Create incident ticket
gh issue create \
  --title "INCIDENT: Service degradation in production" \
  --label incident \
  --assignee @me \
  --body "Severity: High
Start Time: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Impact: API latency increased to 2s p99
SLO Status: Burning error budget at 10x rate"

# Step 3: Gather diagnostic information
kubectl logs -l app=gateway --since=30m > incident-logs.txt
kubectl top pods -n production
kubectl get events -n production --sort-by='.lastTimestamp'

# Step 4: Implement mitigation
kubectl scale deployment gateway --replicas=10 -n production

# Step 5: Monitor recovery
watch kubectl get pods -n production
```

#### Post-Incident Review

```markdown
# Post-Incident Review: API Gateway Latency Spike

## Incident Summary
- **Date**: 2024-01-15
- **Duration**: 45 minutes
- **Severity**: High
- **Impact**: API latency increased from 100ms to 2s (p99)
- **Services Affected**: intra365-gateway
- **Error Budget**: Consumed 2.5% of monthly budget

## Timeline
- **14:30 UTC**: Alert fired for high latency
- **14:32 UTC**: On-call engineer acknowledged
- **14:35 UTC**: Identified database connection pool exhaustion
- **14:40 UTC**: Scaled gateway pods from 5 to 10
- **14:50 UTC**: Latency returned to normal
- **15:15 UTC**: Incident resolved

## Root Cause
Database connection pool size was insufficient for traffic spike caused by new feature launch.

## Resolution
- Immediate: Scaled gateway pods to increase total connections
- Short-term: Increased connection pool size configuration
- Long-term: Implement connection pool monitoring and auto-scaling

## Action Items
- [ ] Add connection pool metrics to dashboard
- [ ] Create alert for pool exhaustion
- [ ] Implement connection pool auto-scaling
- [ ] Load test new features before launch
- [ ] Document connection pool tuning guide

## Lessons Learned
- Need better visibility into connection pool metrics
- Should have load tested the new feature
- Auto-scaling should consider connection pool capacity
```

### Monitoring and Alerting

#### Custom Prometheus Rules

```yaml
# prometheus-rules.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: sre-alerts
  namespace: monitoring
spec:
  groups:
    - name: reliability
      interval: 30s
      rules:
        # Error rate alert
        - alert: HighErrorRate
          expr: |
            sum(rate(http_requests_total{code=~"5.."}[5m])) by (service)
            /
            sum(rate(http_requests_total[5m])) by (service)
            > 0.01
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "High error rate for {{ $labels.service }}"
            description: "{{ $labels.service }} error rate is {{ $value | humanizePercentage }}"
        
        # Latency alert
        - alert: HighLatency
          expr: |
            histogram_quantile(0.99,
              sum(rate(http_request_duration_seconds_bucket[5m])) by (service, le)
            ) > 1
          for: 10m
          labels:
            severity: warning
          annotations:
            summary: "High latency for {{ $labels.service }}"
            description: "{{ $labels.service }} p99 latency is {{ $value }}s"
        
        # Error budget alert
        - alert: ErrorBudgetBurning
          expr: |
            slo_error_budget_remaining_ratio < 0.1
          labels:
            severity: critical
          annotations:
            summary: "Error budget critically low for {{ $labels.slo }}"
            description: "Only {{ $value | humanizePercentage }} error budget remaining"
```

### Performance Optimization

#### Profiling Applications

```bash
# CPU profiling
kubectl exec -n production gateway-pod-xxx -- \
  curl localhost:6060/debug/pprof/profile?seconds=30 > cpu.prof

# Memory profiling  
kubectl exec -n production gateway-pod-xxx -- \
  curl localhost:6060/debug/pprof/heap > mem.prof

# Analyze with pprof
go tool pprof -http=:8080 cpu.prof

# Query traces
kubectl port-forward -n monitoring svc/jaeger-query 16686:16686
open http://localhost:16686
```

#### Database Query Optimization

```sql
-- Identify slow queries
SELECT 
  mean_exec_time,
  calls,
  query
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC
LIMIT 20;

-- Check missing indexes
SELECT 
  schemaname,
  tablename,
  seq_scan,
  idx_scan
FROM pg_stat_user_tables
WHERE seq_scan > 1000
  AND idx_scan = 0
ORDER BY seq_scan DESC;

-- Analyze query plan
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 123;
```

### Automation and Tooling

#### Auto-Remediation Script

```python
#!/usr/bin/env python3
"""
Auto-remediation for common issues
"""
import subprocess
import requests
from datetime import datetime

def check_pod_health(namespace, service):
    """Check if pods are healthy"""
    result = subprocess.run(
        ['kubectl', 'get', 'pods', '-n', namespace, 
         '-l', f'app={service}', '-o', 'json'],
        capture_output=True, text=True
    )
    pods = json.loads(result.stdout)
    
    unhealthy = []
    for pod in pods['items']:
        status = pod['status']['phase']
        if status != 'Running':
            unhealthy.append(pod['metadata']['name'])
    
    return unhealthy

def restart_unhealthy_pods(namespace, pods):
    """Restart unhealthy pods"""
    for pod in pods:
        print(f"Deleting unhealthy pod: {pod}")
        subprocess.run(['kubectl', 'delete', 'pod', pod, '-n', namespace])

def scale_if_needed(namespace, service, max_replicas=20):
    """Auto-scale based on load"""
    # Get current metrics
    cpu_usage = get_cpu_usage(namespace, service)
    
    if cpu_usage > 80:
        current_replicas = get_current_replicas(namespace, service)
        new_replicas = min(current_replicas + 2, max_replicas)
        
        print(f"Scaling {service} from {current_replicas} to {new_replicas}")
        subprocess.run([
            'kubectl', 'scale', f'deployment/{service}',
            f'--replicas={new_replicas}', '-n', namespace
        ])

if __name__ == '__main__':
    namespace = 'production'
    service = 'gateway'
    
    # Check and remediate
    unhealthy = check_pod_health(namespace, service)
    if unhealthy:
        restart_unhealthy_pods(namespace, unhealthy)
    
    scale_if_needed(namespace, service)
```

## Best Practices

### Reliability Engineering
- Define clear SLOs based on user experience
- Maintain error budgets and respect them
- Automate toil away (target less than 50% toil)
- Build observability into systems from the start
- Practice chaos engineering regularly
- Design for failure and degradation

### Incident Management
- Clear escalation paths and on-call procedures
- Blameless postmortems always
- Focus on detection and mitigation time
- Track MTTR and MTTD metrics
- Create runbooks for common issues
- Share learnings across organization

### Monitoring and Alerting
- Alert on symptoms, not causes
- Keep alert fatigue low (target less than 5 alerts/week per person)
- Make alerts actionable
- Use multi-window multi-burn-rate alerts for SLOs
- Implement proper alert routing and escalation
- Review and tune alerts regularly

### Capacity Planning
- Monitor resource trends continuously
- Plan for 6-12 months ahead
- Account for seasonal patterns
- Load test before major events
- Keep headroom for failover
- Document capacity limits

## Career Growth

### Junior to Mid-Level
- Master monitoring and alerting tools
- Learn incident response procedures
- Understand distributed systems basics
- Develop automation skills
- Practice capacity planning

### Mid-Level to Senior
- Design reliability into systems
- Lead incident response
- Build complex automation
- Define SLOs and error budgets
- Mentor on-call engineers

### Senior to Lead/Staff
- Define SRE strategy and practices
- Establish reliability standards
- Build SRE culture
- Guide multiple teams
- Influence architecture for reliability

## Related Personas

- **[DevOps Engineer](./devops-engineer.md)**: Collaborate on infrastructure and deployments
- **[Developer](./developer.md)**: Guide on reliability requirements
- **[System Administrator](../020-operations-professional/system-admin.md)**: Work together on operations
- **[Security Engineer](./security-engineer.md)**: Implement security monitoring
- **[Enterprise Architect](../030-strategic-decision-maker/enterprise-architect.md)**: Influence reliability requirements
