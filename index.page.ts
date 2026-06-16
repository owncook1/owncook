export const layout = "layout.tsx";
export const title = "Dixit";
export const url = "/";

export default function* ({ search }: { search: any }) {
  const allPages = search.pages();
  const posts = allPages
    .filter((page: any) => page.title && page.publish_date)
    .sort(
      (a: any, b: any) =>
        new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime(),
    );

  const content = `
    <div class="header">
      <img src="/dixit.jpg" alt="dixit" class="avatar">
      <div class="header-content">
        <h1 class="site-title">dixit</h1>
        <div class="links">
          <a href="https://github.com/owncook1">GitHub</a>
          <a href="/feed">RSS</a>
        </div>
      <button class="theme-toggle" onclick="toggleTheme()">🌓</button>
      </div>
    </div>
    
    <ul class="post-list">
      ${posts
        .map((post: any) => {
          const formattedDate = new Date(post.publish_date)
            .toISOString()
            .split("T")[0];

          // Fix the URL to remove /posts/ prefix
          const cleanUrl = post.url.replace("/posts/", "/");

          return `
          <li>
            <h2><a href="${cleanUrl}">${post.title}</a></h2>
            <div class="post-date">${formattedDate}</div>
          </li>
        `;
        })
        .join("")}
    </ul>
  `;

  yield {
    url: "/",
    title: "Dixit",
    layout: "layout.tsx",
    content: content,
  };
}
