import * as Lambda from "aws-lambda";
import {
  listGitHubMembers,
  listGitHubOutsideCollaborators,
  listRepositoryCollanorators,
  postSlack,
} from "./api";
import { formatMessages } from "./utils";

export const handler: Lambda.ScheduledHandler = async (_0, _1, callback) => {
  const org = process.env.GITHUB_ORGNAME;
  // const members = (
  //   await Promise.all([
  //     listGitHubMembers(org),
  //     listGitHubOutsideCollaborators(org),
  //   ])
  // ).flat();

  const repositoryCollaborators = (await listRepositoryCollanorators(
    org
  )) as Tarosky.GitHub.GraphqlQueryResult.ListRepositoryCollaborators;
  const data = repositoryCollaborators.data.organization.repositories.nodes
    .map(({ name, collaborators }) => {
      const names = collaborators.edges
        .map((edge) => edge.node.login)
        .join(",");
      return `${name}: ${names}`;
    })
    .join("\n");

  try {
    await postSlack(formatMessages(data));
    return callback(null);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};

if (process.argv[2] === "--exec" || process.argv[2] === "-e") {
  handler({} as any, {} as any, (error) => {
    console.log(error);
  });
}
