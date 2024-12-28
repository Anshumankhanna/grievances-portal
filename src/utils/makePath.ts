export default function makePath(...params: string[]): string {
    return params.reduce((accum: string, curr: string): string => `${accum}/${curr}`, "");
}