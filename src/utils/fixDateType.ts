export default function fixForDate<T extends Record<string, unknown>>(input: T): void {
    for (const key in input) {
        console.log(key);
        // Skip the property if it's not directly part of the object (e.g., inherited properties)
        if (!Object.prototype.hasOwnProperty.call(input, key)) {
            continue;
        }

        // Get the value of the current key
        const value = input[key];

        // Check if the value is an object and not an array (arrays are also objects in TypeScript)
        if (isObject(value)) {
            if (!Array.isArray(value)) {
                fixForDate(value as Record<string, unknown>); // Recurse into the nested object
            } else {
                for (const item of value) {
                    if (isObject(item)) {
                        fixForDate(value as Record<string, unknown>);
                    }
                }
            }
        } else if (!isNaN(Date.parse(value as string))) {
            input[key] = new Date(value as string) as T[Extract<keyof T, string>];
        }
    }
}

export function isObject<T>(value: T): boolean {
    return value && typeof value === "object";
}

