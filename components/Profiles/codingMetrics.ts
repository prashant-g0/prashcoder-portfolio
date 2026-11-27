export type CodingProfileMetrics = {
  platform: string;
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  contestsParticipated?: number;
  maxRating?: number;
  stars?: number;
  badges?: number | unknown[];
};

export type GitHubMetrics = {
  login?: string;
  name?: string;
  avatarUrl?: string;
  publicRepos?: number;
  followers?: number;
  following?: number;
};

export type CodingMetricsResult = {
  profiles: Record<string, CodingProfileMetrics>;
  github: GitHubMetrics | null;
};

let metricsPromise: Promise<CodingMetricsResult> | null = null;

export function fetchDesktopCodingMetrics(): Promise<CodingMetricsResult> {
  if (metricsPromise) return metricsPromise;

  metricsPromise = Promise.all([
    fetch(
      "https://coding-profile-service-v2-0.onrender.com/stats?leetcode=prashantg-0&codechef=prashantg_0&gfg=mailprasu0t8&hackerrank=mail_prashantg0",
    ),
    fetch("https://api.github.com/users/prashant-g0"),
  ])
    .then(async ([codingResponse, githubResponse]) => {
      const profiles: Record<string, CodingProfileMetrics> = {};

      if (codingResponse.ok) {
        const codingData = (await codingResponse.json()) as {
          profiles?: CodingProfileMetrics[];
        };
        if (Array.isArray(codingData.profiles)) {
          for (const profile of codingData.profiles) {
            if (profile?.platform) {
              const platform = profile.platform.toLowerCase();
              profiles[platform === "gfg" ? "geeksforgeeks" : platform] =
                profile;
            }
          }
        }
      }

      let github: GitHubMetrics | null = null;
      if (githubResponse.ok) {
        const data = (await githubResponse.json()) as {
          login?: string;
          name?: string;
          avatar_url?: string;
          public_repos?: number;
          followers?: number;
          following?: number;
        };
        github = {
          login: data.login,
          name: data.name,
          avatarUrl: data.avatar_url,
          publicRepos: data.public_repos,
          followers: data.followers,
          following: data.following,
        };
      }

      return { profiles, github };
    })
    .catch(() => ({ profiles: {}, github: null }));

  return metricsPromise;
}
