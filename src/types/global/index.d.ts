declare namespace Tarosky {
  export namespace GitHub {
    // {
    //   login: 'kamataryo',
    //   id: 6292312,
    //   node_id: 'MDQ6VXNlcjYyOTIzMTI=',
    //   avatar_url: 'https://avatars3.githubusercontent.com/u/6292312?v=4',
    //   gravatar_id: '',
    //   url: 'https://api.github.com/users/kamataryo',
    //   html_url: 'https://github.com/kamataryo',
    //   followers_url: 'https://api.github.com/users/kamataryo/followers',
    //   following_url: 'https://api.github.com/users/kamataryo/following{/other_user}',
    //   gists_url: 'https://api.github.com/users/kamataryo/gists{/gist_id}',
    //   starred_url: 'https://api.github.com/users/kamataryo/starred{/owner}{/repo}',
    //   subscriptions_url: 'https://api.github.com/users/kamataryo/subscriptions',
    //   organizations_url: 'https://api.github.com/users/kamataryo/orgs',
    //   repos_url: 'https://api.github.com/users/kamataryo/repos',
    //   events_url: 'https://api.github.com/users/kamataryo/events{/privacy}',
    //   received_events_url: 'https://api.github.com/users/kamataryo/received_events',
    //   type: 'User',
    //   site_admin: false
    // },
    export type User = {
      login: string;
      avatar_url: string;
      html_url: string;
      site_admin: boolean;
      // custom props
      type: "member" | "outside_collaborator";
    };
  }
}

/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly SLACK_INCOMMING_WEBHOOK_URL: string;
    readonly GITHUB_ORGNAME: string;
    readonly GITHUB_TOKEN: string;
    readonly SLACK_CHANNEL: string;
    readonly SLACK_USERNAME: string;
    readonly SLACK_EMOJI: string;
  }
}
