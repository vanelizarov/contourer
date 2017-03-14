const process = (imageData) => {
    return new Promise((resolve, reject) => {

        const kernel = [
            0.000789, 0.006581, 0.013347, 0.006581, 0.000789,
            0.006581, 0.054901, 0.111345, 0.054901, 0.006581,
            0.013347, 0.111345, 0.225821, 0.111345, 0.013347,
            0.006581, 0.054901, 0.111345, 0.054901, 0.006581,
            0.000789, 0.006581, 0.013347, 0.006581, 0.000789
        ];

        // const kernel = [
        //     2,4,5,4,2,
        //     4,9,12,9,4,
        //     5,12,15,12,5,
        //     4,9,12,9,4,
        //     2,4,5,4,2
        // ];


        const length = Math.round(Math.sqrt(kernel.length));
        const half = length * 0.5 | 0;

        const {width, height, data} = imageData;
        const processed = [...data];

        let y = height;

        while (y--) {
            let x = width;

            while (x--) {

                let sy = y;
                let sx = x;
                let procOffset = (y * width + x) * 4;
                let r = 0;
                let g = 0;
                let b = 0;
                let a = 0;

                for (let cy = 0; cy < length; cy++) {
                    for (let cx = 0; cx < length; cx++) {

                        let scy = sy + cy - half;
                        let scx = sx + cx - half;

                        if (scy >= 0 && scy < height && scx >= 0 && scx < width) {

                            let srcOffset = (scy * width + scx) * 4;
                            let weight = kernel[cy * length + cx] * 1.7;

                            r += data[srcOffset] * weight;
                            g += data[srcOffset + 1] * weight;
                            b += data[srcOffset + 2] * weight;
                            a += data[srcOffset + 3] * weight;

                        }

                    }
                }

                processed[procOffset] = r + data[procOffset];
                processed[procOffset + 1] = g + data[procOffset + 1];
                processed[procOffset + 2] = b + data[procOffset + 2];
                processed[procOffset + 3] = a + data[procOffset + 3];

            }

        }

        const newImageData = new ImageData(new Uint8ClampedArray(processed), width, height);
        resolve(newImageData);

    });
};



module.exports = {
    process
};