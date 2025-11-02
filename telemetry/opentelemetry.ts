import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { config } from '../src/config/index.js';
import { createLogger } from '../src/utils/logger.js';

const logger = createLogger('telemetry');

let sdk: NodeSDK | null = null;

export async function initTelemetry() {
  if (!config.telemetry.otelEndpoint && config.env === 'production') {
    logger.warn('OpenTelemetry endpoint not configured for production');
  }

  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'recovery-plus-backend',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: config.env,
  });

  sdk = new NodeSDK({
    resource,
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': {
          enabled: false,
        },
      }),
    ],
    traceExporter: new ConsoleSpanExporter(),
  });

  try {
    await sdk.start();
    logger.info('OpenTelemetry initialized');
  } catch (error) {
    logger.error({ error }, 'Failed to initialize OpenTelemetry');
  }
}

export async function shutdownTelemetry() {
  if (sdk) {
    try {
      await sdk.shutdown();
      logger.info('OpenTelemetry shut down');
    } catch (error) {
      logger.error({ error }, 'Error shutting down OpenTelemetry');
    }
  }
}