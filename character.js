export class Character { 
    constructor(json) {
        this.name = json.name;
        this.image = json.images["lg"];
        this.qrCodeImage = json.images["xs"];
        this.data = json;
    }
    
    getCharacterName() {
        return this.name; 
    }
    
    getCharacterImage() {
        return this.image;
    }
    
    getQRCodeImage() {
        return this.qrCodeImage;
    }
    
    getCharacterData() {
        return this.data;   
    }
}
