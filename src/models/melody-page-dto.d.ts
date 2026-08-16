import type { MelodyFlatDto } from "./melody-flat-dto";

export interface MelodyPageDto {
    melodies: MelodyFlatDto[];
    totalMelodies: number;
}