/**
 * function check weather there is application/json header in req.
 */
export const isJsonRequest = (req) => {
    return req.header('Accept').includes('application/json')
}