// import { unlink } from 'node:fs/promises';

import { Glob } from "bun";
import sharp from "sharp";

(async () => {
	const glob = new Glob("./**/*.png");

	for await (const filePath of glob.scan(".")) {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const filename = filePath.split("/").pop()!;

		await sharp(filePath).toFormat("avif").avif().toFile(`${filename}.avif`);

		// await unlink(filePath);
	}
})();
