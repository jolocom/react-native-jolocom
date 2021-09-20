export abstract class DeepLinkingProvider {
  public abstract subscribe(handler?: (token: string) => Promise<void>): void
}
