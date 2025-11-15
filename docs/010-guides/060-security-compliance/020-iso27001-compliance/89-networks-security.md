---
sidebar_position: 89
---

# Networks Security

## ISO 27001:2022 Control

**Control**: A.8.20 - Networks security

## Overview

This document provides guidance for implementing and maintaining networks security controls for the Intra365 platform in accordance with ISO 27001:2022 requirements.

## Control Objective

The objective of this control is to ensure appropriate security measures are in place to protect information assets and support business operations.

## Applicability

- **Status**: Applicable
- **Implementation Status**: In Progress
- **Owner**: CISO
- **Review Date**: Quarterly

## Control Requirements

### What Must Be Done

Network security must be implemented according to ISO 27001:2022 requirements:

1. **Network Segmentation**: Segregate networks based on security requirements and data classification
2. **Access Control**: Control network access through firewalls, NSGs, and access control lists
3. **Traffic Monitoring**: Monitor and log all network traffic for security analysis
4. **Encryption**: Encrypt data in transit using industry-standard protocols (TLS 1.3+)
5. **Network Services Security**: Secure all network services (DNS, DHCP, NTP, etc.)
6. **Wireless Security**: Implement strong security for wireless networks
7. **DMZ Implementation**: Isolate public-facing services in demilitarized zones
8. **VPN Security**: Secure remote access through VPN with strong authentication

### Network Security Principles

- **Defense in Depth**: Multiple layers of security controls
- **Least Privilege**: Minimal network access required for functionality
- **Zero Trust**: Never trust, always verify network connections
- **Segmentation**: Isolate critical systems and data
- **Monitoring**: Continuous visibility into network traffic
- **Encryption**: Protect data in transit

## Implementation Guidance

### For Intra365

Intra365 implements comprehensive network security controls across Azure infrastructure and Kubernetes clusters:

#### 1. Network Zone Architecture

**Network Zones and Purpose**:

| Zone | Purpose | Security Level | Components | Access Control |
|------|---------|---------------|------------|---------------|
| **DMZ** | Public-facing services | Medium | API Gateway, Web frontends | Controlled inbound, limited outbound |
| **Internal LAN** | Internal services | Medium-High | Employee workstations, internal apps | Full internal, filtered internet |
| **Secure Zone** | Critical systems | High | Databases, key management | Highly restricted |
| **Partner Zone** | Partner integrations | Medium | B2B APIs, partner services | Limited, time-based |
| **Guest Network** | Visitor internet | Low | Guest WiFi | Internet only, isolated |
| **Management Zone** | Admin access | High | Jump servers, admin tools | MFA required, monitored |

#### 2. Network Zone Access Control Matrix

**Zone-to-Zone Access Rules**:

| Source ↓ / Target → | DMZ | Internal LAN | Secure Zone | Partner Zone | Guest Network | Internet |
|-------------------|-----|--------------|-------------|--------------|---------------|----------|
| **DMZ** | ✓ Limited | ✗ Blocked | ✗ Blocked | ✗ Blocked | ✗ Blocked | ✓ Allowed |
| **Internal LAN** | ✓ Controlled | ✓ Full | ✓ Authorized only | ✓ Business need | ✗ Blocked | ✓ Filtered |
| **Secure Zone** | ✓ Controlled | ✓ Controlled | ✓ Full | ✗ Blocked | ✗ Blocked | ✓ Controlled |
| **Partner Zone** | ✓ Limited | ✗ Blocked | ✗ Blocked | ✓ Limited | ✗ Blocked | ✓ Allowed |
| **Guest Network** | ✗ Blocked | ✗ Blocked | ✗ Blocked | ✗ Blocked | ✓ Isolated | ✓ Allowed |
| **Management** | ✓ Admin access | ✓ Admin access | ✓ Admin access | ✗ Blocked | ✗ Blocked | ✓ Updates only |

#### 3. Azure Network Security Implementation

**Azure Network Security Groups (NSGs)**:

```hcl
# Terraform - Secure Zone NSG
resource "azurerm_network_security_group" "secure_zone" {
  name                = "secure-zone-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  # Block all inbound by default
  security_rule {
    name                       = "DenyAllInbound"
    priority                   = 4096
    direction                  = "Inbound"
    access                     = "Deny"
    protocol                   = "*"
    source_port_range          = "*"
    destination_port_range     = "*"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  # Allow PostgreSQL from Internal LAN only
  security_rule {
    name                       = "AllowPostgresFromInternal"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "5432"
    source_address_prefix      = "10.0.1.0/24" # Internal LAN CIDR
    destination_address_prefix = "*"
  }

  # Allow management access from Management Zone
  security_rule {
    name                       = "AllowManagementAccess"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "10.0.255.0/24" # Management Zone CIDR
    destination_address_prefix = "*"
  }

  tags = {
    Environment = "Production"
    Zone        = "Secure"
  }
}
```

