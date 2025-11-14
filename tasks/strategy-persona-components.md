# Persona Component Processing Strategy

## Executive Summary

This document defines the technical implementation strategy for persona-aware component processing in Docusaurus, enabling **attribute inheritance from parent and grandparent pages** while maintaining metadata consistency across the documentation hierarchy.

---

## Problem Statement

Documentation pages need to:
1. **Inherit persona attributes** from parent pages (e.g., all pages under `060-security-compliance/` target security personas)
2. **Override inherited attributes** when specific pages have different target audiences
3. **Merge attributes** from multiple inheritance levels (grandparent → parent → page)
4. **Process at build time** for optimal performance
5. **Validate consistency** to prevent conflicting persona targets

---

## Architecture Overview

### Component Hierarchy

```
Category (_category_.json)
  ├── persona: governance_compliance (primary)
  ├── experience_level: advanced
  │
  ├── Subcategory (_category_.json)
  │   ├── inherits: governance_compliance
  │   ├── adds: security_engineer (secondary)
  │   │
  │   └── Document (frontmatter)
  │       ├── inherits: governance_compliance, security_engineer
  │       └── overrides: experience_level → intermediate
```

### Inheritance Chain

```typescript
interface InheritanceChain {
  grandparent?: CategoryMetadata;  // Top-level category
  parent?: CategoryMetadata;       // Subcategory
  current: PageMetadata;           // Current document
  
  resolved: ResolvedMetadata;      // Final computed attributes
}
```

---

## Metadata Schema

### Category Metadata (`_category_.json`)

```json
{
  "label": "Security & Compliance",
  "position": 6,
  "link": {
    "type": "generated-index"
  },
  "personas": {
    "primary": ["governance_compliance", "security_engineer"],
    "secondary": ["compliance_officer", "auditor"],
    "excluded": ["developer"],
    "inherit": true,
    "override_allowed": true
  },
  "experience_level": {
    "min": "intermediate",
    "recommended": "advanced",
    "inherit": true
  },
  "documentation_type": "explanation",
  "estimated_time": "varies",
  "tags": ["compliance", "security", "iso27001"]
}
```

### Page Frontmatter

```yaml
---
sidebar_position: 1
title: "ISO 27001 Overview"

# Persona targeting
personas:
  primary:
    - compliance_officer
    - auditor
  secondary:
    - security_engineer
  inherit_from_parent: true  # Merge with parent personas
  override_parent: false     # Don't replace parent personas

# Experience level
experience_level:
  min: intermediate
  recommended: advanced
  inherit: true

# Documentation classification
documentation_type: explanation  # tutorial|how_to|reference|explanation
estimated_time: 20min
difficulty: advanced

# Metadata for processing
metadata:
  requires_prerequisites: true
  prerequisites:
    - "Understanding of ISO standards"
    - "Basic security concepts"
  
  related_personas:
    - role: security_engineer
      relevance: high
      reason: "Implements controls defined in this document"
    
    - role: enterprise_architect
      relevance: medium
      reason: "Needs to understand compliance requirements"

# Custom attributes that can be inherited
custom:
  certification_relevant: true
  audit_evidence: true
  control_family: "organizational"
---
```

---

## Inheritance Rules

### 1. Persona Inheritance

**Rule**: Merge personas from all levels unless explicitly overridden

```typescript
interface PersonaInheritance {
  strategy: 'merge' | 'override' | 'append';
  
  merge: {
    // Combine unique personas from all levels
    primary: [...grandparent.primary, ...parent.primary, ...current.primary];
    secondary: [...grandparent.secondary, ...parent.secondary, ...current.secondary];
    
    // Remove explicitly excluded personas
    excluded: [...grandparent.excluded, ...parent.excluded, ...current.excluded];
    
    // Final = (merged primary + merged secondary) - excluded
    result: unique(merged) - excluded;
  };
}
```

**Example**:

