export const getInitial = (string) => {
    if (string) {
        return string.toString().charAt(0).toUpperCase();
    } else {
        return null;
    }
};
