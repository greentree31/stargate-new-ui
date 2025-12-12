import { Person } from './person.model';

export interface AstronautDutyDto {
    rank: string;
    dutyTitle: string;
    dutyStartDate: string;
    dutyEndDate: string | null;
}

export interface AstronautDutyResponse {
    person: Person | null;
    duties: AstronautDutyDto[];
    success: boolean;
    message: string;
    responseCode: number;
}
