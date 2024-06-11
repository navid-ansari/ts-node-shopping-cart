export class RequestValidationError {
    
    private field: string
    private message: string

    constructor(field: string, message: string) {
        this.field = field
        this.message = message
    }

    public get _field(): string {
        return this.field
    }
    public set _field(value: string) {
        this._field = value
    }
    public get _message(): string {
        return this.message
    }
    public set _message(value: string) {
        this.message = value
    }

}