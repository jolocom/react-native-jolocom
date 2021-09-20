export declare abstract class DeepLinkingProvider {
    abstract subscribe(handler?: (token: string) => Promise<void>): void;
}
