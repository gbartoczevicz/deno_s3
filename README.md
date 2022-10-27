# Deno S3 Example

This project download objects from a Amazon S3 bucket into `tmp` dir.

To run this example create a .env file by coping the .env.example and fill its
fields, all the fields are required. Then in shell execute:

```bash
deno run --allow-read --allow-env --allow-net --allow-write main.ts
```
