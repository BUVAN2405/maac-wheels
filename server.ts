import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { SERVICES } from './src/data/catalog.ts';

async function startServer() {
  const app = express();
  
  // Disable fingerprinting header
  app.disable('x-powered-by');

  // Security HTTP Headers Middleware (OWASP recommended defense-in-depth)
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // Parse port from environment variable, CLI argument (--port 3000), or default to 3000
  const portArgIndex = process.argv.indexOf('--port');
  const portFromArg = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1], 10) : undefined;
  const PORT = Number(process.env.PORT) || portFromArg || 3000;

  // Enforce payload size limits to protect against Denial of Service (DoS) memory exhaustion
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'MAAC Wheels and Accessories Showcase',
      timestamp: new Date().toISOString()
    });
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Development mode with Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving for prerendered routes + real HTTP 404 handling
    const localDist = path.resolve(process.cwd(), 'dist');
    const nestedDist = path.resolve(process.cwd(), 'maac-wheels-main', 'dist');
    const distPath = fs.existsSync(localDist) ? localDist : nestedDist;
    const validServiceIds = new Set(SERVICES.map((s) => s.id));

    const sendPrerenderedFile = (res: Response, filePath: string, statusCode: number) => {
      if (fs.existsSync(filePath)) {
        res.status(statusCode).sendFile(filePath);
      } else {
        const indexPath = path.join(distPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.status(statusCode).sendFile(indexPath);
        } else {
          res.status(404).send('Application build not found.');
        }
      }
    };

    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath, { dotfiles: 'ignore', index: false }));

      app.get('/', (_req: Request, res: Response) => {
        sendPrerenderedFile(res, path.join(distPath, 'index.html'), 200);
      });

      app.get('/services/:serviceId', (req: Request, res: Response) => {
        const serviceId = String(req.params.serviceId || '');
        if (validServiceIds.has(serviceId)) {
          sendPrerenderedFile(
            res,
            path.join(distPath, 'services', serviceId, 'index.html'),
            200
          );
        } else {
          sendPrerenderedFile(res, path.join(distPath, '404.html'), 404);
        }
      });

      app.get('*', (_req: Request, res: Response) => {
        sendPrerenderedFile(res, path.join(distPath, '404.html'), 404);
      });
    }
  }

  // Robust error handler preventing stack trace leak
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Handled server error:', err?.message || 'Unknown error');
    if (!res.headersSent) {
      res.status(err?.status || 500).json({ 
        error: isProduction ? 'Internal Server Error' : (err?.message || 'Internal Server Error')
      });
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MAAC Wheels and Accessories server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
