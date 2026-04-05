import ImageCaptioner from "./ImageCaptioner";

export default async function generateCaption(imgSrc) {
    return ImageCaptioner.generateCaption(imgSrc);
}

async function  translate(captionENG) {
    return fetch("http://localhost:3000/translate",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"text": captionENG})
        }
    ).then(
        resp => resp.json()
    );

}

async function convertToAudio(input) {
    let text;
    if (typeof input === 'string') {
        text = input;
    } else if (Array.isArray(input) && input[0] && typeof input[0] === 'object' && 'translation_text' in input[0]) {
        text = input[0]["translation_text"];
    } else if (input && typeof input === 'object' && 'translation_text' in input) {
        text = input["translation_text"];
    } else {
        throw new Error("convertToAudio: input inválido; esperado string ou objeto com 'translation_text'");
    }

    return fetch("http://localhost:5000/text_to_audio",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        }
    ).then(async (resp) => {
        if (!resp.ok) {
            const text = await resp.text().catch(() => '');
            throw new Error(`Erro HTTP ${resp.status}: ${text}`);
        }
        return resp.json();
    });

}

export { generateCaption, translate, convertToAudio }