```typescript
// Grandparent: /docs/060-security-compliance/_category_.json
{
  personas: {
    primary: ["governance_compliance"],
    secondary: ["security_engineer"]
  }
}

// Parent: /docs/060-security-compliance/ISO27001/_category_.json
{
  personas: {
    primary: ["compliance_officer", "auditor"],
    inherit: true
  }
}

// Current: /docs/060-security-compliance/ISO27001/01-overview.md
---
personas:
  primary: ["iso_auditor"]
  inherit_from_parent: true
---

// RESOLVED:
{
  personas: {
    primary: ["governance_compliance", "compliance_officer", "auditor", "iso_auditor"],
    secondary: ["security_engineer"]
  }
}
```

### 2. Experience Level Inheritance

**Rule**: Use most specific level, with constraints from parents

```typescript
interface ExperienceLevelInheritance {
  min: ExperienceLevel;      // Minimum from all levels (most restrictive)
  max?: ExperienceLevel;     // Maximum if specified
  recommended: ExperienceLevel;  // Most specific (current > parent > grandparent)
  
  resolve() {
    const minLevels = [grandparent.min, parent.min, current.min].filter(Boolean);
    const min = mostRestrictive(minLevels); // expert > advanced > intermediate > beginner
    
    const recommended = current.recommended 
      || parent.recommended 
      || grandparent.recommended
      || min;
    
    return { min, recommended };
  }
}
```

### 3. Documentation Type Inheritance

**Rule**: Current overrides parent, falls back to parent if not specified

```typescript
const resolvedType = current.documentation_type 
  || parent.documentation_type 
  || grandparent.documentation_type 
  || 'reference'; // default
```

### 4. Custom Attributes Inheritance

**Rule**: Deep merge objects, arrays concatenate and deduplicate

```typescript
const resolvedCustom = deepMerge(
  grandparent.custom || {},
  parent.custom || {},
  current.custom || {}
);
```

---

## Implementation: Docusaurus Plugin

### Plugin Architecture

```typescript
// plugins/persona-processor/index.ts
import { LoadContext, Plugin } from '@docusaurus/types';

interface PersonaProcessorOptions {
  enableInheritance: boolean;
  validateConsistency: boolean;
  cacheResolutions: boolean;
}

export default function personaProcessorPlugin(
  context: LoadContext,
  options: PersonaProcessorOptions
): Plugin {
  return {
    name: 'docusaurus-plugin-persona-processor',
    
    async loadContent() {
      // Phase 1: Load all _category_.json files
      const categories = await loadCategoryMetadata();
      
      // Phase 2: Build category hierarchy tree
      const hierarchyTree = buildHierarchyTree(categories);
      
      // Phase 3: Process all markdown files
      const documents = await loadDocuments();
      
      // Phase 4: Resolve inheritance for each document
      const resolvedDocuments = documents.map(doc => {
        const chain = buildInheritanceChain(doc, hierarchyTree);
        return resolveMetadata(chain);
      });
      
      // Phase 5: Validate consistency
      if (options.validateConsistency) {
        validatePersonaConsistency(resolvedDocuments);
      }
      
      return {
        categories,
        documents: resolvedDocuments,
        hierarchyTree
      };
    },
    
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      
      // Make resolved metadata available globally
      setGlobalData({
        personaMetadata: content.documents,
        categoryHierarchy: content.hierarchyTree
      });
    },
    
    configureWebpack(config) {
      return {
        module: {
          rules: [
            {
              test: /\.md$/,
              use: [
                {
                  loader: require.resolve('./loaders/persona-metadata-loader'),
                  options: {
                    enableInheritance: options.enableInheritance
                  }
                }
              ]
            }
          ]
        }
      };
    }
  };
}
```

### Metadata Resolution Engine

