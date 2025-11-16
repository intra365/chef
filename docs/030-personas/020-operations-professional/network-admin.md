---
id: network-admin
title: Network Administrator
sidebar_label: Network Administrator
sidebar_position: 3
persona_type: specialized
parent_persona: operations-professional
---

# Network Administrator

Network Administrators are responsible for designing, implementing, and maintaining the network infrastructure that connects services, clusters, and users within the Intra365 platform. They manage Azure networking, Kubernetes network policies, load balancing, and ensure secure, reliable connectivity.

## Role Profile

### Primary Responsibilities
- Design and implement network architecture
- Configure and manage Azure networking resources
- Implement Kubernetes network policies
- Manage load balancers and ingress controllers
- Monitor network performance and troubleshoot connectivity issues
- Configure firewall rules and security groups
- Ensure network security and compliance
- Document network configurations and topologies

### Key Skills
- Deep understanding of networking protocols (TCP/IP, DNS, HTTP/HTTPS)
- Azure networking services (VNet, NSG, Load Balancer, Application Gateway)
- Kubernetes networking (Services, Ingress, Network Policies)
- Network security and firewall configuration
- Load balancing and traffic management
- VPN and connectivity solutions
- Network troubleshooting and packet analysis
- Infrastructure as Code for network resources

### Daily Activities
- Monitoring network performance and connectivity
- Reviewing network traffic patterns and anomalies
- Troubleshooting network connectivity issues
- Implementing network policy changes
- Managing DNS records and routing rules
- Responding to network-related incidents
- Reviewing security group and firewall rules

## Documentation Priorities

### Essential Reading
1. **[Networking](../../010-guides/030-infrastructure/02-networking.md)** - Network architecture overview
2. **[System Architecture](../../010-guides/020-architecture/01-system-architecture.md)** - Overall system design
3. **[Network Policies](../../010-guides/060-security-compliance/010-core-security/05-network-policies.md)** - Kubernetes network security
4. **[Zero Trust Architecture](../../010-guides/060-security-compliance/010-core-security/01-zero-trust-architecture.md)** - Network security model

### Infrastructure
- **[Azure AKS Setup](../../010-guides/030-infrastructure/01-azure-aks-setup.md)** - Kubernetes networking configuration
- **[DDoS Protection](../../010-guides/030-infrastructure/09-ddos-protection.md)** - DDoS mitigation strategies
3. **[Multi-Environment](../../010-guides/020-architecture/06-multi-environment.md)** - Network segmentation across environments

### Service Configuration
- **[Intra365 Gateway](../../010-guides/050-service-configurations/05-intra365-gateway.md)** - API Gateway and routing
- **[NATS Infrastructure](../../010-guides/050-service-configurations/07-nats-infrastructure.md)** - Message bus networking

### Security
- **[Container Security](../../010-guides/060-security-compliance/010-core-security/04-container-security.md)** - Container networking security
- **[Security Gates](../../010-guides/060-security-compliance/010-core-security/03-security-gates.md)** - Network security checkpoints

### Troubleshooting
- **[Network Issues](../../010-guides/080-troubleshooting/03-networking-issues.md)** - Network troubleshooting guide
- **[Performance Issues](../../010-guides/080-troubleshooting/05-performance-debugging.md)** - Network performance optimization

## Common Tasks

### Azure Network Management

```bash
# List Virtual Networks
az network vnet list --resource-group intra365-rg --output table

# Show VNet details
az network vnet show \
  --resource-group intra365-rg \
  --name intra365-vnet

# List subnets
az network vnet subnet list \
  --resource-group intra365-rg \
  --vnet-name intra365-vnet \
  --output table

# Create new subnet
az network vnet subnet create \
  --resource-group intra365-rg \
  --vnet-name intra365-vnet \
  --name new-subnet \
  --address-prefixes 10.1.3.0/24

# View Network Security Groups
az network nsg list --resource-group intra365-rg --output table

# Show NSG rules
az network nsg rule list \
  --resource-group intra365-rg \
  --nsg-name intra365-nsg \
  --output table

# Add NSG rule
az network nsg rule create \
  --resource-group intra365-rg \
  --nsg-name intra365-nsg \
  --name allow-https \
  --priority 100 \
  --source-address-prefixes '*' \
  --destination-port-ranges 443 \
  --protocol Tcp \
  --access Allow
```

