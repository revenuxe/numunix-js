import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const manifest = JSON.parse(
  fs.readFileSync(process.argv[2] || "test-results/repair-image-manifest.json", "utf8"),
);
const output = path.resolve("public/images/repair-categories");
fs.mkdirSync(output, { recursive: true });
for (const asset of manifest) {
  if (!/^[a-z0-9-]+$/.test(asset.slug)) throw new Error("Invalid asset slug");
  const destination = path.join(output, `${asset.slug}.webp`);
  await sharp(asset.path)
    .trim({ background: "#00000000", threshold: 8 })
    .resize(512, 512, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 100, effort: 6 })
    .toFile(destination);
  const metadata = await sharp(destination).metadata();
  const { channels } = await sharp(destination).stats();
  const alpha = channels.at(-1);
  if (!metadata.hasAlpha || !alpha || alpha.min !== 0 || alpha.max !== 255)
    throw new Error("Image is not a transparent product cutout: " + asset.slug);
  console.log(
    JSON.stringify({
      slug: asset.slug,
      width: metadata.width,
      height: metadata.height,
      bytes: fs.statSync(destination).size,
      transparent: true,
    }),
  );
}
