# Chef

GitOps deployment orchestration for Intra365 - The brain that binds everything together

## Overview

Chef is the central deployment orchestration system for the Intra365 enterprise integration framework. It manages the deployment, configuration, and lifecycle of all Intra365 services across Kubernetes clusters (Azure AKS).

## Purpose

- **GitOps-driven deployments**: Infrastructure and application state managed through Git
- **Service orchestration**: Coordinates deployment of all Intra365 Mates (services)
- **Configuration management**: Centralized configuration and secrets management
- **Multi-environment support**: Development, staging, and production environments
- **Prompt-based configuration**: Adaptable platform setup using AI-assisted prompts

## Documentation

This repository contains comprehensive documentation built with Docusaurus 3 and TypeScript:

- **📘 Introduction**: Getting started and core concepts
- **🏗️ Architecture**: System design and patterns
- **☁️ Infrastructure**: Platform setup and configuration
- **🚀 Deployment Workflows**: Deployment processes
- **⚙️ Service Configurations**: Service-specific guides
- **🔒 Security & Compliance**: Zero-trust security and RAISE 2.0 compliance
- **🛠️ Operations Runbooks**: Day-to-day operational procedures
- **🔧 Troubleshooting**: Common issues and debugging
- **📚 Reference**: API, CLI, and configuration reference
- **🤝 Contributing**: Contribution guidelines
- **🗺️ Roadmap**: Future plans and evolution

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10.14.0+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Build production site
pnpm build

# Serve production build locally
pnpm serve
```

### Local Development

```bash
pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Documentation Structure

The documentation follows a numeric-prefixed structure (010-110) for logical organization:

```
docs/
├── 010-introduction/          # Getting started & overview
├── 020-architecture/          # System architecture & design
├── 030-infrastructure/        # Infrastructure setup & config
├── 040-deployment-workflows/  # Deployment processes
├── 050-service-configurations/ # Service-specific configs
├── 060-security-compliance/   # Security & RAISE 2.0
├── 070-operations-runbooks/   # Day-to-day operations
├── 080-troubleshooting/       # Common issues & debugging
├── 090-reference/             # API & CLI reference
├── 100-contributing/          # Contribution guidelines
└── 110-roadmap/               # Future plans & evolution
```

## Features

✨ **TypeScript Configuration**: Full TypeScript support for config and components  
🔍 **Local Search**: Fast client-side search with @easyops-cn/docusaurus-search-local  
📊 **Mermaid Diagrams**: Built-in diagram support for visual documentation  
🎨 **Syntax Highlighting**: Multi-language code highlighting  
📦 **Versioning**: Support for multiple documentation versions  
♿ **Accessibility**: Neurodiversity-friendly design  

## Contributing

See [Contributing Guidelines](docs/100-contributing/01-contribution-guidelines.md) for details on how to contribute to Chef documentation.

## License

Copyright © 2025 Happy Mates. All rights reserved.

## Links

- [GitHub Repository](https://github.com/intra365/chef)
- [GitHub Discussions](https://github.com/intra365/chef/discussions)
- [Intra365 Specifications](https://github.com/happy-mates/happy-mates-intra365)
