export async function server(port: number = 3333) {
  const { setupApp } = await import("../main/config/app")

  const app = await setupApp();
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
  );
}
