/**
 * Eleventy filters configuration
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  // Convert date to ISO string
  eleventyConfig.addFilter("dateToISOString", (date) => {
    return new Date(date).toISOString();
  });

  // Format date for display
  eleventyConfig.addFilter("readableDate", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Short date format
  eleventyConfig.addFilter("shortDate", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  // Strip HTML tags
  eleventyConfig.addFilter("striptags", (content) => {
    return content?.replace(/<[^>]*>/g, "") || "";
  });

  // Collapse whitespace
  eleventyConfig.addFilter("collapseWhitespace", (content) => {
    return content?.replace(/\s+/g, " ").trim() || "";
  });

  // Truncate text
  eleventyConfig.addFilter("truncate", (content, length = 100) => {
    if (!content || content.length <= length) return content;
    return content.substring(0, length).trim() + "...";
  });

  // Limit array items
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array?.slice(0, limit) || [];
  });

  // Slugify text
  eleventyConfig.addFilter("slugify", (text) => {
    return text
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  });

  // JSON stringify for safe output in templates
  eleventyConfig.addFilter("jsonify", (content) => {
    return JSON.stringify(content);
  });

  // Get current year
  eleventyConfig.addFilter("year", () => {
    return new Date().getFullYear();
  });

  // Set attribute on object (returns new object)
  eleventyConfig.addFilter("setAttribute", (obj, key, value) => {
    return { ...obj, [key]: value };
  });

  // Format date with custom format string
  // Supports: MM, dd, yyyy
  eleventyConfig.addFilter("formatDate", (date, format) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();

    return format
      .replace("MM", month)
      .replace("dd", day)
      .replace("yyyy", year);
  });

  // Group posts by year (returns object with year keys, sorted descending)
  eleventyConfig.addFilter("groupByYear", (posts) => {
    const grouped = {};

    // Sort posts by date descending first
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const post of sortedPosts) {
      const year = new Date(post.date).getFullYear();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(post);
    }

    // Return as array of [year, posts] sorted by year descending
    return Object.entries(grouped).sort((a, b) => b[0] - a[0]);
  });
}
