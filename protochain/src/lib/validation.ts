/**
 * Validation class
 */
export default class Validation {
    success: boolean;
    message: string;

    /**
     * Constructor
     * @param success // if the validation is successful
     * @param message // message to be displayed, if validation fails
     */
    constructor(success: boolean = true, message: string = '') {
        this.success = success;
        this.message = message;
    }
}