import BirdImage from "./assets/images/bird.png";
import BackgroundImage from "./assets/images/bg.png";
import PipeNorthImage from "./assets/images/pipeNorth.png";
import PipeSouthImage from "./assets/images/pipeSouth.png";
import FrontGroundImage from "./assets/images/fg.png";
import FlyAudio from "./assets/sounds/fly.mp3";
import ScoreAudio from "./assets/sounds/score.mp3";

/**
 * Getting canvas element and context
 * @type {HTMLElement}
 */
const canvas  = document.getElementById("main"),
      context = canvas.getContext("2d");

/**
 *  Load assets images
 * @type {HTMLImageElement, HTMLAudioElement}
 */
 let bird        = new Image(),
     background  = new Image(),
     frontGround = new Image(),
     pipeNorth   = new Image(),
     pipeSouth   = new Image(),
     flyAudio    = new Audio(),
     scoreAudio  = new Audio();
/**
 * Set sources for imported files
 */
bird.src        = BirdImage;
background.src  = BackgroundImage;
frontGround.src = FrontGroundImage;
pipeNorth.src   = PipeNorthImage;
pipeSouth.src   = PipeSouthImage;
flyAudio.src    = FlyAudio;
scoreAudio.src  = ScoreAudio;

/**
 * Wait for assets loading
 */
window.onload = function() {
    /**
     * Initial settings
     * @type {number, object}
     */
    let gap      = 85,
        constant = pipeNorth.height + gap,
        birdX    = 10,
        birdY    = 150,
        gravity  = 1.5,
        score    = 0,
        pipe     = [
            {
                x: canvas.width,
                y: 0
            }
        ];

    /**
     * Move Bird up event listener
     */
    document.addEventListener("keydown", function () {
        birdY -= 20;
        flyAudio.play();
    });

    /**
     * Main logic of the game
     */
    function draw () {
        context.drawImage(background, 0, 0);

        for (let i = 0; i < pipe.length; i++) {
            context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

            pipe[i].x--;

            if (pipe[i].x === 125) {
                pipe.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                });
            }

            if (
                birdX + bird.width >= pipe[i].x &&
                birdX <= pipe[i].x + pipeNorth.width &&
                birdY <= pipe[i].y + pipeNorth.height ||
                birdY + bird.height >= pipe[i].y + constant ||
                birdY + bird.height >= canvas.height - frontGround.height
            ) {
                location.reload();
            }

            if (pipe[i].x === 5) {
                score++;
                scoreAudio.play();
            }
        }

        context.drawImage(frontGround, 0, canvas.height - frontGround.height );
        context.drawImage(bird, birdX, birdY );

        birdY += gravity;
        context.fillStyle = "#000";
        context.font = "20px Verdana";
        context.fillText("Score: " + score, 10, canvas.height - 20);

        requestAnimationFrame(draw)
    }

    draw();
}