**Azure Firewall Rules**:

```hcl
# Azure Firewall - Application Rules
resource "azurerm_firewall_application_rule_collection" "outbound_rules" {
  name                = "outbound-application-rules"
  azure_firewall_name = azurerm_firewall.main.name
  resource_group_name = azurerm_resource_group.main.name
  priority            = 100
  action              = "Allow"

  rule {
    name = "AllowMicrosoftServices"
    source_addresses = ["10.0.0.0/8"]
    target_fqdns = [
      "*.microsoft.com",
      "*.windows.net",
      "*.azure.com"
    ]
    protocol {
      port = "443"
      type = "Https"
    }
  }

  rule {
    name = "AllowPackageManagers"
    source_addresses = ["10.0.1.0/24"] # Internal LAN only
    target_fqdns = [
      "*.npmjs.org",
      "registry.npmjs.org",
      "*.pypi.org"
    ]
    protocol {
      port = "443"
      type = "Https"
    }
  }
}
```

#### 4. Kubernetes Network Policies

**Pod-to-Pod Network Segmentation**:

```yaml
# NetworkPolicy - Secure database access
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: postgresql-access-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: postgresql
  policyTypes:
  - Ingress
  - Egress
  ingress:
  # Allow only from authorized services
  - from:
    - podSelector:
        matchLabels:
          database-access: "allowed"
    ports:
    - protocol: TCP
      port: 5432
  egress:
  # Allow DNS
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: UDP
      port: 53
  # Deny all other egress
  - to: []

---
# NetworkPolicy - DMZ services can only access internal APIs
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: dmz-egress-policy
  namespace: dmz
spec:
  podSelector:
    matchLabels:
      zone: dmz
  policyTypes:
  - Egress
  egress:
  # Allow to internal API gateway only
  - to:
    - namespaceSelector:
        matchLabels:
          name: internal
    - podSelector:
        matchLabels:
          app: api-gateway
    ports:
    - protocol: TCP
      port: 443
  # Allow DNS
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: UDP
      port: 53
  # Allow internet (with filtering)
  - to:
    - ipBlock:
        cidr: 0.0.0.0/0
        except:
        - 10.0.0.0/8
        - 172.16.0.0/12
        - 192.168.0.0/16
    ports:
    - protocol: TCP
      port: 443
```

#### 5. Service Mesh Security (Istio)

**Mutual TLS Configuration**:

```yaml
# PeerAuthentication - Enforce mTLS for all services
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT

---
# AuthorizationPolicy - Restrict service-to-service communication
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: database-access-policy
  namespace: production
spec:
  selector:
    matchLabels:
      app: postgresql
  action: ALLOW
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/api-service"]
    to:
    - operation:
        methods: ["GET", "POST"]
        ports: ["5432"]

---
# Sidecar - Restrict egress to known services
apiVersion: networking.istio.io/v1beta1
kind: Sidecar
metadata:
  name: default
  namespace: production
spec:
  egress:
  - hosts:
    - "./*" # Only allow same namespace
    - "istio-system/*" # Control plane
  outboundTrafficPolicy:
    mode: REGISTRY_ONLY # Block unknown destinations
```

#### 6. VPN and Remote Access

**Azure VPN Configuration**:

| VPN Type | Use Case | Authentication | Encryption | Split Tunneling | Monitoring |
|----------|----------|----------------|------------|----------------|------------|
| **Point-to-Site VPN** | Employee remote access | Azure AD + MFA | IKEv2/IPsec | Disabled | Enhanced |
| **Site-to-Site VPN** | Branch office connectivity | Pre-shared key + certificates | IKEv2/IPsec | N/A | Standard |
| **Partner VPN** | Business partner access | Mutual certificates | IKEv2/IPsec | Disabled | Maximum |

**VPN Configuration Example**:

