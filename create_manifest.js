var fs = require("fs");

var manifest = {
    indexFiles: [
        {
            "url": "/developer-tools/index.html",
            "file": "./index.html"
        },
        {
            "url": "/developer-tools/coderunner/index.html",
            "file": "./coderunner/index.html"
        }
    ],
    "name": "developer-tools",
    "version": process.env.BUILD_NUMBER,
    "buildDate": new Date().toISOString(),
    "buildNumber": process.env.BUILD_NUMBER
};

fs.writeFileSync("dist/manifest.json", JSON.stringify(manifest, null, "  "));
