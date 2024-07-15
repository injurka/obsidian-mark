```ts
import type { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import type { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import type { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-web';

export type Exporters = ZipkinExporter | OTLPTraceExporter | ConsoleSpanExporter;
export type ICollectorType = 'zipkin' | 'otlp';
export type ISpanType = 'batch' | 'simple';
export type IInstrumentations = 'documentLoad' | 'http';

export interface IOpentelemetryTraceSettings {
  service: {
    name: string;
    version?: string;
  };
  collector: {
    url: string;
    type?: ICollectorType;
  };
  span: ISpanType;
  instrumentations: IInstrumentations[];
}

import type { Tracer } from '@opentelemetry/api';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { CompositePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { Resource } from '@opentelemetry/resources';
import {
  WebTracerProvider,
  ConsoleSpanExporter,
  BatchSpanProcessor,
  SimpleSpanProcessor
} from '@opentelemetry/sdk-trace-web';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const instrumentations = {
  documentLoad: DocumentLoadInstrumentation,
  http: HttpInstrumentation
};

class OpentelemetryTrace {
  settings!: IOpentelemetryTraceSettings;
  provider!: WebTracerProvider;
  exporter!: Exporters;

  constructor(props: IOpentelemetryTraceSettings) {
    this.settings = props;
    const { collector, service } = props;

    this.exporter = this.createTraceExporter(service.name, collector.url, collector.type);
    this.initialiseProvider();

    console.log(`tracing initialized for ${service.name} sending span to collector`);
  }

  createTraceExporter = (serviceName: string, url: string, exporterType?: ICollectorType) => {
    switch (exporterType) {
      case 'zipkin':
        return new ZipkinExporter({
          serviceName,
          url
        });
      case 'otlp':
        return new OTLPTraceExporter({
          url
        });

      default:
        return new ConsoleSpanExporter();
    }
  };

  initialiseProvider = () => {
    const { service } = this.settings;

    this.provider = new WebTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: service.name,
        [SemanticResourceAttributes.SERVICE_VERSION]: service.version
      })
    });

    registerInstrumentations({
      tracerProvider: this.provider,
      instrumentations: this.settings.instrumentations.map((m) => new instrumentations[m]())
    });

    this.provider.register({
      //? Zone: Is required to keep async calls in the same trace
      // contextManager: new ZoneContextManager(),
      propagator: new CompositePropagator({
        propagators: [new B3Propagator(), new W3CTraceContextPropagator()]
      })
    });

    if (this.settings.span === 'batch') {
      //? BatchSpanProcessor:   The implementation of the SpanProcessor that batches ended spans and pushes them to the configured SpanExporter.
      //?                       It is recommended to use this SpanProcessor for better performance and optimization.
      this.provider.addSpanProcessor(new BatchSpanProcessor(this.exporter));
    } else {
      //? SimpleSpanProcessor:  The implementation of SpanProcessor that passes ended span directly to the configured SpanExporter.
      this.provider.addSpanProcessor(new SimpleSpanProcessor(this.exporter));
    }
  };

  get tracer(): Tracer {
    return this.provider.getTracer(this.settings.service.name);
  }
}

export default OpentelemetryTrace;
```