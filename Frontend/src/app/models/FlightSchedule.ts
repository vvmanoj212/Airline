export class FlightSchedule{
    DateFlight : Date;
    FlightId : string;
    AvailableSeats: number;
    constructor(date,Id,seats){
        this.DateFlight = date ;
        this.FlightId = Id ;
        this.AvailableSeats = seats;
    }
}