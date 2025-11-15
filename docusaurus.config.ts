import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Intra365',
  tagline: 'ICING Framework: Intranet Connectivity, Integration & Governance',
  favicon: 'img/favicon.ico',

  url: 'https://chef.intra365.dev',
  baseUrl: '/',

  organizationName: 'intra365',
  projectName: 'chef',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/intra365/chef/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          versions: {
            current: {
              label: 'Current (main)',
              path: 'current',
            },
          },
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        indexBlog: false,
        indexPages: false,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        ignoreFiles: [/\/versions\.json$/, /\/_category_\.json$/],
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
      },
    ],
  ],
  
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    image: 'img/chef-social-card.jpg',
    navbar: {
      title: 'Intra365 Chef',
      logo: {
        alt: 'Intra365 Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'personas',
          position: 'left',
          label: 'Personas',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/intra365/intra365-chef',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/current/introduction/overview',
            },
            {
              label: 'Architecture',
              to: '/docs/current/architecture/system-architecture',
            },
            {
              label: 'Deployment',
              to: '/docs/current/deployment-workflows/deployment-overview',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Roadmap',
              to: '/docs/current/roadmap/roadmap-overview',
            },
            {
              label: 'API Reference',
              to: '/docs/current/reference/api-reference',
            },
            {
              label: 'Troubleshooting',
              to: '/docs/current/troubleshooting/common-issues',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/intra365/chef/discussions',
            },
            {
              label: 'Contributing',
              to: '/docs/current/contributing/contribution-guidelines',
            },
            {
              label: 'Intra365 Specs',
              href: 'https://github.com/happy-mates/happy-mates-intra365',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Happy Mates. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: [
        'bash',
        'yaml',
        'typescript',
        'json',
        'docker',
        'markdown',
        'diff',
        'powershell',
        'shell-session',
      ],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
      options: {
        maxTextSize: 50000,
        fontFamily: 'inherit',
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
