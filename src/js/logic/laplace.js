const matrice = (kernel, x ,y, binder) => (
    (kernel[0][0] * binder(x - 1, y - 1)) +
    (kernel[0][1] * binder(x, y - 1)) +
    (kernel[0][2] * binder(x + 1, y - 1)) +
    (kernel[1][0] * binder(x - 1, y)) +
    (kernel[1][1] * binder(x, y)) +
    (kernel[1][2] * binder(x + 1, y)) +
    (kernel[2][0] * binder(x - 1, y + 1)) +
    (kernel[2][1] * binder(x, y + 1)) +
    (kernel[2][2] * binder(x + 1, y + 1))
);

const iterate = (w, h, func) => {
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            func();
        }
    }
};

const process = (imageData) => {
    return new Promise((resolve, reject) => {

        const {width, height, data} = imageData;

        const kernelX = [
            [0, -1, 0],
            [-1, 4, -1],
            [0, -1, 0]
        ];

        const kernelY = [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]
        ];

        let processed = [];
        let grayscaled = [];

        const bindAt = (data) => (x, y, i = 0) => data[((width * y) + x) * 4 + i];
        let pixelAt = bindAt(data);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const r = pixelAt(x, y, 0);
                const g = pixelAt(x, y, 1);
                const b = pixelAt(x, y, 2);
                const gray = (r * 0.34) + (g * 0.5) + (b * 0.16);

                grayscaled.push(gray, gray, gray, 255);
            }
        }

        pixelAt = bindAt(grayscaled);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelX = matrice(kernelX, x, y, pixelAt);
                const pixelY = matrice(kernelY, x, y, pixelAt);
                const magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)) >>> 0;

                processed.push(magnitude, magnitude, magnitude, 255);
            }
        }

        const newImageData = new ImageData(new Uint8ClampedArray(processed), width, height);
        resolve(newImageData);

    });
};

module.exports = {
    process
};