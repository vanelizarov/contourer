const process = (imageData) => {
    return new Promise((resolve, reject) => {

        const {data, width, height} = imageData;
        const processed = [...data];

        for (let i = 0, len = data.length; i < len; i++) {
            processed[i] *= Math.random() * (0.6 - 0.4) + 0.4;
        }

        const newImageData = new ImageData(new Uint8ClampedArray(processed), width, height);
        resolve(newImageData);

    });
};

module.exports = {
    process
};