```typescript
// plugins/persona-processor/resolver.ts

interface InheritanceChain {
  path: string;
  grandparent?: CategoryMetadata;
  parent?: CategoryMetadata;
  current: PageFrontmatter;
}

interface ResolvedMetadata {
  path: string;
  personas: {
    primary: string[];
    secondary: string[];
    all: string[];
    inherited: string[];
    explicit: string[];
  };
  experienceLevel: {
    min: ExperienceLevel;
    recommended: ExperienceLevel;
  };
  documentationType: string;
  estimatedTime?: string;
  tags: string[];
  custom: Record<string, any>;
  
  // Metadata about resolution
  inheritanceChain: string[];
  resolvedAt: Date;
}

export class MetadataResolver {
  constructor(private hierarchyTree: HierarchyTree) {}
  
  resolve(chain: InheritanceChain): ResolvedMetadata {
    return {
      path: chain.path,
      personas: this.resolvePersonas(chain),
      experienceLevel: this.resolveExperienceLevel(chain),
      documentationType: this.resolveDocumentationType(chain),
      estimatedTime: this.resolveEstimatedTime(chain),
      tags: this.resolveTags(chain),
      custom: this.resolveCustomAttributes(chain),
      inheritanceChain: this.buildChainPath(chain),
      resolvedAt: new Date()
    };
  }
  
  private resolvePersonas(chain: InheritanceChain) {
    const { grandparent, parent, current } = chain;
    
    // Collect all personas if inheritance is enabled
    const shouldInherit = current.personas?.inherit_from_parent !== false;
    
    let primary: string[] = [];
    let secondary: string[] = [];
    let inherited: string[] = [];
    let explicit: string[] = [];
    
    if (shouldInherit) {
      // Inherit from grandparent
      if (grandparent?.personas) {
        primary.push(...(grandparent.personas.primary || []));
        secondary.push(...(grandparent.personas.secondary || []));
        inherited.push(...(grandparent.personas.primary || []));
      }
      
      // Inherit from parent
      if (parent?.personas) {
        primary.push(...(parent.personas.primary || []));
        secondary.push(...(parent.personas.secondary || []));
        inherited.push(...(parent.personas.primary || []));
      }
    }
    
    // Add current page personas
    if (current.personas?.primary) {
      primary.push(...current.personas.primary);
      explicit.push(...current.personas.primary);
    }
    if (current.personas?.secondary) {
      secondary.push(...current.personas.secondary);
    }
    
    // Remove excluded personas
    const excluded = new Set([
      ...(grandparent?.personas?.excluded || []),
      ...(parent?.personas?.excluded || []),
      ...(current.personas?.excluded || [])
    ]);
    
    primary = [...new Set(primary)].filter(p => !excluded.has(p));
    secondary = [...new Set(secondary)].filter(p => !excluded.has(p));
    
    return {
      primary: primary,
      secondary: secondary,
      all: [...primary, ...secondary],
      inherited: [...new Set(inherited)],
      explicit: [...new Set(explicit)]
    };
  }
  
  private resolveExperienceLevel(chain: InheritanceChain) {
    const levels: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
    const levelValue = (level: ExperienceLevel) => levels.indexOf(level);
    
    // Collect min levels (most restrictive wins)
    const minLevels = [
      chain.grandparent?.experience_level?.min,
      chain.parent?.experience_level?.min,
      chain.current?.experience_level?.min
    ].filter(Boolean) as ExperienceLevel[];
    
    const min = minLevels.reduce((most, current) => 
      levelValue(current) > levelValue(most) ? current : most,
      'beginner' as ExperienceLevel
    );
    
    // Recommended: most specific wins
    const recommended = chain.current?.experience_level?.recommended
      || chain.parent?.experience_level?.recommended
      || chain.grandparent?.experience_level?.recommended
      || min;
    
    return { min, recommended };
  }
  
  private resolveDocumentationType(chain: InheritanceChain): string {
    return chain.current?.documentation_type
      || chain.parent?.documentation_type
      || chain.grandparent?.documentation_type
      || 'reference';
  }
  
  private resolveEstimatedTime(chain: InheritanceChain): string | undefined {
    return chain.current?.estimated_time
      || chain.parent?.estimated_time;
  }
  
  private resolveTags(chain: InheritanceChain): string[] {
    const tags = new Set<string>();
    
    // Collect tags from all levels
    [chain.grandparent, chain.parent, chain.current].forEach(level => {
      if (level?.tags) {
        level.tags.forEach(tag => tags.add(tag));
      }
    });
    
    return Array.from(tags);
  }
  
  private resolveCustomAttributes(chain: InheritanceChain): Record<string, any> {
    // Deep merge custom attributes
    return this.deepMerge(
      chain.grandparent?.custom || {},
      chain.parent?.custom || {},
      chain.current?.custom || {}
    );
  }
  
  private deepMerge(...objects: Record<string, any>[]): Record<string, any> {
    return objects.reduce((merged, obj) => {
      Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
          merged[key] = [...new Set([...(merged[key] || []), ...obj[key]])];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          merged[key] = this.deepMerge(merged[key] || {}, obj[key]);
        } else {
          merged[key] = obj[key];
        }
      });
      return merged;
    }, {});
  }
  
  private buildChainPath(chain: InheritanceChain): string[] {
    const path: string[] = [];
    if (chain.grandparent) path.push(chain.grandparent.label || 'root');
    if (chain.parent) path.push(chain.parent.label || 'category');
    path.push(chain.path);
    return path;
  }
}
```

