export interface Entity {
    name: string
    content: string

    /**
     * Allows to bind the record params given to the current object
     * @param record
     */
    fromRecord(record: any)
}