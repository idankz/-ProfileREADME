import { SkillItem } from "@/types/profile";

export const CATEGORY_LABELS: Record<SkillItem["category"], string> = {
  languages: "Programming Languages",
  frontend: "Frontend & UI",
  backend: "Backend & APIs",
  database: "Databases & Storage",
  cloud_devops: "Cloud, DevOps & Infra",
  tools: "Tools & Ecosystem",
};

export const AVAILABLE_SKILLS: SkillItem[] = [
  // Programming Languages
  { id: "ts", name: "TypeScript", category: "languages", skilliconsId: "ts", shieldsSlug: "TypeScript-3178C6", hexColor: "3178C6", logoName: "typescript" },
  { id: "js", name: "JavaScript", category: "languages", skilliconsId: "js", shieldsSlug: "JavaScript-F7DF1E", hexColor: "F7DF1E", logoName: "javascript" },
  { id: "python", name: "Python", category: "languages", skilliconsId: "py", shieldsSlug: "Python-3776AB", hexColor: "3776AB", logoName: "python" },
  { id: "go", name: "Go", category: "languages", skilliconsId: "go", shieldsSlug: "Go-00ADD8", hexColor: "00ADD8", logoName: "go" },
  { id: "rust", name: "Rust", category: "languages", skilliconsId: "rust", shieldsSlug: "Rust-000000", hexColor: "DEA584", logoName: "rust" },
  { id: "cpp", name: "C++", category: "languages", skilliconsId: "cpp", shieldsSlug: "C%2B%2B-00599C", hexColor: "00599C", logoName: "c%2B%2B" },
  { id: "csharp", name: "C#", category: "languages", skilliconsId: "cs", shieldsSlug: "C%23-239120", hexColor: "239120", logoName: "c-sharp" },
  { id: "java", name: "Java", category: "languages", skilliconsId: "java", shieldsSlug: "Java-ED8B00", hexColor: "ED8B00", logoName: "java" },
  { id: "php", name: "PHP", category: "languages", skilliconsId: "php", shieldsSlug: "PHP-777BB4", hexColor: "777BB4", logoName: "php" },
  { id: "ruby", name: "Ruby", category: "languages", skilliconsId: "ruby", shieldsSlug: "Ruby-CC342D", hexColor: "CC342D", logoName: "ruby" },
  { id: "swift", name: "Swift", category: "languages", skilliconsId: "swift", shieldsSlug: "Swift-F05138", hexColor: "F05138", logoName: "swift" },
  { id: "kotlin", name: "Kotlin", category: "languages", skilliconsId: "kotlin", shieldsSlug: "Kotlin-7F52FF", hexColor: "7F52FF", logoName: "kotlin" },
  { id: "html", name: "HTML5", category: "languages", skilliconsId: "html", shieldsSlug: "HTML5-E34F26", hexColor: "E34F26", logoName: "html5" },
  { id: "css", name: "CSS3", category: "languages", skilliconsId: "css", shieldsSlug: "CSS3-1572B6", hexColor: "1572B6", logoName: "css3" },
  { id: "bash", name: "Bash", category: "languages", skilliconsId: "bash", shieldsSlug: "Bash-4EAA25", hexColor: "4EAA25", logoName: "gnubash" },

  // Frontend
  { id: "react", name: "React", category: "frontend", skilliconsId: "react", shieldsSlug: "React-61DAFB", hexColor: "61DAFB", logoName: "react" },
  { id: "nextjs", name: "Next.js", category: "frontend", skilliconsId: "nextjs", shieldsSlug: "Next.js-000000", hexColor: "000000", logoName: "nextdotjs" },
  { id: "vue", name: "Vue.js", category: "frontend", skilliconsId: "vue", shieldsSlug: "Vue.js-4FC08D", hexColor: "4FC08D", logoName: "vuedotjs" },
  { id: "nuxt", name: "Nuxt", category: "frontend", skilliconsId: "nuxtjs", shieldsSlug: "Nuxt-00DC82", hexColor: "00DC82", logoName: "nuxtdotjs" },
  { id: "svelte", name: "Svelte", category: "frontend", skilliconsId: "svelte", shieldsSlug: "Svelte-FF3E00", hexColor: "FF3E00", logoName: "svelte" },
  { id: "angular", name: "Angular", category: "frontend", skilliconsId: "angular", shieldsSlug: "Angular-DD0031", hexColor: "DD0031", logoName: "angular" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", skilliconsId: "tailwind", shieldsSlug: "Tailwind_CSS-38B2AC", hexColor: "38B2AC", logoName: "tailwindcss" },
  { id: "redux", name: "Redux", category: "frontend", skilliconsId: "redux", shieldsSlug: "Redux-593D88", hexColor: "593D88", logoName: "redux" },
  { id: "sass", name: "Sass", category: "frontend", skilliconsId: "sass", shieldsSlug: "Sass-CC6699", hexColor: "CC6699", logoName: "sass" },
  { id: "astro", name: "Astro", category: "frontend", skilliconsId: "astro", shieldsSlug: "Astro-BC52EE", hexColor: "BC52EE", logoName: "astro" },
  { id: "vite", name: "Vite", category: "frontend", skilliconsId: "vite", shieldsSlug: "Vite-646CFF", hexColor: "646CFF", logoName: "vite" },

  // Backend
  { id: "nodejs", name: "Node.js", category: "backend", skilliconsId: "nodejs", shieldsSlug: "Node.js-339933", hexColor: "339933", logoName: "nodedotjs" },
  { id: "express", name: "Express.js", category: "backend", skilliconsId: "express", shieldsSlug: "Express.js-000000", hexColor: "000000", logoName: "express" },
  { id: "nestjs", name: "NestJS", category: "backend", skilliconsId: "nestjs", shieldsSlug: "NestJS-E0234E", hexColor: "E0234E", logoName: "nestjs" },
  { id: "django", name: "Django", category: "backend", skilliconsId: "django", shieldsSlug: "Django-092E20", hexColor: "092E20", logoName: "django" },
  { id: "fastapi", name: "FastAPI", category: "backend", skilliconsId: "fastapi", shieldsSlug: "FastAPI-009688", hexColor: "009688", logoName: "fastapi" },
  { id: "flask", name: "Flask", category: "backend", skilliconsId: "flask", shieldsSlug: "Flask-000000", hexColor: "000000", logoName: "flask" },
  { id: "graphql", name: "GraphQL", category: "backend", skilliconsId: "graphql", shieldsSlug: "GraphQL-E10098", hexColor: "E10098", logoName: "graphql" },
  { id: "spring", name: "Spring Boot", category: "backend", skilliconsId: "spring", shieldsSlug: "Spring_Boot-6DB33F", hexColor: "6DB33F", logoName: "springboot" },
  { id: "laravel", name: "Laravel", category: "backend", skilliconsId: "laravel", shieldsSlug: "Laravel-FF2D20", hexColor: "FF2D20", logoName: "laravel" },

  // Database
  { id: "postgres", name: "PostgreSQL", category: "database", skilliconsId: "postgres", shieldsSlug: "PostgreSQL-316192", hexColor: "316192", logoName: "postgresql" },
  { id: "mongodb", name: "MongoDB", category: "database", skilliconsId: "mongodb", shieldsSlug: "MongoDB-4EA94B", hexColor: "4EA94B", logoName: "mongodb" },
  { id: "mysql", name: "MySQL", category: "database", skilliconsId: "mysql", shieldsSlug: "MySQL-00000F", hexColor: "00000F", logoName: "mysql" },
  { id: "redis", name: "Redis", category: "database", skilliconsId: "redis", shieldsSlug: "Redis-DC382D", hexColor: "DC382D", logoName: "redis" },
  { id: "supabase", name: "Supabase", category: "database", skilliconsId: "supabase", shieldsSlug: "Supabase-3ECF8E", hexColor: "3ECF8E", logoName: "supabase" },
  { id: "firebase", name: "Firebase", category: "database", skilliconsId: "firebase", shieldsSlug: "Firebase-FFCA28", hexColor: "FFCA28", logoName: "firebase" },
  { id: "prisma", name: "Prisma", category: "database", skilliconsId: "prisma", shieldsSlug: "Prisma-2D3748", hexColor: "2D3748", logoName: "prisma" },
  { id: "sqlite", name: "SQLite", category: "database", skilliconsId: "sqlite", shieldsSlug: "SQLite-07405E", hexColor: "07405E", logoName: "sqlite" },

  // Cloud & DevOps
  { id: "docker", name: "Docker", category: "cloud_devops", skilliconsId: "docker", shieldsSlug: "Docker-2496ED", hexColor: "2496ED", logoName: "docker" },
  { id: "kubernetes", name: "Kubernetes", category: "cloud_devops", skilliconsId: "kubernetes", shieldsSlug: "Kubernetes-326CE5", hexColor: "326CE5", logoName: "kubernetes" },
  { id: "aws", name: "AWS", category: "cloud_devops", skilliconsId: "aws", shieldsSlug: "AWS-232F3E", hexColor: "232F3E", logoName: "amazonwebservices" },
  { id: "gcp", name: "Google Cloud", category: "cloud_devops", skilliconsId: "gcp", shieldsSlug: "Google_Cloud-4285F4", hexColor: "4285F4", logoName: "googlecloud" },
  { id: "azure", name: "Microsoft Azure", category: "cloud_devops", skilliconsId: "azure", shieldsSlug: "Azure-0089D6", hexColor: "0089D6", logoName: "microsoftazure" },
  { id: "terraform", name: "Terraform", category: "cloud_devops", skilliconsId: "terraform", shieldsSlug: "Terraform-7B42BC", hexColor: "7B42BC", logoName: "terraform" },
  { id: "githubactions", name: "GitHub Actions", category: "cloud_devops", skilliconsId: "githubactions", shieldsSlug: "GitHub_Actions-2088FF", hexColor: "2088FF", logoName: "githubactions" },
  { id: "linux", name: "Linux", category: "cloud_devops", skilliconsId: "linux", shieldsSlug: "Linux-FCC624", hexColor: "FCC624", logoName: "linux" },
  { id: "vercel", name: "Vercel", category: "cloud_devops", skilliconsId: "vercel", shieldsSlug: "Vercel-000000", hexColor: "000000", logoName: "vercel" },
  { id: "cloudflare", name: "Cloudflare", category: "cloud_devops", skilliconsId: "cloudflare", shieldsSlug: "Cloudflare-F38020", hexColor: "F38020", logoName: "cloudflare" },

  // Tools & Ecosystem
  { id: "git", name: "Git", category: "tools", skilliconsId: "git", shieldsSlug: "Git-F05032", hexColor: "F05032", logoName: "git" },
  { id: "github", name: "GitHub", category: "tools", skilliconsId: "github", shieldsSlug: "GitHub-181717", hexColor: "181717", logoName: "github" },
  { id: "vscode", name: "VS Code", category: "tools", skilliconsId: "vscode", shieldsSlug: "Visual_Studio_Code-0078D4", hexColor: "0078D4", logoName: "visualstudiocode" },
  { id: "figma", name: "Figma", category: "tools", skilliconsId: "figma", shieldsSlug: "Figma-F24E1E", hexColor: "F24E1E", logoName: "figma" },
  { id: "postman", name: "Postman", category: "tools", skilliconsId: "postman", shieldsSlug: "Postman-FF6C37", hexColor: "FF6C37", logoName: "postman" },
  { id: "jest", name: "Jest", category: "tools", skilliconsId: "jest", shieldsSlug: "Jest-C21325", hexColor: "C21325", logoName: "jest" },
  { id: "cypress", name: "Cypress", category: "tools", skilliconsId: "cypress", shieldsSlug: "Cypress-17202C", hexColor: "17202C", logoName: "cypress" },
  { id: "webpack", name: "Webpack", category: "tools", skilliconsId: "webpack", shieldsSlug: "Webpack-8DD6F9", hexColor: "8DD6F9", logoName: "webpack" },
];
