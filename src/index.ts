import app from "./app";

app.listen({ port: 5500, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);

  app.cron.startAllJobs();

  // console.log(app.cron.getJobByName('fetch-fxrates'))

  console.log(`Cron job started`);
});
