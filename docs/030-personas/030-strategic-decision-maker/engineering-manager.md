---
id: engineering-manager
title: Engineering Manager
sidebar_label: Engineering Manager
sidebar_position: 4
persona_type: specialized
parent_persona: strategic-decision-maker
---

# Engineering Manager

Engineering Managers lead development teams, balance technical and people management responsibilities, ensure successful project delivery, support team member growth, and align team efforts with organizational objectives.

## Role Profile

### Primary Responsibilities
- Lead and develop engineering teams
- Manage project delivery and timelines
- Conduct performance reviews and career development
- Hire and onboard new team members
- Remove blockers and enable team productivity
- Align team work with business objectives
- Manage stakeholder communication
- Balance technical quality with delivery speed

### Key Skills
- People management and leadership
- Project and resource planning
- Communication and stakeholder management
- Understanding of software development processes
- Technical background to understand team challenges
- Conflict resolution and problem-solving
- Metrics and data-driven decision making
- Emotional intelligence and empathy

### Daily Activities
- One-on-one meetings with team members
- Sprint planning and progress tracking
- Removing blockers for the team
- Stakeholder communication and updates
- Reviewing team metrics and velocity
- Hiring and interviewing candidates
- Supporting team member development

## Documentation Priorities

### Essential Reading
1. **[GitOps Workflow](../../010-guides/020-architecture/02-gitops-workflow.md)** - Development process
2. **[Deployment Pipeline](../../010-guides/020-architecture/05-deployment-pipeline.md)** - Delivery pipeline
3. **[Contributing Guidelines](../../010-guides/100-contributing/01-contribution-guidelines.md)** - Development standards
4. **[Roadmap](../../010-guides/110-roadmap/01-roadmap-overview.md)** - Product direction

### Development Process
- **[GitHub Actions Workflows](../../010-guides/040-deployment-workflows/05-github-actions-workflows.md)** - CI/CD automation
- **[Conventional Deployments](../../010-guides/040-deployment-workflows/02-conventional-deployments.md)** - Deployment process
- **[Rollback Procedures](../../010-guides/040-deployment-workflows/06-rollback-procedures.md)** - Failure handling

### Architecture Understanding
- **[System Architecture](../../010-guides/020-architecture/01-system-architecture.md)** - System overview
- **[GitOps Workflow](../../010-guides/020-architecture/02-gitops-workflow.md)** - Technologies used
- **[Service Structure](../../010-guides/050-service-configurations/01-service-structure.md)** - Service organization

### Operations
- **[Incident Response](../../010-guides/070-operations-runbooks/02-incident-response.md)** - Handling incidents
- **[Health Checks](../../010-guides/070-operations-runbooks/08-health-checks.md)** - System monitoring
- **[Observability](../../010-guides/030-infrastructure/05-observability.md)** - Metrics and logging

### Security & Compliance
- **[Security Gates](../../010-guides/060-security-compliance/010-core-security/03-security-gates.md)** - Security in development
- **[ISO 27001 Overview](../../010-guides/060-security-compliance/020-iso27001-compliance/10-iso27001-overview.md)** - Compliance requirements

## Management Tasks

### Sprint Planning Template

```markdown
# Sprint Planning: Sprint [Number]

**Date**: YYYY-MM-DD
**Duration**: 2 weeks
**Team**: [Team Name]
**Sprint Goal**: [Clear objective for the sprint]

## Attendees
- Engineering Manager
- Technical Lead
- Developers
- Product Owner (if applicable)

## Capacity
- Team size: 6 developers
- Available days: 10 days per person (accounting for holidays, PTO)
- Total capacity: 60 developer-days
- Reserved for:
  - Bug fixes: 10% (6 days)
  - Technical debt: 15% (9 days)
  - Unplanned work: 10% (6 days)
- Planned work capacity: 39 days

## Previous Sprint Review
- Completed: 12 stories (38 points)
- Carried over: 2 stories (8 points)
- Velocity: 38 points
- Issues:
  - Database migration took longer than expected
  - 2 production incidents reduced capacity

## Sprint Backlog

### High Priority
1. **[TASK-123] User Authentication Overhaul** (13 points)
   - Assigned: Developer A
   - Dependencies: None
   - Risk: Medium

2. **[TASK-124] API Rate Limiting** (8 points)
   - Assigned: Developer B
   - Dependencies: Gateway deployment
   - Risk: Low

### Medium Priority
3. **[TASK-125] Database Performance Optimization** (8 points)
   - Assigned: Developer C
   - Dependencies: DBA consultation needed
   - Risk: Medium

### Technical Debt
4. **[TECH-50] Refactor User Service** (5 points)
   - Assigned: Technical Lead + Developer D
   - Goal: Improve testability

### Bug Fixes
5. **[BUG-89] Memory leak in background worker** (5 points)
   - Assigned: Developer E
   - Priority: High

## Commitments
- Total committed: 39 points
- Stretch goals: 5 additional points if ahead

## Risks & Mitigations
- **Risk**: Database migration complexity
  - **Mitigation**: DBA pairing, early testing
- **Risk**: New team member onboarding
  - **Mitigation**: Pair programming, simpler tasks

## Success Criteria
- Complete sprint goal
- Maintain code quality (SonarQube metrics)
- No critical production incidents
- All stories have tests
```

