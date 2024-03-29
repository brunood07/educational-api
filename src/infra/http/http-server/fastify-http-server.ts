import Fastify, { RouteHandlerMethod } from 'fastify';
import HttpServer from './http-server';

export const enum HTTP_METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export class FastifyHttpServer implements HttpServer<RouteHandlerMethod> {
  public app = Fastify({ logger: true });

  public async on(method: HTTP_METHODS, url: string, handler: RouteHandlerMethod): Promise<void> {
    this.app[method](url, handler);
  }

  public async listen(port: number, host: string): Promise<void> {
    try {
      await this.app.listen({ port, host });
      console.log(`Server is listening on ${port} 🚀🚀`)
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async register(plugin: any, opts?: any): Promise<void> {
    this.app.register(plugin, opts);
  }
}