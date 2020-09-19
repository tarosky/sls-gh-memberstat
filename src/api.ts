import parseLinkHeader from "parse-link-header";
import fetch from "node-fetch";

const createHeader = {
  v3: (accessToken: string) =>
    accessToken
      ? {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${accessToken}`,
        }
      : {
          Accept: "application/vnd.github.v3+json",
        },
  v4: (accessToken: string) => ({
    Accept: "application/json",
    Authorization: `bearer ${accessToken}`,
  }),
};

const githubPagenation = async function (
  initialUrl: string,
  headers: any,
  member_type: Tarosky.GitHub.User["type"]
) {
  let url: string | null = initialUrl;
  const result: Tarosky.GitHub.User[][] = [];

  do {
    const { data, nextUrl } = (await fetch(url, {
      headers,
    }).then((res) => {
      const linkHeader = res.headers.get("Link");
      let nextUrl = "";
      if (linkHeader) {
        const links = parseLinkHeader(linkHeader);

        if (links && links.next) {
          nextUrl = links.next.url;
        }
      }
      return res.json().then((data) => ({
        data: data.map((item: any) => ({ ...item, type: member_type })),
        nextUrl,
      }));
    })) as { data: Tarosky.GitHub.User[]; nextUrl: string };
    result.push(data);
    url = nextUrl;
  } while (url);

  return result.flat();
};

export const listGitHubMembers = (org: string) => {
  const url = `https://api.github.com/orgs/${org}/members`;
  const token = process.env.GITHUB_TOKEN;
  return githubPagenation(url, createHeader.v3(token), "member");
};

export const listGitHubOutsideCollaborators = (org: string) => {
  const url = `https://api.github.com/orgs/${org}/outside_collaborators`;
  const token = process.env.GITHUB_TOKEN;
  return githubPagenation(url, createHeader.v3(token), "outside_collaborator");
};

export const listRepositoryCollanorators = (org: string) => {
  const url = "https://api.github.com/graphql";
  const token = process.env.GITHUB_TOKEN;
  const query = `
    query listRepositoryCollaborators {
      rateLimit {
        cost
        remaining
        resetAt
      }
      organization(login: "${org}") {
        id
        name
        url
        repositories(first: 100) {
          totalCount
          nodes {
            id
            name
            collaborators(first: 100) {
              totalCount
              edges {
                node {
                  login
                }
              }
            }
          }
        }
      }
    }
  `;
  return fetch(url, {
    method: "POST",
    headers: createHeader.v4(token),
    body: JSON.stringify({ query }),
  }).then((res) => res.json());
};

export const postSlack = async (text: string) => {
  const {
    SLACK_INCOMMING_WEBHOOK_URL,
    SLACK_CHANNEL,
    SLACK_USERNAME,
    SLACK_EMOJI,
  } = process.env;
  const data = {
    channel: SLACK_CHANNEL,
    username: SLACK_USERNAME,
    text,
    icon_emoji: SLACK_EMOJI,
  };

  try {
    const result = await fetch(SLACK_INCOMMING_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.text());
    return result;
  } catch (error) {
    console.error({ error, data });
    throw error;
  }
};
