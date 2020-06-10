class Game {
    viewport: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(viewport: HTMLCanvasElement) {
        this.viewport = viewport;
        // this.width = viewport.width = window.innerWidth || document.body.clientWidth;
        // this.height = viewport.height = window.innerHeight || document.body.clientHeight;
        this.width = viewport.width;
        this.height = viewport.height;
        const context = viewport.getContext('2d');
        if (!context) {
            throw new Error("Failed to getContext from canvas element");
        }
        this.context = context;
    }

    square(startX: number, startY: number) {
        this.context.fillRect(startX, startY, 50, 50);
    }

    triangle(startX: number, startY: number) {
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(startX + 50, startY);
        this.context.lineTo(startX + 25, startY - 50);
        this.context.fill();
    }

    circle(startX: number, startY: number, radius: number) {
        this.context.beginPath();
        this.context.arc(startX, startY, radius, 0, Math.PI * 2, true);
        this.context.fill();
    }
}

class Grounds extends Game {
    [key: string]: any;

    render() {
        this.context.lineWidth = 3;

        const shapeCount = 18;

        this.context.fillStyle = "rgb(100,100,100)";
        this["circle"](character.posX, character.posY, 20);

        for (let i = 0; i < shapeCount; i++) {
            const color = "rgba(100,0,100,1.0)";
            const shape = "square";
            const startX = i * 51;
            const startY = 0;
            this.context.fillStyle = color;
            this[shape](startX, startY);
        }

        window.requestAnimationFrame(() => canvas.render())
    }
}

function keyboardInput(event: KeyboardEvent) {

    canvas.context.clearRect(0, 0, canvas.context.canvas.width, canvas.context.canvas.height);

    // LEFT ARROW
    if (event.keyCode == 37) {
        character.posX = character.posX - 10;
    }
    // UP ARROW
    else if (event.keyCode == 38) {
        character.posY = character.posY - 10;
    }
    // RIGHT ARROW
    else if (event.keyCode == 39) {
        character.posX = character.posX + 10;
    }
    // DOWN ARROW
    else if (event.keyCode == 40) {
        character.posY = character.posY + 10;
    }
    // SPACE BAR
    else if (event.keyCode == 32) {
        console.log("Fire !");
    }
}

class Character {
    constructor(public posX: number, public posY: number) {
        console.log(`${posX} && ${posY}`)
    }
}

const character = new Character(100, 100);
let canvas: Grounds;

window.onload = () => {
    document.body.style.cssText = `background-color: rgb(0,0,0)`;

    const viewport = <HTMLCanvasElement | null>document.getElementById('viewport');

    if (!viewport) {
        throw new Error("Couldn't find element with id 'viewport'");
    }

    viewport.style.cssText = `background-color: rgb(255,255,255)`;

    canvas = new Grounds(viewport);
    document.addEventListener('keydown', keyboardInput);

    window.requestAnimationFrame(() => canvas.render());
};
