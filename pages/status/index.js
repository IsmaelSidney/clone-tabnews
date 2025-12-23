import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function statusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}
function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });
  let updateAtText = isLoading ? "Carregando..." : "";
  if (!isLoading && data) {
    updateAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return <div>Ultima atualização: {updateAtText}</div>;
}
function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });
  let databaseInfos = isLoading ? "Carregando..." : "";
  if (!isLoading && data) {
    const db = data.dependencies.database;
    databaseInfos = (
      <>
        <div>Versão: {db.version}</div>
        <div>Conexões abertas: {db.opened_connections}</div>
        <div>Conexões máximas: {db.max_connections}</div>
      </>
    );
  }
  return (
    <>
      <h2>Database</h2>
      <div>{databaseInfos}</div>
    </>
  );
}
