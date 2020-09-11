import * as Lambda from "aws-lambda";
import {
  listGitHubMembers,
  listGitHubOutsideCollaborators,
  postSlack,
} from "./api";
import { formatMessages } from "./utils";

export const handler: Lambda.ScheduledHandler = async (_0, _1, callback) => {
  const org = process.env.GITHUB_ORGNAME;
  const members = (
    await Promise.all([
      listGitHubMembers(org),
      listGitHubOutsideCollaborators(org),
    ])
  ).flat();

  try {
    await postSlack(formatMessages(members));
    return callback(null);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};

if (process.argv[2] === "--exec" || process.argv[2] === "-e") {
  handler({} as any, {} as any, (error) => {
    console.log({ error });
  });
}
