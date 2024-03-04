const priceFix = (num, sep = ',') => {
    const number = typeof num === 'number' ? Math.round(num).toString() : num || '0';
    return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${sep}`);
};

export default priceFix;