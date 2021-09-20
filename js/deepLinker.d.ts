export declare abstract class DeepLinker {
    abstract subscribe(handler?: (token: string) => Promise<void>): void;
}
