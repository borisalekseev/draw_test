import { BaseEventHandler } from "./handlerBase";
import { EventType } from "./interface";

export default function getEventHandlerClass(eventType: EventType | any) {
    switch (eventType) {
        case "getInchi":
            return GetInchiEventHandler;
        case "getInchiKey":
            return GetInchiKeyEventHandler;
        case "getMolfile":
            return GetMolfileEventHandler;
        case "getSmiles":
            return GetSmilesEventHandler;
        case "setMolecule":
            return SetMoleculeEventHandler;
        default:
            return ErrorEventHandler
    }
}

class GetInchiEventHandler extends BaseEventHandler {
    async _getPostMessage() {
        const inchi = await this.ketcher.getInchi();
        return {data: inchi, status: this.STATUS_OK, type: this.type}
    }
}

class GetSmilesEventHandler extends BaseEventHandler {
    async _getPostMessage() {
        const smiles = await this.ketcher.getSmiles();
        return {data: smiles, status: this.STATUS_OK, type: this.type}
    }
}

class GetInchiKeyEventHandler extends BaseEventHandler {
    async _getPostMessage() {
        const inchiKey = await this.ketcher.getInChIKey();
        return {data: inchiKey, status: this.STATUS_OK, type: this.type}
    }
}

class GetMolfileEventHandler extends BaseEventHandler {
    async _getPostMessage() {
        const molFile = await this.ketcher.getMolfile();
        return {data: molFile, status: this.STATUS_OK, type: this.type}
    }
}

class SetMoleculeEventHandler extends BaseEventHandler {
    async _getPostMessage() {
        await this.ketcher.setMolecule(this.structure);
        return {data: "", status: this.STATUS_OK, type: this.type}
    }
}

class ErrorEventHandler extends BaseEventHandler {
    async _getPostMessage(): Promise<never> {
        throw new Error("Unable to identify event type!")
    }
}
