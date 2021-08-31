export declare class SecureStorage {
    static storeValue(key: string, value: string): Promise<void>;
    static getValue(key: string): Promise<string | null>;
    static removeValue(key: string): Promise<void>;
}
