const example = () => {
    let item = $('.example');
    if (item.length <= 0) return false;
    const setHeight = () => {
        item.css({height: window.innerHeight});
    };
    setHeight();
    window.addEventListener('resize',setHeight);
};

export {example};