### Kubernetes Network Policies

```yaml
# Example: Default deny all ingress traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: intra365
spec:
  podSelector: {}
  policyTypes:
    - Ingress

---
# Example: Allow traffic from specific namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-gateway
  namespace: intra365
spec:
  podSelector:
    matchLabels:
      app: backend-service
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: gateway
        - podSelector:
            matchLabels:
              app: gateway
      ports:
        - protocol: TCP
          port: 8080

---
# Example: Allow egress to database
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-db-egress
  namespace: intra365
spec:
  podSelector:
    matchLabels:
      app: backend-service
  policyTypes:
    - Egress
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: postgresql
      ports:
        - protocol: TCP
          port: 5432
    - to:
        - namespaceSelector:
            matchLabels:
              name: kube-system
      ports:
        - protocol: UDP
          port: 53
```

```bash
# List network policies
kubectl get networkpolicies -n intra365

# Describe network policy
kubectl describe networkpolicy allow-from-gateway -n intra365

# Test network connectivity
kubectl run test-pod -n intra365 --image=busybox --rm -it -- sh
# Inside pod:
wget -O- http://backend-service:8080/health
nc -zv postgresql 5432
```

### Load Balancer Configuration

```bash
# List load balancers
az network lb list --resource-group intra365-rg --output table

# Show load balancer details
az network lb show \
  --resource-group intra365-rg \
  --name intra365-lb

# List load balancer rules
az network lb rule list \
  --resource-group intra365-rg \
  --lb-name intra365-lb \
  --output table

# List backend address pools
az network lb address-pool list \
  --resource-group intra365-rg \
  --lb-name intra365-lb \
  --output table

# Check load balancer health probes
az network lb probe list \
  --resource-group intra365-rg \
  --lb-name intra365-lb \
  --output table
```

### Ingress Management

```bash
# List ingress resources
kubectl get ingress -n intra365

# Describe ingress
kubectl describe ingress intra365-ingress -n intra365

# View ingress controller logs
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx -f

# Check ingress controller status
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

```yaml
# Example: Ingress configuration
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: intra365-ingress
  namespace: intra365
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
    - hosts:
        - api.intra365.io
      secretName: intra365-tls
  rules:
    - host: api.intra365.io
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: gateway
                port:
                  number: 80
```

### DNS Management

```bash
# List DNS zones
az network dns zone list --resource-group intra365-rg --output table

# List DNS records
az network dns record-set a list \
  --resource-group intra365-rg \
  --zone-name intra365.io \
  --output table

# Add DNS A record
az network dns record-set a add-record \
  --resource-group intra365-rg \
  --zone-name intra365.io \
  --record-set-name api \
  --ipv4-address 20.0.0.1

# Add CNAME record
az network dns record-set cname set-record \
  --resource-group intra365-rg \
  --zone-name intra365.io \
  --record-set-name www \
  --cname api.intra365.io

# View DNS query logs (if enabled)
az monitor diagnostic-settings list \
  --resource /subscriptions/<sub-id>/resourceGroups/intra365-rg/providers/Microsoft.Network/dnszones/intra365.io
```

### Network Troubleshooting

```bash
# Test DNS resolution
nslookup api.intra365.io
dig api.intra365.io

# Test connectivity from pod
kubectl run netshoot -n intra365 --image=nicolaka/netshoot --rm -it -- bash
# Inside pod:
ping google.com
curl -v https://api.intra365.io
traceroute api.intra365.io
nc -zv postgresql 5432

# Check service endpoints
kubectl get endpoints -n intra365

# View service details
kubectl describe svc gateway -n intra365