### Category Hierarchy Builder

```typescript
// plugins/persona-processor/hierarchy.ts

interface HierarchyNode {
  path: string;
  label: string;
  metadata: CategoryMetadata;
  parent?: HierarchyNode;
  children: HierarchyNode[];
}

export class HierarchyTree {
  private root: HierarchyNode;
  private nodeMap: Map<string, HierarchyNode>;
  
  constructor(categories: CategoryMetadata[]) {
    this.nodeMap = new Map();
    this.root = this.buildTree(categories);
  }
  
  private buildTree(categories: CategoryMetadata[]): HierarchyNode {
    // Sort by path depth
    const sorted = categories.sort((a, b) => 
      a.path.split('/').length - b.path.split('/').length
    );
    
    const root: HierarchyNode = {
      path: '/',
      label: 'root',
      metadata: {},
      children: []
    };
    this.nodeMap.set('/', root);
    
    sorted.forEach(category => {
      const parentPath = this.getParentPath(category.path);
      const parent = this.nodeMap.get(parentPath) || root;
      
      const node: HierarchyNode = {
        path: category.path,
        label: category.label,
        metadata: category,
        parent,
        children: []
      };
      
      parent.children.push(node);
      this.nodeMap.set(category.path, node);
    });
    
    return root;
  }
  
  getAncestors(path: string): HierarchyNode[] {
    const ancestors: HierarchyNode[] = [];
    const parts = path.split('/').filter(Boolean);
    
    for (let i = 1; i <= parts.length; i++) {
      const ancestorPath = '/' + parts.slice(0, i).join('/');
      const node = this.nodeMap.get(ancestorPath);
      if (node) ancestors.push(node);
    }
    
    return ancestors;
  }
  
  getParent(path: string): HierarchyNode | undefined {
    const parentPath = this.getParentPath(path);
    return this.nodeMap.get(parentPath);
  }
  
  getGrandparent(path: string): HierarchyNode | undefined {
    const parent = this.getParent(path);
    return parent ? this.getParent(parent.path) : undefined;
  }
  
  private getParentPath(path: string): string {
    const parts = path.split('/').filter(Boolean);
    if (parts.length <= 1) return '/';
    return '/' + parts.slice(0, -1).join('/');
  }
}
```

---

## Validation Rules

### Consistency Validator

