var userColor = "#f71963";

function toSecondaryColor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);

    var h = (max + min) / 2;

    if (max === min) {
        h = 0; // achromatic
    } else {
        var d = max - min;
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                return false;
        }
        h /= 6;
    }

    h = Math.round(360 * h);

    var colorInHSL = "hsl(" + h + ", 20%, 20%)";

    return colorInHSL;
}

export const primaryColor = userColor;
export const secondaryColor = toSecondaryColor(userColor);
