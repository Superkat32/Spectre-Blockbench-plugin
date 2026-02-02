import esbuild from "esbuild"

const watch = process.argv.includes("--watch");

const settings = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    format: "esm",
    outfile: "./dist/export_to_spectre.js"
};

if (watch) {
    const context = await esbuild.context(settings)
    await context.watch();
} else {
    esbuild.build(settings)
}