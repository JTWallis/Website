import type { SvgComponent } from "astro/types";

export interface ToolWithColor {
    name: string;
    color: string;
    svgPath?: string;
}