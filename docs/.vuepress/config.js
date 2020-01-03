module.exports = {
    base: "/phosphor-webui-vue/",
    title: "OpenBMC Design System",
    description:
      "Guidance on code style and development for the OpenBMC browser-based UI",
    smoothScroll: true,
    themeConfig: {
      nav: [
        {
          text: "Guide",
          link: "/guide/getting-started"
        },
        {
          text: "Themes",
          link: "/themes/"
        },
        {
          text: "Github",
          link: "https://github.com/gtmills/phosphor-webui-vue"
        }
      ],
      sidebarDepth: 1,
      sidebar: {
        "/guide/": [
          "getting-started",
          {
            title: "Coding Standards",
            children: [
              "/guide/coding-standards/",
              ["/guide/coding-standards/accessibility", "Accessibility"],
              ["/guide/coding-standards/sass", "SASS"],
              ["/guide/coding-standards/javascript", "JavaScript"]
            ]
          },
          {
            title: "Guidelines",
            children: [
              "/guide/guidelines/",
              "/guide/guidelines/colors",
              "/guide/guidelines/typography"
            ]
          },
          {
            title: "Components",
            children: ["/guide/components/", "/guide/components/page-section"]
          }
        ]
      },
      "/themes/": [""]
    }
  };