```typescript
// plugins/persona-processor/validator.ts

interface ValidationRule {
  name: string;
  validate(metadata: ResolvedMetadata): ValidationResult;
}

interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

export class ConsistencyValidator {
  private rules: ValidationRule[] = [
    new PersonaConsistencyRule(),
    new ExperienceLevelRule(),
    new PrerequisiteRule(),
    new DocumentationTypeRule()
  ];
  
  validate(documents: ResolvedMetadata[]): ValidationReport {
    const results = documents.map(doc => ({
      path: doc.path,
      results: this.rules.map(rule => ({
        rule: rule.name,
        result: rule.validate(doc)
      }))
    }));
    
    return new ValidationReport(results);
  }
}

class PersonaConsistencyRule implements ValidationRule {
  name = 'persona-consistency';
  
  validate(metadata: ResolvedMetadata): ValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // Check for conflicting persona targets
    const technicalPersonas = ['developer', 'devops_engineer', 'sre'];
    const governancePersonas = ['compliance_officer', 'auditor', 'risk_manager'];
    
    const hasTechnical = metadata.personas.all.some(p => technicalPersonas.includes(p));
    const hasGovernance = metadata.personas.all.some(p => governancePersonas.includes(p));
    
    if (hasTechnical && hasGovernance) {
      warnings.push(
        `Document targets both technical (${technicalPersonas.join(', ')}) ` +
        `and governance (${governancePersonas.join(', ')}) personas. ` +
        `Consider splitting content or using persona-specific sections.`
      );
    }
    
    // Check for empty persona list
    if (metadata.personas.all.length === 0) {
      warnings.push('No personas specified. Document may not be discoverable.');
    }
    
    return {
      valid: errors.length === 0,
      warnings,
      errors
    };
  }
}

class ExperienceLevelRule implements ValidationRule {
  name = 'experience-level';
  
  validate(metadata: ResolvedMetadata): ValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];
    
    const levels: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
    const minIndex = levels.indexOf(metadata.experienceLevel.min);
    const recIndex = levels.indexOf(metadata.experienceLevel.recommended);
    
    if (recIndex < minIndex) {
      errors.push(
        `Recommended experience level (${metadata.experienceLevel.recommended}) ` +
        `is less than minimum (${metadata.experienceLevel.min})`
      );
    }
    
    // Check if prerequisites match experience level
    if (metadata.custom?.requires_prerequisites && 
        metadata.experienceLevel.min === 'beginner') {
      warnings.push(
        'Document has prerequisites but targets beginners. ' +
        'Consider raising minimum experience level.'
      );
    }
    
    return {
      valid: errors.length === 0,
      warnings,
      errors
    };
  }
}
```

---

## React Components

### Persona Badge Component

```tsx
// src/components/PersonaBadge.tsx
import React from 'react';
import { useResolvedMetadata } from '@site/src/hooks/useResolvedMetadata';

interface PersonaBadgeProps {
  persona: string;
  variant: 'primary' | 'secondary' | 'inherited';
}

export function PersonaBadge({ persona, variant }: PersonaBadgeProps): React.ReactElement {
  const personaConfig = usePersonaConfig(persona);
  
  const colors = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-400',
    inherited: 'bg-gray-300'
  };
  
  return (
    <span 
      className={`persona-badge ${colors[variant]}`}
      title={`${variant} persona: ${personaConfig.name}`}
    >
      {personaConfig.icon} {personaConfig.label}
    </span>
  );
}
```

### Metadata Display Component

