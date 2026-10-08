import type { ResumeData } from "@/types/resume";

export const resume: ResumeData = {
  personal: {
    name: "KALYAN MANDA",
    title: "Sitecore Developer & Digital Experience Engineer",
    summary:
      "I’m a Sitecore Certified AI CMS Developer focused on building scalable digital experiences that are reliable, flexible, and easy for teams to maintain. My work spans Sitecore XP, XM, XM Cloud, SXA, Sitecore MVC, .NET, and ASP.NET, with a strong emphasis on enterprise CMS solutions and performance-driven user experiences.",
    email: "kalyanmandamp2000@gmail.com",
    phone: "+91 6301579122",
    location: "Hyderabad",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/kalyan-manda-90160822a" }, { label: "GitHub", url: "https://github.com/kalyanmandamp2000-lgtm"  }],
  },
  experience: [
    {
      role: "Engineer",
      company: "HTC Global Services",
      period: "October 2025 – Present",
      location: "Hyderabad",
      highlights: [
        "Developed reusable, data-driven Sitecore MVC components using Sitecore MVC architecture and Razor views, ensuring components remained agnostic to page structure and reusable across multiple sites.",
        "Created and managed Sitecore templates, standard values, branch templates, and multilingual data source items to support complex multisite solutions.",
        "Designed scalable components with a single codebase capable of supporting different branding requirements and data sources across multiple site nodes in the content tree.",
        "Utilized rendering parameters to enable content authors to customize component look and feel without requiring additional development effort.",
        "Managed deployment and content synchronization across environments using packages, TDS, and Unicorn, while troubleshooting issues through Sitecore logs and debugging component failures.",
        "Integrated HTML5, CSS3, Bootstrap, JavaScript, and jQuery with Sitecore components and collaborated with UX and DevOps teams to deliver scalable, high-performance solutions.",
      ],
    },
    {
      role: "Sitecore Developer",
      company: "Erebor tech",
      period: "August 2022 – September 2025",
      location: "Hyderabad",
      highlights: [
        "Developed reusable Sitecore XP/XM MVC components and implemented caching to improve application responsiveness.",
        "Delivered personalized user experiences by integrating Sitecore data models with dynamic content delivery.",
        "Designed and integrated Sitecore content structures and data templates, enabling scalable and maintainable content delivery across multiple websites.",
        "Designed and implemented GraphQL APIs for Headless CMS integrations, improving front-end content access in Sitecore XMC.",
        "Configured and optimized Sitecore search solutions using Solr, improving content discoverability, search relevance, and retrieval performance.",
        "Automated deployment and configuration using CI/CD, reducing manual effort and errors.",
        "Refactored and debugged legacy code, improving maintainability and reducing recurring issues.",
        "Used Glass.Mapper to simplify Sitecore data access with automatic field-to-model mapping.",
      ],
    },
  ],
  skills: [
    {
      category: "Sitecore & CMS",
      items: [
        "SitecoreAI",
        "XM Cloud (XMC)",
        "SXA",
        "XP",
        "XM",
        "Headless CMS",
        "Sitecore MVC",
        "Sitecore PowerShell Extensions",
      ],
    },
    {
      category: "Backend Development",
      items: ["C#", "ASP.NET MVC", "ASP.NET Core", "Node.js", "LINQ"],
    },
    {
      category: "Frontend Development",
      items: ["HTML5", "CSS3", "JavaScript", "jQuery", "React.js"],
    },
    {
      category: "Databases & APIs",
      items: ["MS SQL Server", "Cosmos DB", "Solr", "GraphQL", "REST APIs"],
    },
    {
      category: "Tools & Practices",
      items: ["Azure", "CI/CD", "Agile", "Visual Studio", "VS Code", "Postman"],
    },
  ],
  projects: [
    {
      name: "Mylan",
      summary: "A digital solution for better healthcare accessibility and management",
      role: "Sitecore Developer",
      period: "Project delivery",
      technologies: ["Sitecore MVC", "Sitecore Templates", "Razor", "JavaScript"],
      highlights: [
        "Developed Sitecore MVC components to migrate non-Sitecore country websites into the existing Sitecore platform.",
        "Designed reusable components based on country-specific client requirements.",
        "Created Sitecore templates, renderings, and content structures for regional websites.",
        "Integrated country-specific functionality while maintaining the existing Sitecore architecture.",
      ],
    },
    {
      name: "Rooted",
      summary:
        "Backend API services powering real-time data delivery for a quick-commerce mobile application",
      role: "Backend Developer",
      period: "Project delivery",
      technologies: ["Node.js", "Google Maps API", "Caching", "Asynchronous APIs"],
      highlights: [
        "Developed and maintained a Node.js backend API with modular architecture, ensuring scalability and long-term maintainability.",
        "Integrated Google Maps APIs to deliver geolocation data, including distance and estimated travel times, for optimized logistics.",
        "Improved backend responsiveness using asynchronous functions, non-blocking I/O, and effective caching techniques.",
      ],
    },
    {
      name: "Brother USA",
      summary:
        "Sitecore based e-commerce platform for delivering scalable and personalized digital shopping experiences",
      role: "Sitecore Developer",
      period: "Project delivery",
      technologies: ["Sitecore XM", "SXA", "MVC", "Scriban", "PowerShell"],
      highlights: [
        "Built and customized Sitecore XM components, templates, and layouts using Sitecore SXA and MVC and Scriban.",
        "Collaborated on Sitecore XM deployments and environment management across Dev, QA, and UAT.",
        "Ensured reliable releases and seamless content publishing using PowerShell, Sitecore CLI, and serialization tools.",
      ],
    },
    {
      name: "MNG Health",
      summary:
        "Event management system for delivering healthcare programs and experiences to registered users",
      role: "Sitecore Developer",
      period: "Project delivery",
      technologies: ["Sitecore", ".NET", "Helix", "Solr", "Pipelines"],
      highlights: [
        "Collaborated with cross-functional teams to gather requirements and translate them into technical specifications.",
        "Designed and implemented data templates, components, and fully functional websites within Sitecore.",
        "Developed clean, scalable .NET code to maintain performance, reliability, and long-term sustainability using Sitecore Helix principles.",
        "Implemented custom pipelines resolvers and event handlers in Sitecore and optimized search performance with Solr.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Degree in Computer Science",
      institution: "Andhra University",
      period: "2017 – 2020",
    },
  ],
  certifications: [
    {
      title: "SitecoreAI CMS Developer",
      issuer: "Sitecore",
      date: "May 2026",
      credentialId: "4281c03f-5290-4405-bc56-f551fbf43c3c",
      url: "https://www.credly.com/badges/4281c03f-5290-4405-bc56-f551fbf43c3c/whatsapp",
    },
  ],
};
