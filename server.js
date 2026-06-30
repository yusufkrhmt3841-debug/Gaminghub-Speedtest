const express = require("express");
const { exec } = require("child_process");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Gaming Hub API en ligne !");
});

app.get("/test", (req, res) => {

    exec("npx @speedmeter/cli --json", (error, stdout, stderr) => {

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        try {

            const result = JSON.parse(stdout);

            res.json(result);

        } catch {

            res.status(500).json({
                error: "Impossible de lire le résultat."
            });

        }

    });

});

app.listen(PORT, () => {

    console.log("Serveur démarré sur le port " + PORT);

});