```tsx
// src/components/MetadataDisplay.tsx
import React from 'react';
import { useResolvedMetadata } from '@site/src/hooks/useResolvedMetadata';

export function MetadataDisplay(): React.ReactElement {
  const metadata = useResolvedMetadata();
  
  return (
    <div className="metadata-display">
      <div className="persona-section">
        <h4>Target Audience</h4>
        <div className="persona-badges">
          {metadata.personas.primary.map(p => (
            <PersonaBadge key={p} persona={p} variant="primary" />
          ))}
          {metadata.personas.secondary.map(p => (
            <PersonaBadge key={p} persona={p} variant="secondary" />
          ))}
        </div>
        
        {metadata.personas.inherited.length > 0 && (
          <details className="inherited-personas">
            <summary>Inherited from parent categories</summary>
            {metadata.personas.inherited.map(p => (
              <PersonaBadge key={p} persona={p} variant="inherited" />
            ))}
          </details>
        )}
      </div>
      
      <div className="experience-section">
        <h4>Experience Level</h4>
        <div className="experience-badges">
          <span className="min-level">
            Min: {metadata.experienceLevel.min}
          </span>
          <span className="recommended-level">
            Recommended: {metadata.experienceLevel.recommended}
          </span>
        </div>
      </div>
      
      {metadata.custom?.requires_prerequisites && (
        <div className="prerequisites-section">
          <h4>Prerequisites</h4>
          <ul>
            {metadata.custom.prerequisites.map((prereq, i) => (
              <li key={i}>{prereq}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="metadata-footer">
        <span className="doc-type">{metadata.documentationType}</span>
        {metadata.estimatedTime && (
          <span className="estimated-time">⏱️ {metadata.estimatedTime}</span>
        )}
      </div>
    </div>
  );
}
```

### Inheritance Chain Visualizer

```tsx
// src/components/InheritanceChain.tsx
import React from 'react';

interface InheritanceChainProps {
  chain: string[];
  metadata: ResolvedMetadata;
}

export function InheritanceChain({ chain, metadata }: InheritanceChainProps): React.ReactElement {
  return (
    <div className="inheritance-chain">
      <details>
        <summary>Persona Inheritance Chain</summary>
        <div className="chain-visualization">
          {chain.map((level, index) => (
            <div key={index} className="chain-level">
              <div className="level-indicator">
                {index === 0 && '🏛️ '}
                {index === 1 && '📁 '}
                {index === 2 && '📄 '}
                {level}
              </div>
              {index < chain.length - 1 && (
                <div className="chain-arrow">↓ inherits</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="resolution-summary">
          <h5>Final Resolution</h5>
          <ul>
            <li>
              <strong>Primary Personas:</strong>{' '}
              {metadata.personas.primary.join(', ')}
            </li>
            <li>
              <strong>Inherited:</strong>{' '}
              {metadata.personas.inherited.join(', ')}
            </li>
            <li>
              <strong>Explicit:</strong>{' '}
              {metadata.personas.explicit.join(', ')}
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
}
```

---

## Build-Time Processing

### Webpack Loader

```typescript
// plugins/persona-processor/loaders/persona-metadata-loader.ts
import { LoaderContext } from 'webpack';
import matter from 'gray-matter';

interface LoaderOptions {
  enableInheritance: boolean;
}

export default function personaMetadataLoader(
  this: LoaderContext<LoaderOptions>,
  source: string
): string {
  const options = this.getOptions();
  
  if (!options.enableInheritance) {
    return source;
  }
  
  // Parse frontmatter
  const { data: frontmatter, content } = matter(source);
  
  // Get file path
  const filePath = this.resourcePath;
  
  // Resolve metadata (injected by plugin)
  const resolver = this._module?.personaResolver;
  if (!resolver) {
    return source;
  }
  
  const resolved = resolver.resolveForPath(filePath);
  
  // Inject resolved metadata
  const injectedFrontmatter = {
    ...frontmatter,
    _personaMetadata: resolved
  };
  
  return matter.stringify(content, injectedFrontmatter);
}
```

---

## CLI Tools

### Validation Command

```bash
# Validate all persona metadata
npx docusaurus persona:validate

# Validate specific category
npx docusaurus persona:validate --path docs/060-security-compliance

# Show inheritance chains
npx docusaurus persona:show-chains

# Generate inheritance report
npx docusaurus persona:report --format json > persona-report.json
```

### Implementation

