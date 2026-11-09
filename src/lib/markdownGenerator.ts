import { ProfileState, SkillItem } from "@/types/profile";
import { AVAILABLE_SKILLS, CATEGORY_LABELS } from "./skillsData";

export function generateMarkdown(state: ProfileState): string {
  const sections: string[] = [];
  const align = state.personal.alignment;
  const isCenter = align === "center";

  // 1. Personal / Header Section
  if (state.personal.enabled) {
    const personalBlocks: string[] = [];

    // Banner image
    if (state.personal.bannerUrl.trim()) {
      if (isCenter) {
        personalBlocks.push(
          `<p align="center"><img src="${state.personal.bannerUrl.trim()}" alt="${state.personal.name || "Banner"}" width="100%" /></p>`
        );
      } else {
        personalBlocks.push(`![Banner](${state.personal.bannerUrl.trim()})`);
      }
    }

    // Name & Heading
    if (state.personal.name.trim()) {
      if (isCenter) {
        personalBlocks.push(`<h1 align="center">Hi there, I'm ${state.personal.name} 👋</h1>`);
      } else {
        personalBlocks.push(`# Hi there, I'm ${state.personal.name} 👋`);
      }
    }

    // Typing SVG or Title
    if (state.personal.enableTypingSvg && state.personal.typingSvgLines.length > 0) {
      const validLines = state.personal.typingSvgLines.filter((l) => l.trim().length > 0);
      if (validLines.length > 0) {
        const encodedLines = validLines.map((l) => encodeURIComponent(l.trim())).join(";");
        const typingUrl = `https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=22D3EE&center=${isCenter ? "true" : "false"}&vCenter=true&width=500&lines=${encodedLines}`;
        if (isCenter) {
          personalBlocks.push(
            `<p align="center"><a href="https://git.io/typing-svg"><img src="${typingUrl}" alt="Typing SVG" /></a></p>`
          );
        } else {
          personalBlocks.push(`[![Typing SVG](${typingUrl})](https://git.io/typing-svg)`);
        }
      }
    } else if (state.personal.title.trim()) {
      if (isCenter) {
        personalBlocks.push(`<h3 align="center">${state.personal.title.trim()}</h3>`);
      } else {
        personalBlocks.push(`### ${state.personal.title.trim()}`);
      }
    }

    // Profile Views Counter
    if (state.stats.enabled && state.stats.showProfileViews && state.stats.username.trim()) {
      const color = state.stats.viewsCounterColor || "007ec6";
      const viewsUrl = `https://komarev.com/ghpvc/?username=${state.stats.username.trim()}&color=${color}&style=flat-square&label=PROFILE+VIEWS`;
      if (isCenter) {
        personalBlocks.push(`<p align="center"><img src="${viewsUrl}" alt="Profile Views" /></p>`);
      } else {
        personalBlocks.push(`![Profile Views](${viewsUrl})`);
      }
    }

    // Bio
    if (state.personal.bio.trim()) {
      if (isCenter) {
        personalBlocks.push(`<p align="center">\n${state.personal.bio.trim()}\n</p>`);
      } else {
        personalBlocks.push(state.personal.bio.trim());
      }
    }

    // Bullet points (About details)
    const bulletList: string[] = [];
    if (state.personal.workingOn.trim()) {
      bulletList.push(`- 🔭 **Working on:** ${state.personal.workingOn.trim()}`);
    }
    if (state.personal.learning.trim()) {
      bulletList.push(`- 🌱 **Currently learning:** ${state.personal.learning.trim()}`);
    }
    if (state.personal.askMeAbout.trim()) {
      bulletList.push(`- 💬 **Ask me about:** ${state.personal.askMeAbout.trim()}`);
    }
    if (state.personal.location.trim()) {
      bulletList.push(`- 📍 **Location:** ${state.personal.location.trim()}`);
    }
    if (state.personal.contactEmail.trim()) {
      bulletList.push(
        `- 📫 **Reach me at:** [${state.personal.contactEmail.trim()}](mailto:${state.personal.contactEmail.trim()})`
      );
    }
    if (state.personal.funFact.trim()) {
      bulletList.push(`- ⚡ **Fun fact:** ${state.personal.funFact.trim()}`);
    }

    if (bulletList.length > 0) {
      if (isCenter) {
        personalBlocks.push(
          `<div align="center">\n\n${bulletList.join("\n\n")}\n\n</div>`
        );
      } else {
        personalBlocks.push(bulletList.join("\n"));
      }
    }

    if (personalBlocks.length > 0) {
      sections.push(personalBlocks.join("\n\n"));
    }
  }

  // 2. Tech Stack & Skills
  if (state.techStack.enabled && state.techStack.selectedSkills.length > 0) {
    const allSkillsMap = new Map<string, SkillItem>();
    AVAILABLE_SKILLS.forEach((s) => allSkillsMap.set(s.id, s));
    state.techStack.customSkills.forEach((s) => allSkillsMap.set(s.id, s));

    const selectedList = state.techStack.selectedSkills
      .map((id) => allSkillsMap.get(id))
      .filter((s): s is SkillItem => Boolean(s));

    if (selectedList.length > 0) {
      const techBlocks: string[] = [];
      techBlocks.push(isCenter ? `<h2 align="center">🛠️ Tech Stack & Skills</h2>` : `## 🛠️ Tech Stack & Skills`);

      const style = state.techStack.badgeStyle;

      if (style === "skillicons") {
        if (state.techStack.groupByCategory) {
          const categories: SkillItem["category"][] = [
            "languages",
            "frontend",
            "backend",
            "database",
            "cloud_devops",
            "tools",
          ];

          for (const cat of categories) {
            const catSkills = selectedList.filter((s) => s.category === cat);
            if (catSkills.length > 0) {
              const ids = catSkills.map((s) => s.skilliconsId).join(",");
              if (isCenter) {
                techBlocks.push(
                  `**${CATEGORY_LABELS[cat]}**\n\n` +
                    `<p align="center"><a href="https://skillicons.dev"><img src="https://skillicons.dev/icons?i=${ids}&theme=dark" alt="${CATEGORY_LABELS[cat]}" /></a></p>`
                );
              } else {
                techBlocks.push(
                  `**${CATEGORY_LABELS[cat]}**\n\n` +
                    `[![${CATEGORY_LABELS[cat]}](https://skillicons.dev/icons?i=${ids}&theme=dark)](https://skillicons.dev)`
                );
              }
            }
          }
        } else {
          const ids = selectedList.map((s) => s.skilliconsId).join(",");
          if (isCenter) {
            techBlocks.push(
              `<p align="center"><a href="https://skillicons.dev"><img src="https://skillicons.dev/icons?i=${ids}&theme=dark" alt="My Skills" /></a></p>`
            );
          } else {
            techBlocks.push(
              `[![My Skills](https://skillicons.dev/icons?i=${ids}&theme=dark)](https://skillicons.dev)`
            );
          }
        }
      } else {
        // Shields.io badges
        const shieldStyleMap: Record<string, string> = {
          "shields-flat-square": "flat-square",
          "shields-for-the-badge": "for-the-badge",
          "shields-plastic": "plastic",
        };
        const shieldStyle = shieldStyleMap[style] || "flat-square";

        if (state.techStack.groupByCategory) {
          const categories: SkillItem["category"][] = [
            "languages",
            "frontend",
            "backend",
            "database",
            "cloud_devops",
            "tools",
          ];

          for (const cat of categories) {
            const catSkills = selectedList.filter((s) => s.category === cat);
            if (catSkills.length > 0) {
              if (isCenter) {
                const badgesHtml = catSkills
                  .map(
                    (s) =>
                      `<img src="https://img.shields.io/badge/${s.shieldsSlug}?style=${shieldStyle}&logo=${s.logoName}&logoColor=white" alt="${s.name}" />`
                  )
                  .join(" ");
                techBlocks.push(`**${CATEGORY_LABELS[cat]}**\n\n<p align="center">${badgesHtml}</p>`);
              } else {
                const badgesMd = catSkills
                  .map(
                    (s) =>
                      `![${s.name}](https://img.shields.io/badge/${s.shieldsSlug}?style=${shieldStyle}&logo=${s.logoName}&logoColor=white)`
                  )
                  .join(" ");
                techBlocks.push(`**${CATEGORY_LABELS[cat]}**\n\n${badgesMd}`);
              }
            }
          }
        } else {
          if (isCenter) {
            const badgesHtml = selectedList
              .map(
                (s) =>
                  `<img src="https://img.shields.io/badge/${s.shieldsSlug}?style=${shieldStyle}&logo=${s.logoName}&logoColor=white" alt="${s.name}" />`
              )
              .join(" ");
            techBlocks.push(`<p align="center">${badgesHtml}</p>`);
          } else {
            const badgesMd = selectedList
              .map(
                (s) =>
                  `![${s.name}](https://img.shields.io/badge/${s.shieldsSlug}?style=${shieldStyle}&logo=${s.logoName}&logoColor=white)`
              )
              .join(" ");
            techBlocks.push(badgesMd);
          }
        }
      }

      sections.push(techBlocks.join("\n\n"));
    }
  }

  // 3. GitHub Stats & Metrics
  if (state.stats.enabled && state.stats.username.trim()) {
    const user = state.stats.username.trim();
    const theme = state.stats.theme;
    const hideBorder = state.stats.hideBorder ? "true" : "false";
    const countPrivate = state.stats.showPrivateCommits ? "true" : "false";

    const statsBlocks: string[] = [];
    statsBlocks.push(isCenter ? `<h2 align="center">📊 GitHub Metrics & Activity</h2>` : `## 📊 GitHub Metrics & Activity`);

    // Trophies
    if (state.stats.showTrophies) {
      const trophyUrl = `https://github-profile-trophy.vercel.app/?username=${user}&theme=${theme}&no-frame=${hideBorder}&no-bg=true&margin-w=4`;
      if (isCenter) {
        statsBlocks.push(
          `<p align="center"><img src="${trophyUrl}" alt="${user}'s GitHub Trophies" /></p>`
        );
      } else {
        statsBlocks.push(`![${user}'s GitHub Trophies](${trophyUrl})`);
      }
    }

    // Stats and Top Languages
    const cards: string[] = [];
    if (state.stats.showGeneralStats) {
      const statsUrl = `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${theme}&hide_border=${hideBorder}&count_private=${countPrivate}`;
      cards.push(`<img height="165" src="${statsUrl}" alt="${user}'s GitHub Stats" />`);
    }

    if (state.stats.showTopLanguages) {
      const layout = state.stats.topLanguagesLayout === "compact" ? "&layout=compact" : "";
      const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}${layout}&theme=${theme}&hide_border=${hideBorder}`;
      cards.push(`<img height="165" src="${langsUrl}" alt="Top Languages" />`);
    }

    if (cards.length > 0) {
      if (isCenter) {
        statsBlocks.push(`<p align="center">\n  ${cards.join("\n  ")}\n</p>`);
      } else {
        statsBlocks.push(cards.join(" "));
      }
    }

    // Streak stats
    if (state.stats.showStreakStats) {
      const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=${theme}&hide_border=${hideBorder}`;
      if (isCenter) {
        statsBlocks.push(
          `<p align="center"><img src="${streakUrl}" alt="${user}'s Streak Stats" /></p>`
        );
      } else {
        statsBlocks.push(`![${user}'s Streak Stats](${streakUrl})`);
      }
    }

    if (statsBlocks.length > 1) {
      sections.push(statsBlocks.join("\n\n"));
    }
  }

  // 4. Social Links & Badges
  if (state.socials.enabled) {
    const soc = state.socials;
    const socialItems: { name: string; slug: string; logo: string; url: string }[] = [];

    if (soc.github.trim()) {
      socialItems.push({
        name: "GitHub",
        slug: "GitHub-181717",
        logo: "github",
        url: `https://github.com/${soc.github.trim()}`,
      });
    }
    if (soc.linkedin.trim()) {
      const url = soc.linkedin.startsWith("http")
        ? soc.linkedin
        : `https://linkedin.com/in/${soc.linkedin.trim()}`;
      socialItems.push({
        name: "LinkedIn",
        slug: "LinkedIn-0A66C2",
        logo: "linkedin",
        url,
      });
    }
    if (soc.twitter.trim()) {
      const handle = soc.twitter.replace(/^@/, "").trim();
      socialItems.push({
        name: "X (Twitter)",
        slug: "X-000000",
        logo: "x",
        url: `https://x.com/${handle}`,
      });
    }
    if (soc.portfolio.trim()) {
      const url = soc.portfolio.startsWith("http") ? soc.portfolio.trim() : `https://${soc.portfolio.trim()}`;
      socialItems.push({
        name: "Portfolio",
        slug: "Portfolio-2563EB",
        logo: "google-chrome",
        url,
      });
    }
    if (soc.discord.trim()) {
      const url = soc.discord.startsWith("http") ? soc.discord.trim() : `https://discord.gg/${soc.discord.trim()}`;
      socialItems.push({
        name: "Discord",
        slug: "Discord-5865F2",
        logo: "discord",
        url,
      });
    }
    if (soc.youtube.trim()) {
      const url = soc.youtube.startsWith("http") ? soc.youtube.trim() : `https://youtube.com/@${soc.youtube.trim()}`;
      socialItems.push({
        name: "YouTube",
        slug: "YouTube-FF0000",
        logo: "youtube",
        url,
      });
    }
    if (soc.email.trim()) {
      socialItems.push({
        name: "Email",
        slug: "Email-EA4335",
        logo: "gmail",
        url: `mailto:${soc.email.trim()}`,
      });
    }
    if (soc.devto.trim()) {
      socialItems.push({
        name: "Dev.to",
        slug: "Dev.to-0A0A0A",
        logo: "devdotto",
        url: `https://dev.to/${soc.devto.trim()}`,
      });
    }
    if (soc.medium.trim()) {
      const handle = soc.medium.replace(/^@/, "").trim();
      socialItems.push({
        name: "Medium",
        slug: "Medium-12100E",
        logo: "medium",
        url: `https://medium.com/@${handle}`,
      });
    }
    if (soc.twitch.trim()) {
      socialItems.push({
        name: "Twitch",
        slug: "Twitch-9146FF",
        logo: "twitch",
        url: `https://twitch.tv/${soc.twitch.trim()}`,
      });
    }

    if (socialItems.length > 0) {
      const heading = isCenter ? `<h2 align="center">🌐 Connect with Me</h2>` : `## 🌐 Connect with Me`;
      let badgesBlock = "";

      if (isCenter) {
        // Real HTML in center alignment
        const badgesHtml = socialItems
          .map(
            (item) =>
              `<a href="${item.url}"><img src="https://img.shields.io/badge/${item.slug}?style=for-the-badge&logo=${item.logo}&logoColor=white" alt="${item.name}" /></a>`
          )
          .join(" ");
        badgesBlock = `<p align="center">\n  ${badgesHtml}\n</p>`;
      } else {
        // Pure Markdown in left alignment (NO <p> tag wrapper)
        badgesBlock = socialItems
          .map(
            (item) =>
              `[![${item.name}](https://img.shields.io/badge/${item.slug}?style=for-the-badge&logo=${item.logo}&logoColor=white)](${item.url})`
          )
          .join(" ");
      }

      sections.push(`${heading}\n\n${badgesBlock}`);
    }
  }

  // 5. Add-ons & Extra Blocks
  if (state.addons.enabled) {
    const addonBlocks: string[] = [];

    // Recent Blogs
    if (state.addons.showRecentBlogs && state.addons.blogPosts.length > 0) {
      const validPosts = state.addons.blogPosts.filter((p) => p.title.trim().length > 0);
      if (validPosts.length > 0) {
        const blogList = validPosts
          .map((p) => `- [${p.title.trim()}](${p.url.trim() || "#"})`)
          .join("\n");
        addonBlocks.push(
          (isCenter ? `<h2 align="center">✍️ Recent Blog Posts</h2>` : `## ✍️ Recent Blog Posts`) +
            `\n\n${blogList}`
        );
      }
    }

    // Dev Quote
    if (state.addons.showQuote) {
      const quoteUrl = `https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${state.addons.quoteTheme}`;
      if (isCenter) {
        addonBlocks.push(
          `<p align="center"><img src="${quoteUrl}" alt="Random Dev Quote" /></p>`
        );
      } else {
        addonBlocks.push(`![Random Dev Quote](${quoteUrl})`);
      }
    }

    // Sponsor button
    if (state.addons.showSponsorButton && state.addons.sponsorUsername.trim()) {
      const user = state.addons.sponsorUsername.trim();
      let sponsorPlatformSlug = "github-sponsors";
      let sponsorBadgeColor = "EA4AAA";
      let sponsorText = "Sponsor";
      let sponsorLogoColor = "white";
      let sponsorUrl = `https://github.com/sponsors/${user}`;

      if (state.addons.sponsorPlatform === "buymeacoffee") {
        sponsorPlatformSlug = "buy-me-a-coffee";
        sponsorBadgeColor = "ffdd00";
        sponsorText = "Buy%20Me%20a%20Coffee";
        sponsorLogoColor = "black";
        sponsorUrl = `https://buymeacoffee.com/${user}`;
      } else if (state.addons.sponsorPlatform === "kofi") {
        sponsorPlatformSlug = "ko-fi";
        sponsorBadgeColor = "F16061";
        sponsorText = "Ko--fi";
        sponsorLogoColor = "white";
        sponsorUrl = `https://ko-fi.com/${user}`;
      }

      const badgeImgUrl = `https://img.shields.io/badge/${sponsorText}-${sponsorBadgeColor}?style=for-the-badge&logo=${sponsorPlatformSlug}&logoColor=${sponsorLogoColor}`;
      const heading = isCenter ? `<h2 align="center">💖 Support My Work</h2>` : `## 💖 Support My Work`;

      if (isCenter) {
        addonBlocks.push(
          `${heading}\n\n<p align="center"><a href="${sponsorUrl}"><img src="${badgeImgUrl}" alt="Support" /></a></p>`
        );
      } else {
        addonBlocks.push(
          `${heading}\n\n[![Support](${badgeImgUrl})](${sponsorUrl})`
        );
      }
    }

    // Custom Markdown Freeform
    if (state.addons.customMarkdownEnabled && state.addons.customMarkdown.trim()) {
      addonBlocks.push(state.addons.customMarkdown.trim());
    }

    if (addonBlocks.length > 0) {
      sections.push(addonBlocks.join("\n\n"));
    }
  }

  // Footer note
  const footer = `\n---\n<p align="center"><em>Generated with <a href="https://github.com/idankz/-ProfileREADME">ProfileREADME.dev</a> 🚀</em></p>`;

  return sections.join("\n\n---\n\n") + footer;
}
