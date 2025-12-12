export interface Person {
    personId: number;
    name: string;
    currentRank: string;
    currentDutyTitle: string;
    careerStartDate: string | null;
    careerEndDate: string | null;
}

export interface PeopleResponse {
    people: Person[];
    success: boolean;
    message: string;
    responseCode: number;
}