```hcl
# Azure VPN Gateway
resource "azurerm_virtual_network_gateway" "vpn" {
  name                = "intra365-vpn-gateway"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  type     = "Vpn"
  vpn_type = "RouteBased"

  active_active = true
  enable_bgp    = true
  sku           = "VpnGw2AZ"

  ip_configuration {
    name                          = "vnetGatewayConfig"
    public_ip_address_id          = azurerm_public_ip.vpn_pip.id
    private_ip_address_allocation = "Dynamic"
    subnet_id                     = azurerm_subnet.gateway_subnet.id
  }

  vpn_client_configuration {
    address_space = ["172.16.201.0/24"]
    
    root_certificate {
      name             = "RootCert"
      public_cert_data = var.vpn_root_cert
    }

    vpn_client_protocols = ["IkeV2", "OpenVPN"]
    
    aad_tenant   = "https://login.microsoftonline.com/${var.tenant_id}"
    aad_audience = var.vpn_audience
    aad_issuer   = "https://sts.windows.net/${var.tenant_id}/"
  }
}
```

#### 7. Traffic Monitoring and Logging

**Network Traffic Analysis**:

- **Azure Network Watcher**: Flow logs for all NSGs
- **Traffic Analytics**: AI-powered traffic analysis and anomaly detection
- **DDoS Protection**: Azure DDoS Protection Standard
- **Web Application Firewall**: Azure WAF on Application Gateway

**Flow Log Configuration**:

```hcl
# NSG Flow Logs
resource "azurerm_network_watcher_flow_log" "secure_zone" {
  network_watcher_name = azurerm_network_watcher.main.name
  resource_group_name  = azurerm_resource_group.main.name

  network_security_group_id = azurerm_network_security_group.secure_zone.id
  storage_account_id        = azurerm_storage_account.flow_logs.id
  enabled                   = true

  retention_policy {
    enabled = true
    days    = 90
  }

  traffic_analytics {
    enabled               = true
    workspace_id          = azurerm_log_analytics_workspace.main.workspace_id
    workspace_region      = azurerm_log_analytics_workspace.main.location
    workspace_resource_id = azurerm_log_analytics_workspace.main.id
    interval_in_minutes   = 10
  }
}
```

#### 8. Encryption in Transit

**TLS Requirements**:

