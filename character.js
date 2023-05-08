export class Character {
    let name;
    let image;
    let qrCodeImage;
    constructor(json) {
        name = json.name;
        image = json.images["lg"];
        qrCodeImage = json.images["sm"];
    }
}
