import dns from "node:dns";

export const configureMongoDns = () => {
  const servers = process.env.MONGO_DNS_SERVERS
    ?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers?.length) {
    dns.setServers(servers);
  }
};
