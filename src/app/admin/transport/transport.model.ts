export class Transport {
    public routeId: string;
    public routeName: string;
    public transportMode: string;
    public obsolete: string;
    public entity_id: number;
    public transportParticulars: Array<TransportParticulars>;
}

export class TransportParticulars {
    public stopId: string;
    public routeId: string;
    public stopCost: string;
    public stopName: string;
    public stopNumber: number;
    public obsolete: string;
    
}

export class Action {
    public method: string;
    public submethod: string;
    public stopcount: Number;
}

    
    