# Check pod network connectivity
kubectl exec -n intra365 <pod-name> -- ping -c 3 10.1.0.1

# Capture network traffic (for debugging)
kubectl sniff -n intra365 <pod-name>

# View node network configuration
kubectl get nodes -o wide
kubectl describe node <node-name> | grep -A 10 "Addresses"
```

### Monitoring Network Performance

```bash
# Check network metrics
kubectl top nodes
kubectl top pods -n intra365

# View network traffic (using Azure Monitor)
az monitor metrics list \
  --resource /subscriptions/<sub-id>/resourceGroups/intra365-rg/providers/Microsoft.Network/loadBalancers/intra365-lb \
  --metric "ByteCount" \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-01T23:59:59Z

# Check ingress controller metrics
kubectl get --raw /apis/metrics.k8s.io/v1beta1/namespaces/ingress-nginx/pods | jq .
```

## Network Administration Best Practices

### Security First
- Implement Zero Trust networking principles
- Use network policies to segment traffic between services
- Enable DDoS protection on public endpoints
- Regularly audit firewall rules and NSG configurations
- Use private endpoints for Azure services
- Encrypt all traffic with TLS/SSL

### High Availability
- Configure redundant load balancers
- Use Azure Traffic Manager for geo-redundancy
- Implement health probes for all backend services
- Set up multi-region failover capabilities
- Test failover procedures regularly

### Performance Optimization
- Monitor network latency and throughput
- Optimize routing for low-latency paths
- Use CDN for static content delivery
- Configure connection pooling appropriately
- Implement rate limiting to prevent abuse

### Network Segmentation
- Separate environments (dev, staging, production) with VNets
- Use subnets to isolate different tiers (web, app, data)
- Implement micro-segmentation with network policies
- Document network zones and trust boundaries
- Regular review of segmentation effectiveness

### Monitoring and Alerting
- Set up alerts for network anomalies
- Monitor bandwidth utilization
- Track connection failures and timeouts
- Log all network security events
- Create dashboards for network health

## Tools & Technologies

### Azure Networking
- **Azure Virtual Network**: Network isolation and segmentation
- **Azure Load Balancer**: Layer 4 load balancing
- **Azure Application Gateway**: Layer 7 load balancing with WAF
- **Azure Firewall**: Centralized network security
- **Azure DNS**: Domain name resolution
- **Azure Traffic Manager**: Global load balancing

### Kubernetes Networking
- **Calico**: Network policy engine
- **NGINX Ingress Controller**: Ingress traffic management
- **CoreDNS**: Cluster DNS service
- **Cilium**: Advanced networking and security
- **Service Mesh (Istio/Linkerd)**: Service-to-service networking

### Monitoring & Troubleshooting
- **Azure Network Watcher**: Network monitoring and diagnostics
- **Wireshark**: Packet analysis
- **tcpdump**: Network traffic capture
- **curl/wget**: HTTP testing
- **nslookup/dig**: DNS troubleshooting

### Automation
- **Terraform**: Infrastructure as Code for networks
- **Azure CLI**: Command-line network management
- **kubectl**: Kubernetes network resource management
- **Ansible**: Network configuration automation

## Related Personas

- **[System Administrator](./system-admin.md)**: Collaborate on infrastructure and connectivity
- **[Security Engineer](../040-technical-practitioner/security-engineer.md)**: Work together on network security
- **[DevOps Engineer](../040-technical-practitioner/devops-engineer.md)**: Coordinate on infrastructure automation
- **[SRE](../040-technical-practitioner/sre.md)**: Partner on reliability and performance
- **[Support Engineer](./support-engineer.md)**: Assist with connectivity troubleshooting

## Additional Resources

- [Azure Networking Documentation](https://docs.microsoft.com/en-us/azure/networking/)
- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/services-networking/)
- [Network Policies Guide](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Azure Network Security Best Practices](https://docs.microsoft.com/en-us/azure/security/fundamentals/network-best-practices)
- [NGINX Ingress Controller Documentation](https://kubernetes.github.io/ingress-nginx/)