### One-on-One Meeting Template

```markdown
# 1:1 Meeting: [Team Member Name]

**Date**: YYYY-MM-DD
**Frequency**: Bi-weekly

## Check-in
- How are you doing overall?
- Work-life balance check
- Any personal updates?

## Current Work
- What are you working on?
- Any blockers or challenges?
- Anything you're excited about?
- Anything frustrating you?

## Team & Collaboration
- How is working with the team?
- Any interpersonal issues?
- Communication challenges?
- Collaboration improvements needed?

## Growth & Development
- What do you want to learn?
- Skills you want to develop?
- Career goals and aspirations?
- Training or resources needed?

## Feedback
- Feedback for you (manager)
- Feedback on team processes
- Ideas for improvement

## Action Items
- [ ] Action item 1 - Owner - Due date
- [ ] Action item 2 - Owner - Due date

## Notes
[Private notes about discussion, concerns, or follow-ups]

## Next Meeting Topics
- Follow up on [topic]
- Discuss [upcoming project]
```

### Performance Review Template

```markdown
# Performance Review: [Team Member Name]

**Review Period**: Q[X] YYYY
**Manager**: [Your Name]
**Date**: YYYY-MM-DD

## Summary
[Overall assessment paragraph]

## Competencies Assessment

### Technical Skills (Weight: 40%)
**Rating**: [Exceeds/Meets/Developing/Needs Improvement]

**Strengths**:
- Strong TypeScript and Node.js expertise
- Excellent debugging skills
- Proactive in learning new technologies

**Areas for Growth**:
- Database optimization knowledge
- Testing practices could be more comprehensive

**Examples**:
- Led implementation of authentication refactoring
- Resolved critical production issue quickly
- Completed AWS certification

### Communication (Weight: 20%)
**Rating**: [Exceeds/Meets/Developing/Needs Improvement]

**Strengths**:
- Clear in code reviews
- Good documentation
- Proactive in standups

**Areas for Growth**:
- Could improve cross-team communication
- Technical writing could be more concise

### Collaboration (Weight: 20%)
**Rating**: [Exceeds/Meets/Developing/Needs Improvement]

**Strengths**:
- Excellent pair programming partner
- Helpful to junior developers
- Positive team contributor

### Delivery & Execution (Weight: 20%)
**Rating**: [Exceeds/Meets/Developing/Needs Improvement]

**Strengths**:
- Consistent delivery on commitments
- Good estimation skills
- Proactive in addressing technical debt

**Areas for Growth**:
- Could break down larger tasks more effectively
- Time management during complex projects

## Key Achievements
1. Led authentication system overhaul
2. Reduced API response time by 40%
3. Mentored 2 junior developers
4. Completed 95% of sprint commitments

## Goals for Next Period

### Professional Development
1. **Goal**: Complete Kubernetes certification
   - **Timeline**: 3 months
   - **Support**: Training budget approved

2. **Goal**: Lead architectural design for [project]
   - **Timeline**: Next quarter
   - **Support**: Pairing with Solution Architect

### Technical
1. Improve test coverage to 85%
2. Reduce code review turnaround time
3. Document microservices integration patterns

### Leadership
1. Mentor new team member
2. Present at team tech talk
3. Lead sprint retrospective

## Overall Rating
**[Exceeds Expectations / Meets Expectations / Developing / Needs Improvement]**

## Compensation Impact
[If applicable and appropriate for your organization]

## Employee Comments
[Space for employee's self-assessment and feedback]

## Signatures
- Manager: _________________ Date: _________
- Employee: ________________ Date: _________
```

### Team Metrics Dashboard

