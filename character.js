export class Character {
    let name;
    let image;
    let qrCodeImage;
    
    constructor(json) {
        name = json.name;
        image = json.images["lg"];
        qrCodeImage = json.images["sm"];
    }
    
    export function getCharacterName() {
        return name;
    }
    
    export function getCharacterImage() {
        return image;
    }
    
    export function getQRCodeImage() {
        return qrCodeImage;
    }
}
