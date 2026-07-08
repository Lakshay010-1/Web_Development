function getCurrencySymbol(code) {
    const formatted = new Intl.NumberFormat("en", {
        style: "currency",
        currency: code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(0);

    const result = formatted.replace(/[\d\s.,]/g, "");
    return result == code ? "" : result;
}

export default getCurrencySymbol;