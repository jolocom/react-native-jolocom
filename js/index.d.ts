declare const RNJolocom: any;
export default RNJolocom;
export * from './storage';
export * from './passwordStore';
export * from './secureStorage';
export * from '@jolocom/sdk';
export * from 'jolocom-lib';
/**
 * Re-exporting available plugins
 */
export { DeepLinkingProvider } from './plugins/deep-linking/DeepLinkingProvider';
export { JolocomDeepLinkingTransport } from './plugins/deep-linking/JolocomDeepLinkingTransport';
export { LinkingErrorCode, JolocomLinking, } from './plugins/linking/JolocomLinking';
export { JolocomWebSockets } from './plugins/web-sockets/JolocomWebSockets';
