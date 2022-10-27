import { config, resolve, S3 } from "./deps.ts";

await config({ export: true });

const s3 = new S3({
  accessKeyID: Deno.env.get("AWS_ACCESS_KEY_ID")!,
  secretKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
  sessionToken: Deno.env.get("AWS_SESSION_TOKEN")!,
  region: Deno.env.get("AWS_REGION")!,
});

const bucket = s3.getBucket(Deno.env.get("AWS_BUCKET")!);

const objects = bucket.listAllObjects({
  batchSize: 10,
});

for await (const { key } of objects) {
  if (key === undefined) {
    console.log("Key not found for object");
    continue;
  }

  console.log("Downloading", key);

  const object = await bucket.getObject(key);

  const filepath = resolve(".", "tmp", key);

  const destFile = await Deno.open(filepath, {
    create: true,
    write: true,
    truncate: true,
  });

  await object?.body.pipeTo(destFile.writable);
}
