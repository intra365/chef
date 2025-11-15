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
1. **[Quick Start Guide](/docs/introduction/quick-start)** - Get your development environment running
2. **[Service Structure](/docs/service-configurations/service-structure)** - Understand how services are organized
3. **[GitOps Workflow](/docs/architecture/gitops-workflow)** - Learn the development and deployment process
4. **[GitHub Actions Workflows](/docs/deployment-workflows/github-actions-workflows)** - Understand the CI/CD pipeline

### Service-Specific Documentation
- **[Intra365 STS](/docs/service-configurations/intra365-sts)** - Security Token Service
- **[Intra365 Consent Manager](/docs/service-configurations/intra365-consent-manager)** - Consent management
- **[Intra365 Mate Registry](/docs/service-configurations/intra365-mate-registry)** - Service registry
- **[Intra365 Gateway](/docs/service-configurations/intra365-gateway)** - API Gateway
- **[Intra365 LLM Proxy](/docs/service-configurations/intra365-llm-proxy)** - LLM integration

### Infrastructure Integration
- **[NATS Infrastructure](/docs/service-configurations/nats-infrastructure)** - Message bus integration
- **[PostgreSQL Databases](/docs/service-configurations/postgresql-databases)** - Database access and management
- **[Secrets Management](/docs/infrastructure/secrets-management)** - Working with secrets

### Development Workflow
- **[Conventional Deployments](/docs/deployment-workflows/conventional-deployments)** - Standard deployment process
- **[Helm Charts](/docs/deployment-workflows/helm-charts)** - Service packaging
- **[Rollback Procedures](/docs/deployment-workflows/rollback-procedures)** - Handling failed deployments

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

- **Documentation**: Check service-specific docs in `/docs/service-configurations/`
- **Troubleshooting Guide**: Review [Common Issues](/docs/troubleshooting/common-issues)
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
- **[Technical Lead](../strategic-decision-maker/technical-lead.md)**: Receive technical direction and guidance
