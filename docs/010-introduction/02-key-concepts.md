---
sidebar_position: 2
---

# Key Concepts

Understanding the core concepts behind Intra365 is essential for building a robust enterprise integration framework. At its heart, Intra365 is built on the **ICING** principle.

## 🧩 ICING – Intranet Connectivity, Integration & Governance

**ICING** is an integration framework for enterprise intranets designed to connect, extend, and govern digital workplace components across platforms while maintaining complete isolation from commercial off-the-shelf (COTS) products.

### Core Principle

> *Isolate custom logic and integrations outside of COTS systems to ensure portability, reusability, and long-term maintainability across platforms and migrations.*

This principle ensures that your custom business logic, workflows, and integrations remain independent of vendor-specific platforms, enabling seamless migrations and upgrades without rewriting core functionality.

## Key Benefits

### 🔗 Connectivity
Unify scattered intranet tools and content under one integration layer. ICING provides a consistent interface for connecting disparate systems across your digital workplace.

### 🔌 Integration
Decouple logic from vendor ecosystems while maintaining seamless user experience. Your custom integrations work independently of whether you're using Microsoft 365, Google Workspace, or hybrid environments.

### 🛡️ Governance
Ensure data sovereignty, compliance, and consistent lifecycle management. ICING enforces security policies, audit trails, and compliance requirements across all integrated systems.

### 📦 Portability
Enable migration between Microsoft 365, Google Workspace, or hybrid environments without rewriting custom integrations. Your business logic moves with you.

### 🔧 Extensibility
Add or remove modules (apps, services, workflows) independently. The modular architecture supports evolving business needs without disrupting existing functionality.

## GitOps & Convention Over Configuration

Intra365 embraces **GitOps** principles where all infrastructure and application state is managed declaratively through Git:

- **Version Control**: Every change is tracked and auditable
- **Rollback Capabilities**: Easy recovery from issues
- **Automation**: CI/CD pipelines drive deployments
- **Consistency**: Same process across all environments

We follow **convention over configuration**, establishing standardized deployment patterns that reduce boilerplate and increase developer productivity.

## Service Mesh Architecture

Intra365 services (called "Mates") communicate through a service mesh pattern:

- **Event-Driven Messaging**: NATS or Kafka for event-driven architecture and loose coupling
- **Service Discovery**: Automatic registration and discovery
- **Load Balancing**: Built-in resilience and scaling
- **Observability**: Distributed tracing and monitoring

## Zero-Trust Security

Security is embedded at every layer following zero-trust principles:

- **Identity Verification**: Every request is authenticated
- **Least Privilege**: Minimal access rights by default
- **Network Segmentation**: Isolated service boundaries
- **Encryption**: Data protected in transit and at rest

## Next Steps

- [Architecture Overview](./04-architecture-overview.md) - Understand the system design
- [System Architecture](../020-architecture/01-system-architecture.md) - Deep dive into ICING architecture layers
- [Quick Start](./03-quick-start.md) - Deploy your first service

---

**Need help?** [Open an issue](https://github.com/intra365/chef/issues) or [start a discussion](https://github.com/intra365/chef/discussions).
