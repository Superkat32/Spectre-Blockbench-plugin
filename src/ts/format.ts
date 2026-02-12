export const SPECTRE_CODEC_FORMAT_ID: string = "spectre_entity";

export const SPECTRE_CODEC: Codec = new Codec(SPECTRE_CODEC_FORMAT_ID, {
    name: "Spectre Entity Model",
    extension: "json",
    remember: true,
    support_partial_export: true,
    load_filter: {
        type: "json",
        extensions: ["json"],
    },
    compile(options?: any): any {
        // this returns quite a lot of metadata about all textures
        let textures = Project?.textures ?? [];
        // loop over them and extract the "width" and "height", and "img":"tex":"name" properties
        let properties = [];
        for (const texture of textures) {
            properties.push({
                texture: texture.img.tex.name, // same format as block textures
                texture_size: [ // technically more like a ratio than a size but making it the actual ratio (eg, 1:1 for square) would lead to floating point precision issues
                    texture.width,
                    texture.height
                ]
            });
        }
        return JSON.stringify({ properties }, null, 2);
    }
})

export const SPECTRE_FORMAT: ModelFormat = new ModelFormat(SPECTRE_CODEC_FORMAT_ID, {
    id: SPECTRE_CODEC_FORMAT_ID,
    name: "Spectre Entity",
    description: "Entity model for Minecraft Java mods using the Spectre library.",
    icon: "resize",
    category: "minecraft",
    target: "Minecraft: Java Edition",
    format_page: {
        content: [ // TODO - Spectre docs page
            {type: 'h3', text: tl('mode.start.format.informations')},
            {text: "* Bones & cubes have can associated 'Render Layers' (found via the 'Spectre Layers' panel) which determine render properties such as texture, emissive-ness, and more."},
            {type: 'h3', text: tl('mode.start.format.resources')},
            {text: `* [Spectre Entity Docs](https://github.com/SpiritGameStudios/Spectre)
					* [Spectre GitHub](https://github.com/SpiritGameStudios/Spectre)`.replace(/\t+/g, '')
            }
        ]
    },
    codec: SPECTRE_CODEC,
    node_name_regex: "\\w.-",
    animation_mode: true,
    box_uv: true,
    box_uv_float_size: true,
    single_texture: true,
    bone_rig: true,
    centered_grid: true,
    rotate_cubes: true
})
SPECTRE_CODEC.format = SPECTRE_FORMAT;

export function unloadSpectreFormat(): void {
    SPECTRE_FORMAT.delete();
    SPECTRE_CODEC.delete();
}

export function isSpectreProject(): boolean {
    return Format == SPECTRE_FORMAT;
}