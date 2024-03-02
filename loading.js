// Define the loader animation frames
const loaderFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let currentFrame = 0;

// Function to update the loader animation
function updateLoader() {
    // Clear the current frame
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    // Update the loader frame
    currentFrame = (currentFrame + 1) % loaderFrames.length;
    process.stdout.write(loaderFrames[currentFrame]);
}

exports.startLoader = function(duration) {
    const intervalId = setInterval(updateLoader, 100);

    setTimeout(() => {
        clearInterval(intervalId);
        process.stdout.write('\n');
    }, duration);
}