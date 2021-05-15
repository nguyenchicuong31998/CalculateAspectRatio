const $ = {};
module.exports = $;
$.calculatingAspectRatio = function calculatingAspectRatio(width, height) {
    return (height == 0) ? width : calculatingAspectRatio(height, width % height);
}