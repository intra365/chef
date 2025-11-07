---
sidebar_position: 1
---

# Overview

Welcome to **Intra365** - a reference architecture for an enterprise intranet system built on the **ICING** (Intranet Connectivity, Integration & Governance) framework that integrates all other systems to form a natural digital workspace.

## What is Intra365?

Intra365 is a reference architecture demonstrating how to implement the ICING framework for enterprise integration. It shows how to connect, extend, and govern digital workplace components across platforms while maintaining complete isolation from commercial off-the-shelf (COTS) products.

## What is ICING?

**ICING** (Intranet Connectivity, Integration & Governance) is an integration framework designed around a core principle:

> *Isolate custom logic and integrations outside of COTS systems to ensure portability, reusability, and long-term maintainability across platforms and migrations.*

This means your custom business logic, workflows, and integrations remain independent of vendor-specific platforms, enabling seamless migrations between Microsoft 365, Google Workspace, or hybrid environments without rewriting core functionality.

## Purpose

This reference architecture demonstrates:

- **GitOps-driven deployments**: Infrastructure and application state managed declaratively through Git
- **Service orchestration**: Coordinates deployment of all Intra365 Mates (microservices)
- **Configuration management**: Centralized configuration and secrets management via Azure Key Vault CSI
- **Multi-environment support**: Seamless deployments across development, staging, and production environments
- **Convention over configuration**: Standardized deployment patterns that reduce boilerplate
- **Prompt-based configuration**: Adaptable platform setup using AI-assisted prompts instead of rigid IaC
- **COTS Isolation**: Complete separation of custom logic from vendor platforms

## Key Features

### 🧩 ICING Framework
Built on connectivity, integration, and governance principles with complete COTS isolation for maximum portability.

### 🔄 GitOps Workflow
All deployments are triggered by Git commits, ensuring version control, auditability, and rollback capabilities.

### 🚀 Automated Deployments
GitHub Actions workflows automatically deploy services when changes are merged to main branches.

### 🔒 Zero-Trust Security
Integration with Azure Key Vault, network policies, and RAISE 2.0 DevSecOps compliance.

### 📊 Observability
Built-in monitoring, logging, and tracing for all deployed services.

### 🎯 Service Discovery
Automatic service registration and discovery through NATS messaging infrastructure.

## Architecture at a Glance

```mermaid
graph TB
    subgraph "Client Layer (ICING)"
        CL[Office Add-ins]
        SP[SharePoint Web Parts]
        JS[JavaScript SDK]
        CE[Chrome Extension]
    end
    
    subgraph "Backend Layer (ICING)"
        GHA[GitHub Actions] --> K8S[Self-hosted Kubernetes]
        K8S --> STS[Intra365 STS]
        K8S --> CM[Consent Manager]
        K8S --> MR[Mate Registry]
        K8S --> GW[API Gateway]
        K8S --> LLM[LLM Proxy]
        K8S --> NATS[NATS Infrastructure]
        K8S --> PG[PostgreSQL + PgVector]
        K8S --> KV[Azure Key Vault]
    end
    
    subgraph "COTS Platforms (Isolated)"
        M365[Microsoft 365]
        GWS[Google Workspace]
    end
    
    CL -.->|API Only| M365
    SP -.->|API Only| M365
    K8S -.->|API Only| M365
    K8S -.->|API Only| GWS
    
    Git[Git Repository] --> GHA
```

## Who Should Use This Documentation?

This documentation is designed for:

- **DevOps Engineers**: Setting up and maintaining infrastructure
- **Developers**: Deploying and configuring Intra365 services
- **Platform Engineers**: Architecting multi-environment deployments
- **Security Engineers**: Implementing compliance and security controls
- **Operations Teams**: Monitoring, troubleshooting, and incident response
- **Enterprise Architects**: Designing vendor-agnostic integration strategies

## Getting Started

Ready to dive in? Start with:

1. [Key Concepts](./02-key-concepts.md) - Understanding ICING and GitOps
2. [Quick Start](./03-quick-start.md) - Deploy your first service in 5 minutes
3. [Architecture Overview](./04-architecture-overview.md) - High-level system design
4. [System Architecture](../020-architecture/01-system-architecture.md) - Deep dive into ICING layers

## Documentation Structure

Our documentation follows a **numeric-prefixed structure** for logical navigation:

- **010-Introduction**: Getting started and core concepts
- **020-Architecture**: System design and ICING patterns
- **030-Infrastructure**: Platform setup and configuration
- **040-Deployment Workflows**: Deployment processes
- **050-Service Configurations**: Service-specific guides
- **060-Security & Compliance**: Security implementation
- **070-Operations Runbooks**: Day-to-day operations
- **080-Troubleshooting**: Common issues and debugging
- **090-Reference**: API, CLI, and configuration reference
- **100-Contributing**: Contribution guidelines
- **110-Roadmap**: Future plans and evolution

## Need Help?

- **GitHub Issues**: [Report bugs or request features](https://github.com/intra365/chef/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/intra365/chef/discussions)
- **Intra365 Specs**: [Review full specifications](https://github.com/happy-mates/happy-mates-intra365)

---

**Ready to orchestrate?** Let's get started with [Key Concepts](./02-key-concepts.md)!
