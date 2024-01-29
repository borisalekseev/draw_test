export interface IEventHandler {
    handleEvent(): Promise<void>
}

export type EventType = "getInchi" | "getSmiles" | "setMolecule" | "getInchiKey" | "getMolfile"

export interface IPostMessage {
    data: string,
    type: EventType,
    status: "ok"
}

export interface IErrorMessage {
    data: string,
    type: EventType,
    status: "error"
}