| Service Type | Minimum TLS Version | Cipher Suites | Certificate Type | HSTS |
|-------------|-------------------|---------------|------------------|------|
| **Public APIs** | TLS 1.3 | Modern only | Public CA (Let's Encrypt) | ✓ Enabled |
| **Internal APIs** | TLS 1.3 | Modern only | Internal CA | ✓ Enabled |
| **Database Connections** | TLS 1.2+ | Strong ciphers | Internal CA | N/A |
| **Service Mesh** | mTLS | Modern only | Internal CA (Istio) | N/A |
| **Admin Access** | TLS 1.3 | Modern only | Client certificates | ✓ Enabled |

**NGINX TLS Configuration**:

```nginx
# NGINX - Strong TLS configuration
server {
    listen 443 ssl http2;
    server_name api.intra365.com;

    # TLS 1.3 only
    ssl_protocols TLSv1.3;
    
    # Strong cipher suites
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256';
    ssl_prefer_server_ciphers on;

    # Certificates
    ssl_certificate /etc/nginx/certs/api.intra365.com.crt;
    ssl_certificate_key /etc/nginx/certs/api.intra365.com.key;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/nginx/certs/ca-bundle.crt;

    # Session settings
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
}
```

#### 9. Network Monitoring and Alerting

**Monitoring Alerts**:

| Alert Condition | Severity | Response Time | Action |
|----------------|----------|---------------|--------|
| **Unusual traffic volume** | Medium | 15 minutes | Investigate |
| **Traffic from blocked countries** | High | 5 minutes | Block + investigate |
| **Port scanning detected** | High | 5 minutes | Block source |
| **DDoS attack detected** | Critical | Immediate | Auto-mitigation |
| **VPN connection failures** | Medium | 30 minutes | Check authentication |
| **NSG rule changes** | High | Immediate | Verify authorization |
| **Unauthorized network access** | Critical | Immediate | Block + investigate |

**Azure Sentinel Integration**:

```kusto
// KQL Query - Detect port scanning
AzureNetworkAnalytics_CL
| where TimeGenerated > ago(5m)
| where FlowType_s == "ExternalPublic"
| summarize UniqueDestPorts = dcount(DestPort_d) by SrcIP_s, TimeGenerated
| where UniqueDestPorts > 20
| project TimeGenerated, SrcIP_s, UniqueDestPorts
| order by UniqueDestPorts desc
```

#### 10. Wireless Network Security

**WiFi Security Standards**:

| Network | Encryption | Authentication | Use Case | Isolation |
|---------|-----------|----------------|----------|-----------|
| **Corporate WiFi** | WPA3-Enterprise | 802.1X + Azure AD | Employee devices | VLAN segmentation |
| **Guest WiFi** | WPA3-Personal | Password (rotated) | Visitor access | Completely isolated |
| **IoT WiFi** | WPA3-Enterprise | Certificate-based | IoT devices | Separate VLAN |

## Verification and Evidence

### How to Verify Compliance

- **Network Scans**: Regular vulnerability scans of network infrastructure
- **Configuration Audits**: Review NSG rules, firewall policies, network policies
- **Flow Log Analysis**: Analyze network traffic patterns and anomalies
- **Penetration Testing**: Annual external and internal pen tests
- **Zone Isolation Testing**: Verify segmentation between network zones
- **Encryption Verification**: Scan for unencrypted connections
- **Access Control Testing**: Verify zone-to-zone access restrictions

### Evidence Requirements

- **Network Diagrams**: Current network architecture and zone definitions
- **NSG Configurations**: All NSG rules and justifications
- **Firewall Rules**: Current firewall rule sets
- **Flow Logs**: Network traffic logs (retained 90 days)
- **VPN Logs**: Remote access logs with authentication records
- **Security Scan Reports**: Quarterly network vulnerability scans
- **Penetration Test Reports**: Annual pen test results
- **Change Records**: All network configuration changes

### Automated Compliance Checks

**Daily Checks**:

- NSG rules compliance scan
- Open port detection
- Unencrypted connection detection
- VPN configuration validation

**Weekly Reports**:

- Network traffic analysis
- Unusual traffic patterns
- Zone-to-zone communication review
- Firewall rule effectiveness

## Integration with Existing Systems

This control integrates with:

- **ISMS Framework**: Core network security component
- **Risk Management**: Network risks assessed and mitigated
- **[Network Access Control Model](./124-network-access-control-model.md)**: Comprehensive access framework
- **[Zero Trust Architecture](../010-core-security/01-zero-trust-architecture.md)**: Network segmentation support
- **[Cryptography](./93-cryptography.md)**: Encryption in transit implementation
- **[Monitoring Activities](./85-monitoring-activities.md)**: Network traffic monitoring
- **Incident Response**: Network-based incident detection

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

- **Network Segmentation**: Percentage of systems properly segmented (target: 100%)
- **Encrypted Connections**: Percentage of connections using TLS 1.3+ (target: 100%)
- **NSG Rule Compliance**: NSG rules following least-privilege (target: 100%)
- **Network Incidents**: Security incidents related to network (target: 0)
- **VPN Uptime**: VPN service availability (target: 99.9%)
- **Flow Log Coverage**: Percentage of NSGs with flow logging (target: 100%)
- **Zone Violations**: Unauthorized zone-to-zone access attempts (target: 0)
- **Open Ports**: Unnecessary open ports detected (target: 0)
- **DDoS Mitigation**: Average DDoS mitigation response time (target: less than 1 minute)
- **Wireless Security**: WiFi networks using WPA3 (target: 100%)

## Review and Maintenance

- **Review Frequency**: Quarterly minimum
- **Update Triggers**: Security incidents, audit findings, regulatory changes
- **Approval Required**: CISO

## References

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) - Information Security Management Systems - Requirements (Control A.8.20)
- [ISO/IEC 27002:2022](https://www.iso.org/standard/75652.html) - Information Security Controls - Section 8.20: Networks Security
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) - SC-7: Boundary Protection, AC-4: Information Flow Enforcement
- [NIST SP 800-41 Rev. 1](https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final) - Guidelines on Firewalls and Firewall Policy
- [CIS Controls v8](https://www.cisecurity.org/controls/v8) - Control 12: Network Infrastructure Management
- [NIST SP 800-77](https://csrc.nist.gov/publications/detail/sp/800-77/rev-1/final) - Guide to IPsec VPNs
- [Zero Trust Architecture (NIST SP 800-207)](https://csrc.nist.gov/publications/detail/sp/800-207/final) - Zero Trust Network Security
- [Azure Network Security](https://docs.microsoft.com/en-us/azure/security/fundamentals/network-overview) - Cloud Network Protection
- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) - Container Network Security
- [PCI DSS v4.0](https://www.pcisecuritystandards.org/) - Requirement 1: Install and Maintain Network Security Controls
- [SOC 2 Trust Services Criteria](https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report) - CC6.6: Network Security
- Intra365 Security Policies and Procedures

---

**Questions or feedback?** [Open an issue](https://github.com/intra365/chef/issues) or [start a discussion](https://github.com/intra365/chef/discussions).
