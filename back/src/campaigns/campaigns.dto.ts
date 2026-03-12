import {
  IsString, IsNumber, IsArray, IsDateString, IsOptional, IsEnum, Min
} from "class-validator"

export class CreateCampaignDto {
  @IsString()
  name: string

  @IsString()
  advertiser: string

  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string

  @IsNumber()
  @Min(0)
  budget: number

  @IsArray()
  @IsString({ each: true })
  targetCountries: string[]

  @IsOptional()
  @IsEnum(['active', 'paused', 'ended'])
  status?: string
}

export class ServeAdDto {
  @IsString()
  country: string

  @IsOptional()
  @IsString()
  campaignId?: string
}
