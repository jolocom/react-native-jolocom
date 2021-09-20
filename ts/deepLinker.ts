export abstract class DeepLinker {
  public abstract subscribe(handler?: (token: string) => Promise<void>): void
}
