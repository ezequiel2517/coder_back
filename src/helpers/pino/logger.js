const pino = require("pino");
const fs = require("fs");

const streams = [
    { stream: process.stdout },
    {
        level: "info",
        stream: fs.createWriteStream(process.cwd() + "/logs/info.log", { flags: "a" }),
    },
    {
        level: "warn",
        stream: fs.createWriteStream(process.cwd() + "/logs/warn.log", { flags: "a" }),
    },
    {
        level: "error",
        stream: fs.createWriteStream(process.cwd() + "/logs/error.log", { flags: "a" }),
    },
];

module.exports = pino(
    {
        level: "info",
    },
    pino.multistream(streams)
);