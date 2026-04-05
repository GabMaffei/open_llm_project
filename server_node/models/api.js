const { Translator } = require("./Translator");

async function translate(captionENG) {
    return Translator.translate(captionENG);
}

exports.translate = translate;