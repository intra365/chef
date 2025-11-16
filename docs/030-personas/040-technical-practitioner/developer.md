---
id: developer
title: Developer
sidebar_label: Developer
sidebar_position: 2
persona_type: specialized
parent_persona: technical-practitioner
---

# Developer

Developers are responsible for building and maintaining applications and services within the Intra365 platform. They write code, implement features, fix bugs, and ensure their services integrate properly with the broader ecosystem.

## Role Profile

### Primary Responsibilities
- Develop new features and services
- Write and maintain application code
- Implement API endpoints and integrations
- Write unit and integration tests
- Debug and fix issues
- Participate in code reviews
- Document code and APIs

### Key Skills
- Proficiency in programming languages (TypeScript, Go, Python, etc.)
- Understanding of RESTful APIs and microservices
- Experience with Git and version control
- Knowledge of testing frameworks
- Familiarity with containerization (Docker)
- Understanding of CI/CD pipelines

### Daily Activities
- Writing and reviewing code
- Implementing features from specifications
- Debugging application issues
- Running local development environments
- Committing code and creating pull requests
- Reviewing colleagues' code changes

## Documentation Priorities

### Essential Reading
1. **[Introduction](../../010-guides/010-introduction/01-overview.md)** - Get your development environment running
2. **[Service Structure](../../010-guides/050-service-configurations/01-service-structure.md)** - Understand how services are organized
1. **[GitOps Workflow](../../010-guides/020-architecture/02-gitops-workflow.md)** - Deployment process
2. **[GitHub Actions](../../010-guides/040-deployment-workflows/05-github-actions-workflows.md)** - CI/CD automation

### Service-Specific Documentation
- **[Intra365 STS](../../010-guides/050-service-configurations/02-intra365-sts.md)** - Security Token Service
- **[Intra365 Consent Manager](../../010-guides/050-service-configurations/03-intra365-consent-manager.md)** - Consent management
- **[Intra365 Mate Registry](../../010-guides/050-service-configurations/04-intra365-mate-registry.md)** - Service registry
- **[Intra365 Gateway](../../010-guides/050-service-configurations/05-intra365-gateway.md)** - API Gateway
- **[Intra365 LLM Proxy](../../010-guides/050-service-configurations/06-intra365-llm-proxy.md)** - LLM integration

### Infrastructure Integration
- **[NATS Infrastructure](../../010-guides/050-service-configurations/07-nats-infrastructure.md)** - Message bus integration
- **[PostgreSQL Databases](../../010-guides/050-service-configurations/08-postgresql-databases.md)** - Database access and management
- **[Secrets Management](../../010-guides/030-infrastructure/04-secrets-management.md)** - Working with secrets

### Development Workflow
- **[Conventional Deployments](../../010-guides/040-deployment-workflows/02-conventional-deployments.md)** - Standard deployment process
- **[Helm Charts](../../010-guides/040-deployment-workflows/03-helm-charts.md)** - Service packaging
- **[Rollback Procedures](../../010-guides/040-deployment-workflows/06-rollback-procedures.md)** - Handling failed deployments

## Common Tasks

### Setting Up Local Development

```bash
# Clone the repository
git clone https://github.com/intra365/intra365-chef.git
cd intra365-chef

# Install dependencies
pnpm install

# Set up local environment
cp .env.example .env.local
# Edit .env.local with your local configuration

# Run development server
pnpm dev
```

### Creating a New Service

```bash
# Use the service template
pnpm create-service --name my-new-service --type api

# Navigate to the new service
cd services/my-new-service

# Install dependencies
pnpm install

# Run tests
pnpm test
```

### Building and Testing

```bash
# Run unit tests
pnpm test

# Run integration tests
pnpm test:integration

# Build the service
pnpm build

# Run locally with Docker
docker build -t my-service:local .
docker run -p 3000:3000 my-service:local
```

### Committing Changes

```bash
# Create a feature branch
git checkout -b feature/my-new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/my-new-feature
# Create pull request on GitHub
```

## Development Environment

### Required Tools
- **Node.js** (v18+) and **pnpm**
- **Docker** and **Docker Compose**
- **kubectl** for Kubernetes interaction
- **Helm** for chart development
- **Git** for version control
- **VS Code** or preferred IDE

### Recommended Extensions
- ESLint
- Prettier
- Docker
- Kubernetes
- GitLens

### Local Testing

```yaml
# docker-compose.yml for local development
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: dev
      POSTGRES_USER: dev
      POSTGRES_DB: myapp
    ports:
      - "5432:5432"
  
  nats:
    image: nats:latest
    ports:
      - "4222:4222"
      - "8222:8222"
  
  my-service:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://dev:dev@postgres:5432/myapp
      NATS_URL: nats://nats:4222
    depends_on:
      - postgres
      - nats
```

## Troubleshooting

### Common Development Issues

#### Build Failures

```bash
# Clear build cache
pnpm clean

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Check for TypeScript errors
pnpm type-check
```

#### Test Failures

```bash
# Run tests in watch mode
pnpm test -- --watch

# Run specific test file
pnpm test -- path/to/test.spec.ts

# Run with coverage
pnpm test -- --coverage
```

#### Container Issues

```bash
# Check container logs
docker logs <container-id>

# Inspect container
docker inspect <container-id>

# Rebuild from scratch
docker build --no-cache -t my-service:local .
```

### Getting Help

- **Documentation**: Check service-specific docs in `docs/010-guides/050-service-configurations/`
- **Troubleshooting Guide**: Review [Common Issues](../../010-guides/080-troubleshooting/01-common-issues.md)
- **Team Chat**: Ask in development channel
- **Code Reviews**: Request guidance from senior developers

## Best Practices

### Code Quality
- Write clear, self-documenting code
- Follow project coding standards
- Write comprehensive tests (aim for 80%+ coverage)
- Use meaningful variable and function names
- Keep functions small and focused

### Git Workflow
- Create feature branches for new work
- Write descriptive commit messages
- Keep commits focused and atomic
- Rebase before merging to keep history clean
- Request code reviews before merging

### Testing
- Write tests alongside new features
- Test edge cases and error conditions
- Use integration tests for API endpoints
- Mock external dependencies
- Run full test suite before pushing

### Security
- Never commit secrets or credentials
- Use environment variables for configuration
- Validate and sanitize all inputs
- Follow secure coding guidelines
- Report security concerns immediately

## Career Growth

### Junior to Mid-Level
- Master core technologies and tools
- Learn to work independently on features
- Improve code review and testing skills
- Understand system architecture
- Participate in design discussions

### Mid-Level to Senior
- Design solutions for complex problems
- Mentor junior developers
- Lead feature development
- Contribute to architecture decisions
- Improve development processes

### Senior to Lead
- Define technical direction
- Establish coding standards
- Guide multiple teams
- Make technology choices
- Balance technical debt and features

## Related Personas

- **[DevOps Engineer](./devops-engineer.md)**: Collaborate on deployment pipelines
- **[Security Engineer](./security-engineer.md)**: Implement security requirements
- **[SRE](./sre.md)**: Ensure service reliability and performance
- **[Technical Lead](../030-strategic-decision-maker/technical-lead.md)**: Receive technical direction and guidance
