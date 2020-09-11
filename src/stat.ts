import fetch from "node-fetch";
import * as Lambda from "aws-lambda";

export const handler: Lambda.ScheduledHandler = async (
  event,
  context,
  callback
) => {};

if (process.argv[2] === "--exec" || process.argv[2] === "-e") {
  console.log(handler({} as any, {} as any, {} as any));
}
