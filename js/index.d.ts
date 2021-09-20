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
export { DeepLinkingProvider, JolocomDeepLinkingTransport, LinkingErrorCode, JolocomLinking, JolocomWebSockets } from './plugins';
