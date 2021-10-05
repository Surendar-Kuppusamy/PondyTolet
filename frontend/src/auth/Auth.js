export const auth = () => {
    if(typeof window == undefined) {
        return false;
    } else {
        return true;
    }
}