```markdown
# Team Metrics: [Team Name] - [Month/Quarter]

## Delivery Metrics

### Velocity
- Current sprint: 42 points
- Average (last 6 sprints): 38 points
- Trend: ↗️ Increasing
- Note: Improved estimation accuracy

### Cycle Time
- Average: 4.2 days (from in-progress to done)
- Target: <5 days
- Status: ✅ Meeting target
- 90th percentile: 8 days

### Deployment Frequency
- This month: 18 deployments
- Last month: 15 deployments
- Target: 15+ per month
- Status: ✅ Above target

### Lead Time
- Average: 8.5 days (from commit to production)
- Target: <10 days
- Status: ✅ Meeting target

## Quality Metrics

### Bug Escape Rate
- Production bugs: 3
- Total releases: 18
- Rate: 16.7%
- Target: <20%
- Status: ✅ Acceptable
- Severity: 1 critical, 2 minor

### Code Coverage
- Current: 82%
- Target: 80%
- Status: ✅ Above target
- Trend: ↗️ Improved from 78% last month

### Code Review Time
- Average: 4.2 hours
- Target: <8 hours
- Status: ✅ Meeting target
- Longest: 18 hours (outlier)

### Technical Debt Ratio
- Current: 3.2%
- Target: <5%
- Status: ✅ Healthy
- Trend: → Stable

## Reliability Metrics

### Uptime
- This month: 99.95%
- Target: 99.9%
- Status: ✅ Exceeding target
- Incidents: 1 (5 minutes downtime)

### Mean Time to Recovery (MTTR)
- Average: 12 minutes
- Target: <30 minutes
- Status: ✅ Well below target

### Error Rate
- Current: 0.08%
- Target: <0.1%
- Status: ✅ Meeting target

## Team Health

### Happiness Score
- Current: 4.2/5
- Last quarter: 4.0/5
- Trend: ↗️ Improving

### Psychological Safety
- Survey score: 4.5/5
- Areas of strength:
  - Open communication
  - Learning from mistakes
  - Speaking up encouraged

### Burnout Risk
- At-risk individuals: 1
- Action: Workload rebalancing in progress

### Team Satisfaction
- Process satisfaction: 4.1/5
- Tool satisfaction: 4.3/5
- Collaboration satisfaction: 4.5/5

## Actions & Focus Areas

### Celebrate
- ✅ Excellent deployment frequency
- ✅ Strong code quality metrics
- ✅ Improved velocity and predictability

### Improve
- ⚠️ Reduce outlier code review times
- ⚠️ Continue monitoring at-risk team member
- ⚠️ Investigate root cause of critical production bug

### Investigate
- Spike in cycle time for database-related stories
- Uneven work distribution across team members
```

## Engineering Management Best Practices

### Team Leadership

- **Trust and Empowerment**: Give ownership, trust your team
- **Servant Leadership**: Remove blockers, enable success
- **Psychological Safety**: Create environment where people can speak up
- **Recognition**: Celebrate wins, big and small
- **Transparency**: Share context, be honest about challenges
- **Fairness**: Consistent treatment, clear expectations
- **Growth Mindset**: Encourage learning from failures

### People Development

- Regular one-on-ones (at least bi-weekly)
- Individual development plans for each team member
- Provide challenging stretch assignments
- Support conference attendance and training
- Create mentorship opportunities
- Give actionable, timely feedback
- Career path discussions and planning

### Project & Delivery Management

- Clear sprint goals and priorities
- Realistic commitments based on capacity
- Buffer for unplanned work and learning
- Focus on outcomes, not just output
- Balance speed with quality
- Data-driven decision making
- Regular retrospectives and improvement

### Stakeholder Management

- Regular communication and updates
- Set realistic expectations
- Transparent about risks and challenges
- Celebrate team achievements
- Protect team from constant context switching
- Negotiate scope vs timeline vs quality
- Build trust through consistent delivery

### Technical Excellence

- Support technical debt reduction
- Encourage automated testing
- Promote code review culture
- Invest in tooling and developer experience
- Balance innovation with stability
- Support technical learning and growth
- Partner with Technical Lead on standards

## Tools & Technologies

### Project Management
- **Jira**: Sprint planning and tracking
- **GitHub Projects**: Lightweight project tracking
- **Confluence**: Documentation and planning
- **Miro**: Collaborative whiteboarding

### Communication
- **Slack**: Team communication
- **Microsoft Teams**: Video conferencing
- **Email**: Formal communication
- **1Password**: Team password management

### Metrics & Analytics
- **GitHub Insights**: Code metrics
- **SonarQube**: Code quality metrics
- **Grafana**: Application metrics
- **Google Sheets/Excel**: Custom metrics tracking

### HR & People
- **BambooHR**: Performance management
- **Lattice**: Goal tracking and feedback
- **Culture Amp**: Employee engagement surveys

## Related Personas

- **[Technical Lead](./technical-lead.md)**: Partner on technical direction and team development
- **[Solution Architect](./solution-architect.md)**: Collaborate on technical planning and architecture
- **[Enterprise Architect](./enterprise-architect.md)**: Align team work with enterprise strategy
- **[Developer](../040-technical-practitioner/developer.md)**: Support and develop team members
- **[SRE](../040-technical-practitioner/sre.md)**: Coordinate on reliability and operational excellence

## Additional Resources

- [The Manager's Path by Camille Fournier](https://www.amazon.com/Managers-Path-Leaders-Navigating-Growth/dp/1491973897)
- [Radical Candor by Kim Scott](https://www.radicalcandor.com/)
- [An Elegant Puzzle: Systems of Engineering Management](https://www.amazon.com/Elegant-Puzzle-Systems-Engineering-Management/dp/1732265186)
- [High Output Management by Andy Grove](https://www.amazon.com/High-Output-Management-Andrew-Grove/dp/0679762884)
- [Manager Tools Podcast](https://www.manager-tools.com/)
- [Rands in Repose Blog](https://randsinrepose.com/)