```typescript
// plugins/persona-processor/cli.ts
import { Command } from 'commander';

const program = new Command();

program
  .command('validate')
  .description('Validate persona metadata consistency')
  .option('-p, --path <path>', 'Path to validate')
  .option('--fix', 'Auto-fix issues where possible')
  .action(async (options) => {
    const validator = new ConsistencyValidator();
    const documents = await loadDocuments(options.path);
    const report = validator.validate(documents);
    
    console.log(report.format());
    
    if (options.fix) {
      await report.autoFix();
    }
    
    process.exit(report.hasErrors ? 1 : 0);
  });

program
  .command('show-chains')
  .description('Display inheritance chains for all documents')
  .action(async () => {
    const documents = await loadDocuments();
    
    documents.forEach(doc => {
      console.log(`\n${doc.path}`);
      console.log('  ' + doc.inheritanceChain.join(' → '));
    });
  });

program.parse(process.argv);
```

---

## Testing Strategy

### Unit Tests

```typescript
// plugins/persona-processor/__tests__/resolver.test.ts
describe('MetadataResolver', () => {
  it('should merge personas from parent and current', () => {
    const chain = {
      parent: {
        personas: { primary: ['governance_compliance'] }
      },
      current: {
        personas: { primary: ['auditor'] }
      }
    };
    
    const resolver = new MetadataResolver();
    const resolved = resolver.resolve(chain);
    
    expect(resolved.personas.primary).toEqual([
      'governance_compliance',
      'auditor'
    ]);
  });
  
  it('should apply most restrictive experience level', () => {
    const chain = {
      parent: { experience_level: { min: 'intermediate' } },
      current: { experience_level: { min: 'beginner' } }
    };
    
    const resolved = resolver.resolve(chain);
    
    expect(resolved.experienceLevel.min).toBe('intermediate');
  });
  
  it('should exclude specified personas', () => {
    const chain = {
      parent: {
        personas: { 
          primary: ['developer', 'devops_engineer'],
          excluded: ['developer']
        }
      },
      current: {
        personas: { inherit_from_parent: true }
      }
    };
    
    const resolved = resolver.resolve(chain);
    
    expect(resolved.personas.primary).toEqual(['devops_engineer']);
  });
});
```

---

## Migration Guide

### Phase 1: Add Category Metadata

```bash
# Add _category_.json to all directories
find docs -type d -exec touch {}/_category_.json \;
```

### Phase 2: Update Frontmatter

```bash
# Add persona metadata to existing files
npx docusaurus persona:migrate --add-defaults
```

### Phase 3: Validate

```bash
# Check for issues
npx docusaurus persona:validate --fix
```

---

## Performance Considerations

### Caching Strategy

```typescript
interface CacheEntry {
  resolved: ResolvedMetadata;
  timestamp: number;
  dependencies: string[]; // Paths of parent categories
}

class MetadataCache {
  private cache: Map<string, CacheEntry> = new Map();
  
  get(path: string, dependencies: string[]): ResolvedMetadata | null {
    const entry = this.cache.get(path);
    if (!entry) return null;
    
    // Check if dependencies changed
    const allValid = dependencies.every(dep => {
      const depEntry = this.cache.get(dep);
      return depEntry && depEntry.timestamp <= entry.timestamp;
    });
    
    return allValid ? entry.resolved : null;
  }
  
  set(path: string, resolved: ResolvedMetadata, dependencies: string[]): void {
    this.cache.set(path, {
      resolved,
      timestamp: Date.now(),
      dependencies
    });
  }
}
```

---

## References

- [Docusaurus Plugin Lifecycle](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis)
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter Parser
- [Webpack Loaders](https://webpack.js.org/contribute/writing-a-loader/) - Custom Loaders
- [JSON Schema](https://json-schema.org/) - Metadata Validation
- [Commander.js](https://github.com/tj/commander.js) - CLI Framework

---

**Last Updated**: November 14, 2025  
**Status**: Technical Specification  
**Owner**: Documentation Team  
**Related**: [strategy-persona.md](./strategy-persona.md)
