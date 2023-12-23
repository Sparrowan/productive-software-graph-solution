import { IsNotEmpty, IsString, IsArray, IsNumber } from '@nestjs/class-validator';

export class NextStatusDto {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    transition: string[];
}

export class ShortestPathDto {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    transition: string[];

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    statuses: number[];
}