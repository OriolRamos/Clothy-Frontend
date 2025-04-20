import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

let $;

const MultiRangeSlider = ({
                              min = 0,
                              max = 1000,
                              start = [0, 1000],
                              prefix = '$',
                              onChange,
                          }) => {
    const sliderRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        (async () => {
            if (!window.$) {
                $ = (await import('jquery')).default;
                window.$ = window.jQuery = $;
            } else {
                $ = window.$;
            }
            await import('ion-rangeslider');
            await import('ion-rangeslider/css/ion.rangeSlider.css');

            const $el = $(sliderRef.current);
            $el.ionRangeSlider({
                type: 'double',
                min,
                max,
                from: start[0],
                to: start[1],
                prefix,
                step: 1,
                grid: false,
                drag_interval: false,
                force_edges: true,
                skin: 'round',
                onChange: (data) => {
                    onChange({ min: data.from, max: data.to });
                },
                onFinish: (data) => {
                    onChange({ min: data.from, max: data.to });
                },
                onStart: () => {
                    $('.irs--round .irs-bar, .irs--round .irs-from, .irs--round .irs-to, .irs--round .irs-handle')
                        .addClass('bg-faqblue');
                },
            });

            const sliderInstance = $el.data('ionRangeSlider');

            return () => sliderInstance && sliderInstance.destroy();
        })();
    }, [isClient, min, max, start, prefix, onChange]);




    return (
        <div>
            <label className="sr-only">Rango de precios</label>
            {isClient && (
                <input
                    ref={sliderRef}
                    type="text"
                    className="js-range-slider w-full"
                />
            )}
        </div>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    start: PropTypes.arrayOf(PropTypes.number),
    prefix: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
