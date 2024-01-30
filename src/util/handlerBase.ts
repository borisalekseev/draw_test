import { TARGET_ORIGIN } from "./constant";
import { IEventHandler, IPostMessage, IErrorMessage, EventType } from "./interface";
import { Ketcher } from 'ketcher-core'

export abstract class BaseEventHandler implements IEventHandler {
    protected ketcher: Ketcher;
    protected type: EventType;
    protected structure: string;
    protected error?: string;

    STATUS_OK = "ok" as const
    STATUS_ERR = "error" as const

    constructor(ketcher: Ketcher, type: EventType, structure: string = "") {
        this.ketcher = ketcher;
        this.type = type;
        this.structure = structure
    }

    async handleEvent() {
        window.parent.postMessage(await this._getMessage(), TARGET_ORIGIN);
    }

    protected async _getMessage(): Promise<IPostMessage | IErrorMessage> {
        try {
            return await this._getPostMessage()
        } catch (error: any) {
            this.error = error.message
            return this._getErrorMessage()
        }
    }
    
    protected abstract _getPostMessage(): Promise<IPostMessage | never>;

    protected _getErrorMessage(): IErrorMessage {
        return {data: this.error || "error", status: this.STATUS_ERR, type: this.type};
    }
}
