import net from "net";

const client = net.connect({ port: 60300 });

if (process.argv.length <= 3) {
  console.log("Please, provide a command.");
} else {
  const args: string[] = [];
  for (let i = 3; i < process.argv.length; i++) {
    args.push(process.argv[i]);
  }

  const command = process.argv[2];

  client.emit("command");

  client.on("data", (dataJSON) => {
    const message = JSON.parse(dataJSON.toString());
  });
}
