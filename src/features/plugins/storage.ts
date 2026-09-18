export type PluginConfig = {
  githubToken: string;
  githubEnabled: boolean;
};

const KEY = 'llama-ui-plugins-v1';

export function loadPlugins(): PluginConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { githubToken: '', githubEnabled: false };
    return { githubToken: '', githubEnabled: false, ...JSON.parse(raw) };
  } catch {
    return { githubToken: '', githubEnabled: false };
  }
}

export function savePlugins(cfg: PluginConfig) {
  localStorage.setItem(KEY, JSON.stringify(cfg));
}

export async function githubWhoAmI(token: string): Promise<string> {
  const r = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!r.ok) return `Error ${r.status}: ${await r.text()}`;
  const u = await r.json();
  return `login=${u.login} url=${u.html_url}`;
}

export async function githubListRepos(token: string): Promise<string> {
  const r = await fetch(
    'https://api.github.com/user/repos?per_page=15&sort=updated',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );
  if (!r.ok) return `Error ${r.status}`;
  const repos = await r.json();
  return (
    repos
      .map(
        (x: { full_name: string; html_url: string }) =>
          `- ${x.full_name} (${x.html_url})`
      )
      .join('\n') || '(none)'
  );
}
