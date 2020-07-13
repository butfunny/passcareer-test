import debounce from "lodash/debounce";

export const ResponsiveFactory = {
    createResponsive(sizes) {

        let listeners = [];
        let currentSize = null;

        let checkSize = function () {
            let newSize = translateWidth(window.innerWidth);
            if (currentSize == null || currentSize != newSize) {
                currentSize = newSize;
                listeners.forEach((l) => l());
            }
        };

        function translateWidth(width) {
            for (let i = sizes.length - 1; i > -1; i--) {
                let size = sizes[i];
                if (width >= size.minWidth) {
                    return size.name;
                }
            }
        }

        window.onresize = debounce(checkSize, 250);
        checkSize();

        function sizeIndex(sizeName) {
            return sizes.findIndex((size) => size.name == sizeName);
        }

        return {
            onChange(listener) {
                listeners.push(listener);
                return () => {
                    listeners.splice(listeners.indexOf(listener), 1);
                };
            },
            currentSize: () => currentSize,
            ge(minSize) {
                return sizeIndex(currentSize) >= sizeIndex(minSize);
            },
            le(minSize) {
                return sizeIndex(currentSize) <= sizeIndex(minSize);
            },
            lt(maxSize) {
                return sizeIndex(currentSize) < sizeIndex(maxSize);
            },
            gt(maxSize) {
                return sizeIndex(currentSize) > sizeIndex(maxSize);
            },
            eq(size) {
                return currentSize == size;
            }
        };
    }
};

