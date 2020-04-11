import require from 'require';
import browser from 'browser';
/* eslint-disable indent */

    export class LazyLoader {
        constructor(options) {
            this.options = options;
            this.observer;
        }

        createObserver() {
            const callback = this.options.callback;

            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        callback(entry);
                    },
                    {rootMargin: "50%"});
                });

            this.observer = observer;
        }

        addElements(elements) {
            let observer = this.observer;

            if (!observer) {
                this.createObserver();
                observer = this.observer;
            }

            Array.from(elements).forEach(element => {
                observer.observe(element);
            });
        }

        destroyObserver(elements) {
            const observer = this.observer;

            if (observer) {
                observer.disconnect();
                this.observer = null;
            }
        }

        destroy(elements) {
            this.destroyObserver();
            this.options = null;
        }
    }

    function unveilElements(elements, root, callback) {
        if (!elements.length) {
            return;
        }
        const lazyLoader = new LazyLoader({
            callback: callback
        });
        lazyLoader.addElements(elements);
    }

    export function lazyChildren(elem, callback) {
        unveilElements(elem.getElementsByClassName('lazy'), elem, callback);
    }

/* eslint-enable indent */
export default {
    LazyLoader: LazyLoader,
    lazyChildren: lazyChildren
};
