import { TARGET_ORIGIN } from "./constant";
import { IEventHandler, IPostMessage, IErrorMessage, EventType } from "./interface";
import { Ketcher } from 'ketcher-core'

abstract class BaseEventHandler implements IEventHandler {
    protected ketcher: Ketcher;
    protected type: EventType
    STATUS_OK: Readonly<string> = "ok" as const
    STATUS_ERR: Readonly<string> = "error" as const
   
    constructor(ketcher: Ketcher, type: EventType) {
        this.ketcher = ketcher;
        this.type = type
    }

    async getMessage(): Promise<IPostMessage | IErrorMessage> {
        try {
            return this.getPostMessage()
        } catch {
            return this.getErrorMessage()
        }
    }

    abstract handleEvent(): Promise<void>;
    protected abstract getPostMessage(): Promise<IPostMessage>;
    abstract getErrorMessage(): IErrorMessage;
}

class GetInchiEventHandler extends BaseEventHandler {
    async handleEvent() {
        window.parent.postMessage(this.getMessage(), TARGET_ORIGIN);
    }
    async getMessage() {
        try {
            const inchi = await this.ketcher.getInchi();
            return {data: inchi, status: this.STATUS_OK, type: this.type}
        } catch {
            return this.getErrorMessage()
        }
    }
    getErrorMessage(): IErrorMessage {
        return {data: "error", status: "error" as const, type: this.type};
    }
}

class GetSmilesEventHandler extends BaseEventHandler {
    async handleEvent() {
        const smiles = await this.ketcher.getSmiles();
        window.parent.postMessage({ smiles, type: "smiles" }, TARGET_ORIGIN);
    }
    getMessage(): IPostMessage | IErrorMessage {
        try {

        } catch {

        }
    }
    getErrorMessage(): IErrorMessage {
        throw new Error("Method not implemented.");
    }
}

class GetInchiKeyEventHandler extends BaseEventHandler {
    async handleEvent(): Promise<void> {
        const inchiKey = await this.ketcher.getInChIKey()
        window.parent.postMessage({ inchiKey, type: "smiles" }, TARGET_ORIGIN);
    }
    getMessage(): IPostMessage | IErrorMessage {
        throw new Error("Method not implemented.");
    }
    getErrorMessage(): IErrorMessage {
        throw new Error("Method not implemented.");
    }
}