import { readpoints } from "./readpoints";

export class events {
    eventId: number;
    eventName: string;
    eventStartDate: string;
    eventEndDate: string;
    eventDescription: string;
    eventCode: string;
    status: string;
    portalId: number;
    stationCount: number;
    personCount: number;
    readPoints: readpoints[];
    open: boolean;
}