import cluster from 'cluster';
import { cpus } from 'os';

const totalCPUs = cpus().length;

if (cluster.isPrimary) {
  console.warn(`Number of CPUs is ${totalCPUs}`);
  console.warn(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    process.env.PORT = `${5000 + i}`;
    cluster.fork();

  }

  cluster.on("exit", (worker) => {
    console.warn(`worker ${worker.process.pid} died`);
    console.warn("Let's fork another worker!");
    cluster.fork();
  });
} else {
  (async () => await import('../index.js'))();
}
